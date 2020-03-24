import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { updateLoader, setPositionProcess } from '../../redux/actions/uploadAction'
import{resetMensaje} from '../../redux/actions/excelActions'
import StepWizard from 'react-step-wizard';
import First from './First'
import Second from './Second'
import Loader from './Loader'
import Resultados from './Resultados'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withRouter } from "react-router-dom";
import './Upload.css'
class Upload extends Component {
    componentDidMount() {
        this.props.handlePosition(0)
        this.props.updateLoader()
        console.log('LAS PROPS DE STEP')
        console.log(this.props.match.params.id)
    }
    componentWillMount() {
        this.props.updateLoader()
    }
    render() {
        return (
            <div className="container-todo-process">

                <StepWizard>
                    <First id={this.props.match.params.id} />
                    <Second id={this.props.match.params.id} />
                    <Loader />
                    <Resultados />

                </StepWizard>
                <Dialog
                    open={this.props.mensaje.exist}
                    onClose={() => {
                        this.props.handleResetMensaje()
                        
                    }
                    }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Subir archivo xsln"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.mensaje.msj}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={() => {
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
const mapStateToProps = (state) => ({
    item: state.uploadReducer.item,
    mensaje: state.excelReducer.mensaje
})
const mapDispatchToProps = (dispatch) => ({
    updateLoader: bindActionCreators(updateLoader, dispatch),
    handlePosition: bindActionCreators(setPositionProcess, dispatch),
    handleResetMensaje: bindActionCreators(resetMensaje, dispatch)
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Upload))
