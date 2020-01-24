import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getDemandados, getEmbargo } from '../../redux/actions/embargosAction'
import Tabla from './Tabla'
import FileViewer from 'react-file-viewer';

import axios from 'axios'
import './Tabla.css'
import { PDFReader } from 'reactjs-pdf-reader';

class Revisar extends Component {
    constructor(props){
        super(props)
        this.state={
            view:'',
            json:'',
            loading:true,
            numPages: null,
     pageNumber: 1
        }
    }
    componentDidMount() {
        console.log(this.props)
        this.props.handleEmbargo(this.props.match.params.id, this.props.token)
        this.props.handleDemandados(this.props.match.params.id, this.props.token)
        
    }
    componentDidUpdate(prevProps){
        if(this.props.embargo.data.urlEmbargoFile!==prevProps.embargo.data.urlEmbargoFile){
            console.log('CAMBIANDO URL')
            axios({
                url: this.props.embargo.data.urlEmbargoFile,
                method: 'GET',
                responseType: 'blob', // important
                headers: { Authorization: 'Bearer ' + this.props.token, }
              }).then((response) => {
                //url = window.URL.createObjectURL(new Blob([response.data]));
                var file = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'},'view.pdf'));
            
                this.setState({view:file, loading:false},()=>{
                    console.log(this.state.view)
                })
              }) 
                 
              axios({
                url: (this.props.embargo.data.urlEmbargoFile.split('.pdf')[0])+'.json',
                method: 'GET',
                responseType: 'blob', // important
                headers: { Authorization: 'Bearer ' + this.props.token, }
              }).then((response) => {
                //url = window.URL.createObjectURL(new Blob([response.data]));
                var file = window.URL.createObjectURL(new Blob([response.data], {type: 'application/json'},'view.json'));
               axios({
                url: file,
                method: 'GET',
               }).then((response)=>{
                   console.log(response)
               })
              })       
        }
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
      }
    render() {
        const { pageNumber, numPages } = this.state;
        return (
            <div>
                {this.props.loadingEmbargo || this.props.loadingDemandados ?
                    <div>LOADINGGGG</div> :
                    <div className="container-view">
                        <div className="container-document">
                            <PDFReader url={this.props.document}/>
                        </div>
                        <div className="section-table">
                            <Tabla />
                        </div>
                    </div>}
            </div>
        )
    }
    onError(e) {
        console.log(e, 'error in file-viewer');
      }
}


const mapStateToProps = (state) => ({
    token: state.auth.authToken,
    loadingEmbargo: state.EmbargosReducer.embargo.loading,
    loadingDemandados: state.EmbargosReducer.demandados.loading,
    document: state.EmbargosReducer.embargo.document,
    embargo: state.EmbargosReducer.embargo
})
const mapDispatchToProps = (dispatch) => ({
    handleEmbargo: bindActionCreators(getEmbargo, dispatch),
    handleDemandados: bindActionCreators(getDemandados, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Revisar)
