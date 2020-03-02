import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { updateLoader, setPositionProcess,resetMensaje } from '../../redux/actions/uploadAction'
import StepWizard from 'react-step-wizard';
import First from './First'
import Second from './Second'
import Loader from './Loader'
import Resultados from './Resultados'


import './Upload.css'
class Upload extends Component {
    componentDidMount() {
        this.props.handlePosition(0)
        this.props.updateLoader()
    }
    componentWillMount() {
        this.props.updateLoader()
    }
    render() {
        return (
            <div className="container-todo-process">
                <div className="header-process">
                    <div className="container-title">
                        <h5>Subir Oficios</h5>
                    </div>
                    <div className="container-process">
                        <div className="element-process">
                            <div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}} className={this.props.item === 0 ? "pointerinit" : "pointerinitdes"}>
                                <h5>Cargar</h5>
                                <h5>1/3</h5>
                            </div>

                        </div>

                        <div className="element-process">
                            <div style={{ paddingLeft:'25px', display:'flex', justifyContent:'space-around', alignItems:'center'}}  className={this.props.item === 1 ? "pointer" : "pointerdes"}>
                            <h5>Procesar</h5>
                                <h5>2/3</h5>
                            </div>

                        </div>
                        <div className="element-process">
                            <div style={{paddingLeft:'25px', display:'flex', justifyContent:'space-around', alignItems:'center'}} className={this.props.item === 2 ? "pointer" : "pointerdes"}>
                            <h5>Resultado</h5>
                                <h5>3/3</h5>
                            </div>

                        </div>
                    </div>
                </div>
                <StepWizard>
                    <First />
                    <Second />
                    <Loader />
                    <Resultados />

                </StepWizard>

               

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    item: state.uploadReducer.item,
    mensaje: state.uploadReducer.mensaje
})
const mapDispatchToProps = (dispatch) => ({
    updateLoader: bindActionCreators(updateLoader, dispatch),
    handlePosition: bindActionCreators(setPositionProcess, dispatch),
    handleResetMensaje: bindActionCreators(resetMensaje, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Upload)
