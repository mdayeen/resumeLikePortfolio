"use client";

import { useEffect, useRef, type PointerEvent } from "react";

type Form = "orbit" | "knot" | "sphere";
type Point = [number, number, number];
const colors = {
  lime: [212, 255, 95],
  lilac: [195, 173, 255],
  ember: [255, 132, 91],
} as const;

function geometry(form: Form): Point[][] {
  const rings: Point[][] = [];
  if (form === "sphere") {
    for (let row = 1; row < 23; row++) {
      const phi = (row / 23) * Math.PI;
      rings.push(
        Array.from({ length: 81 }, (_, col) => {
          const t = (col / 80) * Math.PI * 2;
          return [
            1.5 * Math.sin(phi) * Math.cos(t),
            1.5 * Math.cos(phi),
            1.5 * Math.sin(phi) * Math.sin(t),
          ];
        }),
      );
    }
    for (let col = 0; col < 18; col++) {
      const t = (col / 18) * Math.PI * 2;
      rings.push(
        Array.from({ length: 65 }, (_, row) => {
          const phi = (row / 64) * Math.PI;
          return [
            1.5 * Math.sin(phi) * Math.cos(t),
            1.5 * Math.cos(phi),
            1.5 * Math.sin(phi) * Math.sin(t),
          ];
        }),
      );
    }
  } else if (form === "orbit") {
    for (let ring = 0; ring < 36; ring++) {
      const v = (ring / 36) * Math.PI * 2;
      rings.push(
        Array.from({ length: 101 }, (_, i) => {
          const u = (i / 100) * Math.PI * 2;
          return [
            (1.05 + 0.47 * Math.cos(v)) * Math.cos(u),
            (1.05 + 0.47 * Math.cos(v)) * Math.sin(u),
            0.47 * Math.sin(v),
          ];
        }),
      );
    }
  } else {
    const center = (t: number): Point => [
      (0.98 + 0.4 * Math.cos(3 * t)) * Math.cos(2 * t),
      (0.98 + 0.4 * Math.cos(3 * t)) * Math.sin(2 * t),
      0.55 * Math.sin(3 * t),
    ];
    for (let ring = 0; ring < 20; ring++) {
      const v = (ring / 20) * Math.PI * 2;
      rings.push(
        Array.from({ length: 201 }, (_, i) => {
          const t = (i / 200) * Math.PI * 2;
          const p = center(t);
          return [
            p[0] + 0.16 * Math.cos(v) * Math.cos(2 * t),
            p[1] + 0.16 * Math.cos(v) * Math.sin(2 * t),
            p[2] + 0.16 * Math.sin(v),
          ];
        }),
      );
    }
  }
  return rings;
}

export function KineticObject({
  form,
  tone,
  paused,
}: {
  form: Form;
  tone: keyof typeof colors;
  paused: boolean;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const rotation = useRef({ x: -0.52, y: 0.4 });
  const drag = useRef<{ x: number; y: number } | null>(null);
  const redraw = useRef<() => void>(() => {});

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    const rings = geometry(form);
    const rgb = colors[tone];
    let frame = 0,
      width = 0,
      height = 0,
      last = 0;
    let visible = false;
    const draw = (time: number) => {
      const delta = last ? Math.max(0, Math.min(time - last, 40)) : 0;
      last = time;
      if (!paused && !drag.current) rotation.current.y += delta * 0.00018;
      ctx.clearRect(0, 0, width, height);
      const sx = Math.sin(rotation.current.x),
        cx = Math.cos(rotation.current.x);
      const sy = Math.sin(rotation.current.y),
        cy = Math.cos(rotation.current.y);
      const scale = Math.min(width * 0.23, height * 0.29);
      const project = ([x, y, z]: Point) => {
        const xx = x * cy + z * sy,
          zz = -x * sy + z * cy;
        const yy = y * cx - zz * sx,
          depth = y * sx + zz * cx;
        const perspective = 4.5 / (4.5 + depth);
        return {
          x: width / 2 + xx * scale * perspective,
          y: height / 2 + yy * scale * perspective,
          z: depth,
        };
      };
      for (const ring of rings) {
        for (let i = 1; i < ring.length; i++) {
          const a = project(ring[i - 1]),
            b = project(ring[i]);
          const alpha =
            0.16 +
            0.72 * Math.max(0, Math.min(1, (1.7 - (a.z + b.z) / 2) / 3.4));
          ctx.strokeStyle = `rgba(${rgb.join(",")},${alpha})`;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    };
    const loop = (time: number) => {
      draw(time);
      if (!paused && visible && !document.hidden)
        frame = requestAnimationFrame(loop);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      last = 0;
      draw(0);
      if (!paused && visible && !document.hidden)
        frame = requestAnimationFrame(loop);
    };
    redraw.current = () => draw(0);
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = width * dpr;
      el.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      restart();
    });
    resize.observe(el);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      restart();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", restart);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", restart);
      redraw.current = () => {};
    };
  }, [form, tone, paused]);

  const move = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drag.current) return;
    rotation.current.y += (event.clientX - drag.current.x) * 0.008;
    rotation.current.x += (event.clientY - drag.current.y) * 0.008;
    drag.current = { x: event.clientX, y: event.clientY };
    redraw.current();
  };

  return (
    <canvas
      ref={canvas}
      role="img"
      tabIndex={0}
      aria-label={`Three-dimensional ${form} in ${tone}. Drag or use arrow keys to rotate. Shape and color controls follow.`}
      onKeyDown={(event) => {
        if (
          !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(
            event.key,
          )
        )
          return;
        event.preventDefault();
        if (event.key === "ArrowLeft") rotation.current.y -= 0.15;
        if (event.key === "ArrowRight") rotation.current.y += 0.15;
        if (event.key === "ArrowUp") rotation.current.x -= 0.15;
        if (event.key === "ArrowDown") rotation.current.x += 0.15;
        redraw.current();
      }}
      onPointerDown={(event) => {
        drag.current = { x: event.clientX, y: event.clientY };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={move}
      onPointerUp={() => {
        drag.current = null;
      }}
      onPointerCancel={() => {
        drag.current = null;
      }}
      onLostPointerCapture={() => {
        drag.current = null;
      }}
      style={{
        width: "100%",
        height: "100%",
        cursor: "grab",
        touchAction: "pan-y",
      }}
    />
  );
}
