'use client';

import React, { useEffect, useRef } from 'react';

// ─── Grid Configuration (from reference) ────────────────────────────────────
const CELL_SIZE = 55;
const INFLUENCE_RADIUS = 260;
const MAX_WARP = 24;

// ─── OSAAC Color Palette ────────────────────────────────────────────────────
const COLORS = {
  /** Primary grid lines & resting nodes — #3b82f6 */
  grid: { r: 59, g: 130, b: 246 },
  /** Active / cursor-proximate nodes — #60a5fa */
  activeNode: { r: 96, g: 165, b: 250 },
  /** Click ripple rings — #2563eb */
  ripple: { r: 37, g: 99, b: 235 },
};

// ─── Visual Tuning ──────────────────────────────────────────────────────────
// Resting grid: subtle but clearly visible against #0a0f1a
const LINE_ALPHA_REST = 0.09;
const LINE_ALPHA_ACTIVE = 0.30;
const LINE_WIDTH_REST = 0.8;
const LINE_WIDTH_BOOST = 0.5; // Additional width at full proximity

const NODE_RADIUS_REST = 1.5;
const NODE_RADIUS_ACTIVE = 3.0;
const NODE_ALPHA_REST = 0.18;
const NODE_ALPHA_ACTIVE = 0.60;
const NODE_GLOW_ALPHA_MAX = 0.22;
const NODE_GLOW_RADIUS_FACTOR = 3.5;
const NODE_COLOR_SHIFT_THRESHOLD = 0.3; // Proximity at which node color shifts to activeNode

// ─── Ripple Configuration ───────────────────────────────────────────────────
const RIPPLE_SPEED = 3;
const RIPPLE_MAX_RADIUS = 350;
const RIPPLE_RING_WIDTH = 60;
const RIPPLE_WARP_STRENGTH = 0.5; // Fraction of MAX_WARP applied by ripples

// ─── Pointer Smoothing ─────────────────────────────────────────────────────
const POINTER_LERP_ACTIVE = 0.12;
const POINTER_LERP_DECAY = 0.08;
const POINTER_OFF_SCREEN = -1000;
const POINTER_BOUNDS_MARGIN = 50;

// ─── Types ──────────────────────────────────────────────────────────────────
interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface KineticGridProps {
  className?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function KineticGrid({ className = '' }: KineticGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let gridCols = 0;
    let gridRows = 0;

    // Pointer state with smooth damping
    const pointer = {
      x: POINTER_OFF_SCREEN,
      y: POINTER_OFF_SCREEN,
      targetX: POINTER_OFF_SCREEN,
      targetY: POINTER_OFF_SCREEN,
      active: false,
    };

    // Active ripple pool
    const ripples: Ripple[] = [];

    // Check accessibility: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // ─── Resize Handler ──────────────────────────────────────────────
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      gridCols = Math.ceil(width / CELL_SIZE) + 2;
      gridRows = Math.ceil(height / CELL_SIZE) + 2;

      // Redraw static grid for reduced-motion mode
      if (prefersReducedMotion) {
        drawStaticGrid();
      }
    };

    // ─── Warped Position Calculation ─────────────────────────────────
    // Returns displaced [x, y] based on cursor proximity and active ripples.
    const getWarpedPos = (baseX: number, baseY: number): [number, number] => {
      let dx = 0;
      let dy = 0;

      // Cursor influence — localized grid deformation
      if (pointer.active && pointer.x > POINTER_OFF_SCREEN + 100) {
        const pdx = baseX - pointer.x;
        const pdy = baseY - pointer.y;
        const dist = Math.sqrt(pdx * pdx + pdy * pdy);

        if (dist < INFLUENCE_RADIUS && dist > 1) {
          const t = 1 - dist / INFLUENCE_RADIUS;
          // Smoothstep easing for organic, fluid warp
          const eased = t * t * (3 - 2 * t);
          const warp = eased * MAX_WARP;
          dx += (pdx / dist) * warp;
          dy += (pdy / dist) * warp;
        }
      }

      // Ripple influence — expanding ring displacement
      for (let i = 0; i < ripples.length; i++) {
        const ripple = ripples[i];
        const rdx = baseX - ripple.x;
        const rdy = baseY - ripple.y;
        const dist = Math.sqrt(rdx * rdx + rdy * rdy);
        const ringDist = Math.abs(dist - ripple.radius);

        if (ringDist < RIPPLE_RING_WIDTH && dist > 1) {
          const t = (1 - ringDist / RIPPLE_RING_WIDTH) * ripple.alpha;
          const warp = t * MAX_WARP * RIPPLE_WARP_STRENGTH;
          dx += (rdx / dist) * warp;
          dy += (rdy / dist) * warp;
        }
      }

      return [baseX + dx, baseY + dy];
    };

    // ─── Cursor Proximity Helper ─────────────────────────────────────
    // Returns 0..1 proximity factor from a point to the cursor.
    const getProximity = (x: number, y: number): number => {
      if (!pointer.active || pointer.x < POINTER_OFF_SCREEN + 100) return 0;
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      return dist >= INFLUENCE_RADIUS ? 0 : 1 - dist / INFLUENCE_RADIUS;
    };

    // ─── Draw: Static Grid (reduced-motion fallback) ─────────────────
    const drawStaticGrid = () => {
      ctx.clearRect(0, 0, width, height);

      const originX = -CELL_SIZE;
      const originY = -CELL_SIZE;

      // Draw straight grid lines at resting alpha
      ctx.strokeStyle = `rgba(${COLORS.grid.r}, ${COLORS.grid.g}, ${COLORS.grid.b}, ${LINE_ALPHA_REST})`;
      ctx.lineWidth = LINE_WIDTH_REST;

      // Horizontal lines
      for (let row = 0; row <= gridRows; row++) {
        const y = originY + row * CELL_SIZE;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical lines
      for (let col = 0; col <= gridCols; col++) {
        const x = originX + col * CELL_SIZE;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Intersection nodes at resting state
      ctx.fillStyle = `rgba(${COLORS.grid.r}, ${COLORS.grid.g}, ${COLORS.grid.b}, ${NODE_ALPHA_REST})`;
      for (let row = 0; row <= gridRows; row++) {
        for (let col = 0; col <= gridCols; col++) {
          const x = originX + col * CELL_SIZE;
          const y = originY + row * CELL_SIZE;
          ctx.beginPath();
          ctx.arc(x, y, NODE_RADIUS_REST, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // ─── Draw: Animated Grid with Warp ───────────────────────────────
    const drawGrid = () => {
      const originX = -CELL_SIZE;
      const originY = -CELL_SIZE;

      // Pre-compute all warped positions into a 2D lookup
      const positions: [number, number][][] = [];
      for (let row = 0; row <= gridRows; row++) {
        positions[row] = [];
        for (let col = 0; col <= gridCols; col++) {
          positions[row][col] = getWarpedPos(
            originX + col * CELL_SIZE,
            originY + row * CELL_SIZE
          );
        }
      }

      // ── Horizontal line segments ──
      for (let row = 0; row <= gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          const [x1, y1] = positions[row][col];
          const [x2, y2] = positions[row][col + 1];

          // Proximity at segment midpoint
          const mx = (x1 + x2) * 0.5;
          const my = (y1 + y2) * 0.5;
          const prox = getProximity(mx, my);
          const alpha = LINE_ALPHA_REST + prox * (LINE_ALPHA_ACTIVE - LINE_ALPHA_REST);

          ctx.strokeStyle = `rgba(${COLORS.grid.r}, ${COLORS.grid.g}, ${COLORS.grid.b}, ${alpha})`;
          ctx.lineWidth = LINE_WIDTH_REST + prox * LINE_WIDTH_BOOST;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      // ── Vertical line segments ──
      for (let col = 0; col <= gridCols; col++) {
        for (let row = 0; row < gridRows; row++) {
          const [x1, y1] = positions[row][col];
          const [x2, y2] = positions[row + 1][col];

          const mx = (x1 + x2) * 0.5;
          const my = (y1 + y2) * 0.5;
          const prox = getProximity(mx, my);
          const alpha = LINE_ALPHA_REST + prox * (LINE_ALPHA_ACTIVE - LINE_ALPHA_REST);

          ctx.strokeStyle = `rgba(${COLORS.grid.r}, ${COLORS.grid.g}, ${COLORS.grid.b}, ${alpha})`;
          ctx.lineWidth = LINE_WIDTH_REST + prox * LINE_WIDTH_BOOST;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      // ── Intersection nodes ──
      for (let row = 0; row <= gridRows; row++) {
        for (let col = 0; col <= gridCols; col++) {
          const [wx, wy] = positions[row][col];
          const prox = getProximity(wx, wy);

          const nodeAlpha = NODE_ALPHA_REST + prox * (NODE_ALPHA_ACTIVE - NODE_ALPHA_REST);
          const nodeRadius = NODE_RADIUS_REST + prox * (NODE_RADIUS_ACTIVE - NODE_RADIUS_REST);

          // Outer glow halo for cursor-proximate nodes
          if (prox > 0.1) {
            const glowRadius = nodeRadius * NODE_GLOW_RADIUS_FACTOR;
            const glowAlpha = prox * NODE_GLOW_ALPHA_MAX;
            ctx.fillStyle = `rgba(${COLORS.activeNode.r}, ${COLORS.activeNode.g}, ${COLORS.activeNode.b}, ${glowAlpha})`;
            ctx.beginPath();
            ctx.arc(wx, wy, glowRadius, 0, Math.PI * 2);
            ctx.fill();
          }

          // Node dot — shifts to activeNode color when close to cursor
          const c = prox > NODE_COLOR_SHIFT_THRESHOLD ? COLORS.activeNode : COLORS.grid;
          ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${nodeAlpha})`;
          ctx.beginPath();
          ctx.arc(wx, wy, nodeRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // ─── Update & Draw Ripples ───────────────────────────────────────
    const updateAndDrawRipples = () => {
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += RIPPLE_SPEED;
        r.alpha = Math.max(0, 1 - r.radius / r.maxRadius);

        if (r.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        // Outer ripple ring
        ctx.strokeStyle = `rgba(${COLORS.ripple.r}, ${COLORS.ripple.g}, ${COLORS.ripple.b}, ${r.alpha * 0.25})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Inner softer companion ring for depth
        if (r.radius > 12) {
          ctx.strokeStyle = `rgba(${COLORS.activeNode.r}, ${COLORS.activeNode.g}, ${COLORS.activeNode.b}, ${r.alpha * 0.10})`;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.75, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    // ─── Pointer Position Update ─────────────────────────────────────
    const updatePointerFromClient = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const relX = clientX - rect.left;
      const relY = clientY - rect.top;

      if (
        relX >= -POINTER_BOUNDS_MARGIN &&
        relX <= width + POINTER_BOUNDS_MARGIN &&
        relY >= -POINTER_BOUNDS_MARGIN &&
        relY <= height + POINTER_BOUNDS_MARGIN
      ) {
        pointer.targetX = relX;
        pointer.targetY = relY;
        pointer.active = true;
      } else {
        pointer.active = false;
      }
    };

    // ─── Event Handlers ──────────────────────────────────────────────
    const onPointerMove = (e: PointerEvent) => {
      updatePointerFromClient(e.clientX, e.clientY);
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.targetX = POINTER_OFF_SCREEN;
      pointer.targetY = POINTER_OFF_SCREEN;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointerFromClient(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onTouchEnd = () => {
      pointer.active = false;
      pointer.targetX = POINTER_OFF_SCREEN;
      pointer.targetY = POINTER_OFF_SCREEN;
    };

    const onClick = (e: MouseEvent) => {
      if (prefersReducedMotion) return;

      const rect = container.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        maxRadius: RIPPLE_MAX_RADIUS,
        alpha: 1,
      });
    };

    // ─── Attach Event Listeners ──────────────────────────────────────
    // Attach to parent (the hero <section>) so pointer tracking works
    // across the full hero area, not just the canvas container.
    const parent = container.parentElement || container;
    parent.addEventListener('pointermove', onPointerMove, { passive: true });
    parent.addEventListener('pointerleave', onPointerLeave, { passive: true });
    parent.addEventListener('pointercancel', onPointerLeave, { passive: true });
    parent.addEventListener('touchmove', onTouchMove, { passive: true });
    parent.addEventListener('touchend', onTouchEnd, { passive: true });
    parent.addEventListener('click', onClick, { passive: true });

    // Resize observer for responsive canvas
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);

    // Initial size calculation
    resizeCanvas();

    // ─── Animation Loop ──────────────────────────────────────────────
    // Only run continuous animation when motion is not reduced.
    // Reduced-motion users get a static grid drawn once (and on resize).
    if (!prefersReducedMotion) {
      const animate = () => {
        ctx.clearRect(0, 0, width, height);

        // Smooth pointer interpolation
        if (pointer.active) {
          pointer.x += (pointer.targetX - pointer.x) * POINTER_LERP_ACTIVE;
          pointer.y += (pointer.targetY - pointer.y) * POINTER_LERP_ACTIVE;
        } else {
          // Smoothly decay pointer off-screen when cursor leaves
          pointer.x += (POINTER_OFF_SCREEN - pointer.x) * POINTER_LERP_DECAY;
          pointer.y += (POINTER_OFF_SCREEN - pointer.y) * POINTER_LERP_DECAY;
        }

        drawGrid();
        updateAndDrawRipples();

        animationFrameId = requestAnimationFrame(animate);
      };

      animate();
    }

    // ─── Cleanup ─────────────────────────────────────────────────────
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      resizeObserver.disconnect();
      parent.removeEventListener('pointermove', onPointerMove);
      parent.removeEventListener('pointerleave', onPointerLeave);
      parent.removeEventListener('pointercancel', onPointerLeave);
      parent.removeEventListener('touchmove', onTouchMove);
      parent.removeEventListener('touchend', onTouchEnd);
      parent.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />
    </div>
  );
}
