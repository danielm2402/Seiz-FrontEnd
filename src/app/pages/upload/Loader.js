import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";

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
                    <Redirect to='/dashboard'/>;
                </div> 
                }
                
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    loading: state.uploadReducer.loading
})
const mapDispatchToProps=(dispatch)=>({

})
export default connect(mapStateToProps, mapDispatchToProps)(Loader)