import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
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
            colsEdit: { nombre: -1, tipo: -1, identificacion: -1, expediente: -1, monto: -1 },
            rows,
            number:0
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.excel.rows!==this.props.excel.rows){
          console.log('SE ACTUALIZARON LAS ROWS EN SECOND')
          console.log(this.props.excel.rows)
          this.setState({rows:this.props.excel.rows, number:this.props.excel.rows.length})
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
                        rowsCount={this.state.number}
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
                                    <MenuItem value={-1}>NO_SELECT</MenuItem>
                                    {this.props.excel.columns.map((item)=>{
                                        return <MenuItem value={item.position}>{item.key}</MenuItem>
                                    })}
                                </Select>
                            </div>
                            <div className="select-table-element">
                                <h6>Tipo Identificación</h6>
                                <Select
                                    name="tipo"
                                    value={String(this.state.colsEdit.tipo)}
                                    onChange={this.handleColsTable}
                                >
                                   <MenuItem value={-1}>NO_SELECT</MenuItem>
                                    {this.props.excel.columns.map((item)=>{
                                        return <MenuItem value={item.position}>{item.key}</MenuItem>
                                    })}

                                </Select>
                            </div>
                            <div className="select-table-element">
                                <h6>Identificación</h6>
                                <Select
                                    name="identificacion"
                                    value={String(this.state.colsEdit.identificacion)}
                                    onChange={this.handleColsTable}
                                >
                                   <MenuItem value={-1}>NO_SELECT</MenuItem>
                                    {this.props.excel.columns.map((item)=>{
                                        return <MenuItem value={item.position}>{item.key}</MenuItem>
                                    })}
                                </Select>
                            </div>
                            <div className="select-table-element">
                                <h6>Expediente</h6>
                                <Select
                                    name="expediente"
                                    value={String(this.state.colsEdit.expediente)}
                                    onChange={this.handleColsTable}
                                >
                                    <MenuItem value={-1}>NO_SELECT</MenuItem>
                                    {this.props.excel.columns.map((item)=>{
                                        return <MenuItem value={item.position}>{item.key}</MenuItem>
                                    })}
                                </Select>
                            </div>
                            <div className="select-table-element">
                                <h6>Monto</h6>
                                <Select
                                    name="monto"
                                    value={this.state.colsEdit.monto}
                                    onChange={this.handleColsTable}
                                >
                                  <MenuItem value={-1}>NO_SELECT</MenuItem>
                                    {this.props.excel.columns.map((item)=>{
                                        return <MenuItem value={item.position}>{item.key}</MenuItem>
                                    })}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div style={{textAlign:'center', paddingTop:'40px'}}>
                    <Button onClick={this.loadDemandados} variant="contained" endIcon={<Icon>send</Icon>}  color="primary">
                                        Cargar
                    </Button>
                    </div>
                </div>
            </div>
        )
    }
    loadDemandados=()=>{
        console.log(this.state.colsEdit)
        this.props.loadDemandados(this.state.colsEdit,this.props.id, this.props.token )
    }
    handleColsTable=(event)=>{
        this.setState({
            colsEdit:{...this.state.colsEdit,[event.target.name]: event.target.value}
        }, function () {

        })
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
