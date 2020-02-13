import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getDemandados, getEmbargo } from '../../redux/actions/embargosAction'
import Tabla from './Tabla'
import { PDFObject } from 'react-pdfobject'
import './Tabla.css'
import { PDFReader } from 'reactjs-pdf-reader';
import { PDFViewer } from '@react-pdf/renderer';
import TextField from '@material-ui/core/TextField';
import { FaRegEdit, FaTable } from "react-icons/fa";
import { MdCancel, MdPhotoSizeSelectSmall, MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import Select from 'react-select'
import { ProgressBar } from 'react-bootstrap';
import { setOptions, Document, Page } from "react-pdf";
import Demandados from './Demandados'
import Demandantes from './Demandantes';
import chroma from 'chroma-js';
import ReactCrop from 'react-image-crop';


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
const dot = (color = '#ccc') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: 'block',
        marginRight: 8,
        height: 10,
        width: 10,
    },
});

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    input: styles => ({ ...styles, ...dot() }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma('blue');
        return {
            ...styles,
            zIndex: '99',
            color: 'blue'

        };
    },
    placeholder: styles => ({ ...styles, ...dot() }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot('blue') }),
};

class Revisar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            view: '',
            json: '',
            loading: true,
            numPages: 0,
            pageNumber: 1,
            referencia: props.embargo.data.id,
            entidad: props.embargo.data.sender,
            direccion: props.embargo.data.address,
            ciudad: props.embargo.data.city,
            fecha: props.embargo.data.documentDate,
            tipoEmbargo: props.embargo.data.embargoType,
            tipoDocumento: props.embargo.data.documentType,
            disabled: true,
            boundig: { boundig: false, points: [] },
            demandantes: [],
            isDown: false,
            previousPointX: '',
            previousPointY: '',
            editCanvas: false,
            actualFocus: '',
            rectangle: {},
        }
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }
    _crop() {
        // image in dataUrl
        console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
    }
    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
    }

    componentDidMount() {
 
        console.log(this.state.entidad)
        console.log(this.props.embargo.data.sender)
        this.props.handleEmbargo(this.props.match.params.id, this.props.token)
        this.props.handleDemandados(this.props.match.params.id, this.props.token)

    }
    componentDidUpdate(prevProps, prevState) {
        
        if (this.props.document !== prevProps.document) {
           
            this.setState({
                referencia: this.props.embargo.data.id,
                entidad: this.props.embargo.data.sender,
                direccion: this.props.embargo.data.address,
                ciudad: this.props.embargo.data.city,
                fecha: this.props.embargo.data.documentDate,
                tipoEmbargo: { label: this.props.embargo.data.embargoType, value: this.props.embargo.data.embargoType },
                tipoDocumento: { label: this.props.embargo.data.documentType, value: this.props.embargo.data.documentType },
                demandantes: this.props.embargo.data.plaintiffs,
                disabled: true,
                crop: {
                    unit: '%',
                    width: 30,
                    aspect: 16 / 9,
                },
               

            })
          
        }
        if(this.props.json !== prevProps.json && this.props.json !== undefined){
            console.log('JSOOOON')
            console.log(this.props)
            this.setState({
                numPages:this.props.json.pages.length
            },()=>{
                console.log('AQUI EL NUEVO STATE')
                console.log(this.state.numPages)
            })
           
        }
       
    }
    handleEdit = () => {
        this.setState({ disabled: false })
    }
    handleCancel = () => {
        this.setState({ disabled: true, boundig: { boundig: false, points: [] }, editCanvas: false })
    }
    focusElement(e, palabra) {

        console.log(e.target.name)
        this.setState({ actualFocus: e.target.name })
        if (this.props.resaltado !== "") {
            console.log(e.target.value)
            console.log(palabra)
            try {
                let vectorLocation = [];
                let totalBoundig = [];
                for (const prop in palabra.fieldInstances) {
                    console.log(`palabra.fieldInstances.${prop}`);
                    for (const prop1 in palabra.fieldInstances[prop].parts) {
                        console.log(palabra.fieldInstances[prop].parts[prop1])
                        vectorLocation.push({ start: palabra.fieldInstances[prop].parts[prop1].startLocation, end: palabra.fieldInstances[prop].parts[prop1].endLocation, page: palabra.fieldInstances[prop].parts[prop1].page })
                    }
                }
                console.log(vectorLocation)
                vectorLocation.map((item) => {
                    var iterador = item.start
                    for (iterador; iterador <= item.end; iterador++) {
                        totalBoundig.push(this.props.json.pages[this.state.pageNumber - 1].words[iterador].boundingPoly.vertices)
                    }
                })
                console.log('totalboundig')
                console.log(totalBoundig)

                this.setState({
                    boundig: { boundig: true, points: totalBoundig }
                })
            } catch (error) {

            }
        }

    }
    focusElement2(e, palabra, id, tipo) {
        console.log('el id')
        console.log(id)
        console.log(palabra)
        if (this.props.resaltado !== "") {
            try {


                let vectorLocation = [];
                let totalBoundig = [];
                const row = palabra.fieldInstances[id].parts[tipo]
                console.log(row)
                vectorLocation.push({ start: row.startLocation, end: row.endLocation, page: row.page })


                console.log(vectorLocation)
                vectorLocation.map((item) => {
                    var iterador = item.start
                    for (iterador; iterador <= item.end; iterador++) {
                        totalBoundig.push(this.props.json.pages[0].words[iterador].boundingPoly.vertices)
                    }
                })
                console.log('totalboundig')
                console.log(totalBoundig)

                this.setState({
                    boundig: { boundig: true, points: totalBoundig }
                })
            } catch (error) {

            }
        }
    }

    editCanvas = () => {
        this.setState({ editCanvas: true })
    }

    render() {
        const { pageNumber, numPages } = this.state;
        var columns = [
            {
                title: 'Nombre', field: 'nombres', editComponent: props => {
                    return (
                        <TextField
                            id="name"
                            value={props.value}
                            label="Nombre"
                            margin="normal"
                            onFocus={(e) => this.focusElement2(e, this.props.resaltado.fields.demandados, props.rowData.id, 'nombre')}
                        />
                    )
                }
            },
            {
                title: 'Tipo', field: 'tipoIdentificacion', editComponent: props => {
                    return (
                        <TextField
                            id="tipo"
                            value={props.value}
                            label="Tipo"
                            margin="normal"

                        />
                    )
                }
            },
            {
                title: 'Identificación', field: 'identificacion', editComponent: props => {
                    return (
                        <TextField
                            id="id"
                            value={props.value}
                            label="Identificacion"
                            margin="normal"
                            onFocus={(e) => this.focusElement2(e, this.props.resaltado.fields.demandados, props.rowData.id, 'identificacion')}
                        />
                    )
                }
            },
            {
                title: 'Cuentas', field: 'montoAEmbargar', editComponent: props => {
                    return (
                        <TextField
                            id="cuentas"
                            value={props.value}
                            label="Cuentas"
                            margin="normal"
                            onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.monto : null)) }}
                        />
                    )
                }
            }
        ]
        var columns1 = [
            {
                title: 'Nombre', field: 'fullname', editComponent: props => {
                    return (
                        <TextField
                            id="name"
                            value={props.value}
                            label="Nombre"
                            margin="normal"
                            onFocus={(e) => {
                                console.log(props)
                                this.focusElement2(e, this.props.resaltado.fields.demandantes, props.rowData.id, 'nombre')
                            }}
                        />
                    )
                }
            },
            {
                title: 'Identificación', field: 'identification', editComponent: props => {
                    return (
                        <TextField
                            id="id"
                            value={props.value}
                            label="Identificacion"
                            margin="normal"

                            onFocus={(e) => this.focusElement2(e, this.props.resaltado.fields.demandantes, props.rowData.id, 'identificacion')}
                        />
                    )
                }
            },
        ]

        var add = null
        this.props.disabled == true ?
            add = null
            : add = newData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            const data = this.state.data;
                            data.push(newData);
                            this.setState({ data }, () => resolve());
                        }
                        resolve()
                    }, 1000)
                })


        return (
            <div>

                {this.props.loadingEmbargo || this.props.loadingDemandados ?
                    <div className="container-progress">
                        <ProgressBar className="right" animated now={100} />
                    </div> :
                    <div>
                        <div style={{ width: '100%', backgroundColor: '#fff' }}>
                            <div className="document-tools">

                            </div>
                        </div>
                        <div className="container-view">
                            <div className="section-document">
                                <div className="tools-doc">
                                    <div className="tools-edit" >
                                        <div className="tools-edit-num">
                                            {this.state.numPages}/{this.state.pageNumber}
                                        </div>
                                        <div className="tools-edit-change">
                                        {this.state.numPages>1 && this.state.pageNumber>1?
                                        <button onClick={() =>{
                                            console.log('BUTON BUENO')
                                            console.log(this.state.numPages, this.state.pageNumber)
                                            this.setState({ pageNumber: this.state.pageNumber - 1 })}}><MdNavigateBefore size="1.5em" color={"#BDD535"} /></button>
                                        :<button disabled={true} onClick={()=>console.log('BOTON DESAHIBILITADO')} ><MdNavigateBefore size="1.5em" color={"#BDD535"} /></button>}
                                        </div>
                                    </div>
                                    <div className="tools-page">
                                        <div className="tools-page-center">
                                            {this.state.numPages>1 && this.state.pageNumber<this.state.numPages?
                                            <button onClick={() => this.setState({ pageNumber: this.state.pageNumber + 1 })}><MdNavigateNext size="1.5em" color={"#BDD535"} /></button>:
                                            <button disabled={true} onClick={()=>console.log('BOTON DESAHIBILITADO')}><MdNavigateNext size="1.5em" color={"#BDD535"} /></button>}
                                           
                                        </div>
                                        {this.state.disabled?<></>:
                                        <div className="tools-page-right">
                                            <button className="button-select" onClick={this.editCanvas}><MdPhotoSizeSelectSmall size="1.5em" color={"#BDD535"} /></button>
                                            <button onClick={this.editCanvas}><FaTable size="1.5em" color={"#BDD535"} /></button>
                                        </div>}
                                    </div>
                                </div>
                                <div className="container-document">


                                    {this.state.boundig.points.length > 0 ?
                                        <svg className="lienzo" xmlns="http://www.w3.org/2000/svg">
                                            {
                                                this.state.boundig.points.map((item) => {
                                                    return (
                                                        <polygon fill="#90FEA5" fill-opacity="0.4" points={`${(item[0].x) * 612} ${(item[0].y) * 792}, 
                                        ${(item[1].x) * 612} ${(item[1].y) * 792}, 
                                        ${(item[2].x) * 612} ${(item[2].y) * 792}, 
                                        ${(item[3].x) * 612} ${(item[3].y) * 792}`} />)
                                                })
                                            }
                                        </svg> : <></>
                                    }
                                    <canvas ref="canvas" width="612" height="792" className="canvas-edit"
                                        onMouseDown={
                                            e => {
                                                let nativeEvent = e.nativeEvent;
                                                this.handleMouseDown(nativeEvent);
                                            }}
                                        onMouseMove={
                                            e => {
                                                let nativeEvent = e.nativeEvent;
                                                this.handleMouseMove(nativeEvent);
                                            }}
                                        onMouseUp={
                                            e => {
                                                let nativeEvent = e.nativeEvent;
                                                this.handleMouseUp(nativeEvent);
                                            }}
                                    />
                                    <Document
                                        file={this.props.document}
                                        onLoadSuccess={this.onDocumentLoadSuccess}
                                    >
                                        <Page pageNumber={pageNumber} />
                                    </Document>


                                </div>
                            </div>
                            <div className="section-table">
                                <div className="buttons-edits">

                                    {!this.state.disabled ? <button onClick={this.handleCancel}><MdCancel size="1.5em" color={"#BDD535"} /></button> : <button onClick={this.handleEdit}><FaRegEdit size="1.5em" color={"#BDD535"} /></button>}
                                </div>
                                <div className="information-card">
                                    <label for="entidad">Entidad Remitente</label>
                                    <input id="entidad" name="entidad" value={this.state.entidad} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.entidadRemitente : null)) }} />
                                    <div className="section-information-cols">
                                        <div className="section-information-col">
                                            <label for="ciudad" >Ciudad</label>
                                            <input id="ciudad" name="ciudad" value={this.state.ciudad} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.ciudad : null)) }} />
                                            <label for="referencia">Referencia</label>
                                            <input id="referencia" name="referencia" value={this.state.referencia} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.referencia : null)) }} />
                                            <label>Tipo de embargo</label>
                                            <div className="select-input" style={{ zIndex: 999999999 }}>
                                                <Select styles={colourStyles} options={options} value={this.state.tipoEmbargo} isDisabled={this.state.disabled} />
                                            </div>
                                        </div>
                                        <div className="section-information-col">
                                            <label for="direccion">Direccion</label>
                                            <input id="direccion" name="direccion" value={this.state.direccion} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.direccion : null)) }} />
                                            <label for="fecha">Fecha</label>
                                            <input id="fecha" name="fecha" value={this.state.fecha} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.fecha : null)) }} />
                                            <label>Tipo de documento</label>
                                            <div className="select-input">
                                                <Select options={options2} value={this.state.tipoDocumento} isDisabled={this.state.disabled} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Demandantes add={add} data={this.state.demandantes} nombre="Demandantes" columns={columns1} editable={!this.state.disabled} />
                                <Demandados add={add} data={this.props.demandados.data} nombre="Demandados" columns={columns} editable={!this.state.disabled} />
                            </div>
                        </div>
                    </div>}
            </div>
        )
    }
    onError(e) {
        console.log(e, 'error in file-viewer');
    }
    handleMouseDown(event) { //added code here
        if (this.state.editCanvas) {
            console.log('DOWN')
            console.log(event);
            this.setState({
                isDown: true,
                isDownCount: 1,
                previousPointX: event.offsetX,
                previousPointY: event.offsetY
            }, () => {

            })

        }

    }
    handleMouseMove(event) {
        if (this.state.editCanvas) {
            var x = event.offsetX;
            var y = event.offsetY;
            if (this.state.isDown) {
                const ctx = this.refs.canvas.getContext('2d');
                ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height); //clear canvas
                ctx.beginPath();
                ctx.fillStyle = "rgba(0,0,0, 0.4)";
                ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
                var width = x - this.state.previousPointX;
                var height = y - this.state.previousPointY;
                ctx.beginPath();
                ctx.lineWidth = "1";
                ctx.strokeStyle = "red";
                ctx.fillStyle = "rgba(255,255,255, 0.5)";
                ctx.fillRect(this.state.previousPointX, this.state.previousPointY, width, height);
                //console.log('EL RECTANGULO EN MOVIMIENTO ES:')
                //console.log(x,y,width,height)
                ctx.stroke();
            }
        }
    }
    handleMouseUp(event) {
        if (this.state.editCanvas) {
            var x = event.offsetX;
            var y = event.offsetY;
            var width = x - this.state.previousPointX;
            var height = y - this.state.previousPointY;
            this.setState({
                rectangle: { x: this.state.previousPointX, y: this.state.previousPointY, width: width, height: height }
            }, function () {
                let vector = []

                this.props.json.pages[this.state.pageNumber-1].words.map((item) => {
                    var x = ((((item.boundingPoly.vertices[1].x)) + ((item.boundingPoly.vertices[0].x))) / 2) * 612
                    var y = ((((item.boundingPoly.vertices[3].y)) + ((item.boundingPoly.vertices[0].y))) / 2) * 792

                    if ((x > this.state.previousPointX && x < (this.state.rectangle.width + this.state.previousPointX) && ((y > this.state.previousPointY) && (y < this.state.rectangle.height + this.state.previousPointY)))) {

                        vector.push(item)
                    }
                })
                var palabra = ''
                vector.map((item) => {
                    palabra = palabra + ' ' + item.text

                })
                console.log(palabra)
                this.setState({ [this.state.actualFocus]: palabra })
                // console.log(this.state[this.state.actualFocus])
            })

            const ctx = this.refs.canvas.getContext('2d');
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.fillStyle = "rgba(255,255,255, 0.5)";
            ctx.fillRect(this.state.previousPointX, this.state.previousPointY, width, height);
            ctx.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height); //clear canvas
            ctx.beginPath();
            this.setState({
                isDown: false
            });

        }
    }
    changeWord() {

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
    resaltado: state.EmbargosReducer.embargo.json1,

    prueba: state.EmbargosReducer

})
const mapDispatchToProps = (dispatch) => ({
    handleEmbargo: bindActionCreators(getEmbargo, dispatch),
    handleDemandados: bindActionCreators(getDemandados, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Revisar)
