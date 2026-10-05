'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function OSAACIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Attempt playback immediately when component mounts
    const video = videoRef.current;
    if (video) {
      video.muted = true; // Ensure muted for seamless browser autoplay policy
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser restricts autoplay, trigger complete on click or fallback timer
          const fallbackTimer = setTimeout(() => {
            handleComplete();
          }, 4000);
          return () => clearTimeout(fallbackTimer);
        });
      }
    }

    // Safety timeout in case onEnded doesn't fire (max 10 seconds)
    const safetyTimer = setTimeout(() => {
      handleComplete();
    }, 10000);

    return () => {
      clearTimeout(safetyTimer);
    };
  }, []);

  const handleComplete = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 700);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] w-full h-full flex items-center justify-center bg-[#0a0f1a] overflow-hidden select-none transition-opacity duration-700 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="OSAAC Video Intro"
    >
      <div className="relative w-full h-full flex items-center justify-center px-4 sm:px-6 md:px-0">
        <video
          ref={videoRef}
          src="/intro-logo.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleComplete}
          onError={handleComplete}
          className="w-full h-full max-w-full max-h-full object-contain md:object-cover select-none pointer-events-none"
        />
      </div>
    </div>
  );
}
