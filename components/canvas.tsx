'use client'

import React, { useEffect, useRef } from 'react';
import { Canvas as FabricCanvas } from 'fabric';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from './ui/context-menu';
import { LeftToolbar } from './left-toolbar';

function Canvas() {
  const canvasRef = useRef<FabricCanvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const canvas = new FabricCanvas('canvas', {
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '#f0f0f0',
    });

    canvasRef.current = canvas;

    const handleResize = () => {
      canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      canvas.renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-screen h-screen overflow-hidden relative">
      <LeftToolbar />
      <ContextMenu>
        <ContextMenuTrigger>
          <canvas id="canvas" />
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Profile</ContextMenuItem>
          <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuItem>Team</ContextMenuItem>
          <ContextMenuItem>Subscription</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}

export default Canvas;