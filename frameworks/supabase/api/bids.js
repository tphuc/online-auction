import { supabase } from "..";





export async function create_bid(data){
    let res = await supabase.rpc('create_bid', {
        item: data.item,
        amount: data.amount,
        user_id: data.user_id
    })
    return res
}


export async function auto_place_bid({ item, user_id}){
    let res = await supabase.rpc('auto_place_bid', {
        user_id,
        item,
    })
    console.log(22, res)
    return res
}


export async function get_bid_history(id, user_id){
    let res = await supabase.from('bids').select('*')
    return res
}