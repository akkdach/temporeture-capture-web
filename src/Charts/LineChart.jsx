import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import 'chart.js/auto';
import axios from 'axios';
import moment from 'moment'
const LineChart = () => {
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);
  const chartRef = useRef(null);

const onMapData = (input)=>{
  console.log(input)

  var newData = input.map((item,i)=>{
    return item.temp_value
  })
  var newLabel = input.map((item,i)=>{
    return moment(item.temp_datetime).add(-7,'h').format('H:mm')
  })
  console.log(newLabel);
  setData(newData)
  setLabel(newLabel)
  const ctx = chartRef.current.getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: newLabel,
      datasets: [{
        label: 'Demo Temperature capture for (BPA)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        data: newData,
      }],
    },
  });

  return () => {
    myChart.destroy();
  };
}
useEffect(() => {
  const fetchData = async () => {
    try {
      const {data} = await axios.get('https://delightful-shoe-slug.cyclic.app/temps_by_sn?sn=SNDEMO01'); // Replace with your API endpoint
      // console.log(data.data)
      onMapData(data.data);
    } catch (error) {
      // setError(error);
    }
  };

  fetchData();
}, []); // The empty dependency array ensures this effect runs once when the component mounts


  useEffect(() => {

  }, [data.length]);

  return (
    <div width='100%'>
      <canvas className='w-full' ref={chartRef} width="999" height="400"></canvas>
    </div>
  );
};

export default LineChart;
