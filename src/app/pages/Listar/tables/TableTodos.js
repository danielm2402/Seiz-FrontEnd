
import React, { useState, useRef } from 'react';
import MaterialTable, { MTableCell } from 'material-table';
import { deleteEmbargo, getEmbargo, getDemandados } from '../../../redux/actions/embargosAction'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
import Button from '@material-ui/core/Button';
import moment from 'moment';

const color = (value) => {
  switch (value) {
    case 'CONFIRMADO':
      return '#EBEFF9'
    case 'SIN_CONFIRMAR':
      return '#FBE6ED'
    case 'COMPLETO':
      return '#E2F2EF'
    default:
      return '#ffffff'

  }
}
const colorText = (value) => {
  switch (value) {
    case 'CONFIRMADO':
      return '#6971B8'
    case 'SIN_CONFIRMAR':
      return '#C15C83'
    case 'COMPLETO':
      return '#33AE89'
    default:
      return '#ffffff'

  }
}
function MaterialTableDemo(props) {
  let history = useHistory()
  const [estado, setEstado] = useState('TODOS');
  const estadoRef = useRef('TODOS');
  const firstRef = useRef('');
  const endRef = useRef('');
  const noFormatfirstRef = useRef('2/14/2020');
  const noFormatendRef = useRef('3/28/2020');
  return (
    <div>
      <MaterialTable
        title={props.nombre}
        columns={[

          { title: 'Id', field: 'id' },
          { title: 'Demandante', field: 'plaintiffs[0].fullname' },
          { title: 'Ciudad', field: 'city' },
          { title: 'Estado', field: 'status', lookup: { CONFIRMADO: 'CONFIRMADO', SIN_CONFIRMAR: 'SIN_CONFIRMAR', COMPLETO: 'COMPLETO', FINALIZADO: 'FINALIZADO' } },
          { title: 'Tipo', field: 'embargoType', filtering: false },
          { title: 'Fecha de carga', field: 'createdAt' },
          { title: 'Fecha Oficio', field: 'documentDate' },

        ]}
        components={{
          Cell: props => {
            if (props.columnDef.field == 'status') {
              return (
                <MTableCell
                >
                  {props.columnDef.field == 'status' ?
                    <div style={{ backgroundColor: color(props.value), borderRadius: '3px', padding: '10px', color: colorText(props.value), fontFamily: 'Poppins,Helvetica,sans-serif !important', fontWeight: '500' }}>{props.value}</div> : <></>}
                </MTableCell>
              );
            }
            else {
              return (
                <MTableCell

                  {...props}
                />)
            }
          }

        }}
        data={query =>
          new Promise((resolve, reject) => {
            console.log('QUERYYY')
            console.log(query)
            console.log(query.page)
            let params = {}
            if (query.filters.length !== 0) {
              for (let i = 0; i < query.filters.length; i++) {
                switch (query.filters[i].column.title) {
                  case 'Demandante':
                    params = { ...params, 'entidadRemitente': query.filters[i].value }
                    break;
                  case 'Estado':
                    params = { ...params, 'estadoEmbargo': query.filters[i].value }
                    break;
                  case 'Fecha de carga':
                    params = { ...params, 'startDate': query.filters[i].value[0].replace(/[-]/g, '/'), finalDate:query.filters[i].value[1].replace(/[-]/g, '/') }
                  break;
                  default:
                    params = { ...params, [(query.filters[i].column.title).toLowerCase()]: query.filters[i].value }
                    break;

                }


              }

            }
            const config = {
              headers: {
                Authorization: 'Bearer ' + props.token,
                Accept: 'application/json',
              },
              params
            };

            axios.get('https://bancow.finseiz.com/api/v1/embargos/count', config)
              .then(response => {
                let total
                var page
                total = response.data
                console.log(response)
                console.log('INFORMACION DEL NUEVO REQUEST')
                axios.post('https://bancow.finseiz.com/api/v1/embargos/list?page=' + (query.page) + '&size=' + query.pageSize
                  , {}, config)
                  .then(response1 => {

                    var separar = response1.headers.links.split(",")
                    const array = separar.map((item) => {
                      return item.split(";")
                    })
                    array.map((item) => {
                      item.map((item1) => {
                        if (item1.trim() === 'rel="next"') {
                          console.log(item)
                          var subcadena = item[0].split('=')[1]
                          page = subcadena.split('&')[0]

                        }

                      }

                      )
                    })
                    if (page == undefined) {
                      page = query.page + 1
                    }
                    console.log(response1)
                    console.log(page)

                    resolve({
                      data: response1.data,
                      page: page - 1,
                      totalCount: total
                    })
                  })

                  .catch(err => {
                    console.log('ERROR EN LOS DATOS DE LA TABLA')
                    console.log(err.response)
                  })

              })
              .catch(err=>console.log(err.response))


          })
        }
        actions={[
          rowData => ({
            icon: 'edit',
            tooltip: 'Revisar',
            disabled: rowData.status == 'CONFIRMADO' || rowData.status == 'COMPLETO',
            onClick: (event, rowData) => {
              props.handleView(rowData.id, props.token)
              props.handleDemandados(rowData.id, props.token)
              history.push(`/confirm/${rowData.id}`)
            },

          }),
          rowData => ({
            icon: 'remove_red_eye',
            tooltip: 'Ver',
            disabled: rowData.status == 'SIN_CONFIRMAR',
            onClick: (event, rowData) => {
              props.handleView(rowData.id, props.token)
              props.handleDemandados(rowData.id, props.token)
              history.push(`/view/${rowData.id}`)
            },
          })
        ]}
        options={{
          filtering: true,
          pageSize: 19,
          pageSizeOptions: [],
          toolbar: true,
          paging: true,
          search: false

        }}
        editable={{
          onRowDelete: oldData =>
            new Promise(resolve => {

              resolve()
              console.log(oldData)
              props.handleEliminar(oldData.id, props.token, props.pathname)


            }),


        }}
        components={{
          FilterRow: props => <TableRow>
            <TableCell></TableCell>
            <TableCell align="left"><TextField id="standard-basic" label="Id" onChange={(e) => { props.onFilterChanged(0, e.target.value) }} /></TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"><TextField id="standard-basic" label="Ciudad" onChange={(e) => { props.onFilterChanged(2, e.target.value) }} /></TableCell>
            <TableCell align="left">
            <div style={{paddingTop:'15px'}}>
              <Select
                onChange={(e) => {
                  estadoRef.current = e.target.value;
                  props.onFilterChanged(3, e.target.value)
                  console.log(props)

                }}
                value={estadoRef.current}

              >
                <MenuItem value={'SIN_CONFIRMAR'}>SIN_CONFIRMAR</MenuItem>
                <MenuItem value={'CONFIRMADO'}>CONFIRMADO</MenuItem>
                <MenuItem value={'COMPLETO'}>COMPLETO</MenuItem>
                <MenuItem value={'FINALIZADO'}>FINALIZADO</MenuItem>
                <MenuItem value={'TODOS'}>TODOS</MenuItem>


              </Select></div></TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left">
            <div style={{paddingTop:'15px'}}>
              <DateRangePicker startDate={noFormatfirstRef.current} endDate={noFormatendRef.current} onApply={(e, picker) => {
                handleApply(e, picker)
                props.onFilterChanged(5, [new Date(firstRef.current).toISOString().split('T')[0], new Date(endRef.current).toISOString().split('T')[0]])
              }}>
                
                <Button>Fecha</Button>
              </DateRangePicker>
              </div>
            </TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>,
          Cell: props => {
            if (props.columnDef.field == 'status') {
              return (
                <MTableCell
                >
                  {props.columnDef.field == 'status' ?
                    <div style={{ backgroundColor: color(props.value), borderRadius: '3px', padding: '10px', color: colorText(props.value), fontFamily: 'Poppins,Helvetica,sans-serif !important', fontWeight: '500' }}>{props.value}</div> : <></>}
                </MTableCell>
              );
            }
            else {
              return (
                <MTableCell

                  {...props}
                />)
            }
          }
        }}

      />
    </div>
  );

  function handleApply(event, picker) {
    console.log(picker.startDate.toDate())
    console.log(picker.endDate.toDate())
    firstRef.current = picker.startDate.toDate();
    endRef.current = picker.endDate.toDate();

  }
}


const mapStateToProps = (state) => ({
  token: state.auth.authToken,
})
const mapDispatchToProps = dispatch => ({
  handleEliminar: bindActionCreators(deleteEmbargo, dispatch),
  handleView: bindActionCreators(getEmbargo, dispatch),
  handleDemandados: bindActionCreators(getDemandados, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(MaterialTableDemo);