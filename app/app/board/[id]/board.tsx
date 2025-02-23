"use client";

import { useEffect, useState, useRef, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { RealtimeChannel } from "@supabase/supabase-js"
import useMousePosition from "@/hooks/useMousePosition"
import { useParams } from "next/navigation"
import Canvas from "@/components/canvas";

export type Clients = Record<string, any>


export function Board({ username, id }: { username: string, id: string}) {

  return (
  <>
    <Canvas username={username} id={id} />
  </>
  )
}
