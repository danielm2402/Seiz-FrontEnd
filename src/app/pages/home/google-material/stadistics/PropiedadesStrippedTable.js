import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form/immutable';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from 'enl-components/Tables/tableStyle-jss';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { loadState } from '../../../../../storage';
import { connect } from 'react-redux';
import {
  TextFieldRedux,
  SelectRedux,
  CheckboxRedux,
  SwitchRedux
} from 'enl-components/Forms/ReduxFormMUI';
import { initAction, clearAction, eliminarPropiedad } from 'enl-redux/actions/reduxFormActions';
import { bindActionCreators } from 'redux';
import Axios from 'axios';


const required = value => (value == null ? 'Este campo es requerido' : undefined);
const latLon = value => (
  value && !/^[0-9.]{2,15}$/i.test(value)
    ? 'Caracteres invalidos'
    : undefined
);

class StrippedTable extends Component {
  constructor(props) {

    super(props);
    this.state = {
      open: false,
      id: null,
      nombre: '',


      //De aqui para abajo son los valores que manipula el modal
      idAct: null,
      nombrePropiedad: '',
      postal: '',
      latitud: '',
      longitud: null,
      direccion: '',
      subdominio: '',
      openModal: false,
      paises: [],
      ciudades: [],
      pais: ' ',
      ciudad:''

    };
  }
  handleInput=(event)=>{
    this.setState({
    [event.target.name]: event.target.value
    })
}

  componentDidMount() {

  }
  handleModal = (id, nombre, codigo_postal, coordenadas_lat,
    coordenadas_lon, direcc, hostname) => {

    this.setState({
      idAct: id, nombrePropiedad: nombre, direccion: direcc,
      subdominio: hostname, latitud: coordenadas_lat, longitud: coordenadas_lon, postal: codigo_postal, openModal: true
    });

  };

  // SI NO SE PASA POR SAGA AQUI SE HACE LA PETICION
  handleModalPeticion = async () => {
    this.setState({ openModal: false });
    const config = {
      headers: {
        Authorization: 'Bearer ' + loadState(),
        Accept: 'application/json'
      }
    };
   
    
    console.log('http://orionph.com/api/v1/propiedad/actualizar/' + this.state.idAct);

    const res = await Axios.put('http://orionph.com/api/v1/pais/actualizar/' + this.state.idAct, {
      nombre: this.state.nombre,
      coordenadas_lat: String(this.state.latitud),
      coordenadas_lon: String(this.state.longitud),
      estado: this.state.estado
    }, config).then(response=>{
      this.componentDidMount();
    });

    console.log(res);
  };
  handleCloseModal = () => {
    this.setState({ openModal: false });
    console.log(name);
  };

  render() {

    const handleChange = name => (event) => {
      if (name === "pais") {
        const header = {
          Accept: 'application/json'
        };

        axios.get(`http://orionph.com/api/v1/pais/ciudades_por_pais/${event.target.value}`, { headerParams: header })
          .then(response => {
            if(response.status===200)
            {
            this.setState({ show: true });
            this.setState({ ciudades: response.data.data });
            }
            else if (response.status===222)
            {
              this.setState({ show: false });
            }
            console.log(response.status)
          }).catch(error => {
            this.setState({ ciudades: [] });
            this.setState({ show: false });
            // console.log(error)
          });
      }
      this.setState({ name: event.target.value });
      console.log(name);
    };


    const { classes,init } = this.props;


    const handleClickOpen = (ide, name) => {
      this.setState({ id: ide, nombre: name });
      this.setState({ open: true });
    };

    const handleClose = () => {
      this.setState({ open: false });
    };

    const handleEliminar = () => {
      this.props.handleEliminar(this.state.id);
      this.setState({ open: false });
    };


    return (
      <Fragment>
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Typography className={classes.title} variant="h6">Propiedades</Typography>
          </div>
        </Toolbar>
        <div className={classes.rootTable}>
          <Table className={classNames(classes.table, classes.stripped)}>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Ciudad id</TableCell>
                <TableCell align="right">Codigo postal</TableCell>
                <TableCell align="right">Coordenadas latitud</TableCell>
                <TableCell align="right">Coordenadas longitud</TableCell>
                <TableCell align="right">Direccion</TableCell>
                <TableCell align="right">Subdominio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.data.map(n => ([
                <TableRow key={n.id}>
                  <TableCell>{n.id}</TableCell>
                  <TableCell align="right">{n.nombre}</TableCell>
                  <TableCell align="right">{n.ciudad_id}</TableCell>
                  <TableCell align="right">{n.codigo_postal}</TableCell>
                  <TableCell align="right">{n.coordenadas_lat}</TableCell>
                  <TableCell align="right">{n.coordenadas_lon}</TableCell>
                  <TableCell align="right">{n.direccion}</TableCell>
                  <TableCell align="right">{n.hostname.fqdn}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="delete" className={classes.margin} onClick={() => handleClickOpen(n.id, n.nombre)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="edit" className={classes.margin} onClick={() =>{ this.handleModal(n.id, n.nombre, n.codigo_postal, n.coordenadas_lat,
                      n.coordenadas_lon, n.direccion, n.hostname.fqdn);
                      init({
                        nombre: n.nombre,
                        latitud: n.coordenadas_lat,
                        longitud:n.coordenadas_lon,
                        direccion:n.direccion,
                        subdominio:n.hostname.fqdn,
                        postal : n.codigo_postal                    
                         });}}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ]))}
            </TableBody>
          </Table>
        </div>
        
        <Dialog
          open={this.state.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Esta seguro que desea eliminar la Propiedad?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Eliminara la propiedad
              {' '}
              {this.state.nombre}
              !!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleEliminar} color="primary" autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>



        {/*MODAL PARA ACTUALIZAR */}

        <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
          <Grid item xs={12} md={6}>
            <Dialog
              open={this.state.openModal}
              onClose={this.handleCloseModal}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            ><DialogTitle id="alert-dialog-title">Actualizar Propiedad</DialogTitle>
              <DialogContent>

                <Paper className={classes.root}>

                  <div>
                    <Field
                      name="nombre"
                      placeholder={this.state.nombre}
                      component={TextFieldRedux}
                      label="Nombre"
                      validate={required}
                      required
                      className={classes.textField}
                      margin="normal"
                      onChange={this.handleInput}
                    />
                  </div>
                  <div>
                    <Field
                      name="direccion"
                      component={TextFieldRedux}
                      placeholder={this.state.direccion}
                      label="Direccion"
                      validate={required}
                      required
                      className={classes.textField}
                      margin="normal"
                      onChange={this.handleInput}
                    />
                  </div>
                  <div>
                    <Field
                      name="subdominio"
                      component={TextFieldRedux}
                      placeholder={this.state.subdominio}
                      label="Subdominio"
                      validate={required}
                      required
                      className={classes.textField}
                      margin="normal"
                      onChange={this.handleInput}
                    />
                  </div>
                  <div>
                    <Field
                      name="latitud"
                      component={TextFieldRedux}
                      placeholder={this.state.latitud}
                      label="Coordenadas Latitud"
                      validate={[required,latLon]}
                      required
                      className={classes.textField}
                      margin="normal"
                      onChange={this.handleInput}
                    />
                  </div>
                  <div>
                    <Field
                      name="longitud"
                      component={TextFieldRedux}
                      placeholder={this.state.longitud}
                      label="Coordenadas Longitud"
                      validate={[required,latLon]}
                      required
                      className={classes.textField}
                      margin="normal"
                      onChange={this.handleInput}
                    />
                  </div>
                  <div>
                    <Field
                      name="postal"
                      component={TextFieldRedux}
                      placeholder={this.state.postal}
                      label="Codigo Postal"
                      validate={required}
                      required
                      className={classes.textField}
                      margin="normal"
                      onChange={this.handleInput}
                    />
                  </div>
                  <div>
                    <Field
                      id="standard-select-currency"
                      select
                      name="paises"
                      label="Pais"
                      component={TextFieldRedux}
                      className={classes.textField}
                      value={this.state.pais}
                      onChange={handleChange('pais')}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      helperText="Por favor seleccione el pais"
                      margin="normal"
                    >
                      {this.state.paises.map(option => (
                        <MenuItem key={option.id} value={'' + option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>
                  <div>
                    {
                      this.state.show
                        ? (
                          <div>
                            <Field
                              id="standard-select-currency"
                              select
                              name="ciudad"
                              label="ciudad"
                              component={TextFieldRedux}
                              className={classes.textField}
                              value={this.state.ciudad}
                              onChange={handleChange('ciudad')}
                              ref={this.saveRef}
                              SelectProps={{
                                MenuProps: {
                                  className: classes.menu,
                                },
                              }}
                              helperText="Por favor seleccione una ciudad"
                              margin="normal"
                            >
                              {this.state.ciudades.map(option => (
                                <MenuItem key={option.id} value={'' + option.id}>
                                  {option.nombre}
                                </MenuItem>
                              ))}
                            </Field>

                          </div>
                        ) : <div>* No hay ciudades disponibles para este pais *</div>
                    }
                  </div>

                </Paper>


              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseModal} color="primary" autoFocus>
                  Cancelar
            </Button>
                <Button onClick={this.handleModalPeticion} color="primary" autoFocus>
                  Aceptar
            </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Fragment>
    );
  }

}

StrippedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction),
  handleEliminar: bindActionCreators(eliminarPropiedad, dispatch),
});

const ReduxFormMapped = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(StrippedTable);

const reducer = 'initval';
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, 'formValues'])
  }),
  mapDispatchToProps,
)(ReduxFormMapped);


export default withStyles(styles)(FormInit);
