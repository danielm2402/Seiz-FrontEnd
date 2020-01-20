import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import './Sencond.css'
class Loader extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.loading !== prevProps.loading) {
            window.scrollTo(0,0)
            
        }

    }
    render() {
        return (
            <div>
                {this.props.loading?<ProgressBar className="right" animated now={100} />:<div>
                    <p>Documentos cargados</p>
                    <button onClick={()=>this.props.goToStep(1)}>Volver</button>
                    </div>}
                
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