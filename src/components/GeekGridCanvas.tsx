import React, { useEffect, useRef } from 'react';

/**
 * GeekGridCanvas:
 * A high-performance, subtle, dark cybernetic canvas background for the Hero.
 * Features:
 * - Dynamic perspective grid lines moving slowly forward
 * - Floating binary/hex data packets & crawler node coordinates (OAI, PERP, 200 OK)
 * - Cursor proximity radar scan wave
 * - Lightweight requestAnimationFrame loop with auto-cleanup & DPI awareness
 */
export const GeekGridCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Crawler signal packets
    interface SignalNode {
      x: number;
      y: number;
      speedX: number;
      speedY: number;
      label: string;
      alpha: number;
      pulse: number;
      size: number;
    }

    const nodeLabels = [
      '200 OK',
      'CANONICAL: MATCH',
      'OAI-SearchBot',
      'PerplexityBot',
      'Claude-Bot: ALLOW',
      'JSON-LD: VALID',
      'HTTP/2',
      'TTFB: 142ms',
      'robots.txt: 200',
      '0x4D616E64', // 'Mand' in hex
      '0x415049',   // 'API' in hex
    ];

    let nodes: SignalNode[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      // Initialize sparse telemetry nodes
      const count = Math.min(Math.floor(width / 75), 18);
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: -Math.random() * 0.3 - 0.1, // gently float upward
          label: nodeLabels[Math.floor(Math.random() * nodeLabels.length)],
          alpha: Math.random() * 0.45 + 0.2,
          pulse: Math.random() * Math.PI,
          size: Math.random() * 2 + 1.5,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse interactive coordinates
    let mouseX = width / 2;
    let mouseY = height / 3;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let gridOffset = 0;
    let time = 0;

    const render = () => {
      time += 0.015;
      gridOffset = (gridOffset + 0.35) % 40; // Continuous gentle drift

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Geek Coordinate Reticles & Digital Crosshairs
      const gridSize = 40;
      ctx.lineWidth = 1;

      // Draw faint vertical and horizontal precision grid
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';

      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = gridOffset; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Interactive Spotlight / Radar field around mouse
      const radarGrad = ctx.createRadialGradient(
        mouseX,
        mouseY,
        10,
        mouseX,
        mouseY,
        320
      );
      radarGrad.addColorStop(0, 'rgba(49, 86, 217, 0.12)');
      radarGrad.addColorStop(0.5, 'rgba(49, 86, 217, 0.03)');
      radarGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = radarGrad;
      ctx.fillRect(0, 0, width, height);

      // Highlight grid intersections near mouse
      const maxDistance = 220;
      const startX = Math.max(0, Math.floor((mouseX - maxDistance) / gridSize) * gridSize);
      const endX = Math.min(width, Math.ceil((mouseX + maxDistance) / gridSize) * gridSize);
      const startY = Math.max(0, Math.floor((mouseY - maxDistance) / gridSize) * gridSize);
      const endY = Math.min(height, Math.ceil((mouseY + maxDistance) / gridSize) * gridSize);

      ctx.fillStyle = 'rgba(96, 165, 250, 0.35)';
      for (let x = startX; x <= endX; x += gridSize) {
        for (let y = startY; y <= endY; y += gridSize) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDistance) {
            const intensity = (1 - dist / maxDistance) * 0.7;
            ctx.fillStyle = `rgba(96, 165, 250, ${intensity})`;
            ctx.fillRect(x - 1, y - 1, 2.5, 2.5);
          }
        }
      }

      // 3. Floating Micro Telemetry Packets
      ctx.font = '10px "JetBrains Mono", monospace';
      nodes.forEach((node) => {
        node.x += node.speedX;
        node.y += node.speedY;
        node.pulse += 0.03;

        // Wrap around screen
        if (node.y < -20) {
          node.y = height + 10;
          node.x = Math.random() * width;
        }
        if (node.x < -20) node.x = width + 10;
        if (node.x > width + 20) node.x = -10;

        const dynamicAlpha = Math.max(0.1, node.alpha * (0.7 + Math.sin(node.pulse) * 0.3));

        // Node center beacon
        ctx.fillStyle = `rgba(49, 86, 217, ${dynamicAlpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        // Node text label
        ctx.fillStyle = `rgba(148, 163, 184, ${dynamicAlpha * 0.8})`;
        ctx.fillText(node.label, node.x + 6, node.y + 3);

        // Micro signal line connecting near nodes
        nodes.forEach((other) => {
          const dX = other.x - node.x;
          const dY = other.y - node.y;
          const distance = Math.sqrt(dX * dX + dY * dY);
          if (distance < 90 && distance > 0) {
            const lineAlpha = (1 - distance / 90) * 0.12 * dynamicAlpha;
            ctx.strokeStyle = `rgba(49, 86, 217, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      // 4. Subtle Hex Matrix watermark in bottom right corner
      ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillText(`GEO-SYS // RADAR_ACTIVE :: ${Math.floor(time * 10) % 9999}`, 24, height - 16);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.85 }}
    />
  );
};
