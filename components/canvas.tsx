'use client'

import React, { useEffect, useRef } from 'react';
import { FabricObject, Canvas as FabricCanvas, Rect, FabricText, Group } from 'fabric';
import { createClient } from '@/lib/supabase/client';

interface Cursor {
  x: number;
  y: number;
  userId: string;
}

const Canvas = ({ username, id }: { username: string, id: string}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<FabricCanvas | null>(null);
  const cursorsRef = useRef<Map<string, FabricObject>>(new Map());
  const supabase = createClient();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: '#ffffff',
      renderOnAddRemove: false,
    });

    fabricRef.current = canvas;

    const channel = supabase.channel('canvas-cursors');

    const updateCursor = (cursor: Cursor) => {
      if (!fabricRef.current) return;

      const existingCursor = cursorsRef.current.get(id);
      if (existingCursor) {
        existingCursor.set({
          left: cursor.x,
          top: cursor.y,
        });
        existingCursor.setCoords();
      } else {
        
        const box = new Rect({
          width: id.length * 3 + 20,
          height: 30,
          fill: "#e65100",
          rx: 10,
          ry: 10,
          opacity: 1,
        });
  
        const text = new FabricText(username!, {
          fontSize: 14,
          fill: "white",
          left: 10,
          top: 5,
        });
  
        const group = new Group([box, text], {
          left: 50,
          top: 50,
          centeredScaling: true,
          selectable: false,
          evented: false,
        });

        cursorsRef.current.set(id, group);
        fabricRef.current.add(group);
      }

        if (fabricRef.current) {
          fabricRef.current.renderAll();
        }
    };

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        
        // Batch cursor updates
          Object.entries(state).forEach(([userId, userStates]) => {
            const userState = userStates[0] as any;
            if (userState.cursor) {
              updateCursor(userState.cursor);
            }
          });
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ 
            cursor: { 
              x: 0, 
              y: 0, 
              userId: id
            } 
          });
        }
      });

    const handleMouseMove = async (e: any) => {


      if (!id || !fabricRef.current) return;

      const pointer = fabricRef.current.getViewportPoint(e.e);
      await channel.track({
        cursor: {
          x: pointer.x,
          y: pointer.y,
          userId: id,
        },
      });
    };

    canvas.on('mouse:move', handleMouseMove);

    const handleResize = () => {
      if (fabricRef.current) {
        fabricRef.current.setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      canvas.dispose();
      window.removeEventListener('resize', handleResize);
      channel.unsubscribe();
    };
  }, [])

  return <canvas ref={canvasRef} />;
};

export default Canvas;