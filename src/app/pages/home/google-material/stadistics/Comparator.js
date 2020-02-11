import React, { PureComponent } from 'react';
import {
  Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis,ResponsiveContainer
} from 'recharts';

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

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/dpgb3xjq/';

  render() {
    return (
      <ResponsiveContainer>
      <RadarChart  outerRadius={150} data={data}>
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