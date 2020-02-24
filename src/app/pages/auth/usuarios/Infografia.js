import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import OndemandVideo from '@material-ui/icons/OndemandVideo';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark';
import Edit from '@material-ui/icons/Edit';
import Public from '@material-ui/icons/Public';
import LocationCity from '@material-ui/icons/LocationCity';
import Business from '@material-ui/icons/Business';
import DeleteSweep from '@material-ui/icons/DeleteSweep';
import Payment from '@material-ui/icons/Payment';
import Highlight from '@material-ui/icons/HighlightOff';

import Help from '@material-ui/icons/Help';

import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import CounterWidget  from './CounterWidget';
import AccountBalance from '@material-ui/icons/AccountBalance';
import Group from '@material-ui/icons/Group';

import styles from './widget-jss';


class IconInfographic extends React.Component {


  render() {
    const { classes } = this.props;
    return (
      
      <div className={classes.rootCounterFull}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <CounterWidget
              color="primary-main"
              start={0}
              end={20}
              duration={3}
              title="Asignados"
            >
              <Business className={classes.counterIcon} />
            </CounterWidget>
          </Grid>

          <Grid item xs={6} md={3}>
            <CounterWidget
              color="primary-main"
              start={0}
              end={30}
              duration={3}
              title="Confirmados"
            >
              <DeleteSweep className={classes.counterIcon} />
            </CounterWidget>

            

          </Grid>
          <Grid item xs={6} md={3}>
            <CounterWidget
              color="primary-main"
              start={0}
              end={6}
              duration={3}
              title="Editados"
            >
              <Help className={classes.counterIcon} />
            </CounterWidget>

            

          </Grid>
          <Grid item xs={6} md={3}>
            <CounterWidget
              color="primary-main"
              start={0}
              end={9}
              duration={3}
              title="Eliminados"
            >
              <Help className={classes.counterIcon} />
            </CounterWidget>

            

          </Grid>
        
          
        
          
          
        </Grid>
      </div>
    );
  }
}

IconInfographic.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({

});
const mapDispatchToProps = dispatch => ({
 
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(IconInfographic));

