

import useSWR from 'swr'
import { supabase } from '..'

const ENDPOINT = 'bids'



const fetcher = async (url, id, user_id) => {
    let res = await supabase.from('bids').select(`
        *,
        users (
            *
        )
    `)
    .filter('item', 'eq', id)
    return res.data
   
}

export function useBids(id, user_id) {
    const { data, error, mutate } = useSWR([ENDPOINT, id, user_id], fetcher)
    return {
        mutate,
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
