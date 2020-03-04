import React, { PureComponent, Component } from 'react';
import {
  Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis,ResponsiveContainer
} from 'recharts';
import { connect } from 'react-redux'
const data = [
  {
    subject: 'Enviados', A: 120, B: 110, fullMark: 150,
  },
  {
    subject: 'Confirmados', A: 98, B: 130, fullMark: 150,
  },
  {
    subject: 'Editados', A: 86, B: 130, fullMark: 150,
  },
  {
    subject: 'Pospuestos', A: 99, B: 100, fullMark: 150,
  },
  {
    subject: 'No Revisados', A: 85, B: 90, fullMark: 150,
  },
  {
    subject: 'Revisados', A: 65, B: 85, fullMark: 150,
  },
];

class Example extends Component {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/dpgb3xjq/';

  render() {
   
    
        const{AsignadosVsConfirmados,MvpConfirmadosVsMe,PromConfirmadoVsMe,MvpSubidosVsMe,PromedioSubidosVsMe,MvpAsignadosVsMe}=this.props.poly
        const data1 = [
          {
            subject: 'Asignados vs Confirmados', A: AsignadosVsConfirmados.other, B: AsignadosVsConfirmados.me, fullMark: AsignadosVsConfirmados.tope,
          },
          {
            subject: 'CONFIRM: MVP vs Me', A: MvpConfirmadosVsMe.other, B: MvpConfirmadosVsMe.me, fullMark: MvpConfirmadosVsMe.tope,
          },
          {
            subject: 'CONFIRM: Prom vs Me', A: PromConfirmadoVsMe.other, B: PromConfirmadoVsMe.me, fullMark: PromConfirmadoVsMe.tope,
          },
          {
            subject: 'UPLOAD: MVP vs Me', A: MvpSubidosVsMe.other, B: MvpSubidosVsMe.me, fullMark: MvpSubidosVsMe.tope,
          },
          {
            subject: 'UPLOAD: Prom vs Me', A: PromedioSubidosVsMe.other, B: PromedioSubidosVsMe.me, fullMark: PromedioSubidosVsMe.tope,
          },
          {
            subject: 'ASSIGNED: MVP vs Me', A: MvpAsignadosVsMe.other, B: MvpAsignadosVsMe.me, fullMark: MvpAsignadosVsMe.tope,
          },
        ];
    return (
      <ResponsiveContainer>
      <RadarChart  outerRadius={150} data={data1}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar name="Promedio" dataKey="A" stroke="#8884d8" fill="#EBD3F6" fillOpacity={0.7} />
        <Radar name="Usuario" dataKey="B" stroke="#82ca9d" fill="#CAE8EF" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
      </ResponsiveContainer>
    );
  }
}

const mapStateToProps=(state)=>({
  poly: state.estadisticasReducer.polygon
})
export default connect(mapStateToProps)(Example)

