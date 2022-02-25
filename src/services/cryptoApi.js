import { fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react'


const baseUrl = `https://api.coinlore.net/api`


export const cryptoAPi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCrypto: builder.query({
            query: (count) => `/tickers/?start=1&limit=${count}`
        })
    })
})

export const {
    useGetCryptoQuery,
} = cryptoAPi