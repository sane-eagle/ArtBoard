"use client";

import { useEffect, useRef } from "react";
import { getSocket } from "@/lib/socket";
import { useConfigStore } from "@/store/config";
import { useHistoryStore } from "@/store/history";

const Board = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const socket = getSocket();

  const { color, size, tool } = useConfigStore();
  const { addToHistory } = useHistoryStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
  }, [color, size]);

  useEffect(() => {
    const handleChangeConfig = (config: { color: string; size: number }) => {
      // multiplayer disabled → no-op
    };

    socket?.on("changeConfig", handleChangeConfig);

    return () => {
      socket?.off("changeConfig", handleChangeConfig);
    };
  }, [socket]);

  const handleMouseDown = () => {
    // local-only drawing
  };

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      className="bg-white"
    />
  );
};

export default Board;