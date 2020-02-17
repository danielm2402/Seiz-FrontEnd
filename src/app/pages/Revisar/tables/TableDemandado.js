import React, { Component } from 'react'
import './styles.css'
import { MdNavigateNext, MdNavigateBefore, MdDeleteSweep,MdCheck,MdCancel } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
class TableDemandado extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemEdit: null,
            nombre:'',
            tipo:'',
            identificacion:'',
            monto:''
        }
    }
    handleEdit=(id, nombre,tipo,identificacion,monto)=>{
    
        this.setState({itemEdit:id, nombre:nombre, tipo:tipo, identificacion:identificacion, monto:monto})
    }
    handleCancelEdit=()=>{
        console.log('cancelando edicion')
        this.setState({itemEdit:null})
    }
    handleConfirmEdit=(id)=>{
        console.log('editaaaaaaando')
        this.setState({itemEdit:id})
    }

    render() {
        let renderTable;
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
                        {this.props.demandados.data.map((item) => {
                            if (this.state.itemEdit != item.id) {
                                return (
                                    <tr>
                                        <td><div className="element-table">{item.nombres}</div></td>
                                        <td><div className="element-table">{item.tipoIdentificacion}</div></td>
                                        <td><div className="element-table"></div>{item.identificacion}</td>
                                        <td><div className="element-table">{item.montoAEmbargar}</div></td>
                                        <td><div className="edits-rows"><a onClick={()=>this.handleEdit(item.id,item.nombres,item.tipoIdentificacion,item.identificacion,item.montoAEmbargar)}><div className="button-edit-row"><FaRegEdit /></div></a>
                                            <a><div className="button-edit-row"><MdDeleteSweep /></div></a>
                                        </div></td>
                                    </tr>
                                )
                            }
                            return (
                                <tr>
                                    <td><div className="element-table">
                                        <TextField
                                            onChange={(e)=>this.setState({nombre:e.target.value})}
                                            value={this.state.nombre}
                                            label="Nombre"
                                            margin="normal"
                                        />
                                    </div></td>
                                    <td><div className="element-table"><TextField
                                            onChange={(e)=>this.setState({tipo:e.target.value})}
                                            value={this.state.tipo}
                                            label="Tipo"
                                            margin="normal"
                                        /></div></td>
                                    <td><div className="element-table"></div><TextField
                                            onChange={(e)=>this.setState({identificacion:e.target.value})}
                                            value={this.state.identificacion}
                                            label="Identificación"
                                            margin="normal"
                                        /></td>
                                    <td><div className="element-table"><TextField
                                           onChange={(e)=>this.setState({monto:e.target.value})}
                                            value={this.state.monto}
                                            label="Monto"
                                            margin="normal"
                                        /></div></td>
                                    <td><div className="edits-rows">
                                    <a onClick={this.handleCancelEdit}><div className="button-edit-row"><MdCancel /></div></a>
                                        <a><div className="button-edit-row"><MdCheck /></div></a>
                                    
                                    </div></td>
                                </tr>
                            )
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
                    </table>)
            }
        }
        return (
            <div className="container-table-edit">
                <div>
                    <h5>Demandados</h5>
                </div>
                {renderTable}
                <div className="buttons-control-table">

                    <a><div className="button-table"><MdNavigateBefore /></div></a>
                    <a><div className="button-table"><MdNavigateNext /></div></a>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

    demandados: state.EmbargosReducer.demandados,

})
const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(TableDemandado)