import React, { Component } from 'react'
import StepWizard from 'react-step-wizard';
import First from './First'
import Second from './Second'
import Loader from './Loader'
import Resultados from './Resultados'
export default class Upload extends Component {
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
