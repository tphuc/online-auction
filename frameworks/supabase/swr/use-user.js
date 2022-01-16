

import useSWR from 'swr'
import { supabase } from '..'


const ENDPOINT = 'users'



const fetcher = async (ENDPOINT, id) => {
    let res = await supabase.from(ENDPOINT).select('*').match({id}).limit(1).single()
    return res.data
   
}

export function useUser(id) {
    const { data, error, mutate } = useSWR([ENDPOINT, id], fetcher)
    return {
        mutate,
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
