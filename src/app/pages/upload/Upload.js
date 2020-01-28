import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {updateLoader} from '../../redux/actions/uploadAction'
import StepWizard from 'react-step-wizard';
import First from './First'
import Second from './Second'
import Loader from './Loader'
import Resultados from './Resultados'
 class Upload extends Component {
    componentDidMount(){
        this.props.updateLoader()
    }
    componentWillMount(){
        this.props.updateLoader()
    }
    render() {
        return (
            <StepWizard>
                <First/>
                <Second/>
                <Loader/>
                <Resultados/>
                
            </StepWizard>
        )
    }
}
const mapDispatchToProps=(dispatch)=>({
    updateLoader: bindActionCreators(updateLoader,dispatch)
})
export default connect(null, mapDispatchToProps)(Upload)
