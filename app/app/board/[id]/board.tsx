"use client";

import Canvas from "@/components/canvas";

export function Board({ username, id }: { username: string, id: string}) {

  return (
  <>
    <Canvas username={username} id={id} />
  </>
  )
}
