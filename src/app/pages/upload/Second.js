import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { uploadRequest,setPositionProcess } from '../../redux/actions/uploadAction'
import './Sencond.css'
import axios from 'axios'
import { TiDocumentText } from "react-icons/ti";


class Second extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: []
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.files !== prevProps.files) {
            this.setState({files:[]})
            var urls = this.props.files
            var id = 0
            urls.map(async (item) => {
                let blob = await fetch(item.url).then(r => r.blob());
                var file = new File([blob], item.name);
                this.setState({ files: [...this.state.files, file] }, () => {
                    console.log(this.state.files)
                })
            })
        }

    }


    handleLoad = () => {
        console.log('LOADING');
        this.props.handlePosition(2)
        this.props.handleRequest(this.state.files, this.props.token)
        this.props.nextStep()
    }
    handleDocs = async () => {
        let blob = await fetch(this.props.files).then(r => r.blob());
        console.log(blob)
        var file = new File([blob], "name");
        console.log(file)
    }
    render() {
        return (
            <div className="contenedor-files">
                <div className="elements-render">
                    {this.state.files.map((item) => {
                        return (
                            <div className="container-item-document">
                                <TiDocumentText style={{ color:'#E7E7E7', width: '200px', height: '200px' }} />
                                <p>{item.name}</p>
                            </div>
                        )
                    })}
                </div>

                <div>
                    <button className="button-seiziar" onClick={this.handleLoad}>SEIZIAR</button>
                </div>
            </div>
        )
    }
}

const mapDisptachToProps = (dispatch) => ({
    handlePosition: bindActionCreators(setPositionProcess,dispatch),
    handleRequest: bindActionCreators(uploadRequest, dispatch)
})
const mapStateToProps = (state) => ({
    files: state.uploadReducer.files,
    token: state.auth.authToken
})

export default connect(mapStateToProps, mapDisptachToProps)(Second)
