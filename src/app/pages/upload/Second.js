import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import './Sencond.css'
class Second extends Component {
    componentDidMount(){
        console.log('SECOND FILES')
        console.log(this.props.file)
    }
    componentWillUpdate(){
        console.log(this.props.files)
    }
    render() {
        return (
            <div className="contenedor-files">
                
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    files: state.uploadReducer
})

export default connect(mapStateToProps,null)(Second)
