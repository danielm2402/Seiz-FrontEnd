import React, { PureComponent, Component } from 'react';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, Scatter,
} from 'recharts';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
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

class Example extends Component {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/9xopwa9v/';
  constructor(props){
    super(props)
    this.state={

    }
  }
 
  render() {
    const{me, prom, mvp}=this.props
    const lengthMvp= mvp.length
    const data = [
      {
        name: 'Lun', mvp: lengthMvp>0?mvp[0].stat:0, Me: me[0].length==0?0:me[0][0].stat, prom: prom[0].length==0?0:prom[0][0].stat,
      },
      {
        name: 'Mar', mvp:lengthMvp>1?mvp[1].stat:0,  Me: me[1].length==0?0:me[1][0].stat, prom: prom[1].length==0?0:prom[1][0].stat,
      },
      {
        name: 'Mie', mvp: lengthMvp>2?mvp[2].stat:0,  Me: me[2].length==0?0:me[2][0].stat, prom: prom[2].length==0?0:prom[2][0].stat,
      },
      {
        name: 'Jue', mvp: lengthMvp>3?mvp[3].stat:0,  Me: me[3].length==0?0:me[3][0].stat, prom: prom[3].length==0?0:prom[3][0].stat,
      },
      {
        name: 'Vie', mvp: lengthMvp>4?mvp[4].stat:0,  Me: me[4].length==0?0:me[4][0].stat, prom: prom[4].length==0?0:prom[4][0].stat,
      },
      {
        name: 'Sáb', mvp: lengthMvp>5?mvp[5].stat:0,  Me: me[5].length==0?0:me[5][0].stat, prom: prom[5].length==0?0:prom[5][0].stat,
      },
    ];
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
const mapStateToProps=(state)=>({
  me: state.estadisticasReducer.semanal.user,
  prom: state.estadisticasReducer.semanal.general,
  mvp: state.estadisticasReducer.mvpSemana

})
export default connect(mapStateToProps,null)(Example)
