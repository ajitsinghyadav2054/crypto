// import React, { useContext, useEffect, useState } from 'react'
// import './Coin.css'
// import { useParams } from 'react-router-dom'
// import { CoinContext } from '../../context/CoinContext';

// const Coin = () => {

//       const {coinId}=useParams();

//       const [coinData,setCoinData]=useState();

//       const {currency}=useContext(CoinContext)

//       const fetchCoinData=async()=>{
//         const options = {
//           method: 'GET',
//           headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-srydeuGz7rDgtxkWx5WxVi23'}
//         };
        
//         fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`, options)
//           .then(res => res.json())
//           .then(res => setCoinData(res))
//           .catch(err => console.error(err));
//       }

//       useEffect(()=>{
//         fetchCoinData();
//       },[currency])

//       if(coinData) {
//         return (
//           <div className='coin'>
//             <div className="coin-name">
//               <img src={coinData.image.large} alt=""/>
//               <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
//             </div>
//           </div>
//         )
//       } else{
//         return (
//           <div className='spinner'>
//              <div className="spin"></div>
//           </div>
//         )
//       }

  
// }

// export default Coin



// import React, { useContext, useEffect, useState } from 'react'
// import './Coin.css'
// import { useParams } from 'react-router-dom'
// import { CoinContext } from '../../context/CoinContext';
// import LineChart from '../../components/LineChart/LineChart';

// const Coin = () => {
//   const { coinId } = useParams();
//   const [coinData, setCoinData] = useState();
//   const [historicalData,setHistoricalData]=useState();
//   const { currency } = useContext(CoinContext);

//   const fetchCoinData = async () => {
//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         'x-cg-demo-api-key': 'CG-srydeuGz7rDgtxkWx5WxVi23'
//       }
//     };

//     fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&ids=${coinId}`, options)
//       .then(res => res.json())
//       .then(res => setCoinData(res[0]))
//       .catch(err => console.error(err));
//   };

//   const fetchHistoricalData=async()=>{
//     const options = {
//       method: 'GET',
//       headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-srydeuGz7rDgtxkWx5WxVi23'}
//     };
    
//     fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
//       .then(res => res.json())
//       .then(res => setHistoricalData(res))
//       .catch(err => console.error(err));
//   }

//   useEffect(() => {
//     fetchCoinData();
//     fetchHistoricalData();
//   }, [currency]);

//   if (!coinData || !historicalData) {
//     return (
//       <div className='spinner'>
//         <div className="spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className='coin'>
//       <div className="coin-name">
//         <img src={coinData.image} alt={coinData.name} />
//         <p><b>{coinData.name} ({coinData.symbol?.toUpperCase()})</b></p>
//       </div>
//       <div className="coin-chart">
//         <LineChart historicalData={historicalData}/>
//       </div>
//       <div className="coin-info">
//         <ul>
//           <li>Crypto Market Rank</li>
//           <li>{coinData.market_cap_rank}</li>
//         </ul>
//         <ul>
//           <li>Current Price</li>
//           <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Coin;



import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-srydeuGz7rDgtxkWx5WxVi23',
      },
    };

    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await res.json();
      setCoinData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-srydeuGz7rDgtxkWx5WxVi23',
      },
    };

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      );
      const data = await res.json();
      setHistoricalData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  if (!coinData || !historicalData) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image.large} alt={coinData.name} />
        <p>
          <b>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </b>
        </p>
      </div>

      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>

      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.current_price[currency.name]?.toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.market_cap[currency.name]?.toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24H High</li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.high_24h[currency.name]?.toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24H Low</li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.low_24h[currency.name]?.toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
