import { useEffect, useRef } from "react";

export default function MagicCursor() {
  const canvasRef = useRef(null);
  const notes = useRef([]);
  const isDrawing = useRef(false);
  const lastSpawn = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Music note symbols & colors
    const symbols = ["♪", "♫", "♩", "♬", "𝄞"];
    const colors = ["#6aa7ff", "#b88cff", "#89e0ff", "#d2b8ff"];

    // Drawing loop
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      notes.current.forEach((n) => {
        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(n.rotation);
        ctx.font = `${n.size}px 'Noto Music', serif`;
        ctx.fillStyle = n.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = n.color;
        ctx.globalAlpha = n.alpha;
        ctx.fillText(n.symbol, 0, 0);
        ctx.restore();

        // Fade faster
        n.alpha -= 0.02;
        n.rotation += n.spin;
      });

      notes.current = notes.current.filter((n) => n.alpha > 0);
      requestAnimationFrame(draw);
    };

    // Spawn notes only while mouse held down
    const handleMove = (e) => {
      if (!isDrawing.current) return;
      const now = Date.now();
      if (now - lastSpawn.current < 60) return; // controls note density
      lastSpawn.current = now;

      notes.current.push({
        x: e.clientX,
        y: e.clientY,
        size: 18 + Math.random() * 8,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
        alpha: 1,
      });
    };

    const handleDown = () => (isDrawing.current = true);
    const handleUp = () => (isDrawing.current = false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    draw();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}
