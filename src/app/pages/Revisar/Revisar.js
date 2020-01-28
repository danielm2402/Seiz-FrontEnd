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
import Select from 'react-select'
import { ProgressBar } from 'react-bootstrap';
const options = [
    { value: 'NO_SELECCIONADO', label: 'NO SELECCIONADO' },
    { value: 'FAMILIAR', label: 'FAMILIAR' },
    { value: 'JUDICIAL', label: 'JUDICIAL' },
    { value: 'COACTIVO', label: 'COACTIVO' },
    { value: 'COOPERATIVA', label: 'COOPERATIVA' }
]

const options2 = [
    { value: 'NO_SELECCIONADO', label: 'NO SELECCIONADO' },
    { value: 'EMBARGO', label: 'EMBARGO' },
    { value: 'DESEMBARGO', label: 'DESEMBARGO' },
    { value: 'REQUERIMIENTO', label: 'REQUERIMIENTO' },
]


class Revisar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            view: '',
            json: '',
            loading: true,
            numPages: null,
            pageNumber: 1,
            referencia: props.embargo.data.id,
            entidad: props.embargo.data.sender,
            direccion: props.embargo.data.address,
            ciudad: props.embargo.data.city,
            fecha: props.embargo.data.documentDate,
            tipoEmbargo: props.embargo.data.embargoType,
            tipoDocumento: props.embargo.data.documentType

        }
    }
    componentDidMount() {
        console.log('HOLA MUNDOOO')
        console.log(this.state.entidad)
        console.log(this.props.embargo.data.sender)
        this.props.handleEmbargo(this.props.match.params.id, this.props.token)
        this.props.handleDemandados(this.props.match.params.id, this.props.token)

    }
    componentDidUpdate(prevProps) {
        console.log('CAMBIANDO PROPS')
        if (this.props.document !== prevProps.document) {
            this.setState({
                referencia: this.props.embargo.data.id,
                entidad: this.props.embargo.data.sender,
                direccion: this.props.embargo.data.address,
                ciudad: this.props.embargo.data.city,
                fecha: this.props.embargo.data.documentDate,
                tipoEmbargo:{ label: this.props.embargo.data.embargoType, value: this.props.embargo.data.embargoType } ,
                tipoDocumento: { label: this.props.embargo.data.documentType, value: this.props.embargo.data.documentType },
                disabled:true

            })
            console.log(this.props.embargo)
        }

    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }
    render() {
        const { pageNumber, numPages } = this.state;
        var columns = [
            { title: 'Nombre', field: 'fullname' },
            { title: 'Identificación', field: 'id' },
        ]
        return (
            <div>
                {this.props.loadingEmbargo || this.props.loadingDemandados ?
                    <div className="container-progress">
                    <ProgressBar className="right" animated now={100}/>
                    </div> :
                    <div className="container-view">
                        <div className="container-document">
                            <PDFObject url={this.props.document} page={1} />
                        </div>
                        <div className="section-table">
                            <div className="information-card">
                                <label for="entidad">Entidad Remitente</label>
                                <input id="entidad" name="entidad" value={this.state.entidad} disabled={this.state.disabled} />
                                <div className="section-information-cols">
                                    <div className="section-information-col">
                                        <label for="ciudad" >Ciudad</label>
                                        <input id="ciudad" name="ciudad" value={this.state.ciudad} disabled={this.state.disabled} />
                                        <label for="referencia">Referencia</label>
                                        <input id="referencia" name="referencia" value={this.state.referencia} disabled={this.state.disabled} />
                                        <label>Tipo de embargo</label>
                                        <div className="select-input">
                                            <Select options={options} value={this.state.tipoEmbargo} isDisabled={this.state.disabled} />
                                        </div>
                                    </div>
                                    <div className="section-information-col">
                                        <label for="direccion">Direccion</label>
                                        <input id="direccion" name="direccion" value={this.state.direccion} disabled={this.state.disabled} />
                                        <label for="fecha">Fecha</label>
                                        <input id="fecha" name="fecha" value={this.state.fecha} disabled={this.state.disabled} />
                                        <label>Tipo de documento</label>
                                        <div className="select-input">
                                            <Select options={options2} value={this.state.tipoDocumento} isDisabled={this.state.disabled}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {// <Tabla />
                                //<Demandantes nombre="Demandantes" columns={columns} data={this.props.embargo.data.plaintiffs} />
                            }
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
