'use server'

import { createClient } from "@/lib/supabase/server"

const supabase = await createClient()
const { data } = await supabase.auth.getUser()

export async function CreateNewBoard(name: string){
  const { data: boards, error } = await supabase.from('boards').insert({
    title: name,
    owner_id: data.user?.id,
    slug: name.toLowerCase().replace(/ /g, "-")
  })

  const { data: board_member, error: board_member_error } = await supabase.from('board_members').insert({
    board_id: boards,
    user_id: data.user?.id,
  })

  if (error){
    console.error(error)
  }
}