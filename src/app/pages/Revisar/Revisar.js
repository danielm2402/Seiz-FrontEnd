import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getDemandados, getEmbargo } from '../../redux/actions/embargosAction'
import Tabla from './Tabla'
import './Tabla.css'

import TextField from '@material-ui/core/TextField';
import { FaRegEdit, FaTable } from "react-icons/fa";
import { MdCancel, MdPhotoSizeSelectSmall, MdNavigateNext, MdNavigateBefore } from "react-icons/md";

import { ProgressBar } from 'react-bootstrap';
import { setOptions, Document, Page } from "react-pdf";
import Demandados from './Demandados'
import Demandantes from './Demandantes';
import chroma from 'chroma-js';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { changePoints, resetPoints, nuevaRegion } from '../../redux/actions/boundingAction'

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
            tipoEmbargo: '',
            tipoDocumento: '',
            disabled: true,
            boundig: { boundig: false, points: [] },
            demandantes: [],
            isDown: false,
            previousPointX: '',
            previousPointY: '',
            editCanvas: false,
            actualFocus: '',
            rectangle: {},
            demandados: [],
            activeModeTable: false,
            colsEdit: { nombre: 0, tipo:'NO_SELECCIONADO', identificacion: 2, expediente: 3 },
            obtenerDemandados:false
        }
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }
    modeTable = () => {
        console.log('edit table')
        this.setState({ activeModeTable: true, editCanvas: false, obtenerDemandados:false },function(){
            console.log(this.state.editCanvas)
            console.log(this.state.activeModeTable)
        })
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
        console.log(this.props)
        if (this.props.document !== prevProps.document) {

            this.setState({
                referencia: this.props.embargo.data.id,
                entidad: this.props.embargo.data.sender,
                direccion: this.props.embargo.data.address,
                ciudad: this.props.embargo.data.city,
                fecha: this.props.embargo.data.documentDate,
                tipoEmbargo: this.props.embargo.data.embargoType,
                tipoDocumento: this.props.embargo.data.documentType,
                demandantes: this.props.embargo.data.plaintiffs,
                disabled: true,
                crop: {
                    unit: '%',
                    width: 30,
                    aspect: 16 / 9,
                },


            }, function () {
                console.log(this.state)
            })

        }
        if (this.props.json !== prevProps.json && this.props.json !== undefined) {

            this.setState({
                numPages: this.props.json.pages.length
            }, () => {

            })

        }

        if (this.props.demandados !== prevProps.demandados) {
            if (this.props.demandados.data.length > 0) {
                console.log('demandados')
                console.log(this.props.demandados)
                let vectorDemandados = {}
                for (let index = 0; index < this.props.demandados.data.length; index++) {
                    vectorDemandados = { ...vectorDemandados, ['nombre' + this.props.demandados.data[index].id]: this.props.demandados.data[index].nombres }


                }
                this.setState({ demandados: vectorDemandados }, () => {
                    console.log(this.state.demandados)
                })
            }

        }


    }
    handleEdit = () => {
        this.setState({ disabled: false })
    }
    handleCancel = () => {
        this.setState({ disabled: true, boundig: { boundig: false, points: [] }, editCanvas: false, activeModeTable: false })
        this.props.handleBoundingReset()
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
    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, function () {
            console.log(this.state)
        })
    }

    editCanvas = () => {
        console.log('edit canva')
        this.setState({ editCanvas: true, activeModeTable:false, obtenerDemandados:false },function(){
            console.log(this.state.editCanvas)
            console.log(this.state.activeModeTable)
        })
    }

    render() {
        const { pageNumber, numPages } = this.state;


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
                                       <label> {this.state.pageNumber}/{this.state.numPages}</label>
                                        </div>
                                        <div className="tools-edit-change">
                                            {this.state.numPages > 1 && this.state.pageNumber > 1 ?
                                                <button onClick={() => {
                                                    
                                                    this.setState({ pageNumber: this.state.pageNumber - 1 })
                                                }}><MdNavigateBefore size="1.5em" color={"#BDD535"} /></button>
                                                : <button disabled={true} onClick={() => console.log('BOTON DESAHIBILITADO')} ><MdNavigateBefore size="1.5em" color={"#BDD535"} /></button>}
                                        </div>
                                    </div>
                                    <div className="tools-page">
                                        <div className="tools-page-center">
                                            {this.state.numPages > 1 && this.state.pageNumber < this.state.numPages ?
                                                <button onClick={() => this.setState({ pageNumber: this.state.pageNumber + 1 })}><MdNavigateNext size="1.5em" color={"#BDD535"} /></button> :
                                                <button disabled={true} onClick={() => console.log('BOTON DESAHIBILITADO')}><MdNavigateNext size="1.5em" color={"#BDD535"} /></button>}

                                        </div>
                                        {this.state.disabled ? <></> :
                                            <div className="tools-page-right">
                                                <button className="button-select" onClick={this.editCanvas}><MdPhotoSizeSelectSmall size="1.5em" color={"#BDD535"} /></button>
                                                <button onClick={this.modeTable}><FaTable size="1.5em" color={"#BDD535"} /></button>
                                                {this.state.obtenerDemandados? <button onClick={this.modeTable}>Obtener Demandados</button>:<></>}
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
                                    {this.props.boundingRedux.points.length > 0 ?
                                        <svg className="lienzo" xmlns="http://www.w3.org/2000/svg">
                                            {
                                                this.props.boundingRedux.points.map((item) => {
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
                                    <input id="entidad" name="entidad" value={this.state.entidad} onChange={this.handleInput} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.entidadRemitente : null)) }} />
                                    <div className="section-information-cols">
                                        <div className="section-information-col">
                                            <label for="ciudad" >Ciudad</label>
                                            <input id="ciudad" name="ciudad" value={this.state.ciudad} onChange={this.handleInput} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.ciudad : null)) }} />
                                            <label for="referencia">Referencia</label>
                                            <input id="referencia" name="referencia" value={this.state.referencia} onChange={this.handleInput} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.referencia : null)) }} />
                                            <label>Tipo de embargo</label>
                                            <div className="select-input" style={{ zIndex: 999999999 }}>
                                                <Select
                                                    disabled={this.state.disabled}
                                                    labelId="demo-simple-select-label"
                                                    id="tipoEmbargo"
                                                    name="tipoEmbargo"
                                                    value={String(this.state.tipoEmbargo)}
                                                    onChange={this.handleInput}
                                                >
                                                    <MenuItem value={'NO_SELECCIONADO'}>NO_SELECCIONADO</MenuItem>
                                                    <MenuItem value={'FAMILIAR'}>FAMILIAR</MenuItem>
                                                    <MenuItem value={'JUDICIAL'}>JUDICIAL</MenuItem>
                                                    <MenuItem value={'COACTIVO'}>COACTIVO</MenuItem>
                                                    <MenuItem value={'COOPERATIVA'}>COOPERATIVA</MenuItem>

                                                </Select>
                                            </div>
                                        </div>
                                        <div className="section-information-col">
                                            <label for="direccion">Direccion</label>
                                            <input id="direccion" name="direccion" value={this.state.direccion} onChange={this.handleInput} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.direccion : null)) }} />
                                            <label for="fecha">Fecha</label>
                                            <input id="fecha" name="fecha" value={this.state.fecha} onChange={this.handleInput} disabled={this.state.disabled} onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.fecha : null)) }} />
                                            <label>Tipo de documento</label>
                                            <div className="select-input">
                                                <Select
                                                    name="tipoDocumento"
                                                    disabled={this.state.disabled}
                                                    id="tipoDocumento"
                                                    name="tipoDocumento"
                                                    value={String(this.state.tipoDocumento)}
                                                    onChange={this.handleInput}
                                                >
                                                    <MenuItem value={'NO_SELECCIONADO'}>NO_SELECCIONADO</MenuItem>
                                                    <MenuItem value={'EMBARGO'}>EMBARGO</MenuItem>
                                                    <MenuItem value={'DESEMBARGO'}>DESEMBARGO</MenuItem>
                                                    <MenuItem value={'REQUERIMIENTO'}>REQUERIMIENTO</MenuItem>


                                                </Select>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Demandantes add={add} data={this.state.demandantes} nombre="Demandantes" page={this.state.pageNumber} editable={!this.state.disabled} />
                                {this.state.activeModeTable ?
                                    <div className="table-generator-container">
                                        <label>Selecciona el numero de la columna</label>
                                        <div className="table-inputs">
                                            <div className="select-table-element">
                                                <h6>Nombre</h6>
                                                <Select
                                                    name="nombre"
                                                    value={String(this.state.colsEdit.nombre)}
                                                    onChange={this.handleColsTable}
                                                >
                                                    <MenuItem value={0}>1</MenuItem>
                                                    <MenuItem value={1}>2</MenuItem>
                                                    <MenuItem value={2}>3</MenuItem>
                                                    <MenuItem value={3}>4</MenuItem>
                                                    <MenuItem value={4}>5</MenuItem>
                                                    <MenuItem value={5}>6</MenuItem>
                                                    <MenuItem value={6}>7</MenuItem>
                                                    <MenuItem value={7}>8</MenuItem>
                                                </Select>
                                            </div>
                                            <div className="select-table-element">
                                            <h6>Tipo Identificación</h6>
                                            <Select
                                                name="tipo"
                                                value={String(this.state.colsEdit.tipo)}
                                                onChange={this.handleColsTable}
                                            >
                                                <MenuItem value={'NO_SELECCIONADO'}>NO_SELECCIONADO</MenuItem>
                                                <MenuItem value={'CEDULA'}>CEDULA</MenuItem>
                                                <MenuItem value={'CEDULA_EXTRANJERA'}>CEDULA_EXTRANJERA</MenuItem>
                                                <MenuItem value={'NIT'}>NIT</MenuItem>
                                                <MenuItem value={'TARJETA_IDENTIDAD'}>TARJETA_IDENTIDAD</MenuItem>
                                        
                                            </Select>
                                            </div>
                                            <div className="select-table-element">
                                            <h6>Identificación</h6>
                                            <Select
                                                name="identificacion"
                                                value={String(this.state.colsEdit.identificacion)}
                                                onChange={this.handleColsTable}
                                            >
                                                <MenuItem value={0}>1</MenuItem>
                                                <MenuItem value={1}>2</MenuItem>
                                                <MenuItem value={2}>3</MenuItem>
                                                <MenuItem value={3}>4</MenuItem>
                                                <MenuItem value={4}>5</MenuItem>
                                                <MenuItem value={5}>6</MenuItem>
                                                <MenuItem value={6}>7</MenuItem>
                                                <MenuItem value={7}>8</MenuItem>
                                            </Select>
                                            </div>
                                            <div className="select-table-element">
                                            <h6>Expediente</h6>
                                            <Select
                                                name="expediente"
                                                value={String(this.state.colsEdit.expediente)}
                                                onChange={this.handleColsTable}
                                            >
                                                <MenuItem value={0}>1</MenuItem>
                                                <MenuItem value={1}>2</MenuItem>
                                                <MenuItem value={2}>3</MenuItem>
                                                <MenuItem value={3}>4</MenuItem>
                                                <MenuItem value={4}>5</MenuItem>
                                                <MenuItem value={5}>6</MenuItem>
                                                <MenuItem value={6}>7</MenuItem>
                                                <MenuItem value={7}>8</MenuItem>
                                            </Select>
                                            </div>
                                        </div>
                                    </div> : <></>
                                }

                                <Demandados add={add} data={this.props.demandados.data} nombre="Demandados" page={this.state.pageNumber} editable={!this.state.disabled} />
                            </div>
                        </div>
                    </div>}
            </div>
        )
    }
    onError(e) {
        console.log(e, 'error in file-viewer');
    }
    handleColsTable = (event) => {
        this.setState({ colsEdit: { ...this.state.colsEdit, [event.target.name]: event.target.value } }, function () {
            console.log(this.state.colsEdit)
        })
    }
    handleMouseDown(event) { //added code here
        console.log(this.state.editCanvas)
        console.log(this.state.activeModeTable)
        if (this.state.editCanvas && !this.state.activeModeTable) {
            console.log('DOWN')
            console.log(event);
            this.setState({
                isDown: true,
                isDownCount: 1,
                previousPointX: event.offsetX,
                previousPointY: event.offsetY,
                
            }, () => {

            })

        }

        if (!this.state.editCanvas && this.state.activeModeTable) {
            console.log('DOWN')
            console.log(event);
            this.setState({
                isDown: true,
                isDownCount: 1,
                previousPointX: event.offsetX,
                previousPointY: event.offsetY,
                obtenerDemandados:false
            }, () => {

            })

        }

    }
    handleMouseMove(event) {
        if (this.state.editCanvas && !this.state.activeModeTable) {
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
                ctx.stroke();
            }
        }
        if (!this.state.editCanvas && this.state.activeModeTable) {
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
                ctx.stroke();
            }
        }
    }
    handleMouseUp(event) {
        console.log(this.state.editCanvas)
        console.log(this.state.activeModeTable)
        if (this.state.editCanvas && !this.state.activeModeTable) {
            var x = event.offsetX;
            var y = event.offsetY;
            var width = x - this.state.previousPointX;
            var height = y - this.state.previousPointY;
            this.setState({
                rectangle: { x: this.state.previousPointX, y: this.state.previousPointY, width: width, height: height }
            }, function () {
                let vector = []

                this.props.json.pages[this.state.pageNumber - 1].words.map((item) => {
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
                this.props.handleRegion(palabra)
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
        if(!this.state.editCanvas && this.state.activeModeTable){
            var x = event.offsetX;
            var y = event.offsetY;
            var width = x - this.state.previousPointX;
            var height = y - this.state.previousPointY;
            this.setState({
                rectangle: { x: this.state.previousPointX, y: this.state.previousPointY, width: width, height: height }
            }, function () {
                let vector = []

                this.props.json.pages[this.state.pageNumber - 1].words.map((item) => {
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
                this.props.handleRegion(palabra)
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
            this.setState({
                isDown: false,
                obtenerDemandados:true
            });
        }
        
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
    boundingRedux: state.boundingReducer.boundigTable,

})
const mapDispatchToProps = (dispatch) => ({
    handleEmbargo: bindActionCreators(getEmbargo, dispatch),
    handleDemandados: bindActionCreators(getDemandados, dispatch),
    handleBoundingReset: bindActionCreators(resetPoints, dispatch),
    handleRegion: bindActionCreators(nuevaRegion, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Revisar)
