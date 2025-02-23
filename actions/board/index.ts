'use server'

import { createClient } from "@/lib/supabase/server"

export async function createNewBoard(name: string){
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  const { data: board, error } = await supabase.from('boards').insert({
    title: name,
    owner_id: data.user?.id,
    slug: name.toLowerCase().replace(/ /g, "-")
  }).select("id")

  if (board){
    const { error } = await supabase.from('board_members').insert({
      board_id: board[0].id,
      user_id: data.user?.id,
    })

    if (error){
      console.error(error)
    }
  }

  if (error){
    console.error(error)
  }

  return board
}

export async function updateCursor(x: number, y: number){
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  
  const { error } = await supabase.from('cursors').upsert({
    user_id: data.user?.id,
    board_id: "df51413f-bf01-49fc-9b3d-eeb933bae390",
    offset_x: x,
    offset_y: y,
    color: "purple"
  })
}