import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import LocalPhone from '@material-ui/icons/LocalPhone';
import Mail from '@material-ui/icons/Mail';
import DateRange from '@material-ui/icons/DateRange';
import LocationOn from '@material-ui/icons/LocationOn';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import PapperBlock from './PapperBlock';
import styles from './widget-jss';
import AccountBalance from '@material-ui/icons/AccountBalance';


function ProfileWidget(props) {
  const { classes, intl } = props;
  return (
    <PapperBlock title="Administrador" icon="contacts" whiteBg noMargin desc="EDWARD MUÑOZ CORTÉZ">
      <Divider className={classes.divider} />
      <List dense className={classes.profileList}>
       
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocalPhone />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Teléfono" secondary="(+62)8765432190" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Mail />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Email" secondary="edwartmz@gmail.com" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <LocationOn />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Dirección" secondary="Chicendo Street no.105 Block A/5A - Panamá" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccountBalance />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Cuenta" secondary="0761248213-21" />
        </ListItem>
      </List>
    </PapperBlock>
  );
}

ProfileWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

export default withStyles(styles)(injectIntl(ProfileWidget));
