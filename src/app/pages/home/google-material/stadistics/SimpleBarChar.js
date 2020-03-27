import React, { PureComponent, Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { connect } from 'react-redux'
import PapperBlock from './PapperBlock';
import messages from './messages';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
class Example extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.datos !== this.props.datos) {
      console.log('SE ACTUALIZÓ EL COMPONENTE NUEVO')
      console.log(this.props.datos)
      const { user, general } = this.props.datos
      console.log(user)
      console.log(general)

    }

  }

  render() {
    const { user, general } = this.props.datos
    const data1 = [{
      name: `Lunes ${general[0].length == 0 ? '' : general[0][0].date}`, Me: user[0].length == 0 ? 0 : user[0][0].stat, Prom: general[0].length == 0 ? 0 : general[0][0].stat
    },
    {
      name: `Martes ${general[1].length == 0 ? '' : general[1][0].date}`, Me: user[1].length == 0 ? 0 : user[1][0].stat, Prom: general[1].length == 0 ? 0 : general[1][0].stat
    },
    {
      name: `Miercoles ${general[2].length == 0 ? '' : general[2][0].date}`, Me: user[2].length == 0 ? 0 : user[2][0].stat, Prom: general[2].length == 0 ? 0 : general[2][0].stat
    },
    {
      name: `Jueves ${general[3].length == 0 ? '' : general[3][0].date}`, Me: user[3].length == 0 ? 0 : user[3][0].stat, Prom: general[3].length == 0 ? 0 : general[3][0].stat
    },
    {
      name: `Viernes ${general[4].length == 0 ? '' : general[4][0].date}`, Me: user[4].length == 0 ? 0 : user[4][0].stat, Prom: general[4].length == 0 ? 0 : general[4][0].stat
    },
    {
      name: `Sábado ${general[5].length == 0 ? '' : general[5][0].date}`, Me: user[5].length == 0 ? 0 : user[5][0].stat, Prom: general[5].length == 0 ? 0 : general[5][0].stat
    },
    ]
    console.log('EL DATA 111111')
    console.log(data1)
    const { classes, intl } = this.props;
    return (
      
        <ResponsiveContainer>
          <BarChart

            data={data1}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Prom" fill="#8884d8" />
            <Bar dataKey="Me" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
     
    );
  }
}
const mapStateToProps = (state) => ({
  datos: state.estadisticasReducer.semanal
})
export default connect(mapStateToProps, null)(Example)

