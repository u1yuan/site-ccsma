"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

import { usePrefersReducedMotion } from "@/src/lib/motion/usePrefersReducedMotion";

interface Sprite {
  x: number;
  y: number;
  radius: number;
  speed: number;
  phase: number;
  drift: number;
}

function subscribeToViewport(callback: () => void) {
  window.addEventListener("resize", callback, { passive: true });
  return () => window.removeEventListener("resize", callback);
}

function getPerformanceGuard() {
  return window.innerWidth < 768 && window.devicePixelRatio > 1.5;
}

function getServerPerformanceGuard() {
  return false;
}

export function WoodspriteHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const guardDisabled = useSyncExternalStore(
    subscribeToViewport,
    getPerformanceGuard,
    getServerPerformanceGuard,
  );

  useEffect(() => {
    const highDensitySmallScreen =
      window.innerWidth < 768 && window.devicePixelRatio > 1.5;

    if (reduceMotion || highDensitySmallScreen) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    let animationFrame = 0;
    let visible = !document.hidden;
    let width = 0;
    let height = 0;
    let sprites: Sprite[] = [];
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const count = width < 900 ? 16 : 28;
      sprites = Array.from({ length: count }, (_, index) => ({
        x: ((index * 47) % 100) * (width / 100),
        y: ((index * 71) % 100) * (height / 100),
        radius: 1.2 + (index % 4) * 0.5,
        speed: 0.08 + (index % 5) * 0.025,
        phase: index * 0.72,
        drift: 8 + (index % 6) * 3,
      }));
    };

    const draw = (time: number) => {
      if (!visible) return;

      const styles = getComputedStyle(document.documentElement);
      const glow = styles.getPropertyValue("--sprite-100").trim();
      const cyan = styles.getPropertyValue("--bio-400").trim();

      context.clearRect(0, 0, width, height);
      sprites.forEach((sprite, index) => {
        const phase = time * 0.00035 + sprite.phase;
        sprite.y -= sprite.speed;
        if (sprite.y < -16) sprite.y = height + 16;
        const x = sprite.x + Math.sin(phase) * sprite.drift;
        const opacity = 0.3 + ((Math.sin(phase * 1.8) + 1) / 2) * 0.55;

        context.beginPath();
        context.fillStyle = index % 3 ? glow : cyan;
        context.globalAlpha = opacity;
        context.shadowColor = glow;
        context.shadowBlur = 14;
        context.arc(x, sprite.y, sprite.radius, 0, Math.PI * 2);
        context.fill();

        context.beginPath();
        context.globalAlpha = opacity * 0.4;
        context.moveTo(x, sprite.y + 3);
        context.bezierCurveTo(
          x - 8,
          sprite.y + 10,
          x + 10,
          sprite.y + 13,
          x + Math.sin(phase) * 7,
          sprite.y + 19,
        );
        context.strokeStyle = glow;
        context.lineWidth = 0.7;
        context.stroke();
      });
      context.globalAlpha = 1;
      context.shadowBlur = 0;
      animationFrame = requestAnimationFrame(draw);
    };

    const onVisibilityChange = () => {
      visible = !document.hidden;
      if (visible) animationFrame = requestAnimationFrame(draw);
      else cancelAnimationFrame(animationFrame);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", onVisibilityChange);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [reduceMotion, guardDisabled]);

  const disabled = reduceMotion || guardDisabled;

  return (
    <div
      className="woodsprite-scene"
      data-canvas-state={disabled ? "static" : "animated"}
      role="img"
      aria-label="A stylized bioluminescent canopy crossed by a precise campus grid"
    >
      <div className="woodsprite-scene__static" aria-hidden="true">
        <span className="canopy-orbit canopy-orbit--one" />
        <span className="canopy-orbit canopy-orbit--two" />
        <span className="canopy-orbit canopy-orbit--three" />
      </div>
      {!disabled ? (
        <canvas
          ref={canvasRef}
          className="woodsprite-canvas"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
