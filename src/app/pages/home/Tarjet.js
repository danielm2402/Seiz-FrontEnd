import React, { Component } from 'react'
import './Tarjet.css'
import { FaSearch } from "react-icons/fa";

export default class Tarjet extends Component {
    render() {
        return (
            <div className="tarjet-container" style={{ width: this.props.width, height: this.props.height }}>
                <div className="header-tarjer">
                    <h5>{this.props.nombre}</h5>
                    <div>
                        <FaSearch style={{color: '#BDD535'}} />
                    </div>
                </div>
                <div>
                    <hr className="hr-style"/>
                </div>
                <div className="number-tarjeta">
                   <h1>{this.props.number}</h1> 
                </div>
            </div>
        )
    }
}
