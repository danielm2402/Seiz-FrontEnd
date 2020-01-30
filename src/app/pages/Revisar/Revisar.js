import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getDemandados, getEmbargo } from '../../redux/actions/embargosAction'
import Tabla from './Tabla'
import { PDFObject } from 'react-pdfobject'
import './Tabla.css'
import { PDFReader } from 'reactjs-pdf-reader';
import { PDFViewer } from '@react-pdf/renderer';
import Demandantes from './Demandante'
import { FaRegEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";



import Select from 'react-select'
import { ProgressBar } from 'react-bootstrap';
import { setOptions, Document, Page } from "react-pdf";
const pdfjsVersion = "2.0.305";

setOptions({
    workerSrc: `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.js`
});

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
            tipoDocumento: props.embargo.data.documentType,
            disabled: true,
            boundig:{boundig:false,points:[]}
        }
    }
    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
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
                tipoEmbargo: { label: this.props.embargo.data.embargoType, value: this.props.embargo.data.embargoType },
                tipoDocumento: { label: this.props.embargo.data.documentType, value: this.props.embargo.data.documentType },
                disabled: true

            })
            console.log(this.props.embargo)
        }

    }
    handleEdit = () => {
        this.setState({ disabled: false })
    }
    handleCancel = () => {
        this.setState({ disabled: true })
    }
    focusElement(e) {
        //console.log(this.state[e.target.name])
        var palabra = ((this.state[e.target.name]).toString()).split(' ')
        var selector = []
        var contador = 0
        for (let index = 0; index < palabra.length; index++) {
            selector[contador] = this.props.json.pages[this.state.pageNumber - 1].words.filter((item) => (palabra[index].trim()) == (item.text.trim()))
            contador = contador + 1
        }
        console.log(selector)
        let totalBoundig=[]
       console.log(selector.map((item)=>{
           item.map((item2)=>{
               console.log(item2)
               totalBoundig.push(item2)
               return item2.text
           })
       }))
       console.log('totalboundig')
       console.log(totalBoundig)


        /* ctx.beginPath();
        ctx.moveTo((0.53431374*100),(0.05429293*100));
        ctx.lineTo(0.5686275*612,0.05429293*965);
        ctx.lineTo(0.5686275*612,0.061868686*965);
        ctx.lineTo(0.53431374*612,0.061868686*965)
        ctx.closePath();
        ctx.fill(); */
        this.setState({
            boundig:{boundig:true, points:[{x:0.4591503*612,y:0.13678756*965},{x:0.49509802*612,y:0.13678756*965},{x:0.49509802*612,y:0.15025906*965},{x:0.4591503*612,y:0.15025906*965}]}
        })

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
                        <ProgressBar className="right" animated now={100} />
                    </div> :
                    <div className="container-view">
                        <div className="container-document">
                            {this.state.boundig.boundig?
                            <svg className="lienzo"  xmlns="http://www.w3.org/2000/svg">
                            <polygon points={`${this.state.boundig.points[0].x}, ${this.state.boundig.points[0].y} ${this.state.boundig.points[1].x}, ${this.state.boundig.points[1].y} ${this.state.boundig.points[2].x}, ${this.state.boundig.points[2].y} ${this.state.boundig.points[3].x},${this.state.boundig.points[3].y} `} />
                            </svg>:<></>
                            }
                            

                            <Document
                                file={this.props.document}
                                onLoadSuccess={this.onDocumentLoadSuccess}
                            >
                                <Page pageNumber={pageNumber} />
                            </Document>


                        </div>
                        <div className="section-table">
                            <div className="buttons-edits">

                                {!this.state.disabled ? <button onClick={this.handleCancel}><MdCancel size="1.5em" color={"#BDD535"} /></button> : <button onClick={this.handleEdit}><FaRegEdit size="1.5em" color={"#BDD535"} /></button>}
                            </div>
                            <div className="information-card">
                                <label for="entidad">Entidad Remitente</label>
                                <input id="entidad" name="entidad" value={this.state.entidad} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e) }} />
                                <div className="section-information-cols">
                                    <div className="section-information-col">
                                        <label for="ciudad" >Ciudad</label>
                                        <input id="ciudad" name="ciudad" value={this.state.ciudad} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e) }} />
                                        <label for="referencia">Referencia</label>
                                        <input id="referencia" name="referencia" value={this.state.referencia} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e) }} />
                                        <label>Tipo de embargo</label>
                                        <div className="select-input">
                                            <Select options={options} value={this.state.tipoEmbargo} isDisabled={this.state.disabled} onFocus={(e) => { this.focusElement(e) }} />
                                        </div>
                                    </div>
                                    <div className="section-information-col">
                                        <label for="direccion">Direccion</label>
                                        <input id="direccion" name="direccion" value={this.state.direccion} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e) }} />
                                        <label for="fecha">Fecha</label>
                                        <input id="fecha" name="fecha" value={this.state.fecha} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e) }} />
                                        <label>Tipo de documento</label>
                                        <div className="select-input">
                                            <Select options={options2} value={this.state.tipoDocumento} isDisabled={this.state.disabled} onFocus={(e) => { this.focusElement(e) }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="information-card">
                                <div className="cols-demandantes">
                                    <table className="table-demandantes">
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Identificación</th>
                                        </tr>
                                        {this.props.embargo.data.plaintiffs.map((item) => {
                                            return (
                                                <tr>
                                                    <td><input value={item.fullname} disabled={this.state.disabled} /></td>
                                                    <td><input value={item.id} disabled={this.state.disabled} /></td>
                                                </tr>
                                            )
                                        })}
                                    </table>
                                </div>
                            </div>

                            <div className="information-card">
                                <div className="cols-demandantes">
                                    <table className="table-demandantes">
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Tipo</th>
                                            <th>Identificación</th>
                                            <th>Monto</th>
                                        </tr>
                                        {this.props.demandados.data.map((item) => {
                                            return (
                                                <tr>
                                                    <td><input value={item.nombres} disabled={this.state.disabled} /></td>
                                                    <td><input value={item.tipoIdentificacion} disabled={this.state.disabled} /></td>
                                                    <td><input value={item.identificacion} disabled={this.state.disabled} /></td>
                                                    <td><input value={item.montoAEmbargar} disabled={this.state.disabled} /></td>
                                                </tr>
                                            )
                                        })}
                                    </table>
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
    embargo: state.EmbargosReducer.embargo,
    demandados: state.EmbargosReducer.demandados,
    json: state.EmbargosReducer.embargo.json
})
const mapDispatchToProps = (dispatch) => ({
    handleEmbargo: bindActionCreators(getEmbargo, dispatch),
    handleDemandados: bindActionCreators(getDemandados, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Revisar)
