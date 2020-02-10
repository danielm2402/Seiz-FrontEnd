import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Dvr from '@material-ui/icons/Dvr';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Healing from '@material-ui/icons/Healing';
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
                  <span className={classes.orangeText}>40</span>
                  <Typography noWrap>
                    Propietarios
                  </Typography>
                </Typography>
              </li>
              <li>
                <Avatar className={classNames(classes.avatar, classes.indigoAvatar)}>
                  <CheckCircle />
                </Avatar>
                <Typography variant="h6">
                  <span className={classes.indigoText}>125</span>
                  <Typography noWrap>
                   Propiedades
                  </Typography>
                </Typography>
              </li>
              <li>
                <Avatar className={classNames(classes.avatar, classes.pinkAvatar)}>
                  <Healing />
                </Avatar>
                <Typography variant="h6">
                  
                  <Typography noWrap>
                    Plan: Básico
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
                    <Area type="basis" stackId="2" dataKey="Task" stroke="none" fill={color.secondary} />
                    <Area type="monotone" stackId="1" stroke="none" dataKey="Attend" fill={color.fourth} />
                    <Area type="monotone" stackId="3" dataKey="Referrals" stroke="none" fill={color.main} />
                    <Line type="monotone" dataKey="Complaint" strokeWidth={2} stroke={color.third} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
                <Admin/>
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
                <Typography gutterBottom>Monto actual</Typography>
                <Typography gutterBottom>$50.345.00</Typography>
                <LinearProgress variant="determinate" className={classNames(classes.progress, classes.pinkProgress)} value={100} />
              </li>
              <li>
                <Typography gutterBottom>Cantidad de usuarios</Typography>
                <Typography gutterBottom>1345</Typography>
                <LinearProgress variant="determinate" className={classNames(classes.progress, classes.purpleProgress)} value={100} />
              </li>
              <li>
                <Typography gutterBottom>PQRS</Typography>
                <Typography gutterBottom>5</Typography>
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

export default withStyles(styles)(injectIntl(PerformanceChartWidget));
