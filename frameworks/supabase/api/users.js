import { supabase } from "..";

export async function updateUser(data){
    let user = await supabase.auth.user()
    let res = await supabase.from('users').update(data).match({id: user.id})
    return res
}