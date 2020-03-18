import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { uploadRequest, setPositionProcess } from '../../redux/actions/uploadAction'
import {loadDemandados} from '../../redux/actions/excelActions'
import './Sencond.css'
import axios from 'axios'
import { TiDocumentText } from "react-icons/ti";
import './grid.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ReactDataGrid from "react-data-grid";

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
            colsEdit: { nombre: 0, tipo: 'NO_SELECCIONADO', identificacion: 1, expediente: 2, monto: 3 },
            rows
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
        return (
            <div className="contenedor-section-grid">
                <div className="container-grid">
                <ReactDataGrid
                        columns={this.props.excel.columns}
                        rowGetter={i => this.state.rows[i]}
                        rowsCount={3}
                        onGridRowsUpdated={this.onGridRowsUpdated}
                        enableCellSelect={true}
                    />
                </div>
                <div className="container-cols">
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
                    </div>
                    <input onClick={this.loadDemandados} type="button" class="confirm-form-btn " value="Cargar" />
                </div>
            </div>
        )
    }
    loadDemandados=()=>{
        this.props.loadDemandados()
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
    excel: state.excelReducer.preview.data
})

export default connect(mapStateToProps, mapDisptachToProps)(Second)
