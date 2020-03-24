import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { uploadRequest, setPositionProcess } from '../../redux/actions/uploadAction'
import { loadDemandados } from '../../redux/actions/excelActions'
import './Sencond.css'
import axios from 'axios'
import { TiDocumentText } from "react-icons/ti";
import './grid.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ReactDataGrid from "react-data-grid";
import { ProgressBar } from 'react-bootstrap';
const columns = [
    { key: "id", name: "ID", editable: true },
    { key: "title", name: "Title", editable: true },
    { key: "complete", name: "Complete", editable: true }
];

const rows = [
    { id: 0, title: "Task 1", complete: 20 },
    { id: 1, title: "Task 2", complete: 40 },
    { id: 2, title: "Task 3", complete: 60 }
];

class Second extends Component {
    constructor(props) {
        super(props)
        this.state = {
            colsEdit: { nombre: [-1, -1], tipo: [-1], identificacion: [-1], expediente: [-1], monto: [-1] },
            rows,
            number: 0,
            loadDemandados: false
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.excel.rows !== this.props.excel.rows) {

            console.log(this.props.excel.rows)
            this.setState({ rows: this.props.excel.rows, number: this.props.excel.rows.length })
        }
        if (prevProps.loadDemandadosControl !== this.props.loadDemandadosControl) {
            console.log('CAMBIANDO EL CARGADOR')
            this.setState({ loadDemandados: this.props.loadDemandadosControl })
        }
    }
    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
            const rows = state.rows.slice();
            for (let i = fromRow; i <= toRow; i++) {
                rows[i] = { ...rows[i], ...updated };
            }
            return { rows };
        });
    };

    render() {
        const { nombre, tipo, identificacion, expediente, monto } = this.state.colsEdit
        return (
            <div>
                {!this.state.loadDemandados ?
                    <div className="contenedor-section-grid">
                        <div className="container-grid">
                            <ReactDataGrid
                                columns={this.props.excel.columns}
                                rowGetter={i => this.state.rows[i]}
                                rowsCount={this.state.number}
                                onGridRowsUpdated={this.onGridRowsUpdated}
                                enableCellSelect={true}
                                minHeight={500}
                            />
                        </div>
                        <div className="container-cols">
                            <div className="table-generator-container">
                                <label>Selecciona el número de la columna</label>
                                <br></br>
                                <div style={{ maxHeight: '350px', overflow: 'auto', width: '95%', textAlign: 'center' }}>
                                    <table style={{ width: '93%', margin: '0 auto', textAlign: 'left' }}>
                                        <tr>
                                            <th style={{ paddingRight: '5px' }}>
                                                <div className="select-table-element">
                                                    <h6>Nombre</h6>
                                                    <div style={{ display: 'flex', width:'100%' }}>
                                                        <div style={{width:'50%'}}>
                                                            <Select
                                                                name="nombre"
                                                                value={String(this.state.colsEdit.nombre[0])}
                                                                onChange={this.handleColsTable}
                                                            >
                                                                <MenuItem value={-1}>NO_SELECT</MenuItem>
                                                                {this.props.excel.columns.map((item) => {
                                                                    return <MenuItem value={item.position}>{item.key}</MenuItem>
                                                                })}
                                                            </Select>
                                                        </div>
                                                        <div style={{width:'50%'}}>
                                                            <Select
                                                                name="apellido"
                                                                value={String(this.state.colsEdit.nombre[1])}
                                                                onChange={this.handleColsTable}
                                                            >
                                                                <MenuItem value={-1}>NO_SELECT</MenuItem>
                                                                {this.props.excel.columns.map((item) => {
                                                                    return <MenuItem value={item.position}>{item.key}</MenuItem>
                                                                })}
                                                            </Select>
                                                        </div>
                                                    </div>
                                                </div></th>
                                            <th style={{ paddingRight: '5px' }}>
                                                <div className="select-table-element">
                                                    <h6>Tipo Id</h6>
                                                    <Select
                                                        name="tipo"
                                                        value={String(this.state.colsEdit.tipo)}
                                                        onChange={this.handleColsTable}
                                                    >
                                                        <MenuItem value={-1}>NO_SELECT</MenuItem>
                                                        {this.props.excel.columns.map((item) => {
                                                            return <MenuItem value={item.position}>{item.key}</MenuItem>
                                                        })}

                                                    </Select>
                                                </div>
                                            </th>
                                            <th style={{ paddingRight: '5px' }}>
                                                <div className="select-table-element">
                                                    <h6>Identificación</h6>
                                                    <Select
                                                        name="identificacion"
                                                        value={String(this.state.colsEdit.identificacion)}
                                                        onChange={this.handleColsTable}
                                                    >
                                                        <MenuItem value={-1}>NO_SELECT</MenuItem>
                                                        {this.props.excel.columns.map((item) => {
                                                            return <MenuItem value={item.position}>{item.key}</MenuItem>
                                                        })}
                                                    </Select>
                                                </div>
                                            </th>
                                            <th style={{ paddingRight: '5px' }}>
                                                <div className="select-table-element">
                                                    <h6>Expediente</h6>
                                                    <Select
                                                        name="expediente"
                                                        value={String(this.state.colsEdit.expediente)}
                                                        onChange={this.handleColsTable}
                                                    >
                                                        <MenuItem value={-1}>NO_SELECT</MenuItem>
                                                        {this.props.excel.columns.map((item) => {
                                                            return <MenuItem value={item.position}>{item.key}</MenuItem>
                                                        })}
                                                    </Select>
                                                </div>
                                            </th>
                                            <th >
                                                <div className="select-table-element">
                                                    <h6>Monto</h6>
                                                    <Select
                                                        name="monto"
                                                        value={this.state.colsEdit.monto}
                                                        onChange={this.handleColsTable}
                                                    >
                                                        <MenuItem value={-1}>NO_SELECT</MenuItem>
                                                        {this.props.excel.columns.map((item) => {
                                                            return <MenuItem value={item.position}>{item.key}</MenuItem>
                                                        })}
                                                    </Select>
                                                </div>
                                            </th>
                                        </tr>
                                        {this.props.excel.rows.map((item, index) => {
                                            return (
                                                <tr style={nombre[0] !== -1 || tipo[0] !== -1 || identificacion[0] !== -1 || expediente[0] !== -1 || monto[0] !== -1 ? { borderBottom: '1px solid #E7EAEC' } : {}}>
                                                    {nombre[0] !== -1 ? <td>{this.props.excel.normal[nombre[0]].entries[index]}{nombre[1]!== -1?' '+this.props.excel.normal[nombre[1]].entries[index]:''}</td> : <td></td>}
                                                    {tipo[0] !== -1 ? <td>{this.props.excel.normal[tipo].entries[index]}</td> : <td></td>}
                                                    {identificacion[0] !== -1 ? <td>{this.props.excel.normal[identificacion].entries[index]}</td> : <td></td>}
                                                    {expediente[0] !== -1 ? <td>{this.props.excel.normal[expediente].entries[index]}</td> : <td></td>}
                                                    {monto[0] !== -1 ? <td>{this.props.excel.normal[monto].entries[index]}</td> : <td></td>}
                                                </tr>
                                            )
                                        })}

                                    </table>
                                </div>

                            </div>
                            <div style={{ textAlign: 'center', paddingTop: '40px' }}>
                                <Button onClick={this.loadDemandados} variant="contained" endIcon={<Icon>send</Icon>} color="primary">
                                    Cargar
                    </Button>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                    :
                    <div style={{ height: '750px', backgroundColor: '#EFEFF6' }}>
                        <div className="container-finish">
                            <h3>Estamos testeando tu paciencia</h3>
                            <div className="container-progress">
                                <ProgressBar className="right" animated now={100} />
                            </div>
                            <h4>Deja que SEIZ haga el trabajo aburrido.</h4>
                            <p>SEIZ leerá y entenderá todos tus archivos en aproximadamente un minuto y medio.</p>
                            <h3>Éste es el momento oportuno para ir por un café</h3>
                        </div>
                    </div>
                }
            </div>
        )
    }
    loadDemandados = () => {
        console.log(this.state.colsEdit)
        this.props.loadDemandados(this.state.colsEdit, this.props.id, this.props.token)
    }
    handleColsTable = (event) => {
        switch (event.target.name) {
            case 'apellido':
                this.setState({
                    colsEdit: { ...this.state.colsEdit, nombre: [this.state.colsEdit.nombre[0], event.target.value] }
                }, function () {
                    console.log(this.state)
                })
            break;
            case 'nombre':
                this.setState({
                    colsEdit: { ...this.state.colsEdit, nombre: [event.target.value, this.state.colsEdit.nombre[1], ] }
                }, function () {
                    console.log(this.state)
                })
            break;    
            default:
                this.setState({
                    colsEdit: { ...this.state.colsEdit, [event.target.name]: [event.target.value] }
                }, function () {
                    console.log(this.state)
                })
             break;
        }
 
    }
}

const mapDisptachToProps = (dispatch) => ({
    handlePosition: bindActionCreators(setPositionProcess, dispatch),
    handleRequest: bindActionCreators(uploadRequest, dispatch),
    loadDemandados: bindActionCreators(loadDemandados, dispatch)
})
const mapStateToProps = (state) => ({
    files: state.uploadReducer.files,
    token: state.auth.authToken,
    excel: state.excelReducer.preview.data,
    loadDemandadosControl: state.excelReducer.loadDemandados
})

export default connect(mapStateToProps, mapDisptachToProps)(Second)
