'use client';

import React, { useEffect, useRef } from 'react';

/**
 * Configuration for the Interactive Neural Network Animation.
 * Easily tweak colors, particle density, velocities, and interaction forces here.
 */
export interface NeuralNetworkConfig {
  /** Background fill color for the canvas, or 'transparent' */
  background: string;
  /** Primary particle color (Hex or rgba) */
  particleColor: string;
  /** Primary connection line color (Hex or rgba) */
  connectionColor: string;
  /** Cursor radial glow color */
  glowColor: string;
  /** Accent color for occasional brighter/special neural nodes */
  accentColor: string;
  /** Base particle size (radius in px) */
  particleSize: number;
  /** Particle speed factor */
  particleSpeed: number;
  /** Base particle opacity (0 to 1) */
  particleOpacity: number;
  /** Maximum distance (px) to draw a connection between particles */
  connectionDistance: number;
  /** Maximum opacity of connection lines */
  connectionOpacity: number;
  /** Width of connection lines */
  lineWidth: number;
  /** Cursor interaction radius (px) */
  mouseRadius: number;
  /** Strength of cursor push / attraction force (0.01 to 0.1) */
  mouseStrength: number;
  /** Intensity of the radial cursor glow (0 to 1) */
  glowStrength: number;
  /** Viewport pixels per particle (lower = more particles) */
  particleDensity: number;
  /** Maximum number of particles on desktop */
  maxParticlesDesktop: number;
  /** Maximum number of particles on mobile (<768px) */
  maxParticlesMobile: number;
  /** Minimum number of particles */
  minParticles: number;
  /** Parallax shift factor based on cursor position */
  parallaxStrength: number;
}

export const DEFAULT_NEURAL_CONFIG: NeuralNetworkConfig = {
  background: 'transparent',
  particleColor: '#3b82f6',     // Primary OSAAC blue
  connectionColor: '#1d4ed8',   // Authoritative dark-blue network lines
  glowColor: '#3b82f6',         // Subtle blue cursor glow
  accentColor: '#60a5fa',       // Light blue accent nodes (with #bfdbfe highlights)
  particleSize: 1.8,
  particleSpeed: 0.32,
  particleOpacity: 0.75,
  connectionDistance: 135,
  connectionOpacity: 0.24,      // Visible 0.18 - 0.28 normal line opacity
  lineWidth: 1.0,               // Clear 0.8 - 1.2px line thickness
  mouseRadius: 190,
  mouseStrength: 0.035,
  glowStrength: 0.15,
  particleDensity: 11000,
  maxParticlesDesktop: 110,
  maxParticlesMobile: 42,
  minParticles: 25,
  parallaxStrength: 0.04,
};

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  depth: number;       // 0.4 (distant/slow) to 1.0 (near/fast) for 3D parallax
  isAccent: boolean;   // Occasional brighter hub node
  wanderAngle: number; // Angle for organic random steering
  wanderSpeed: number;
}

interface InteractiveNeuralNetworkProps {
  config?: Partial<NeuralNetworkConfig>;
  className?: string;
}

export default function InteractiveNeuralNetwork({
  config: customConfig,
  className = '',
}: InteractiveNeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Merge default config with custom overrides
  const config = useRef<NeuralNetworkConfig>({
    ...DEFAULT_NEURAL_CONFIG,
    ...customConfig,
  });

  useEffect(() => {
    config.current = {
      ...DEFAULT_NEURAL_CONFIG,
      ...customConfig,
    };
  }, [customConfig]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    // Pointer state with smooth damping
    const pointer = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
      radius: config.current.mouseRadius,
    };

    // Parallax offset
    const parallax = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    // Check accessibility: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Helper: Hex / color parsing to RGBA
    const parseColorToRgba = (color: string, alpha: number): string => {
      if (color.startsWith('#')) {
        let hex = color.slice(1);
        if (hex.length === 3) {
          hex = hex.split('').map((char) => char + char).join('');
        }
        const num = parseInt(hex, 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;
        return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha))})`;
      }
      if (color.startsWith('rgb')) {
        return color.replace(/rgba?\(([^)]+)\)/, (_, vals) => {
          const parts = vals.split(',').slice(0, 3).map((v: string) => v.trim());
          return `rgba(${parts.join(', ')}, ${Math.max(0, Math.min(1, alpha))})`;
        });
      }
      return color;
    };

    /**
     * Compute and create particle field based on current viewport size
     */
    const createParticles = () => {
      const cfg = config.current;
      const isMobile = width < 768;
      const area = width * height;
      const calculatedCount = Math.floor(area / cfg.particleDensity);
      const maxCount = isMobile ? cfg.maxParticlesMobile : cfg.maxParticlesDesktop;
      const count = Math.max(cfg.minParticles, Math.min(maxCount, calculatedCount));

      particles = [];

      for (let i = 0; i < count; i++) {
        // Multi-depth layering: 3 distinct planes for organic 3D parallax
        const depth = 0.35 + Math.random() * 0.65;
        const speed = prefersReducedMotion ? 0 : (cfg.particleSpeed * (0.6 + depth * 0.8));
        const angle = Math.random() * Math.PI * 2;
        const isAccent = Math.random() < 0.12; // ~12% are special accent nodes

        const x = Math.random() * width;
        const y = Math.random() * height;

        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: (isAccent ? cfg.particleSize * 1.4 : cfg.particleSize * (0.6 + depth * 0.5)),
          baseAlpha: isAccent ? cfg.particleOpacity * 1.3 : cfg.particleOpacity * (0.4 + depth * 0.6),
          depth,
          isAccent,
          wanderAngle: Math.random() * Math.PI * 2,
          wanderSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
    };

    /**
     * Handle DPR-aware canvas resizing
     */
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

      createParticles();
    };

    /**
     * Pointer coordinate updates
     */
    const updatePointerPosition = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const relativeY = clientY - rect.top;

      if (
        relativeX >= -50 &&
        relativeX <= width + 50 &&
        relativeY >= -50 &&
        relativeY <= height + 50
      ) {
        pointer.targetX = relativeX;
        pointer.targetY = relativeY;
        pointer.active = true;

        // Subtle parallax target offset (-1 to 1 normalized)
        const normX = (relativeX / width - 0.5) * 2;
        const normY = (relativeY / height - 0.5) * 2;
        parallax.targetX = normX * (width * config.current.parallaxStrength);
        parallax.targetY = normY * (height * config.current.parallaxStrength);
      } else {
        pointer.active = false;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      updatePointerPosition(e.clientX, e.clientY);
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.targetX = -1000;
      pointer.targetY = -1000;
      parallax.targetX = 0;
      parallax.targetY = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updatePointerPosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      pointer.active = false;
      pointer.targetX = -1000;
      pointer.targetY = -1000;
      parallax.targetX = 0;
      parallax.targetY = 0;
    };

    // Attach pointer events to the hero container window/element
    const parent = container.parentElement || container;
    parent.addEventListener('pointermove', handlePointerMove, { passive: true });
    parent.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    parent.addEventListener('pointerup', handlePointerLeave, { passive: true });
    parent.addEventListener('pointercancel', handlePointerLeave, { passive: true });
    parent.addEventListener('touchmove', handleTouchMove, { passive: true });
    parent.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);

    resizeCanvas();

    /**
     * Draw subtle radial cursor glow field
     */
    const drawPointerGlow = () => {
      if (!pointer.active || pointer.x < -100) return;
      const cfg = config.current;
      const gradient = ctx.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        pointer.radius
      );

      gradient.addColorStop(0, parseColorToRgba(cfg.glowColor, cfg.glowStrength));
      gradient.addColorStop(0.5, parseColorToRgba(cfg.glowColor, cfg.glowStrength * 0.35));
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, pointer.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    /**
     * Draw inter-particle neural connections
     */
    const drawConnections = () => {
      const cfg = config.current;
      const isMobile = width < 768;
      const maxDist = isMobile ? cfg.connectionDistance * 0.85 : cfg.connectionDistance;
      const maxDistSq = maxDist * maxDist;
      const len = particles.length;
      const baseLineWidth = isMobile ? 0.85 : cfg.lineWidth;

      for (let i = 0; i < len; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            // Depth-based line visibility formula: baseOpacity * (0.65 + depthFactor * 0.35)
            const depthFactor = (p1.depth + p2.depth) * 0.5;
            let alpha = (1 - dist / maxDist) * cfg.connectionOpacity;
            alpha = alpha * (0.65 + depthFactor * 0.35);

            let strokeColor = '#1d4ed8'; // Primary dark-blue line
            let currentLineWidth = baseLineWidth;

            // Check if connection is within pointer sphere of influence
            if (pointer.active && pointer.x > -100) {
              const midX = (p1.x + p2.x) * 0.5;
              const midY = (p1.y + p2.y) * 0.5;
              const pDx = pointer.x - midX;
              const pDy = pointer.y - midY;
              const pDistSq = pDx * pDx + pDy * pDy;

              if (pDistSq < pointer.radius * pointer.radius) {
                const proximity = 1 - Math.sqrt(pDistSq) / pointer.radius;
                alpha += proximity * 0.18; // Elevates into 0.30 - 0.45 active range
                strokeColor = '#2563eb'; // Brighter active blue
                currentLineWidth = baseLineWidth * (1 + proximity * 0.35); // 1.1 - 1.4px active thickness
              }
            }

            // Accent node connections (data-flow / hub connections)
            if (p1.isAccent || p2.isAccent) {
              alpha = Math.min(0.55, alpha * 1.25); // 0.40 - 0.55 highlight range
              strokeColor = '#3b82f6';
            }

            ctx.lineWidth = currentLineWidth;
            ctx.strokeStyle = parseColorToRgba(strokeColor, alpha);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    /**
     * Draw particle nodes
     */
    const drawParticles = () => {
      const cfg = config.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let currentAlpha = p.baseAlpha;

        // Pointer proximity boost
        if (pointer.active && pointer.x > -100) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const distSq = dx * dx + dy * dy;
          const mouseRadiusSq = pointer.radius * pointer.radius;

          if (distSq < mouseRadiusSq) {
            const proximity = 1 - Math.sqrt(distSq) / pointer.radius;
            currentAlpha += proximity * 0.3;
          }
        }

        // Primary node: #3b82f6, light node: #60a5fa, bright accent: #bfdbfe
        const nodeColor = p.isAccent ? '#bfdbfe' : (p.depth > 0.7 ? '#60a5fa' : '#3b82f6');

        ctx.fillStyle = parseColorToRgba(nodeColor, Math.min(1, currentAlpha));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle soft halo for accent nodes
        if (p.isAccent && currentAlpha > 0.3) {
          ctx.fillStyle = parseColorToRgba('#60a5fa', currentAlpha * 0.25);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    /**
     * Physics and organic drift update step
     */
    const updateParticles = () => {
      const cfg = config.current;

      // Smooth pointer interpolation
      if (pointer.active) {
        pointer.x += (pointer.targetX - pointer.x) * 0.12;
        pointer.y += (pointer.targetY - pointer.y) * 0.12;
      } else {
        pointer.x += (-1000 - pointer.x) * 0.08;
        pointer.y += (-1000 - pointer.y) * 0.08;
      }

      // Smooth parallax interpolation
      parallax.x += (parallax.targetX - parallax.x) * 0.05;
      parallax.y += (parallax.targetY - parallax.y) * 0.05;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Organic wandering: continuous smooth direction shift
          p.wanderAngle += p.wanderSpeed;
          p.vx += Math.cos(p.wanderAngle) * 0.008;
          p.vy += Math.sin(p.wanderAngle) * 0.008;

          // Velocity clamping
          const maxSpeed = cfg.particleSpeed * (0.8 + p.depth * 0.5);
          const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (currentSpeed > maxSpeed) {
            p.vx = (p.vx / currentSpeed) * maxSpeed;
            p.vy = (p.vy / currentSpeed) * maxSpeed;
          }

          p.x += p.vx;
          p.y += p.vy;

          // Parallax depth shift
          p.x += (parallax.x * (p.depth * 0.02));
          p.y += (parallax.y * (p.depth * 0.02));
        }

        // Pointer fluid interaction
        if (pointer.active && pointer.x > -100) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < pointer.radius && dist > 1) {
            const force = (1 - dist / pointer.radius) * cfg.mouseStrength * (0.8 + p.depth * 0.4);
            // Gentle viscous push away with elastic dampening
            p.x -= (dx / dist) * force * 15;
            p.y -= (dy / dist) * force * 15;
          }
        }

        // Screen boundary soft wrap
        const padding = 20;
        if (p.x < -padding) p.x = width + padding;
        if (p.x > width + padding) p.x = -padding;
        if (p.y < -padding) p.y = height + padding;
        if (p.y > height + padding) p.y = -padding;
      }
    };

    /**
     * Main 60 FPS animation loop
     */
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (config.current.background !== 'transparent') {
        ctx.fillStyle = config.current.background;
        ctx.fillRect(0, 0, width, height);
      }

      updateParticles();
      drawPointerGlow();
      drawConnections();
      drawParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      parent.removeEventListener('pointermove', handlePointerMove);
      parent.removeEventListener('pointerleave', handlePointerLeave);
      parent.removeEventListener('pointerup', handlePointerLeave);
      parent.removeEventListener('pointercancel', handlePointerLeave);
      parent.removeEventListener('touchmove', handleTouchMove);
      parent.removeEventListener('touchend', handleTouchEnd);
    };
  }, [customConfig]);

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
