import { createClient } from "@/lib/supabase/server";
import { createAnonymousUserIfNoSession } from "./action";
import { Board } from "./board";

export default async function BoardPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  
  const { data: profile } = await supabase.from('profiles').select("id, username").eq('id', data?.user?.id!).single()

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Board username={profile?.username!} id={data?.user?.id!} />
    </div>
  );
}
