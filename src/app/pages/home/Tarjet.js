import React, { Component } from 'react'
import './Tarjet.css'
import { FaSearch } from "react-icons/fa";

export default class Tarjet extends Component {
    render() {
        return (
            <div className="tarjet-container" style={{ width: this.props.width, height: this.props.height }}>
                <div className="tarjet-information">
                    <h3 className="title-tarjet">{this.props.nombre}</h3>
                    <h2>{this.props.numero}</h2>
                </div>
                <div className="tarjet-icon">

                </div>
            </div>
        )
    }
}
