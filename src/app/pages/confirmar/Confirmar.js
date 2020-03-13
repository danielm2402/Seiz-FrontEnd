import React, { Component, useRef } from 'react'
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getDemandados, getEmbargo, resetMensaje, saveDemandados } from '../../redux/actions/embargosAction'
import Tabla from './Tabla'
import './Tabla.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@material-ui/core/TextField';
import { FaRegEdit, FaTable, FaFileExcel } from "react-icons/fa";
import { MdCancel, MdPhotoSizeSelectSmall, MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { confirmarEmbargo } from '../../redux/actions/embargosAction'
import { ProgressBar } from 'react-bootstrap';
import { setOptions, Document, Page } from "react-pdf";
import Demandados from './Demandados'
import Demandantes from './Demandantes';
import chroma from 'chroma-js';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { changePoints, resetPoints, nuevaRegion, obtenerDemandadosTable, setUltimaTableFocus, setPage, setMode } from '../../redux/actions/boundingAction'
import TableDemandados from './tables/TableDemandado'
import TableDemandantes from './tables/TableDemandantes'
import styled from 'styled-components';
import Pdf from '@mikecousins/react-pdf';
import Viewer from '../viewer/Viewer'
import Icon from '@material-ui/core/Icon';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: { 500: '#337ab7' },
        
    },
});
const pdfjsVersion = "2.0.305";

const PDFDocumentWrapper = styled.div`
  canvas {
    width: 100% !important;
    height: auto !important;
  }
`;
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



class Confirmar extends Component {
    constructor(props) {
        super(props)
        this.canvasRef = React.createRef();
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
            disabled: false,
            boundig: { boundig: false, points: [] },
            demandantes: [],
            isDown: false,
            previousPointX: '',
            previousPointY: '',
            editCanvas: true,
            actualFocus: '',
            rectangle: {},
            demandados: [],
            activeModeTable: false,
            colsEdit: { nombre: 0, tipo: 'NO_SELECCIONADO', identificacion: 1, expediente: 2, monto: 3 },
            obtenerDemandados: false,
            tablePoints: [],
            tableCols: {}
        }
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }
    modeTable = () => {
        this.props.handleChangeMode('TABLE')
        this.setState({ activeModeTable: true, editCanvas: false, obtenerDemandados: false }, function () {

        })
    }
    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
    }

    componentDidMount() {

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

                let vectorDemandados = {}
                for (let index = 0; index < this.props.demandados.data.length; index++) {
                    vectorDemandados = { ...vectorDemandados, ['nombre' + this.props.demandados.data[index].id]: this.props.demandados.data[index].nombres }


                }
                this.setState({ demandados: vectorDemandados }, () => {

                })
            }

        }

        if (this.props.loadingDemandadosTable !== prevProps.loadingDemandadosTable) {
            if (this.props.loadingDemandadosTable) {
                toast.info("Obteniendo demandados");
            }
        }
        if (this.props.embargo.data.plaintiffs !== prevProps.embargo.data.plaintiffs) {
            this.setState({ demandantes: this.props.embargo.data.plaintiffs })
        }

        if (this.props.bounding !== prevProps.bounding) {

            if (this.props.tablaBounding == 'documento') {


                this.setState({ [this.state.actualFocus]: (this.state[this.state.actualFocus] === undefined ? '' : this.state[this.state.actualFocus]).concat(this.props.bounding) })
            }


        }


    }
    handleEdit = () => {
        console.log('EDITANDO')
        this.setState({ disabled: false })
    }
    handleCancel = () => {
        this.setState({ disabled: true, boundig: { boundig: false, points: [] }, editCanvas: false, activeModeTable: false })
        this.props.handleBoundingReset()
    }
    focusElement(e, palabra) {

        this.props.handleUltimFocus('documento')
        this.setState({ actualFocus: e.target.name })
        if (this.props.resaltado !== "") {

            try {
                let vectorLocation = [];
                let totalBoundig = [];
                for (const prop in palabra.fieldInstances) {

                    for (const prop1 in palabra.fieldInstances[prop].parts) {

                        vectorLocation.push({ start: palabra.fieldInstances[prop].parts[prop1].startLocation, end: palabra.fieldInstances[prop].parts[prop1].endLocation, page: palabra.fieldInstances[prop].parts[prop1].page })
                    }
                }

                vectorLocation.map((item) => {
                    var iterador = item.start
                    for (iterador; iterador <= item.end; iterador++) {
                        totalBoundig.push([...this.props.json.pages[item.page].words[iterador].boundingPoly.vertices, item.page])
                    }
                })
                this.props.handleBounding(totalBoundig)
                this.setState({
                    boundig: { boundig: true, points: totalBoundig }
                })
            } catch (error) {

            }
        }

    }
    focusElement2(e, palabra, id, tipo) {

        if (this.props.resaltado !== "") {
            try {


                let vectorLocation = [];
                let totalBoundig = [];
                const row = palabra.fieldInstances[id].parts[tipo]

                vectorLocation.push({ start: row.startLocation, end: row.endLocation, page: row.page })



                vectorLocation.map((item) => {
                    var iterador = item.start
                    for (iterador; iterador <= item.end; iterador++) {
                        totalBoundig.push(this.props.json.pages[0].words[iterador].boundingPoly.vertices)
                    }
                })

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

        })
    }

    editCanvas = () => {
        this.props.handleChangeMode('MANUAL')
        this.setState({ editCanvas: true, activeModeTable: false, obtenerDemandados: false }, function () {

        })
    }
    obtenerDemandados = () => {
        this.setState({ obtenerDemandados: false })
        const columns = {
            nombre: String(this.state.colsEdit.nombre),
            identificacion: String(this.state.colsEdit.identificacion),
            expendiente: String(this.state.colsEdit.expediente),
            monto: String(this.state.colsEdit.monto)
        }

       
        this.props.handleTableDemandados(this.props.modeTable.points, columns, this.props.match.params.id, this.state.pageNumber, this.props.token)
    }
    goToExcel = () => {
        this.props.history.push('/upload/excel/' + this.props.match.params.id)
    }

    render() {

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
                                        <div style={{ paddingLeft: '10px' }} className="tools-edit-num">
                                            <h5 style={{ color: '#fff' }}> {this.state.pageNumber}/{this.state.numPages}</h5>
                                        </div>
                                        <div className="tools-edit-change">
                                            {this.state.numPages > 1 && this.state.pageNumber > 1 ?
                                                <a className="btn-herramienta" onClick={() => {
                                                    this.setState({ pageNumber: this.state.pageNumber - 1 })
                                                    this.props.handleChangePage(this.state.pageNumber - 1)
                                                }}><MdNavigateBefore size="1.5em" color={"#fff"} /></a>
                                                : <a className="btn-herramienta" disabled={true}><MdNavigateBefore size="1.7em" color={"#fff"} /></a>}
                                        </div>
                                    </div>
                                    <div className="tools-page">
                                        <div className="tools-page-center">
                                            {this.state.numPages > 1 && this.state.pageNumber < this.state.numPages ?
                                                <a className="btn-herramienta" onClick={() => {
                                                    this.setState({ pageNumber: this.state.pageNumber + 1 })
                                                    this.props.handleChangePage(this.state.pageNumber + 1)
                                                }}><MdNavigateNext size="1.7em" color={"#fff"} /></a> :
                                                <a className="btn-herramienta" disabled={true} ><MdNavigateNext size="1.7em" color={"#fff"} /></a>}

                                        </div>

                                        <div className="tools-page-right">
                                            <a className="btn-herramienta" onClick={this.editCanvas}><MdPhotoSizeSelectSmall size="1.5em" color={"#fff"} /></a>

                                            <a onClick={this.modeTable} className="btn-herramienta"><FaTable size="1.5em" color={"#fff"} /></a>
                                            {this.props.modeTable.ready ? <button onClick={this.obtenerDemandados}>Obtener</button> : <></>}
                                        </div>
                                    </div>
                                </div>
                                <div className="container-document">
                                    <Viewer></Viewer>
                                </div>
                            </div>
                            <div className="section-table">
                                <div className="buttons-edits">

                                    <div> <button onClick={this.goToExcel}><FaFileExcel size="1.5em" color={"#BDD535"} /></button> </div>
                                </div>
                                <div className="information-card">
                                    <label for="entidad">Entidad Remitente</label>
                                    <input id="entidad" name="entidad" value={this.state.entidad} onChange={this.handleInput} onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.entidadRemitente : null)) }} />
                                    <div className="section-information-cols">
                                        <div className="section-information-col">
                                            <label for="ciudad" >Ciudad</label>
                                            <input id="ciudad" name="ciudad" value={this.state.ciudad} onChange={this.handleInput} onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.ciudad : null)) }} />
                                            <label for="referencia">Referencia</label>
                                            <input id="referencia" name="referencia" value={this.state.referencia} onChange={this.handleInput} onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.referencia : null)) }} />
                                            <label>Tipo de embargo</label>
                                            <div className="select-input" style={{ zIndex: 999999999 }}>
                                                <Select

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
                                            <input id="direccion" name="direccion" value={this.state.direccion} onChange={this.handleInput} onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.direccion : null)) }} />
                                            <label for="fecha">Fecha</label>
                                            <input id="fecha" name="fecha" value={this.state.fecha} onChange={this.handleInput} onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.fecha : null)) }} />
                                            <label>Tipo de documento</label>
                                            <div className="select-input">
                                                <Select
                                                    name="tipoDocumento"
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
                                {this.state.activeModeTable ?
                                    <div className="table-generator-container">
                                        <label>Selecciona el número de la columna</label>
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
                                            <div className="select-table-element">
                                                <h6>Monto</h6>
                                                <Select
                                                    name="monto"
                                                    value={String(this.state.colsEdit.monto)}
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

                                <TableDemandados page={this.state.pageNumber} idDocumento={this.props.match.params.id} />
                                <TableDemandantes page={this.state.pageNumber} demandantes={this.state.demandantes} idDocumento={this.props.match.params.id} />
                                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                <MuiThemeProvider theme={theme}>
                                    <Button onClick={this.confirmarEmbargo} variant="contained" endIcon={<Icon>send</Icon>} color="primary">
                                        Confirmar
                                 </Button>
                                </MuiThemeProvider>
                                </div>


                                <Dialog
                                    open={this.props.mensaje.exist}
                                    onClose={() => {
                                        this.props.handleResetMsj()
                                        this.props.history.push('/listar/no-confirmados')
                                    }
                                    }
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Confirmación de embargo"}</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            {this.props.mensaje.msj}
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>

                                        <Button onClick={() => {
                                            this.props.handleResetMsj()
                                            this.props.history.push('/listar/no-confirmados')
                                        }} color="primary" autoFocus>
                                            Aceptar
                                          </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </div>}
                <ToastContainer />
            </div>
        )
    }
    onError(e) {
        console.log(e, 'error in file-viewer');
    }
    confirmarEmbargo = () => {
        try {

            var data = {
                account: this.props.embargo.data.account,
                address: this.state.direccion,
                amount: this.props.embargo.data.amount,
                city: this.state.ciudad,
                docId: this.props.embargo.data.docId,
                documentDate: this.state.fecha,
                documentType: this.state.tipoDocumento,
                embargoType: this.state.tipoEmbargo,
                reference: this.props.embargo.data.reference,
                sender: this.state.entidad,
                id: this.state.referencia,
                demandados: this.props.demandados,
                demandantes: this.props.embargo.data.plaintiffs
            }
            this.props.handleConfirmarEmbargo(data, this.props.token)

        } catch (error) {
            console.log(error)
        }

    }
    handleColsTable = (event) => {
        this.setState({ colsEdit: { ...this.state.colsEdit, [event.target.name]: event.target.value } }, function () {
           
        })
    }
    handleMouseDown(event) { //added code here

        if (this.state.editCanvas && !this.state.activeModeTable) {

            this.setState({
                isDown: true,
                isDownCount: 1,
                previousPointX: event.offsetX,
                previousPointY: event.offsetY,

            }, () => {

            })

        }

        if (!this.state.editCanvas && this.state.activeModeTable) {

            this.setState({
                isDown: true,
                isDownCount: 1,
                previousPointX: event.offsetX,
                previousPointY: event.offsetY,
                obtenerDemandados: false
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
                    var x = ((((item.boundingPoly.vertices[1].x)) + ((item.boundingPoly.vertices[0].x))) / 2) * this.props.json.pages[this.state.pageNumber - 1].width
                    var y = ((((item.boundingPoly.vertices[3].y)) + ((item.boundingPoly.vertices[0].y))) / 2) * this.props.json.pages[this.state.pageNumber - 1].height

                    if ((x > this.state.previousPointX && x < (this.state.rectangle.width + this.state.previousPointX) && ((y > this.state.previousPointY) && (y < this.state.rectangle.height + this.state.previousPointY)))) {

                        vector.push(item)
                    }
                })
                var palabra = ''
                vector.map((item) => {
                    palabra = palabra + ' ' + item.text

                })
                //palabra= this.state[this.state.actualFocus]+palabra
                this.props.handleRegion(palabra)
                if (this.props.tablaBounding == 'documento') {
                    this.setState({ [this.state.actualFocus]: this.state[this.state.actualFocus] + palabra })
                }

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
        if (!this.state.editCanvas && this.state.activeModeTable) {
            var x = event.offsetX;
            var y = event.offsetY;
            var width = x - this.state.previousPointX;
            var height = y - this.state.previousPointY;
            this.setState({
                rectangle: { x: this.state.previousPointX, y: this.state.previousPointY, width: width, height: height }
            }, function () {

                const verti = [
                    { x: (this.state.rectangle.x / this.props.json.pages[this.state.pageNumber - 1].width), y: (this.state.rectangle.y / this.props.json.pages[this.state.pageNumber - 1].height) },
                    { x: (this.state.rectangle.x + this.state.rectangle.width) / this.props.json.pages[this.state.pageNumber - 1].width, y: this.state.rectangle.y / this.props.json.pages[this.state.pageNumber - 1].height },
                    { x: (this.state.rectangle.x + this.state.rectangle.width) / this.props.json.pages[this.state.pageNumber - 1].width, y: (this.state.rectangle.y + this.state.rectangle.height) / this.props.json.pages[this.state.pageNumber - 1].height },
                    { x: (this.state.rectangle.x / this.props.json.pages[this.state.pageNumber - 1].width), y: (this.state.rectangle.y + this.state.rectangle.height) / this.props.json.pages[this.state.pageNumber - 1].height },

                ]
                const columns = {
                    nombre: String(this.state.colsEdit.nombre),
                    identificacion: String(this.state.colsEdit.identificacion),
                    expendiente: String(this.state.colsEdit.expediente),
                    monto: String(this.state.colsEdit.monto)
                }

                this.setState({ tablePoints: verti, tableCols: columns })

            })

            const ctx = this.refs.canvas.getContext('2d');
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.fillStyle = "rgba(255,255,255, 0.5)";
            ctx.fillRect(this.state.previousPointX, this.state.previousPointY, width, height);
            this.setState({
                isDown: false,
                obtenerDemandados: true
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
    loadingDemandadosTable: state.boundingReducer.loadingDemandados,
    mensaje: state.EmbargosReducer.mensaje,
    tablaBounding: state.boundingReducer.tabla,
    bounding: state.boundingReducer.palabra,
    modeTable: state.boundingReducer.pointsModeTable,


})
const mapDispatchToProps = (dispatch) => ({
    handleUltimFocus: bindActionCreators(setUltimaTableFocus, dispatch),
    handleEmbargo: bindActionCreators(getEmbargo, dispatch),
    handleDemandados: bindActionCreators(getDemandados, dispatch),
    handleBounding: bindActionCreators(changePoints, dispatch),
    handleBoundingReset: bindActionCreators(resetPoints, dispatch),
    handleRegion: bindActionCreators(nuevaRegion, dispatch),
    handleTableDemandados: bindActionCreators(obtenerDemandadosTable, dispatch),
    handleConfirmarEmbargo: bindActionCreators(confirmarEmbargo, dispatch),
    handleResetMsj: bindActionCreators(resetMensaje, dispatch),
    handleSaveDemandados: bindActionCreators(saveDemandados, dispatch),
    handleChangePage: bindActionCreators(setPage, dispatch),
    handleChangeMode: bindActionCreators(setMode,dispatch),
   
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Confirmar))
