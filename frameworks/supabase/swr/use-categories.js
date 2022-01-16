

import useSWR from 'swr'
import { supabase } from '..'


const ENDPOINT = 'categories'



const fetcher = async (ENDPOINT) => {
    let res = await supabase.from(ENDPOINT).select('*')

    return res.data
   
}

export function useCategories() {
    const { data, error, mutate } = useSWR(ENDPOINT, fetcher)
    return {
        mutate,
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
