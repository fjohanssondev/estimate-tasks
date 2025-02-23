'use client'

import Canvas from "@/components/canvas";
import { useEffect, useState } from "react";
import { createAnonymousUserIfNoSession } from "./action";

export default function Board() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const checkIfUserExists = async () => {
      await createAnonymousUserIfNoSession()
    }

    checkIfUserExists()
  }, [])

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Canvas />

    </div>
  );
}
