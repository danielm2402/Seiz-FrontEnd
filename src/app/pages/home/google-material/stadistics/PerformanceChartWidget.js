import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Dvr from '@material-ui/icons/Dvr';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Healing from '@material-ui/icons/Publish';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import FilterCenterFocus from '@material-ui/icons/FilterCenterFocus';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import LocalActivity from '@material-ui/icons/LocalActivity';
import Typography from '@material-ui/core/Typography';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Admin from './Admin'
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { dataPerformance } from './chartData';
import colorfull from './colorfull';
import styles from './widget-jss';
import PapperBlock from './PapperBlock';
import messages from './messages';

const color = ({
  main: colorfull[2],
  secondary: colorfull[4],
  third: colorfull[0],
  fourth: colorfull[1],
});

class PerformanceChartWidget extends PureComponent {
  render() {

    const {user, userOther}= this.props
    const dataPerformance = [
      {
        name: 'Lunes',
        Confirmados: user.length==0?0:user[0].stat,
        Subidos: userOther.upload[0].length==0?0:userOther.upload[0][0].stat,
        Asignados: userOther.userAssig[0].length==0?0:userOther.userAssig[0][0].stat,
       
      },
      {
        name: 'Martes',
        Confirmados: user.length==0?0:user[1].stat,
        Subidos: userOther.upload[1].length==0?0:userOther.upload[1][0].stat,
        Asignados: userOther.userAssig[1].length==0?0:userOther.userAssig[1][0].stat,
     
      },
      {
        name: 'Miercoles',
        Confirmados: user.length==0?0:user[2].stat,
        Subidos: userOther.upload[2].length==0?0:userOther.upload[2][0].stat,
        Asignados: userOther.userAssig[2].length==0?0:userOther.userAssig[2][0].stat,
        
      },
      {
        name: 'Jueves',
        Confirmados: user.length==0?0:user[3].stat,
        Subidos: userOther.upload[3].length==0?0:userOther.upload[3][0].stat,
        Asignados: userOther.userAssig[3].length==0?0:userOther.userAssig[3][0].stat,
       
      },
      {
        name: 'Viernes',
        Confirmados: user.length==0?0:user[4].stat,
        Subidos: userOther.upload[4].length==0?0:userOther.upload[4][0].stat,
        Asignados: userOther.userAssig[4].length==0?0:userOther.userAssig[4][0].stat,
        
      },
      {
        name: 'Sábado',
        Confirmados: user.length==0?0:user[5].stat,
        Subidos: userOther.upload[5].length==0?0:userOther.upload[5][0].stat,
        Asignados: userOther.userAssig[5].length==0?0:userOther.userAssig[5][0].stat,
       
      }
    ];


    const { classes, intl } = this.props;
    return (
      <PapperBlock whiteBg noMargin title={intl.formatMessage(messages.performance_indicator)} icon="timeline" desc="">
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <ul className={classes.bigResume}>
              <li>
                <Avatar className={classNames(classes.avatar, classes.orangeAvatar)}>
                  <Dvr />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.orangeText}>{this.props.conteoEmbargos.loading?0:this.props.conteoEmbargos.data.asignados}</span>
                  <Typography noWrap>
                    Asignados
                  </Typography>
                </Typography>
              </li>
              <li>
                <Avatar className={classNames(classes.avatar, classes.indigoAvatar)}>
                  <CheckCircle />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.indigoText}>{this.props.conteoEmbargos.loading?0:this.props.conteoEmbargos.data.confirmados}</span>
                  <Typography noWrap>
                   Confirmados
                  </Typography>
                </Typography>
              </li>
              <li>
                <Avatar className={classNames(classes.avatar, classes.pinkAvatar)}>
                  <Healing />
                </Avatar>
                <Typography variant="h6">
                <span className={classes.indigoText}>{this.props.conteoEmbargos.loading?0:this.props.conteoEmbargos.data.total}</span>
                
                  <Typography noWrap>
                    Subidos
                  </Typography>
                </Typography>
              </li>
              
            </ul>
            <div className={classes.chartWrap}>
              <div className={classes.chartFluid}>
                <ResponsiveContainer>
                  <ComposedChart
                    data={dataPerformance}
                  >
                    <XAxis dataKey="name" tickLine={false} />
                    <YAxis axisLine={false} tickSize={3} tickLine={false} tick={{ stroke: 'none' }} />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="basis" stackId="2" dataKey="Subidos" stroke="none" fill={color.secondary} />
                    <Area type="monotone" stackId="1" stroke="none" dataKey="Confirmados" fill={color.fourth} />
                    <Area type="monotone" stackId="3" dataKey="Referrals" stroke="none" fill={color.main} />
                    <Line type="monotone" dataKey="Asignados" strokeWidth={2} stroke={color.third} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
           
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography className={classes.smallTitle} variant="button">
              <FilterCenterFocus className={classes.leftIcon} />
              <FormattedMessage {...messages.achievement_target} />
            </Typography>
            <Divider className={classes.divider} />
            <ul className={classes.secondaryWrap}>
              <li>
                <Typography gutterBottom>Confirmados</Typography>
           
                <LinearProgress variant="determinate" className={classNames(classes.progress, classes.pinkProgress)} value={100} />
              </li>
              <li>
                <Typography gutterBottom>Subidos</Typography>
            
                <LinearProgress variant="determinate" className={classNames(classes.progress, classes.purpleProgress)} value={100} />
              </li>
              <li>
                <Typography gutterBottom>Asignados</Typography>
                <LinearProgress variant="determinate" className={classNames(classes.progress, classes.orangeProgress)} value={100} />
              </li>
          
             
            </ul>
            
          </Grid>
        </Grid>
      </PapperBlock>
    );
  }
}
 
PerformanceChartWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

const mapStateToProps=(state)=>({
  conteoEmbargos: state.estadisticasReducer.conteo,
  user:state.estadisticasReducer.semanal.user,
  userOther:state.estadisticasReducer.userStatsOther

})
export default withStyles(styles)(injectIntl(connect(mapStateToProps, null)(PerformanceChartWidget)));
