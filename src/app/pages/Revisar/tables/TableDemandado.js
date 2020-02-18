import React, { Component } from 'react'
import './styles.css'
import { MdNavigateNext, MdNavigateBefore, MdDeleteSweep, MdCheck, MdCancel } from "react-icons/md";
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
            totalItems:0,
            totalPages:{exacts:0, numRecorrido:1}
        }
    }
    componentDidUpdate(prevProps) {

        if (this.props.bounding !== prevProps.bounding) {
            console.log('NUEVA PALABRAAAA')
            console.log(this.props.tablaBounding)
            if (this.props.tablaBounding == 'demandados') {
                console.log('CAMBIANDO LA PALABRA DEL INPUT')
                this.setState({ [this.state.ultimFocus.tipo]: this.props.bounding }, function () {
                    console.log(this.state.nombre)
                })
            }

        }
        if(this.props.demandados !== prevProps.demandados){
            if(this.props.demandados.data.length%5===0){
                this.setState({totalPages:{exacts:(this.props.demandados.data.length/5),numRecorrido:1}})
            }
            else{
                this.setState({totalPages:{exacts:(Math.trunc(this.props.demandados.data.length/5))+1,numRecorrido:1}})
            }
           
        }
    }
    handleEdit = (id, nombre, tipo, identificacion, monto) => {

        this.setState({ itemEdit: id, nombre: nombre, tipo: tipo, identificacion: identificacion, monto: monto },function(){
            console.log(this.state)
        })
    }
    handleCancelEdit = () => {
        console.log('cancelando edicion')
        this.setState({ itemEdit: null })
    }
    handleConfirmEdit = (id) => {
        console.log('editaaaaaaando')
        this.setState({ itemEdit: id })
    }
    focusElement(e, palabra) {
        console.log(e.target.name)
        // this.setState({ actualFocus: e.target.name })
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
                        totalBoundig.push(this.props.json.pages[this.props.page - 1].words[iterador].boundingPoly.vertices)
                    }
                })
                console.log('totalboundig')
                console.log(totalBoundig)

                this.props.handleBounding(totalBoundig)
                this.setState({
                    boundig: { boundig: true, points: totalBoundig }
                })
            } catch (error) {
            }
        }
    }
    focusElement2(e, palabra, id, tipo, column) {
        console.log('el id')
        console.log(id)
        console.log(palabra)
     

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
                        {
                            this.props.demandados.data.map((item) => {
                                contador = contador + 1
                                if (contador >= this.state.numItems && contador < this.state.numItemsSiguientes) {

                                    if (this.state.itemEdit != item.id) {

                                        return (
                                            <tr>
                                                <td><div className="element-table">{item.nombres}</div></td>
                                                <td><div className="element-table">{item.tipoIdentificacion}</div></td>
                                                <td><div className="element-table">{item.identificacion}</div></td>
                                                <td><div className="element-table">{item.montoAEmbargar}</div></td>
                                                <td><div className="edits-rows"><a onClick={() => this.handleEdit(item.id, item.nombres, item.tipoIdentificacion, item.identificacion, item.montoAEmbargar)}><div className="button-edit-row"><FaRegEdit /></div></a>
                                                    <a><div className="button-edit-row"><MdDeleteSweep /></div></a>
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
                                                        this.focusElement2(e, this.props.resaltado.fields.demandados, this.state.itemEdit, 'identificacion', 'identificacion')
                                                    }
                                                    catch (error) {
                                                        console.log(error)
                                                    }
                                                }}
                                            /></td>
                                            <td><div className="element-table"><TextField
                                                onChange={(e) => this.setState({ monto: e.target.value })}
                                                value={this.state.monto}
                                                label="Monto"
                                                margin="normal"
                                                onFocus={(e) => { this.focusElement(e, (this.props.resaltado !== "" ? this.props.resaltado.fields.monto : null)) }}
                                            /></div></td>
                                            <td><div className="edits-rows">
                                                <a onClick={this.handleCancelEdit}><div className="button-edit-row"><MdCancel /></div></a>
                                                <a><div className="button-edit-row"><MdCheck /></div></a>

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
                        
                    </table>
                    )
            }
        }
        return (
            <div className="container-table-edit">
                <div>
                    <h5>Demandados</h5>
                </div>
                {renderTable}
                <div className="buttons-control-table">

                    <a onClick={this.back}><div className="button-table"><MdNavigateBefore /></div></a>
                    <a onClick={this.next}><div className="button-table"><MdNavigateNext /></div></a>

                </div>
            </div>
        )
    }
    next = () => {

        if(this.state.totalPages.numRecorrido<this.state.totalPages.exacts)
        {
            
        this.setState({ totalPages:{...this.state.totalPages, numRecorrido:this.state.totalPages.numRecorrido+1},numItems: this.state.numItemsSiguientes, numItemsSiguientes: this.state.numItemsSiguientes + 5 }, function () {
            console.log(this.state.totalPages)
        })
    }
    }
    back = () => {
        if(this.state.totalPages.numRecorrido>1)
        this.setState({ totalPages:{...this.state.totalPages, numRecorrido:this.state.totalPages.numRecorrido-1}, numItems: this.state.numItemsSiguientes - 10, numItemsSiguientes: this.state.numItemsSiguientes - 5 }, function () {
            console.log(this.state.totalPages)
           
        })
    }
}

const mapStateToProps = (state) => ({
    json: state.EmbargosReducer.embargo.json,
    demandados: state.EmbargosReducer.demandados,
    resaltado: state.EmbargosReducer.embargo.json1,
    bounding: state.boundingReducer.palabra,
    tablaBounding: state.boundingReducer.tabla

})
const mapDispatchToProps = (dispatch) => ({
    handleBounding: bindActionCreators(changePoints, dispatch),
    handleUltimTable: bindActionCreators(setUltimaTableFocus, dispatch)

})
export default connect(mapStateToProps, mapDispatchToProps)(TableDemandado)


   