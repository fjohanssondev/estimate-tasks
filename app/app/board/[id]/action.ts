'use server'

import { createClient } from "@/lib/supabase/server"
import { faker } from "@faker-js/faker"

export async function createAnonymousUserIfNoSession(){
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user){
    const { data } = await supabase.auth.signInAnonymously()
    const profile = await supabase.from('profiles').select("id, username").eq('id', data.user?.id).single()

    if (!profile.data){
      const generate_random_username = faker.internet.username()

      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user?.id,
        username: generate_random_username
      })

      const { error: cursorError } = await supabase.from('cursor').insert({
        user_id: data.user?.id,
        offset_y: 0,
        offset_x: 0,
        color: "purple"
      })

      if (profileError || cursorError){
        console.error(profileError, cursorError)
      }
    }
  }
}