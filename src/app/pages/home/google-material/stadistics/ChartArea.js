import React, { PureComponent } from 'react';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, Scatter,
} from 'recharts';
import axios from 'axios'


const data = [
  {
    name: 'Lun', mvp: 590, Me: 800, prom: 1400, cnt: 490,
  },
  {
    name: 'Mar', mvp: 868, Me: 967, prom: 1506, cnt: 590,
  },
  {
    name: 'Mie', mvp: 1397, Me: 1098, prom: 989, cnt: 350,
  },
  {
    name: 'Jue', mvp: 1480, Me: 1200, prom: 1228, cnt: 480,
  },
  {
    name: 'Vie', mvp: 1520, Me: 1108, prom: 1100, cnt: 460,
  },
  {
    name: 'Sáb', mvp: 1400, Me: 680, prom: 1700, cnt: 380,
  },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/9xopwa9v/';
  componentDidMount() {
 
    const config = {
      headers: {
        Authorization: 'Bearer ' ,
      },
    };
    const data = axios.get('https://bancow.finseiz.com/api/v1/stats/', config)
      .then(response => response)
      .catch(error => error.response)
  }

  render() {
    return (
      <ResponsiveContainer>
        <ComposedChart

          data={data}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="prom" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="Me" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="mvp" stroke="#ff7300" />
          {/* <Scatter dataKey="cnt" fill="red" /> */}
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
