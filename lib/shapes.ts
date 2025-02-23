import { Canvas, Rect } from "fabric";

export const addStickyNote = (canvasRef: React.RefObject<Canvas>) => {
  if (!canvasRef.current) return

  const stickyNote = new Rect({
    left: Math.random() * (window.innerWidth - 100),
    top: Math.random() * (window.innerHeight - 100),
    fill: '#ffeb3b',
    width: 100,
    height: 100,
    rx: 10,
    ry: 10,
    hasBorders: true,
    lockScalingX: true,
    lockScalingY: true,
    cornerSize: 20
  });

  canvasRef.current.add(stickyNote)
  canvasRef.current.setActiveObject(stickyNote)
}

export const addRectangle = (canvasRef: React.RefObject<Canvas>) => {
  if (!canvasRef.current) return

  const rect = new Rect({
    left: Math.random() * (window.innerWidth - 100),
    top: Math.random() * (window.innerHeight - 100),
    fill: '#ffffff',
    width: 100,
    height: 100,
    stroke: '#000000',
    strokeWidth: 1,
  });

  canvasRef.current.add(rect)
  canvasRef.current.setActiveObject(rect)
}