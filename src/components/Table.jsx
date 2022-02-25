import millify from 'millify';
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory   } from 'react-router-dom';
import axios from 'axios'
import {previousPage,
    nextPage,
    setPage, setCoins, setLoading, setLastUpdated} from '../features/tableSlice'

const Table = () => {
    // const [start, setStart] = useState(0)
    // const [page, setPage] = useState(5)
    // const [currentPage, setcurrentPage] = useState(1)
    // const {data, isFetching} =  useGetCryptoQuery(start)
    // const [coins, setCoins] = useState([])
 

    const {start, page, coins, currentPage, isLoading, lastUpdated} =  useSelector(state => state.counter) ;
    const dispatch =  useDispatch()
    const history = useHistory();
    // useEffect(()=> {
    //     setCoins(data?.data)
    // },[data, start ])
    // const [coins, setCoins] = useState([])
    // if(isFetching) return 'Loading...'
    // const coins = data?.data
    let URL = `https://api.coinlore.net/api/tickers/?start=${start}&limit=10`
    const getApiData = () => {
        axios.get(URL).then(response=> {
            dispatch(setCoins(response?.data))
            dispatch(setLoading(false))
         }).catch(err => {
             console.error(err)
         })
    }
    

    useEffect(()=> {
        getApiData();    
        const interval =  setInterval(() => {
            getApiData();
            let d = new Date();
            let datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
            dispatch(setLastUpdated(datestring))
          }, 5000)

          return () => clearInterval(interval)
    },[URL])
    return (
        <>
            {isLoading ? 'Fetching coin data...' : 
            <div>
            <div className='mt-4 mb-2' style={{display :'flex', justifyContent:'space-between'}}>
                <h4 >Live Cryptocurrency Prices & Coin Market Caps</h4>
                <span>Last updated: <b style={{color:'green'}}> {lastUpdated}</b></span>
            </div>
           
            
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
            { coins && coins?.map(( coin, index ) => {
                return (                
                <tr style={{cursor:'pointer'}} key={coin.id} onClick={() =>  history.push(`/coin/${coin.id}`)}>
                    <td>{index + 1}</td>
                    <td>{coin.name}</td>
                    <td>{coin.rank}</td>
                    <td>{coin.price_usd}</td>
                    <td>{millify(coin.market_cap_usd)}</td>
                    <td style={{color: `${coin.percent_change_1h >= 0 ? 'green' : 'red'}`}}>{coin.percent_change_1h}%</td>
                    <td style={{color: `${coin.percent_change_24h >= 0 ? 'green' : 'red'}`}}>{coin.percent_change_24h}%</td>
                    <td style={{color: `${coin.percent_change_7d >= 0 ? 'green' : 'red'}`}}>{coin.percent_change_7d}%</td>
                </tr> 
                );
            })}
            </tbody>
        </table>
            </div>    
        
        }
        <div style={{display:'flex', justifyContent:'right'}}>
        <nav aria-label="Page navigation">
            <ul className="pagination">
                {[...Array(page).keys()].slice(-5).map((pageNumber, index)=> (<li key={index} className={`${pageNumber+1 === currentPage  ? 'active' : ''} page-item`}><button   className="page-link" onClick={() => dispatch(setPage(pageNumber+1)) }>{pageNumber+1}</button></li>))}
            </ul>
            </nav>
        </div>

        </>
      
    )
}

export default Table