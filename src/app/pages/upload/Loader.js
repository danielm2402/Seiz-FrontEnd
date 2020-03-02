import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import {resetMensaje } from '../../redux/actions/uploadAction'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import './Sencond.css'
class Loader extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.loading !== prevProps.loading) {
            window.scrollTo(0,0)
            
        }

    }
    render() {
        return (
            <div className="container-page-loader">
                {this.props.loading?
                <div className="container-finish">
                <h3>Estamos testeando tu paciencia</h3>
                <div className="container-progress">
                <ProgressBar className="right" animated now={100}/>
                </div>
                <h4>Deja que SEIZ haga el trabajo aburrido.</h4>
                <p>SEIZ leerá y entenderá todos tus archivos en aproximadamente un minuto y medio.</p>
                <h3>Éste es el momento oportuno para ir por un café</h3>
                 </div>:

                <div>
                    <Redirect to='/upload'/>
                </div> 
                }

<Dialog
                    open={this.props.mensaje.exist}
                    onClose={() => {
                        this.props.goToStep(1)
                        this.props.handleResetMensaje()
                        
                    }
                    }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Confirmación de embargo"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.mensaje.mensaje}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={() => {
                            this.props.goToStep(1)
                            this.props.handleResetMensaje()
                            
                        }} color="primary" autoFocus>
                            Aceptar
                                          </Button>
                    </DialogActions>
                </Dialog>

                
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    loading: state.uploadReducer.loading,
    mensaje: state.uploadReducer.mensaje
})
const mapDispatchToProps=(dispatch)=>({
    handleResetMensaje: bindActionCreators(resetMensaje, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Loader)