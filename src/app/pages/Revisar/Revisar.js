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
            boundig: { boundig: false, points: [] }
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
        this.setState({ disabled: false})
    }
    handleCancel = () => {
        this.setState({ disabled: true,boundig:{boundig:false, points:[]}  })
    }
    focusElement(e, palabra) {
        if(this.props.resaltado!==""){
            console.log(e.target.value)
            console.log(palabra)
            let vectorLocation=[];
            let totalBoundig = [];
            for (const prop in palabra.fieldInstances) {
                console.log(`palabra.fieldInstances.${prop}`);
                for(const prop1 in palabra.fieldInstances[prop].parts){
                    console.log(palabra.fieldInstances[prop].parts[prop1])
                    vectorLocation.push({start:palabra.fieldInstances[prop].parts[prop1].startLocation, end:palabra.fieldInstances[prop].parts[prop1].endLocation, page:palabra.fieldInstances[prop].parts[prop1].page })
                }
              }
              console.log(vectorLocation)
              vectorLocation.map((item)=>{
                  var iterador= item.start
                  for (iterador; iterador <= item.end; iterador++) {
                    totalBoundig.push(this.props.json.pages[0].words[iterador].boundingPoly.vertices)
                  }
              })
           /* console.log(palabra.fieldInstances.map((item)=>{
                item.parts.map((item1)=>{
                   vectorLocation.push({start:item1.startLocation, end:item1.endLocation})
                    
                })
            }))
     */
    
           /*  let totalBoundig = []
    
    
             var palabra = ((this.state[e.target.name]).toString()).split(' ')
            var selector = []
            var contador = 0
            for (let index = 0; index < palabra.length; index++) {
                selector[contador] = this.props.json.pages[this.state.pageNumber - 1].words.filter((item) => (palabra[index].trim()) == (item.text.trim()))
                contador = contador + 1
            }
            console.log(selector)
            
            console.log(selector.map((item) => {
                item.map((item2) => {
                    console.log(item2)
                    totalBoundig.push(item2.boundingPoly.vertices)
                    return item2.text
                })
            }))
            */
            console.log('totalboundig')
            console.log(totalBoundig) 
    
            this.setState({
                boundig: { boundig: true, points: totalBoundig }
            }) 
        }
       
    }
    focusElement2(e) {
        console.log(e.target.value)
         var palabra = (e.target.value.toString()).split(' ')
        var selector = []
        var contador = 0
        for (let index = 0; index < palabra.length; index++) {
            selector[contador] = this.props.json.pages[this.state.pageNumber - 1].words.filter((item) => (palabra[index].trim()) == (item.text.trim()))
            contador = contador + 1
        }
        console.log(selector)
        let totalBoundig = []
        console.log(selector.map((item) => {
            item.map((item2) => {
                console.log(item2)
                totalBoundig.push(item2.boundingPoly.vertices)
                return item2.text
            })
        }))
        console.log('totalboundig')
        console.log(totalBoundig)

        this.setState({
            boundig: { boundig: true, points: totalBoundig }
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
                            {this.state.boundig.points.length > 0 ?
                            <svg className="lienzo" xmlns="http://www.w3.org/2000/svg">
                                {
                                this.state.boundig.points.map((item) => {
                                    return(
                                        <polygon fill="#90FEA5" fill-opacity="0.4" points={`${(item[0].x)*612} ${(item[0].y)*792}, 
                                        ${(item[1].x)*612} ${(item[1].y)*792}, 
                                        ${(item[2].x)*612} ${(item[2].y)*792}, 
                                        ${(item[3].x)*612} ${(item[3].y)*792}`} />)
                                })
                            }
                                </svg>: <></>
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
                                <input id="entidad" name="entidad" value={this.state.entidad} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e, (this.props.resaltado!==""?this.props.resaltado.fields.entidadRemitente:null))}} />
                                <div className="section-information-cols">
                                    <div className="section-information-col">
                                        <label for="ciudad" >Ciudad</label>
                                        <input id="ciudad" name="ciudad" value={this.state.ciudad} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e, this.props.resaltado.fields.ciudad) }} />
                                        <label for="referencia">Referencia</label>
                                        <input id="referencia" name="referencia" value={this.state.referencia} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e, (this.props.resaltado!==""?this.props.resaltado.fields.referencia:null)) }} />
                                        <label>Tipo de embargo</label>
                                        <div className="select-input">
                                            <Select options={options} value={this.state.tipoEmbargo} isDisabled={this.state.disabled} onFocus={(e) => { this.focusElement(e) }} />
                                        </div>
                                    </div>
                                    <div className="section-information-col">
                                        <label for="direccion">Direccion</label>
                                        <input id="direccion" name="direccion" value={this.state.direccion} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e, (this.props.resaltado!==""? this.props.resaltado.fields.direccion:null)) }} />
                                        <label for="fecha">Fecha</label>
                                        <input id="fecha" name="fecha" value={this.state.fecha} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e, this.props.resaltado.fields.fecha) }} />
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
                                                    <td><input value={item.fullname}  disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e) }} /></td>
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
                                                    <td><input value={item.nombres} name={'name'+item.identificacion} disabled={this.state.disabled} onFocus={(e) => { this.focusElement2(e) }} /></td>
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
    json: state.EmbargosReducer.embargo.json,
    resaltado: state.EmbargosReducer.embargo.json1

})
const mapDispatchToProps = (dispatch) => ({
    handleEmbargo: bindActionCreators(getEmbargo, dispatch),
    handleDemandados: bindActionCreators(getDemandados, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Revisar)
