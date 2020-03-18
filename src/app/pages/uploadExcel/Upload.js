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
