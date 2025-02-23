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