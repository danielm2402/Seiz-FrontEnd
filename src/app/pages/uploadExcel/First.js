import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { uploadExcel} from '../../redux/actions/excelActions'
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import XLSX from 'xlsx';

import Second from './Second'
import './First.css'
class First extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: null,
            file: {},
            data: [],
            cols: []
        }
        this.handleFile = this.handleFile.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.upload!==prevProps.upload){
            if(this.props.upload.data.response==200){
                this.props.nextStep()
            }
        }
    }
    onChangeHandler(event) {
       
        this.setState({
            files: event.target.files,
        }, function () {
            console.log(this.state.files)
            var urls = []
            for (var i = 0; i < this.state.files.length; i++) {
                console.log('IMPRIMIENDO CADA ARCHIVO')
                console.log(this.state.files[i])
                urls.push(
                    {
                        url: URL.createObjectURL(this.state.files[i]),
                        name: this.state.files[i].name
                    }
                )
            }
            console.log('EL TOKEN ES:',this.props.token)
            this.props.handleAddFile(this.state.files[0], this.props.id, this.props.token )


        })
        if (event.target.files && event.target.files[0]) this.setState({ file: event.target.files[0] },function(){
            console.log(this.state.file)
        });  
       
    }

    handleFile() {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);
            /* Update state */
            this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
                console.log('TODO CONVERTIDO')
                console.log(JSON.stringify(this.state.data, null, 2));
                console.log(this.state.data)
            });

        };

        if (rABS) {
            reader.readAsBinaryString(this.state.file);
        } else {
            reader.readAsArrayBuffer(this.state.file);
        };
        
    }
    render() {
        return (
            <div className="contenedor-upload">
                <div className="upload-file">
                    <div className="upload-cov">
                        <div class="image-upload">
                            <label for="file">
                                <img src="https://icon-library.net/images/upload-photo-icon/upload-photo-icon-21.jpg" />
                            </label>
                            <input id="file" accept={SheetJSFT}  type="file" multiple onChange={this.onChangeHandler} />
                            <p>Selecciona el archivo xsln</p>
                            
                        </div>
                    </div>
                </div>
                <button onClick={()=>this.props.nextStep()}> IR</button>

            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    handleAddFile: bindActionCreators(uploadExcel, dispatch),
   
})
const mapStateToProps = (state) => ({
    token: state.auth.authToken,
    mensaje: state.excelReducer.mensaje,
    upload: state.excelReducer.upload,
    
})

export default connect(mapStateToProps, mapDispatchToProps)(First)