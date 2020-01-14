import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import {uploadRequest} from '../../redux/actions/uploadAction'
import './First.css'
class First extends Component {
    constructor(props){
        super(props)
        this.state={
            files:null
        }
    }
    onChangeHandler=event=>{
        this.setState({
          files:event.target.files,
        }, function(){
            this.props.handleRequestUpload(this.state.files, this.props.token)
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
                            <input id="file-input" type="file" onChange={this.onChangeHandler} multiple/>
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
    handleRequestUpload: bindActionCreators(uploadRequest,dispatch)
})
const mapStateToProps=(state)=>({
    token: state.auth.authToken
})

export default connect(mapStateToProps, mapDispatchToProps)(First)