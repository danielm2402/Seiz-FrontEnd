import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import './Sencond.css'
import axios from 'axios'
import { TiDocumentText } from "react-icons/ti";


class Second extends Component {
    constructor(props){
        super(props)
        this.state={
            files:[]
        }
    }

    componentDidUpdate(){
        var urls= this.props.files
        var id=0
        urls.map(async(item)=>{
            let blob= await fetch(item).then(r => r.blob());
            var file = new File([blob], (id+1));
            this.setState({files:[...this.state.files,file]},()=>{
                console.log(this.state.files)
            })
        })
    }


    componentDidMount(){
       
    }
    handleDocs = async() => {
        let blob = await fetch(this.props.files).then(r => r.blob());
        console.log(blob)
        var file = new File([blob], "name");
        console.log(file)
    }   
    render() {
        return (
            <div className="contenedor-files">
                {this.props.files.map((item)=>{
                    return(
                        <div>
                            <TiDocumentText/>
                        </div>    
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    files: state.uploadReducer.files
})

export default connect(mapStateToProps, null)(Second)
