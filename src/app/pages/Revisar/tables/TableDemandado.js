import React, { Component } from 'react'
import './styles.css'
import { MdDeleteSweep, MdCheck, MdCancel, MdAdd, MdDone, MdNavigateBefore, MdNavigateNext, MdFirstPage, MdLastPage } from "react-icons/md";
import { FaRegEdit, FaFileExcel } from "react-icons/fa";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { changePoints, setUltimaTableFocus } from '../../../redux/actions/boundingAction'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { updateDemandando, deleteDemandado, addDemandado, saveDemandados, getDemandadosSiguiente, getDemandadosAnterior, updateAllTipoDocumento,upadteAllRequest, getDemandadosFirstPage,getDemandadosLastPage } from '../../../redux/actions/embargosAction'
import CurrencyFormat from 'react-currency-format';
import PulseLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";
import { withRouter } from "react-router-dom";
class TableDemandado extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemEdit: null,
            nombre: '',
            tipo: '',
            identificacion: '',
            monto: '',
            extraInfo: {},
            ultimFocus: { id: '', tipo: '' },
            numItems: 0,
            numItemsSiguientes: 5,
            totalItems: 0,
            totalPages: { exacts: 0, numRecorrido: 1 },
            addRow: false,
            waitConfirmDelete: false,
            addRowValues: {
                nombre: '',
                tipo: 'NO_SELECCIONADO',
                identificacion: '',
                monto: ''
            },
            selectedAllValid:false
        }
    }
    componentDidUpdate(prevProps) {

        if (this.props.bounding !== prevProps.bounding) {

            if (this.props.tablaBounding == 'demandados') {


                this.setState({ [this.state.ultimFocus.tipo]: this.state[this.state.ultimFocus.tipo] + this.props.bounding })
            }
            if (this.props.tablaBounding == 'demandadosadd') {

                this.setState({ addRowValues: { ...this.state.addRowValues, [this.state.ultimFocus.tipo]: this.state.addRowValues[this.state.ultimFocus.tipo] + this.props.bounding } })
            }

        }
        if (this.props.demandados !== prevProps.demandados) {

            if (this.props.demandados.data.length % 5 === 0) {
                this.setState({ totalPages: { exacts: (this.props.demandados.data.length / 5), numRecorrido: 1 } })
            }
            else {
                this.setState({ totalPages: { exacts: (Math.trunc(this.props.demandados.data.length / 5)) + 1, numRecorrido: 1 } })
            }


        }

    }
    handleEdit = (id, nombre, tipo, identificacion, monto, extraInfo) => {

        this.setState({ itemEdit: id, nombre: nombre, tipo: tipo, identificacion: identificacion, monto: monto, extraInfo: extraInfo }, function () {
            console.log(this.state)
        })
    }
    handleCancelEdit = () => {

        this.setState({ itemEdit: null })
    }
    handleConfirm = (id) => {

        const { nombre, tipo, identificacion, monto } = this.state
        const obj = {
            nombres: nombre,
            tipoIdentificacion: tipo,
            identificacion: String(identificacion).replace(/[.\s]/g, ''),
            montoAEmbargar: String(monto).replace(/[$.,\s\D]/g, '')
        }
        console.log('ASI SE ESTÁN YENDO')
        console.log(obj)
        this.props.handleUpdate(id, obj, this.props.demandados.data, this.props.token, this.props.idDocumento);
        this.handleCancelEdit()

    }
    handleConfirmEdit = (id) => {

        this.setState({ itemEdit: id })
    }
    handleDelete = (id) => {
        this.setState({ waitConfirmDelete: true })
        // this.props.handleDelete(id, this.props.token)
    }
    handleDeleteConfirm = (id) => {
        this.setState({ waitConfirmDelete: false })
        this.props.handleDelete(id, this.props.token)
    }
    handleDeleteCancel = () => {
        this.setState({ waitConfirmDelete: false })
    }
    focusElement(e, palabra) {

       
        if (Object.keys(this.state.extraInfo).length !== 0) {
            var vertices = this.state.extraInfo[e.target.name].bounds.vertices
            vertices.push((this.props.page) - 1)

            const vectorWrapper = [vertices]
            this.props.handleBounding(vectorWrapper)
        } else {
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
    }
    focusElement2(e, palabra, id, tipo, column) {
        this.setState({ ultimFocus: { id: id, tipo: column } })

        if (Object.keys(this.state.extraInfo).length !== 0) {
            var vertices = this.state.extraInfo[column].bounds.vertices
            vertices.push((this.props.page) - 1)


            const vectorWrapper = [vertices]
            this.props.handleBounding(vectorWrapper)
        }
        else {
            if (this.props.resaltado !== "") {
                try {
                    let vectorLocation = [];
                    let totalBoundig = [];
                    const row = palabra.fieldInstances[id].parts[tipo]
                    vectorLocation.push({ start: row.startLocation, end: row.endLocation, page: row.page })
                    vectorLocation.map((item) => {
                        var iterador = item.start
                        for (iterador; iterador <= item.end; iterador++) {
                            totalBoundig.push([...this.props.json.pages[item.page].words[iterador].boundingPoly.vertices, item.page])

                        }
                    })
                    console.log('MANDANDO HANDLE ULTIM TABLE')

                    this.props.handleBounding(totalBoundig)
                    this.setState({
                        boundig: { boundig: true, points: totalBoundig }
                    })
                } catch (error) {

                    console.log(error)
                }
            }
        }


    }
    selecteAll = (e) => {

        if(e.target.value!=='NO_SELECCIONADO'){
            this.props.updateAllTipoDocumento(e.target.value)
            this.setState({selectedAllValid:true})
        }else{
            this.setState({selectedAllValid:false})
        }
    }
    handleRequestChangeAllType=()=>{
       this.props.upadteAllRequest(this.props.idDocumento, this.props.token,this.props.demandados.data)
    }
   
    render() {
        let renderTable;
        var contador = -1;
        if (this.props.demandados.loading) {
            renderTable = (
                <table>
                    <tr>
                        <th><div className="title-col">Nombre</div></th>
                        <th><div className="title-col">Tipo</div></th>
                        <th><div className="title-col">Identificacion</div></th>
                        <th><div className="title-col">Monto</div></th>
                        <th><div className="title-col">Actions</div></th>
                    </tr>
                    <tr>
                        NO DATA
                    </tr>
                </table>)
        } else {
            if (this.props.demandados.data.length > 0) {
                renderTable = (
                    <div className="table-info02">
                        <table style={{ width: '100%' }} >
                            <tr>
                                <th><div className="title-col">Nombre</div></th>
                                <th><div className="title-col">
                                    <div style={{ width: '100%' }}>
                                        <div style={{ display:'flex', width: '100%', justifyContent:'center', alignItems:'center' }}>
                                            <div style={{width:'50%', display:'flex', justifyContent:'center'}}>Tipo</div>
                                            {this.props.demandadosAllUpdateTipo && this.state.selectedAllValid?<div style={{width:'50%', display:'flex', justifyContent:'center'}}><a className="button-table-dinamic" onClick={this.handleRequestChangeAllType}><MdDone size="1.0em" color={"#434040"} /></a></div>:<></>}</div>
                                        <div >
                                            <Select
                                                labelId="demo-simple-select-placeholder-label-label"
                                                id="demo-simple-select-placeholder-label"
                                                label="Tipo"
                                                name="tipo"
                                                onChange={this.selecteAll}
                                            >
                                                <MenuItem value={'NO_SELECCIONADO'}>NO_SELECCIONADO</MenuItem>
                                                <MenuItem value={'CEDULA'}>CEDULA</MenuItem>
                                                <MenuItem value={'CEDULA_EXTRANJERIA'}>CEDULA_EXTRANJERA</MenuItem>
                                                <MenuItem value={'NIT'}>NIT</MenuItem>
                                                <MenuItem value={'TARJETA_IDENTIDAD'}>TARJETA_IDENTIDAD</MenuItem>

                                            </Select>
                                        </div>
                                    </div></div></th>
                                <th><div className="title-col">Identificacion</div></th>
                                <th><div className="title-col">Monto</div></th>
                                <th><div className="title-col">Actions</div></th>
                            </tr>
                            {this.state.addRow ?

                                <tr>
                                    <td><div className="element-table">
                                        <TextField
                                            onChange={(e) => this.setState({ addRowValues: { ...this.state.addRowValues, nombre: e.target.value } })}
                                            value={this.state.addRowValues.nombre}
                                            label="Nombre"
                                            margin="normal"
                                            onFocus={(e) => {
                                                try {
                                                    this.props.handleUltimTable('demandadosadd')
                                                    this.setState({ ultimFocus: { id: this.state.itemEdit, tipo: 'nombre' } }, function () {
                                                        console.log(this.state)
                                                    })
                                                }
                                                catch (error) {
                                                    this.setState({ ultimFocus: { id: this.state.itemEdit, tipo: 'nombre' } }, function () {
                                                        console.log(this.state.ultimFocus)
                                                    })
                                                    console.log(error)
                                                }
                                            }}
                                        />
                                    </div></td>
                                    <td><div className="element-table">
                                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                            Tipo
                                          </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-placeholder-label-label"
                                            id="demo-simple-select-placeholder-label"
                                            label="Tipo"
                                            name="tipo"
                                            onChange={(e) => this.setState({ addRowValues: { ...this.state.addRowValues, tipo: e.target.value } })}
                                            value={String(this.state.addRowValues.tipo)}


                                        >
                                            <MenuItem value={'NO_SELECCIONADO'}>NO_SELECCIONADO</MenuItem>
                                            <MenuItem value={'CEDULA'}>CEDULA</MenuItem>
                                            <MenuItem value={'CEDULA_EXTRANJERA'}>CEDULA_EXTRANJERA</MenuItem>
                                            <MenuItem value={'NIT'}>NIT</MenuItem>
                                            <MenuItem value={'TARJETA_IDENTIDAD'}>TARJETA_IDENTIDAD</MenuItem>

                                        </Select>
                                    </div></td>
                                    <td><div className="element-table"></div><TextField
                                        onChange={(e) => this.setState({ addRowValues: { ...this.state.addRowValues, identificacion: e.target.value } })}
                                        value={String(this.state.addRowValues.identificacion).replace(/[.\s]/g, '')}
                                        label="Identificación"
                                        margin="normal"
                                        onFocus={(e) => {
                                            try {
                                                this.props.handleUltimTable('demandadosadd')
                                                this.setState({ ultimFocus: { id: this.state.itemEdit, tipo: 'identificacion' } }, function () {
                                                    console.log(this.state)
                                                })
                                            }
                                            catch (error) {
                                                this.setState({ ultimFocus: { id: this.state.itemEdit, tipo: 'identificacion' } }, function () {
                                                    console.log(this.state.ultimFocus)
                                                })
                                                console.log(error)
                                            }
                                        }}

                                    /></td>
                                    <td><div className="element-table">
                                        <CurrencyFormat customInput={TextField} thousandSeparator={true} prefix={'$'}
                                            onValueChange={(values) => {
                                                this.setState({ addRowValues: { ...this.state.addRowValues, monto: values.floatValue } }, function () {
                                                    console.log(this.state.addRowValues)
                                                })
                                            }}
                                            value={String(this.state.addRowValues.monto).replace(/[$.,\s]/g, '')}
                                            label="Monto"
                                            margin="normal"
                                            onFocus={(e) => {
                                                this.props.handleUltimTable('demandadosadd')
                                                this.setState({ ultimFocus: { id: this.state.itemEdit, tipo: 'monto' } }, function () {
                                                    console.log(this.state.ultimFocus)
                                                })
                                            }}
                                        /></div></td>
                                    <td><div className="edits-rows">
                                        <a onClick={this.handleCancelAdd}><div className="button-edit-row"><MdCancel /></div></a>
                                        <a onClick={this.handleConfirmAdd}><div className="button-edit-row"><MdCheck /></div></a>

                                    </div></td>

                                </tr> : <></>}
                            {
                                this.props.demandados.data.map((item, index) => {
                                    if (this.state.itemEdit != item.id) {

                                        return (
                                            <tr>
                                                <td><div className="element-table">{item.nombres}</div></td>
                                                <td><div className="element-table">{item.tipoIdentificacion === null ? 'NO_SELECCIONADO' : item.tipoIdentificacion}</div></td>
                                                <td><div className="element-table">{String(item.identificacion).replace(/[.\s]/g, '')}</div></td>
                                                <td><div className={isNaN(item.montoAEmbargar) ? 'element-table-no' : 'element-table'}><div><CurrencyFormat value={Number(item.montoAEmbargar)} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div></div></td>
                                                <td>
                                                    {!this.state.waitConfirmDelete ?
                                                        <div className="edits-rows">
                                                            <a onClick={() => {
                                                                this.handleEdit(item.id, item.nombres, item.tipoIdentificacion, item.identificacion, item.montoAEmbargar, "extraInfo" in item ? item.extraInfo : {})
                                                            }}><div className="button-edit-row"><FaRegEdit size={'1.3rem'} /></div></a>
                                                            <a onClick={() => {

                                                                this.handleDelete(item.id)
                                                            }}><div className="button-edit-row"><MdDeleteSweep size={'1.3rem'} /></div></a>
                                                        </div> : <div className="edits-rows">
                                                            <a onClick={() => {
                                                                this.handleDeleteConfirm(item.id)
                                                            }}><div className="button-edit-row"><MdDone size={'1.3rem'} /></div></a>
                                                            <a onClick={() => {
                                                                this.handleDeleteCancel()

                                                            }}><div className="button-edit-row"><MdCancel size={'1.3rem'} /></div></a>
                                                        </div>}

                                                </td>

                                            </tr>
                                        )
                                    }
                                    return (
                                        <tr>
                                            <td><div className="element-table">
                                                <TextField
                                                    onChange={(e) => this.setState({ nombre: e.target.value })}
                                                    value={this.state.nombre}
                                                    label="Nombre"
                                                    margin="normal"
                                                    onFocus={(e) => {
                                                        try {
                                                            this.props.handleUltimTable('demandados')
                                                            this.focusElement2(e, this.props.resaltado.fields.demandados, this.state.itemEdit, 'nombre', 'nombre')
                                                        }
                                                        catch (error) {

                                                            this.setState({ ultimFocus: { id: item.id, tipo: 'nombre' } }, function () {
                                                                console.log(this.state.ultimFocus)
                                                            })
                                                            console.log(error)
                                                        }
                                                    }}
                                                />
                                            </div></td>
                                            <td><div className="element-table">
                                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                                    Tipo
                                                  </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-placeholder-label-label"
                                                    id="demo-simple-select-placeholder-label"
                                                    label="Tipo"
                                                    name="tipo"
                                                    value={String(this.state.tipo === null ? 'NO_SELECCIONADO' : this.state.tipo)}
                                                    onChange={(e) => this.setState({ tipo: e.target.value })}
                                                >
                                                    <MenuItem value={'NO_SELECCIONADO'}>NO_SELECCIONADO</MenuItem>
                                                    <MenuItem value={'CEDULA'}>CEDULA</MenuItem>
                                                    <MenuItem value={'CEDULA_EXTRANJERA'}>CEDULA_EXTRANJERA</MenuItem>
                                                    <MenuItem value={'NIT'}>NIT</MenuItem>
                                                    <MenuItem value={'TARJETA_IDENTIDAD'}>TARJETA_IDENTIDAD</MenuItem>

                                                </Select>
                                            </div></td>
                                            <td><div className="element-table"></div><TextField
                                                onChange={(e) => this.setState({ identificacion: e.target.value })}
                                                value={String(this.state.identificacion).replace(/[.,\s]/g, '')}
                                                label="Identificación"
                                                margin="normal"
                                                onFocus={(e) => {
                                                    try {
                                                        this.props.handleUltimTable('demandados')
                                                        this.focusElement2(e, this.props.resaltado.fields.demandados, this.state.itemEdit, 'identificacion', 'identificacion')
                                                    }
                                                    catch (error) {
                                                        this.setState({ ultimFocus: { id: item.id, tipo: 'identificacion' } }, function () {
                                                            console.log(this.state.ultimFocus)
                                                        })
                                                        console.log(error)
                                                        console.log(error)
                                                    }
                                                }}
                                            /></td>
                                            <td><div className="element-table">
                                                <CurrencyFormat customInput={TextField} thousandSeparator={true} prefix={'$'}
                                                    onValueChange={(values) => {
                                                        this.setState({ monto: values.floatValue }, function () {

                                                        })
                                                    }}
                                                    name="monto"
                                                    value={String(this.state.monto).replace(/[$.,\s]/g, '')}
                                                    label="Monto"
                                                    margin="normal"
                                                    onFocus={(e) => {
                                                        this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.monto : null))
                                                        this.props.handleUltimTable('demandados')
                                                        this.setState({ ultimFocus: { id: item.id, tipo: 'monto' } }, function () {
                                                            console.log(this.state.ultimFocus)
                                                        })

                                                    }}
                                                /></div></td>
                                            <td><div className="edits-rows">
                                                <a onClick={this.handleCancelEdit}><div className="button-edit-row"><MdCancel /></div></a>
                                                <a onClick={(e) => this.handleConfirm(item.id)}><div className="button-edit-row"><MdCheck /></div></a>

                                            </div></td>
                                        </tr>
                                    )

                                }

                                )

                            }


                        </table>
                    </div>

                )
            }
            else {
                renderTable = (
                    <table >
                        <tr>
                            <th><div className="title-col">Nombre</div></th>
                            <th><div className="title-col">Tipo</div></th>
                            <th><div className="title-col">Identificacion</div></th>
                            <th><div className="title-col">Monto</div></th>
                            <th><div className="title-col">Actions</div></th>
                        </tr>
                        {this.state.addRow ?

                            <tr>
                                <td><div className="element-table">
                                    <TextField
                                        onChange={(e) => this.setState({ addRowValues: { ...this.state.addRowValues, nombre: e.target.value } })}
                                        value={this.state.addRowValues.nombre}
                                        label="Nombre"
                                        margin="normal"
                                        onFocus={(e) => {
                                            try {
                                                this.props.handleUltimTable('demandadosadd')
                                                this.setState({ ultimFocus: { id: this.state.itemEdit, tipo: 'nombre' } }, function () {
                                                    console.log(this.state)
                                                })

                                                console.log('que mierda')
                                            }
                                            catch (error) {
                                                console.log(error)
                                            }
                                        }}
                                    />
                                </div></td>
                                <td><div className="element-table">
                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                                        Tipo
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-placeholder-label-label"
                                        id="demo-simple-select-placeholder-label"
                                        label="Tipo"
                                        name="tipo"
                                        onChange={(e) => this.setState({ addRowValues: { ...this.state.addRowValues, tipo: e.target.value } })}
                                        value={String(this.state.addRowValues.tipo)}


                                    >
                                        <MenuItem value={'NO_SELECCIONADO'}>NO_SELECCIONADO</MenuItem>
                                        <MenuItem value={'CEDULA'}>CEDULA</MenuItem>
                                        <MenuItem value={'CEDULA_EXTRANJERA'}>CEDULA_EXTRANJERA</MenuItem>
                                        <MenuItem value={'NIT'}>NIT</MenuItem>
                                        <MenuItem value={'TARJETA_IDENTIDAD'}>TARJETA_IDENTIDAD</MenuItem>

                                    </Select>
                                </div></td>
                                <td><div className="element-table"></div><TextField
                                    onChange={(e) => this.setState({ addRowValues: { ...this.state.addRowValues, identificacion: e.target.value } })}
                                    value={String(this.state.addRowValues.identificacion).replace(/[.\s]/g, '')}
                                    label="Identificación"
                                    margin="normal"
                                    onFocus={(e) => {
                                        try {
                                            this.props.handleUltimTable('demandadosadd')
                                            this.setState({ ultimFocus: { id: this.state.itemEdit, tipo: 'identificacion' } }, function () {
                                                console.log(this.state)
                                            })

                                        }
                                        catch (error) {
                                            console.log(error)
                                        }
                                    }}
                                /></td>
                                <td><div className="element-table">
                                    <CurrencyFormat customInput={TextField} thousandSeparator={true} prefix={'$'}
                                        onValueChange={(values) => {
                                            this.setState({ addRowValues: { ...this.state.addRowValues, monto: values.floatValue } }, function () {
                                                console.log(this.state.addRowValues)
                                            })
                                        }}
                                        value={String(this.state.addRowValues.monto).replace(/[$.,\s]/g, '')}
                                        label="Monto"
                                        margin="normal"
                                        onFocus={(e) => {
                                            try {
                                                this.props.handleUltimTable('demandadosadd')
                                                this.setState({ ultimFocus: { id: this.state.itemEdit, tipo: 'monto' } }, function () {
                                                    console.log(this.state)
                                                })

                                            }
                                            catch (error) {
                                                console.log(error)
                                            }
                                        }}

                                    /></div></td>
                                <td><div className="edits-rows">
                                    <a onClick={this.handleCancelAdd}><div className="button-edit-row"><MdCancel /></div></a>
                                    <a onClick={this.handleConfirmAdd}><div className="button-edit-row"><MdCheck /></div></a>

                                </div></td>

                            </tr> : <></>}

                    </table>
                )
            }
        }
        return (
            <div className="container-table-edit">
                <div className="table-header">
                    <div style={{ display: 'flex', alignItems:'center' }}>
                        <h5>Demandados </h5>  {this.props.loadingPage ? <div style={{paddingLeft:'10px'}}><PulseLoader
                            size={20}
                            color={"#123abc"}
                            loading={this.props.loadingPage}
                        /></div> : <h6 style={{paddingLeft:'10px'}}> (Page {this.props.actualPage})</h6>}
                    </div>
                    {this.props.demandadosExtractSinConfirmar ? <a onClick={this.saveExtractTable}><div className="button-table"><MdDone size={'1.4rem'} /></div></a> : <div style={{ display: 'flex' }}><a style={{ paddingRight: '5px' }} onClick={this.addRow}><div className="button-table"><MdAdd size={'1.4rem'} /></div></a><a className="button-table" onClick={this.goToExcel}><FaFileExcel size="1.7em" color={"#434040"} /></a></div>}
                </div>
                {renderTable}
                <div className="buttons-control-table">
                    <a onClick={this.first}><div className="button-table"><MdFirstPage size={'1.4rem'} /></div></a>
                    <a onClick={this.back}><div className="button-table"><MdNavigateBefore size={'1.4rem'} /></div></a>
                    <a onClick={this.next}><div className="button-table"><MdNavigateNext size={'1.4rem'} /></div></a>
                    <a onClick={this.last}><div className="button-table"><MdLastPage size={'1.4rem'} /></div></a>

                </div>

            </div>
        )
    }
    first = () => {
        if(this.props.actualPage!==0){
            this.props.handleDemandadosFirstPage(this.props.idDocumento, this.props.token, '')
        }
        
    }
    last = () => {
        if(this.props.pathLastPage!==''){
            this.props.handleDemandadosUltimPage(this.props.idDocumento, this.props.token, this.props.pathLastPage)
        }
        
    }
    goToExcel = () => {
        this.props.history.push('/upload/excel/' + this.props.match.params.id)
    }
    saveExtractTable = () => {
        this.props.handleSaveDemandados(this.props.demandados.data, this.props.token, this.props.idDocumento)
    }
    addRow = () => {
        this.setState({ addRow: true })
    }
    handleCancelAdd = () => {
        this.setState({ addRow: false, addRowValues: { nombre: '', tipo: 'NO_SELECCIONADO', identificacion: '', monto: '' } })
    }
    handleConfirmAdd = () => {
        const obj = {
            id: this.props.demandados.data.length + 'local',
            identificacion: (this.state.addRowValues.identificacion).replace(/[.\s]/g, ''),
            nombres: this.state.addRowValues.nombre,
            tipoIdentificacion: this.state.addRowValues.tipo,
            montoAEmbargar: String(this.state.addRowValues.monto).replace(/[$.,\s\D]/g, ''),
            montoEmbargado: 0,
            page: 0,
            esCliente: false,
            expediente: null,
            expedientes: []

        }
        this.props.handleAddDemandado(obj, this.props.demandados.data, this.props.token, this.props.idDocumento)


        this.setState({ addRow: false, addRowValues: { nombre: '', tipo: 'NO_SELECCIONADO', identificacion: '', monto: '' } })
    }
    next = () => {
        if (this.props.pathSiguienteDemandados !== '')
            this.props.handleDemandadosSiguiente(this.props.idDocumento, this.props.token, this.props.pathSiguienteDemandados)
    }
    back = () => {
        if (this.props.pathAnteriorDemandados !== '')
            this.props.handleDemandadosAnterior(this.props.idDocumento, this.props.token, this.props.pathAnteriorDemandados)

    }
}
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const mapStateToProps = (state) => ({
    json: state.EmbargosReducer.embargo.json,
    demandados: state.EmbargosReducer.demandados,
    resaltado: state.EmbargosReducer.embargo.json1,
    bounding: state.boundingReducer.palabra,
    tablaBounding: state.boundingReducer.tabla,
    token: state.auth.authToken,
    demandadosExtractSinConfirmar: state.boundingReducer.DemandadosTablePorConfirmar,
    page: state.boundingReducer.page,
    pathSiguienteDemandados: state.EmbargosReducer.demandadosPathSiguiente,
    pathAnteriorDemandados: state.EmbargosReducer.demandadosPathAnterior,
    pathLastPage:state.EmbargosReducer.demandadosPathUltim,
    loadingPage: state.EmbargosReducer.loadingPage,
    demandadosAllUpdateTipo: state.EmbargosReducer.demandadosAllUpdateTipo,
    actualPage:state.EmbargosReducer.actualPage
})
const mapDispatchToProps = (dispatch) => ({
    handleBounding: bindActionCreators(changePoints, dispatch),
    handleUltimTable: bindActionCreators(setUltimaTableFocus, dispatch),
    handleUpdate: bindActionCreators(updateDemandando, dispatch),
    handleDelete: bindActionCreators(deleteDemandado, dispatch),
    handleAddDemandado: bindActionCreators(addDemandado, dispatch),
    handleSaveDemandados: bindActionCreators(saveDemandados, dispatch),
    handleDemandadosSiguiente: bindActionCreators(getDemandadosSiguiente, dispatch),
    handleDemandadosAnterior: bindActionCreators(getDemandadosAnterior, dispatch),
    updateAllTipoDocumento: bindActionCreators(updateAllTipoDocumento, dispatch),
    upadteAllRequest: bindActionCreators(upadteAllRequest, dispatch),
    handleDemandadosUltimPage: bindActionCreators(getDemandadosLastPage, dispatch),
    handleDemandadosFirstPage: bindActionCreators(getDemandadosFirstPage, dispatch)
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableDemandado))


