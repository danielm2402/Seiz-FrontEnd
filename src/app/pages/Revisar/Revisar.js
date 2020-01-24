import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getDemandados, getEmbargo } from '../../redux/actions/embargosAction'
import Tabla from './Tabla'
import { PDFObject } from 'react-pdfobject'
import { Document, Page, pdfjs } from 'react-pdf';
import './Tabla.css'
import { PDFReader } from 'reactjs-pdf-reader';
import { PDFViewer } from '@react-pdf/renderer';
import Demandantes from './Demandante'

class Revisar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            view: '',
            json: '',
            loading: true,
            numPages: null,
            pageNumber: 1
        }
    }
    componentDidMount() {

        this.props.handleEmbargo(this.props.match.params.id, this.props.token)
        this.props.handleDemandados(this.props.match.params.id, this.props.token)
    }
    componentDidUpdate() {
        console.log(this.props.document)
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }
    render() {
        const { pageNumber, numPages } = this.state;
        var columns=[
            {title:'Nombre', field:'fullname'},   
            { title: 'Identificación', field: 'id'},  
          ]
        return (
            <div>
                {this.props.loadingEmbargo || this.props.loadingDemandados ?
                    <div>LOADINGGGG</div> :
                    <div className="container-view">
                        <div className="container-document">
                        <PDFObject url={this.props.document} />
                        </div>
                        <div className="section-table">
                            <Tabla />
                            <Demandantes nombre="Demandantes" columns={columns} data={this.props.embargo.data.plaintiffs}/>
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
