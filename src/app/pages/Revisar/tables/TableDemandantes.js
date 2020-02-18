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
import {updateDemandante} from '../../../redux/actions/embargosAction'
class TableDemandantes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemEdit: null,
            nombre: '',
            identificacion: '',
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
            if (this.props.tablaBounding == 'demandantes') {
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
    handleEdit = (id, nombre, identificacion) => {

        this.setState({ itemEdit: id, nombre: nombre, identificacion: identificacion },function(){
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
    handleConfirm=(id)=>{

        const {nombre,identificacion}=this.state
        const obj={
            nombres: nombre,
            identificacion:identificacion,
        
        }
       this.props.handleUpdate(id, obj);
       this.handleCancelEdit()
    
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
        this.props.handleUltimTable('demandantes')
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
        if (this.props.embargo) {
            renderTable = (
                <table>
                    <tr>
                        <th><div className="title-col">Nombre</div></th>
                        <th><div className="title-col">Identificacion</div></th>
                        <th><div className="title-col">Actions</div></th>
                    </tr>
                    <tr>
                        NO DATA
                    </tr>
                </table>)
        } else {
            if (this.props.demandantes.length > 0) {
                renderTable = (
                    <table>
                        <tr>
                            <th><div className="title-col">Nombre</div></th>
                            <th><div className="title-col">Identificacion</div></th>
                            <th><div className="title-col">Actions</div></th>
                           
                        </tr>
                        {
                            this.props.demandantes.map((item) => {
                                contador = contador + 1
                                if (contador >= this.state.numItems && contador < this.state.numItemsSiguientes) {

                                    if (this.state.itemEdit != item.id) {

                                        return (
                                            <tr>
                                                <td><div className="element-table">{item.fullname}</div></td>
                                                <td><div className="element-table">{item.identificacion||'-'}</div></td>
                                              
                                                <td><div className="edits-rows"><a onClick={() => this.handleEdit(item.id, item.fullname,item.identificacion)}><div className="button-edit-row"><FaRegEdit size={'1.3rem'} /></div></a>
                                                    <a><div className="button-edit-row"><MdDeleteSweep size={'1.3rem'} /></div></a>
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
                                                            this.focusElement2(e, this.props.resaltado.fields.demandantes, this.state.itemEdit, 'nombre', 'nombre')
                                                        }
                                                        catch (error) {
                                                            console.log(error)
                                                        }
                                                    }}
                                                />
                                            </div></td>
                                            <td><div className="element-table"></div><TextField
                                                onChange={(e) => this.setState({ identificacion: e.target.value })}
                                                value={this.state.identificacion}
                                                label="Identificación"
                                                margin="normal"
                                                onFocus={(e) => {
                                                    try {
                                                        this.focusElement2(e, this.props.resaltado.fields.demandantes, this.state.itemEdit, 'identificacion', 'identificacion')
                                                    }
                                                    catch (error) {
                                                        console.log(error)
                                                    }
                                                }}
                                            /></td>
                                            <td><div className="edits-rows">
                                                <a onClick={this.handleCancelEdit}><div className="button-edit-row"><MdCancel /></div></a>
                                                <a onClick={(e)=>this.handleConfirm(item.id)}><div className="button-edit-row"><MdCheck /></div></a>

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
                          
                            <th><div className="title-col">Identificacion</div></th>
                        
                            <th><div className="title-col">Actions</div></th>
                        </tr>
                        
                    </table>
                    )
            }
        }
        return (
            <div className="container-table-edit">
                <div>
                    <h5>Demandantes</h5>
                </div>
                {renderTable}
                <div className="buttons-control-table">

                    <a onClick={this.back}><div className="button-table"><MdNavigateBefore size={'1.4rem'} /></div></a>
                    <a onClick={this.next}><div className="button-table"><MdNavigateNext size={'1.4rem'} /></div></a>

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
TableDemandantes.defaultProps = {
    demandantes: [],
    
  };
  

const mapStateToProps = (state) => ({
    json: state.EmbargosReducer.embargo.json,
    resaltado: state.EmbargosReducer.embargo.json1,
    bounding: state.boundingReducer.palabra,
    tablaBounding: state.boundingReducer.tabla,
    embargo: state.EmbargosReducer.embargo.loading 
})
const mapDispatchToProps = (dispatch) => ({
    handleBounding: bindActionCreators(changePoints, dispatch),
    handleUltimTable: bindActionCreators(setUltimaTableFocus, dispatch),
    handleUpdate: bindActionCreators(updateDemandante,dispatch),
})
export default connect(mapStateToProps, mapDispatchToProps)(TableDemandantes)


   