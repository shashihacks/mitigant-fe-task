import { fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react'


const baseUrl = `https://api.coinlore.net/api`


export const cryptoAPi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCrypto: builder.query({
            query: (start) => `/tickers/?start=${start}&limit=10`
        })
    })
})

export const {
    useGetCryptoQuery,
} = cryptoAPi