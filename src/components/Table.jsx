import millify from 'millify';
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useGetCryptoQuery } from '../services/cryptoApi';


const Table = () => {
    const [count, setCount] = useState(10)
    const {data, isFetching} =  useGetCryptoQuery(count)
    // const [coins, setCoins] = useState([])
    if(isFetching) return 'Loading...'
    const coins = data?.data


    return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Rank</th>
                        <th scope="col">Price (USD)</th>
                        <th scope="col">Market Cap (USD)</th>
                        <th scope='col'>1hr Change</th>
                        <th scope='col'>24 hrs Change</th>
                        <th scope='col'>7 days</th>
                    </tr>
                </thead>
                <tbody>
                {coins.map(( coin, index ) => {
                    return (
                    <tr key={coin.id}>
                        <td>{index + 1}</td>
                        <td>{coin.name}</td>
                        <td>{coin.rank}</td>
                        <td>{coin.price_usd}</td>
                        <td>{millify(coin.market_cap_usd)}</td>
                        <td>{coin.percent_change_1h}%</td>
                        <td>{coin.percent_change_24h}%</td>
                        <td>{coin.percent_change_7d}%</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
    )
}

export default Table