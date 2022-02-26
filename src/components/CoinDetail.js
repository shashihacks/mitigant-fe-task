import React, {useEffect} from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { setTop10byVolume, setLabels, setVolumes , setCoinStats, setSocialStatus} from '../features/coinDetailSlice';
import axios from 'axios';
import { useParams } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);
const BASE_URL = `https://api.coinlore.net`
const CoinDetail = (props) => {
  const  {coinId} =  useParams()
  const {  chartOptions, coinStats, socialStatus } =  useSelector(state => state.coinDetail) ;
  const dispatch =  useDispatch()
  let coinURL = `${BASE_URL}/api/coin/markets/?id=${coinId}`
  let coinStatsURL = `${BASE_URL}/api/ticker/?id=${coinId}`
  let socialStatusURL = `${BASE_URL}/api/coin/social_stats/?id=${coinId}`
  

  function getCoins(){
    axios.get(coinURL).then(response => {
      let data  =  response?.data.slice(0,10)
      dispatch(setTop10byVolume(data))
      let volumes = []
      let labels = []
      data.map((exchange) => {
        labels.push(exchange?.name);
        volumes.push(exchange?.volume_usd?.toFixed(2)) 
      })
      dispatch(setLabels(labels))
      dispatch(setVolumes(volumes))
 
    })
  }

  function getCoinStats() {

    axios.get(coinStatsURL).then(response => {
      dispatch(setCoinStats(response.data[0]))
    })
  }

  function getSocialStats() {
    axios.get(socialStatusURL).then(response => {
      dispatch(setSocialStatus(response?.data))
    })
  }

  useEffect(() => {
    getCoins()
    getCoinStats()
    getSocialStats()

    return () => {
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
          '#6800B4',

          '#B21A00',
          '#C9DA00',
          '#2FDF00',
          '#00AAB4',
          '#68B0B4',
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
                
          <div className="card" style={{'minWidth': '24rem'}} >
            <div className="card-body">
              <h4 className="card-title text-center"> {coinStats.name} <span className="card-subtitle mb-2 text-muted text-center" style={{fontSize: '0.6rem'}}> {coinStats.symbol} </span> </h4>
              
              <div className='mb-2' style={{display: 'flex', justifyContent:'space-between'}}>
                  <span className="card-text">Price: <b> {coinStats.price_usd}$ </b> </span>
                  <span className="card-text">Total supply:  <b>{coinStats.tsupply} </b></span>
              </div>
              <div className='mb-2' style={{display: 'flex', justifyContent:'space-between'}}>
                <span className="card-text">{coinStats.msupply ? 'Mkt. supply: ' : 'Mkt. supply: - '} <b>{coinStats?.msupply}{coinStats.msupply ? '$' : ''}  </b></span>
                <span className="card-text">Mkt cap:  <b> {coinStats.market_cap_usd}$ </b></span>
            </div>
          <div className='mb-2'  style={{display: 'flex', justifyContent:'space-between'}}>
            <span  className="card-text">Price change 1hr: <span style={{color: coinStats.percent_change_1h >= 0 ? 'green': 'red'}}>{coinStats.percent_change_1h}$  </span></span>
            <span className="card-text">Price change 24h :  <span style={{color: coinStats.percent_change_24h >= 0 ? 'green': 'red'}}> {coinStats.percent_change_24h}$ </span></span>
        </div>
                {socialStatus ? <div className='social'>
                    <h6>Reddit:</h6>
                    <div className='mb-2'  style={{display: 'flex', justifyContent:'space-between'}}>
                      <span  className="card-text"> Active users: <span><b>{socialStatus['reddit']?.avg_active_users?.toFixed(2)} </b></span></span>
                      <span className="card-text">Subscribers :  <span> <b>{socialStatus['reddit']?.subscribers?.toFixed(2)} </b></span></span>
                  </div>

                  <h6>Twitter:</h6>
                  <div className='mb-2'  style={{display: 'flex', justifyContent:'space-between'}}>
                    <span  className="card-text"> Active users: <span><b>{socialStatus['twitter']?.followers_count?.toFixed(2)} </b></span></span>
                    <span className="card-text">Subscribers :  <span> <b>{socialStatus['twitter']?.status_count?.toFixed(2)} </b></span></span>
                </div>

                </div> :''}
            </div>
          </div>
        </div>
      </div>

    </div>

    <div className='row'>
      <div className='col-sm-12 col-lg-4 offset-lg-4 col-md-6 offset-md-3'>
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