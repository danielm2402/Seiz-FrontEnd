
import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { deleteEmbargo, getEmbargo, getDemandados } from '../../redux/actions/embargosAction'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import { changePoints, resetPoints, resetRegion } from '../../redux/actions/boundingAction'

class Demandantes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false,
      boundig: { boundig: false, points: [] },
      ultimFocus: { id: '', tipo: '' }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {

    if (this.state.boundig != nextState.boundig || this.state.ultimFocus != nextState.ultimFocus) {
      return false
    } else {
      return true;
    }

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
    if (this.props.resaltado !== "") {
      try {
        let vectorLocation = [];
        let totalBoundig = [];
        const row = palabra.fieldInstances[id].parts[tipo]
        console.log(row)
        vectorLocation.push({ start: row.startLocation, end: row.endLocation, page: row.page })


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

  render() {
    return (
      <div>
        <MaterialTable
          title={this.props.nombre}
          columns={[
            {
              title: 'Nombre', field: 'fullname', editComponent: props => {
               
                console.log(props)
                return (
                  this.props.bounding !== "" && props.rowData.id === this.state.ultimFocus.id && props.columnDef.field === this.state.ultimFocus.tipo ?
                  <TextField
                    id="name"
                    value={this.props.bounding}
                    label="Nombre1"
                    margin="normal"
                    onChange={e => {
                      this.props.handlePalabra()
                      props.onChange(e.target.value)
                    }}
                    
                  />: <TextField
                  id="name"
                  onChange={e => {
                    props.onChange(e.target.value)
                  }}
                  value={props.value}
                  onChange={e => { props.onChange(e.target.value) }}
                  label="Nombre2"
                  margin="normal"
                  
                  onFocus={(e) => {
                    try {
                      this.focusElement2(e, this.props.resaltado.fields.demandantes, props.rowData.id, 'nombre', props.columnDef.field)
                    }
                    catch (error) {
                      console.log(error)
                    }
                  }}
                />
                )
              }
            },
            {
              title: 'Identificación', field: 'identification', editComponent: props => {
                return (
                  this.props.bounding !== "" && props.rowData.id === this.state.ultimFocus.id && props.columnDef.field === this.state.ultimFocus.tipo ?
                    <TextField
                      id="id"
                      onChange={e => {
                        this.props.handlePalabra()
                        props.onChange(e.target.value)
                      }}
                      value={this.props.bounding}
                      label="Identificacion"
                      margin="normal"
                      onFocus={(e) => this.focusElement2(e, this.props.resaltado.fields.demandantes, props.rowData.id, 'identificacion', props.columnDef.field)}
                    /> : <TextField
                      id="id"
                      value={props.value}
                      onChange={e => props.onChange(e.target.value)}
                      label="Identificacion"
                      margin="normal"
                      onFocus={(e) => this.focusElement2(e, this.props.resaltado.fields.demandantes, props.rowData.id, 'identificacion', props.columnDef.field)}
                    />
                )
              }
            },
          ]}
          data={this.props.data}

          options={{
            pageSize: 3,
            pageSizeOptions: [],
            toolbar: true,
            paging: true
          }}
          editable={{
            isEditable: rowData => this.props.editable === true, // only name(a) rows would be editable
            isDeletable: rowData => this.props.editable === true, // only name(a) rows would be deletable
            onRowAdd: this.props.add,
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    /* const data = this.state.data;
                    const index = data.indexOf(oldData);
                    data[index] = newData;                
                    this.setState({ data }, () => resolve()); */
                  }
                  resolve();
                }, 1000);
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    /* let data = this.state.data;
                    const index = data.indexOf(oldData);
                    data.splice(index, 1);
                    this.setState({ data }, () => resolve()); */
                  }
                  resolve();
                }, 1000);
              })
          }}
        />
      </div>)
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.authToken,
  loadingEmbargo: state.EmbargosReducer.embargo.loading,
  loadingDemandados: state.EmbargosReducer.demandados.loading,
  document: state.EmbargosReducer.embargo.document,
  embargo: state.EmbargosReducer.embargo,
  demandados: state.EmbargosReducer.demandados,
  json: state.EmbargosReducer.embargo.json,
  resaltado: state.EmbargosReducer.embargo.json1,
  bounding: state.boundingReducer.palabra


})
const mapDispatchToProps = (dispatch) => ({
  handleBounding: bindActionCreators(changePoints, dispatch),
  handlePalabra: bindActionCreators(resetRegion, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Demandantes);