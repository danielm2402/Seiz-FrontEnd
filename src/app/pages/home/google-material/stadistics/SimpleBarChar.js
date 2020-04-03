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
      name: general.length!==0?general[0].date:'', Me:general.length!==0?general[0].stats:0, Prom:0
    },
    {
      name: general.length!==0?general[1].date:'', Me:general.length!==0?general[1].stats:0, Prom:0
    },
    {
      name: general.length!==0?general[2].date:'', Me:general.length!==0?general[2].stats:0, Prom:0
    },
    {
      name: general.length!==0?general[3].date:'', Me:general.length!==0?general[3].stats:0, Prom:0
    },
    {
      name: general.length!==0?general[4].date:'', Me:general.length!==0?general[4].stats:0, Prom:0
    },
    
    ]
   
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

