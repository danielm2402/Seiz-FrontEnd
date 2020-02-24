import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './user.css'
import { MdPhotoLibrary, MdEmail } from "react-icons/md";
import Avatar from 'react-avatar';
import { getUser } from '../../redux/actions/userAction'
import { FaUserTie, FaLock, FaStar, FaEdit, FaCheck, FaRegWindowClose } from "react-icons/fa";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            email: '',
            password: '',
            passwordConfirmation: '',
            name: '',
            surname: ''
        }

    }
    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            this.setState({
                email: this.props.user.user.email,
                name: this.props.user.user.name,
                surname: this.props.user.user.surname
            })
        }
    }
    componentDidMount() {
        console.log(this.props)
        this.props.handleUserRequest(this.props.match.params.id, this.props.token)
    }
    handleEdit = () => {
        this.setState({ isEdit: true })
    }
    handleCancelEdit = () => {
        this.setState({ isEdit: false })
    }
    handleConfirmEdit = () => {
        //TODO
    }
    render() {
        return (
            <div>
                {this.props.user.loading ? <div>Loading</div> : <div className="container-user-config">
                    <div className="background-user-config">
                        <div className="tittle-user-config">
                            <h5>Account Settings</h5>
                            {this.state.isEdit ? <></> : <a onClick={this.handleEdit}><FaEdit size={'1.5rem'} /></a>}

                            {this.state.isEdit ? <div>

                                <a style={{ paddingRight: '10px' }} onClick={this.handleConfirmEdit}><FaCheck size={'1.5rem'} /></a>
                                <a onClick={this.handleCancelEdit}><FaRegWindowClose size={'1.5rem'} /></a> </div> : <></>}

                        </div>
                        <div className="container-config">
                            <div className="item-config">
                                <div className="section-icons">
                                    <MdPhotoLibrary size={'2.5rem'} />
                                </div>
                                <div className="content-information">
                                    <Avatar size={'130px'} name={this.props.user.user.name} />
                                </div>
                            </div>
                            <div className="item-config">
                                <div className="section-icons">
                                    <FaUserTie size={'2.5rem'} />
                                </div>
                                <div className="content-information">
                                    {this.state.isEdit ?
                                        <div style={{ display: 'flex', flexDirection: 'row' }} >
                                            <div className="container-inputs-text">
                                                <TextField label="Nombre" value={this.state.name} onChange={(e)=>this.setState({name:e.target.value })} />
                                            </div>
                                            <div className="container-inputs-text">
                                                <TextField label="Apellido" value={this.state.surname} onChange={(e)=>this.setState({surname:e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        : <div style={{ display: 'flex', flexDirection: 'row' }}><h6 style={{ paddingRight: '10px' }}>{this.state.name}</h6>
                                            <h6>{this.state.surname}</h6></div>}

                                </div>
                            </div>
                            <div className="item-config">
                                <div className="section-icons">
                                    <MdEmail size={'2.5rem'} />
                                </div>
                                <div className="content-information">
                                    {this.state.isEdit ? <div className="container-inputs-text">
                                        <TextField label="Email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value })}
                                        />
                                    </div>:<h6>{this.state.email}</h6>}
                                    
                                </div>
                            </div>
                            <div className="item-config">
                                <div className="section-icons">
                                    <FaStar size={'2.5rem'} />
                                </div>
                                <div className="content-information">
                                    <Select disabled={!this.state.isEdit}
                                        labelId="demo-simple-select-label"
                                        id="tipoEmbargo"
                                        name="tipoEmbargo"
                                        value={String(this.props.user.user.enabled)}
                                    >
                                        <MenuItem value={'true'}>ACTIVO</MenuItem>
                                        <MenuItem value={'false'}>DESACTIVADO</MenuItem>


                                    </Select>
                                </div>

                            </div>
                            {this.state.isEdit ?
                                <div className="item-config">
                                    <div className="section-icons">
                                        <FaLock size={'2.5rem'} />
                                    </div>
                                    <div className="content-information-password">
                                        <div className="container-inputs-text">
                                            <TextField label="Contraseña" />
                                        </div>
                                        <div className="container-inputs-text">
                                            <TextField label="Confirmar" />
                                        </div>


                                    </div>
                                </div> : <></>}

                        </div>
                    </div>

                </div>
                }

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    token: state.auth.authToken,
    user: state.userReducer
})
const mapDispatchToProps = (dispatch) => ({
    handleUserRequest: bindActionCreators(getUser, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(User)
