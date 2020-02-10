import React, { PureComponent } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

const data = [
  {
    subject: 'Confirmados', A: 120, B: 110, fullMark: 150,
  },
  {
    subject: 'Cartas', A: 98, B: 130, fullMark: 150,
  },
  {
    subject: 'Subidos', A: 86, B: 130, fullMark: 150,
  },
  {
    subject: 'Asignados', A: 99, B: 100, fullMark: 150,
  },

];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/6ebcxbx4/';

  render() {
    return (
      <RadarChart cx={200} cy={200} outerRadius={110} width={400} height={400} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    );
  }
}
