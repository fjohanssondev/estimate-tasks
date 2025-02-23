'use server'

import { createClient } from "@/lib/supabase/server"
import { faker } from "@faker-js/faker"

export async function createAnonymousUserIfNoSession(){
  const supabase = await createClient()
  const { data: anonymous } = await supabase.auth.signInAnonymously()

  const profile = await supabase.from('profiles').select("id, username").eq('id', anonymous.user?.id as string).single()

  if (!profile.data){
    const generate_random_username = faker.internet.username()

    const { error: profileError } = await supabase.from('profiles').insert({
      id: anonymous.user?.id as string,
      username: generate_random_username
    })

    if (profileError){
      console.error(profileError)
    }
  }

  return anonymous
}