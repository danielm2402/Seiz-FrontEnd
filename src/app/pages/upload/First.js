import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {addFile, setPositionProcess, resetMensaje} from '../../redux/actions/uploadAction'


import Second from './Second'
import './First.css'
class First extends Component {
    constructor(props){
        super(props)
        this.state={
            files:null
        }
    }
    onChangeHandler=event=>{
        this.props.handlePosition(1)
        this.setState({
          files:event.target.files,
        }, function(){
            console.log(this.state.files)
            var urls=[]
            for(var i=0;i<this.state.files.length;i++) {
                console.log('IMPRIMIENDO CADA ARCHIVO')
                console.log(this.state.files[i])
               urls.push(
                   { 
                   url: URL.createObjectURL(this.state.files[i]),
                   name: this.state.files[i].name
                   }
                   )
            }
            console.log('urlsss')
            console.log(urls)
            this.props.handleAddFile(urls)
            this.props.nextStep()
        })
      }
    render() {
        return (
            <div className="contenedor-upload">
                <div className="upload-file">
                    <div className="upload-cov">
                        <div class="image-upload">
                            <label for="file-input">
                                <img src="https://icon-library.net/images/upload-photo-icon/upload-photo-icon-21.jpg" />
                            </label>
                            <input id="file-input" type="file" multiple onChange={this.onChangeHandler}/>
                            <p>Suelta tus archivos aquí</p>
                            <p>Pueden ser varios</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps=(dispatch)=>({
    handleAddFile: bindActionCreators(addFile,dispatch),
    handlePosition: bindActionCreators(setPositionProcess,dispatch)
})
const mapStateToProps=(state)=>({
    token: state.auth.authToken,
    mensaje: state.uploadReducer.mensaje
})

export default connect(mapStateToProps, mapDispatchToProps)(First)