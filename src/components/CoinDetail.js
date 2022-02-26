import React, {useEffect} from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { setTop10byVolume, setLabels, setVolumes , setCoinStats} from '../features/coinDetailSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import millify from 'millify';

ChartJS.register(ArcElement, Tooltip, Legend);
const CoinDetail = (props) => {
  const  {coinId} =  useParams()
  const { top10ByCoinsByVolume, labels, chartOptions, coinStats } =  useSelector(state => state.coinDetail) ;
  const dispatch =  useDispatch()
  let URL = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`
  let coinStatsURL = `https://api.coinlore.net/api/ticker/?id=${coinId}`
  useEffect(() => {

    axios.get(URL).then(response => {
      console.log(response)
      let data  =  response?.data.slice(0,10)
      console.log(data)
      dispatch(setTop10byVolume(data))
      let volumes = []
      let labels = []
      data.map((exchange) => {
        labels.push(exchange?.name);
        volumes.push(exchange?.volume_usd.toFixed(2)) 
      })
      console.log(labels, volumes)
      dispatch(setLabels(labels))
      dispatch(setVolumes(volumes))
 
    })

    axios.get(coinStatsURL).then(response => {
      dispatch(setCoinStats(response.data[0]))
      console.log(response.data)
    })
    return () => {
      console.log("cleanup")
    }
  }, [coinId])
  
  
  const state = {
    labels: chartOptions?.labels,
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: chartOptions?.volumes
      }
    ]
  }

  return (

    <div>
    <div className='row'>
      <div className='col-12 text-center mt-4'>
          <h3>Coin Details</h3>
      </div>
    </div>
    <div className='row mt-4'>
      <div className='col-md-4 offset-md-4 col-sm-12 col-lg-4 offset-lg-4'>
         <div className='coinstats mb-4' style={{display:'flex', justifyContent:'center'}}>
                
          <div className="card" style={{'minWidth': '26rem'}} >
            <div className="card-body">
              <h4 className="card-title text-center"> {coinStats.name} <span className="card-subtitle mb-2 text-muted text-center" style={{fontSize: '0.6rem'}}> {coinStats.symbol} </span> </h4>
              
              <div className='mb-2' style={{display: 'flex', justifyContent:'space-between'}}>
                  <span className="card-text">Price: <b> {coinStats.price_usd}$ </b> </span>
                  <span className="card-text">Total supply:  <b>{coinStats.tsupply} </b></span>
              </div>
              <div className='mb-2' style={{display: 'flex', justifyContent:'space-between'}}>
                <span className="card-text">{coinStats.msupply ? 'Mkt. supply: ' : <b>Mkt Supply Unavailable </b>} <b>{coinStats.msupply}{coinStats.msupply ? '$' : ''}  </b></span>
                <span className="card-text">Mkt cap:  <b> {coinStats.market_cap_usd}$ </b></span>
            </div>
          <div className='mb-2'  style={{display: 'flex', justifyContent:'space-between'}}>
            <span  className="card-text">Price change 1hr: <span style={{color: coinStats.percent_change_1h >= 0 ? 'green': 'red'}}>{coinStats.percent_change_1h}$  </span></span>
            <span className="card-text">Price change 24h :  <span style={{color: coinStats.percent_change_24h >= 0 ? 'green': 'red'}}> {coinStats.percent_change_24h}$ </span></span>
        </div>
              

            </div>
          </div>
        </div>
      </div>

    </div>

    <div className='row'>
      <div className='col-sm-12 col-lg-4 offset-lg-4 col-md-4 offset-md-4'>
      <div className='pie-chart' >
      <h3 className='text-center'> Top 10 markets with highest volume</h3>
        <Pie
        data={state}
        options={{
          title:{
            display:true,
            text:'Average Rainfall per month',
            fontSize:20
          },
          legend:{
            display:true,
            position:'left'
          }
        }}
      />
    </div>
      </div>
    </div>
 

    </div>

   
  )
}

export default CoinDetail