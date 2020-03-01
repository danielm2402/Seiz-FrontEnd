import React, { Component } from 'react'
import './styles.css'
import nextId from "react-id-generator";
import { MdNavigateNext, MdNavigateBefore, MdDeleteSweep, MdCheck, MdCancel, MdAdd } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import { changePoints, setUltimaTableFocus } from '../../../redux/actions/boundingAction'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { updateDemandando, deleteDemandado, addDemandado,saveDemandados } from '../../../redux/actions/embargosAction'

class TableDemandado extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemEdit: null,
            nombre: '',
            tipo: '',
            identificacion: '',
            monto: '',
            ultimFocus: { id: '', tipo: '' },
            numItems: 0,
            numItemsSiguientes: 5,
            totalItems: 0,
            totalPages: { exacts: 0, numRecorrido: 1 },
            addRow: false,
            addRowValues: {
                nombre: '',
                tipo: 'NO_SELECCIONADO',
                identificacion: '',
                monto: ''
            }
        }
    }
    componentDidUpdate(prevProps) {

        if (this.props.bounding !== prevProps.bounding) {
           
            if (this.props.tablaBounding == 'demandados') {
              
                console.log('ULTIMO FOCUS')
                console.log()
                console.log(this.state[this.state.ultimFocus.tipo])
                this.setState({[this.state.ultimFocus.tipo]:this.state[this.state.ultimFocus.tipo]+ this.props.bounding})
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
    handleEdit = (id, nombre, tipo, identificacion, monto) => {

        this.setState({ itemEdit: id, nombre: nombre, tipo: tipo, identificacion: identificacion, monto: monto }, function () {
            
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
            identificacion: identificacion,
            montoAEmbargar: monto
        }
        this.props.handleUpdate(id, obj,this.props.demandados.data, this.props.token, this.props.idDocumento);
        this.handleCancelEdit()

    }
    handleConfirmEdit = (id) => {
        
        this.setState({ itemEdit: id })
    }
    handleDelete = (id) => {
        this.props.handleDelete(id, this.props.token)
    }
    focusElement(e, palabra) {
       
        // this.setState({ actualFocus: e.target.name })
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
                        totalBoundig.push(this.props.json.pages[this.props.page - 1].words[iterador].boundingPoly.vertices)
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
    focusElement2(e, palabra, id, tipo, column) {
       console.log('esta llegando')


        this.setState({ ultimFocus: { id: id, tipo: column } })
        this.props.handleUltimTable('demandados')
        if (this.props.resaltado !== "") {
            try {
                let vectorLocation = [];
                let totalBoundig = [];
                const row = palabra.fieldInstances[id].parts[tipo]
                vectorLocation.push({ start: row.startLocation, end: row.endLocation, page: row.page })
                vectorLocation.map((item) => {
                    var iterador = item.start
                    for (iterador; iterador <= item.end; iterador++) {
                        totalBoundig.push(this.props.json.pages[this.props.page - 1].words[iterador].boundingPoly.vertices)
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
                    <table>
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
                                                this.focusElement2(e, this.props.resaltado.fields.demandados, this.state.itemEdit, 'nombre', 'nombre')
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
                                    value={String(this.state.addRowValues.identificacion)}
                                    label="Identificación"
                                    margin="normal"
                                    onFocus={(e) => {
                                        try {
                                            this.focusElement2(e, this.props.resaltado.fields.demandados, this.state.itemEdit, 'identificacion', 'identificacion')
                                        }
                                        catch (error) {
                                            console.log(error)
                                        }
                                    }}
                                /></td>
                                <td><div className="element-table"><TextField
                                    onChange={(e) => this.setState({ addRowValues: { ...this.state.addRowValues, monto: e.target.value } })}
                                    value={String(this.state.addRowValues.monto)}
                                    label="Monto"
                                    margin="normal"
                                    onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.monto : null)) }}
                                /></div></td>
                                <td><div className="edits-rows">
                                    <a onClick={this.handleCancelAdd}><div className="button-edit-row"><MdCancel /></div></a>
                                    <a onClick={this.handleConfirmAdd}><div className="button-edit-row"><MdCheck /></div></a>

                                </div></td>

                            </tr> : <></>}
                        {
                            this.props.demandados.data.map((item, index) => {
                                contador = contador + 1
                                if (contador >= this.state.numItems && contador < this.state.numItemsSiguientes) {

                                    if (this.state.itemEdit != item.id) {

                                        return (
                                            <tr>
                                                <td><div className="element-table">{item.nombres}</div></td>
                                                <td><div className="element-table">{item.tipoIdentificacion}</div></td>
                                                <td><div className="element-table">{item.identificacion}</div></td>
                                                <td><div className="element-table">{item.montoAEmbargar}</div></td>
                                                <td><div className="edits-rows"><a onClick={() => this.handleEdit(item.id, item.nombres, item.tipoIdentificacion, item.identificacion, item.montoAEmbargar)}><div className="button-edit-row"><FaRegEdit size={'1.3rem'} /></div></a>
                                                    <a onClick={() => this.handleDelete(item.id)}><div className="button-edit-row"><MdDeleteSweep size={'1.3rem'} /></div></a>
                                                </div></td>

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
                                                            
                                                            this.setState({ ultimFocus: { id: item.id, tipo: 'nombre' } }, function(){
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
                                                    value={String(this.state.tipo)}
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
                                                value={this.state.identificacion}
                                                label="Identificación"
                                                margin="normal"
                                                onFocus={(e) => {
                                                    try {
                                                        this.props.handleUltimTable('demandados')
                                                        this.focusElement2(e, this.props.resaltado.fields.demandados, this.state.itemEdit, 'identificacion', 'identificacion')
                                                    }
                                                    catch (error) {
                                                        this.setState({ ultimFocus: { id: item.id, tipo: 'identificacion' } }, function(){
                                                            console.log(this.state.ultimFocus)
                                                        })
                                                        console.log(error)
                                                        console.log(error)
                                                    }
                                                }}
                                            /></td>
                                            <td><div className="element-table"><TextField
                                                onChange={(e) => this.setState({ monto: e.target.value })}
                                                value={this.state.monto}
                                                label="Monto"
                                                margin="normal"
                                                onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.monto : null))
                                                this.setState({ ultimFocus: { id: item.id, tipo: 'monto' } }, function(){
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
                            }

                            )

                        }


                    </table>

                )
            }
            else {
                renderTable = (
                    <table>
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
                    this.focusElement2(e, this.props.resaltado.fields.demandados, this.state.itemEdit, 'nombre', 'nombre')
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
        value={String(this.state.addRowValues.identificacion)}
        label="Identificación"
        margin="normal"
        onFocus={(e) => {
            try {
                this.focusElement2(e, this.props.resaltado.fields.demandados, this.state.itemEdit, 'identificacion', 'identificacion')
            }
            catch (error) {
                console.log(error)
            }
        }}
    /></td>
    <td><div className="element-table"><TextField
        onChange={(e) => this.setState({ addRowValues: { ...this.state.addRowValues, monto: e.target.value } })}
        value={String(this.state.addRowValues.monto)}
        label="Monto"
        margin="normal"
        onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.monto : null)) }}
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
                    <h5>Demandados</h5>
                    <a onClick={this.addRow}><div className="button-table"><MdAdd size={'1.4rem'} /></div></a>
                </div>
                {renderTable}
                <div className="buttons-control-table">

                    <a onClick={this.back}><div className="button-table"><MdNavigateBefore size={'1.4rem'} /></div></a>
                    <a onClick={this.next}><div className="button-table"><MdNavigateNext size={'1.4rem'} /></div></a>

                </div>
            </div>
        )
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
            identificacion: this.state.addRowValues.identificacion,
            nombres: this.state.addRowValues.nombre,
            tipoIdentificacion: this.state.addRowValues.tipo,
            montoAEmbargar: this.state.addRowValues.monto,
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

        if (this.state.totalPages.numRecorrido < this.state.totalPages.exacts) {

            this.setState({ totalPages: { ...this.state.totalPages, numRecorrido: this.state.totalPages.numRecorrido + 1 }, numItems: this.state.numItemsSiguientes, numItemsSiguientes: this.state.numItemsSiguientes + 5 }, function () {
                
            })
        }
    }
    back = () => {
        if (this.state.totalPages.numRecorrido > 1)
            this.setState({ totalPages: { ...this.state.totalPages, numRecorrido: this.state.totalPages.numRecorrido - 1 }, numItems: this.state.numItemsSiguientes - 10, numItemsSiguientes: this.state.numItemsSiguientes - 5 }, function () {
                

            })
    }
}

const mapStateToProps = (state) => ({
    json: state.EmbargosReducer.embargo.json,
    demandados: state.EmbargosReducer.demandados,
    resaltado: state.EmbargosReducer.embargo.json1,
    bounding: state.boundingReducer.palabra,
    tablaBounding: state.boundingReducer.tabla,
    token: state.auth.authToken,
})
const mapDispatchToProps = (dispatch) => ({
    handleBounding: bindActionCreators(changePoints, dispatch),
    handleUltimTable: bindActionCreators(setUltimaTableFocus, dispatch),
    handleUpdate: bindActionCreators(updateDemandando, dispatch),
    handleDelete: bindActionCreators(deleteDemandado, dispatch),
    handleAddDemandado: bindActionCreators(addDemandado, dispatch),
    handleSaveDemandados: bindActionCreators(saveDemandados,dispatch),

})
export default connect(mapStateToProps, mapDispatchToProps)(TableDemandado)


