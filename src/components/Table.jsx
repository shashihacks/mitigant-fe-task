import millify from 'millify';
import React, {useState, useEffect} from 'react'
import { useHistory   } from 'react-router-dom';
import { useGetCryptoQuery } from '../services/cryptoApi';


const Table = () => {
    const [start, setStart] = useState(0)
    const [page, setPage] = useState(5)

    const {data, isFetching} =  useGetCryptoQuery(start)
    const [coins, setCoins] = useState([])
    const history = useHistory();
    useEffect(()=> {
        setCoins(data?.data)
    },[data, start ])
    // const [coins, setCoins] = useState([])
    if(isFetching) return 'Loading...'
    // const coins = data?.data

    return (
        <>
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
            {coins && coins.map(( coin, index ) => {
                return (
                
                
                <tr style={{cursor:'pointer'}} key={coin.id} onClick={() =>  history.push(`/coin/${coin.id}`)}>
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
        <div style={{display:'flex', justifyContent:'right'}}>
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className="page-item"><button className="page-link" onClick={() =>( start <=0 ) ? setStart(0) :   setStart( start - 10)   }>Previous</button></li>
                {[...Array(page).keys()].map((pageNumber, index)=><li key={index} className="page-item"><button   className="page-link" onClick={() => {setStart((pageNumber*10))} }>{pageNumber+1}</button></li>)}
                <li className="page-item"><button className="page-link" onClick={() => setStart( start + 10)}>Next</button></li>
            </ul>
            </nav>
        </div>

        </>
      
    )
}

export default Table