"use client";

import { MENU_ITEMS } from "@/lib/constants";
import { actionItemClick } from "@/lib/redux/menuSlice";
import { ReduxState } from "@/lib/redux/types";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "@/lib/socket";

const Board = () => {
  const dispatch = useDispatch();
  const socket = getSocket(); // ✅ SAFE: returns null in static deploy

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawHistory = useRef<Array<ImageData>>([]);
  const historyPointer = useRef<number>(0);
  const shouldDraw = useRef<boolean>(false);

  const { activeMenuItem, actionMenuItem } = useSelector(
    (state: ReduxState) => state.menu
  );
  const { color, size } = useSelector(
    (state: ReduxState) => state.toolbox[activeMenuItem]
  );

  // -------------------- ACTION MENU (UNDO / REDO / DOWNLOAD) --------------------
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const url = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "sketchlab-image.jpg";
      anchor.click();
    } else if (actionMenuItem === MENU_ITEMS.UNDO) {
      if (historyPointer.current > 0) historyPointer.current -= 1;
      const imageData = drawHistory.current[historyPointer.current];
      context?.putImageData(imageData, 0, 0);
    } else if (actionMenuItem === MENU_ITEMS.REDO) {
      if (historyPointer.current < drawHistory.current.length - 1)
        historyPointer.current += 1;
      const imageData = drawHistory.current[historyPointer.current];
      context?.putImageData(imageData, 0, 0);
    }

    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);

  // -------------------- CONFIG CHANGES (COLOR / SIZE) --------------------
  useEffect(() => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");

    const changeConfig = (c: string, s: number) => {
      if (!context) return;
      context.strokeStyle = c;
      context.lineWidth = s;
    };

    const handleChangeConfig = (config: { color: string; size: number }) => {
      changeConfig(config.color, config.size);
    };

    changeConfig(color, size);

    socket?.on("changeConfig", handleChangeConfig);

    return () => {
      socket?.off("changeConfig", handleChangeConfig);
    };
  }, [color, size, socket]);

  // -------------------- DRAWING LOGIC --------------------
  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x: number, y: number) => {
      if (!context) return;
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawLine = (x: number, y: number) => {
      if (!context) return;
      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseDown = (e: MouseEvent) => {
      shouldDraw.current = true;
      beginPath(e.clientX, e.clientY);
      socket?.emit("beginPath", { x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!shouldDraw.current) return;
      drawLine(e.clientX, e.clientY);
      socket?.emit("drawLine", { x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      shouldDraw.current = false;
      const imageData = context?.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      if (imageData) {
        drawHistory.current.push(imageData);
        historyPointer.current = drawHistory.current.length - 1;
      }
    };

    const handleBeginPath = (data: { x: number; y: number }) => {
      beginPath(data.x, data.y);
    };

    const handleDrawLine = (data: { x: number; y: number }) => {
      drawLine(data.x, data.y);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    socket?.on("beginPath", handleBeginPath);
    socket?.on("drawLine", handleDrawLine);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);

      socket?.off("beginPath", handleBeginPath);
      socket?.off("drawLine", handleDrawLine);
    };
  }, [socket]);

  return <canvas ref={canvasRef}></canvas>;
};

export default Board;