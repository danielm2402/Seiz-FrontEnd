import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom'
import { usePdf } from '@mikecousins/react-pdf';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import styled from 'styled-components';
import { changePoints, resetPoints, nuevaRegion, obtenerDemandadosTable, setUltimaTableFocus } from '../../redux/actions/boundingAction'
import './Viewer.css'
const PDFDocumentWrapper = styled.div`
  canvas {
    width: 100% !important;
    height: auto !important
    
  }
`;

const canvasEdit = styled.div`
  canvas {
    width: 100% !important;
    height: auto !important;
    
  }
`;




function MyPdfViewer(props) {
    const [page, setPage] = useState(1);
    const [isDown, setDown] = useState(false)
    const [isDownCount, setDownCount] = useState(0)
    const [previousPointX, setPreviousPointX] = useState(0)
    const [previousPointY, setPreviousPointY] = useState(0)
    const [activeModeTable, setActiveModeTable] = useState(false)
    const [rectangle, setRectangle] = useState({})

    React.useEffect(() => {
        let vector = []

        props.json.pages[page - 1].words.map((item) => {
            var x = ((((item.boundingPoly.vertices[1].x)) + ((item.boundingPoly.vertices[0].x))) / 2) * props.json.pages[page - 1].width
            var y = ((((item.boundingPoly.vertices[3].y)) + ((item.boundingPoly.vertices[0].y))) / 2) * props.json.pages[page - 1].height

            if ((x > previousPointX && x < (rectangle.width + previousPointX) && ((y > previousPointY) && (y < rectangle.height + previousPointY)))) {

                vector.push(item)
            }
        })
        var palabra = ''
        vector.map((item) => {
            palabra = palabra + ' ' + item.text

        })

        props.handleRegion(palabra)
        if (props.tablaBounding == 'documento') {
        }

    }, [rectangle]);

    const canvasRef = useRef(null);
    const canvRef= useRef(null)
    const { pdfDocument, pdfPage } = usePdf({
        file: props.document,
        page,
        canvasRef,
    });

    function handleMouseDown(event, ctx) { //added code here

        if (!activeModeTable) {
            ctx.canvas.width=ctx.canvas.offsetWidth
            ctx.canvas.height=ctx.canvas.offsetHeight
            setDown(true)
            setDownCount(1)
            setPreviousPointX(event.offsetX)
            setPreviousPointY(event.offsetY)
        }
    }
    function handleMouseMove(event, ctx) {
        if (!activeModeTable) {
            var x = event.offsetX;
            var y = event.offsetY;

            if (isDown) {

                ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight); //clear canvas
                ctx.beginPath();
                ctx.fillStyle = "rgba(0,0,0, 0.4)";
                ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
                var width = x - previousPointX;
                var height = y - previousPointY;
                ctx.beginPath();
                ctx.lineWidth = "1";
                ctx.strokeStyle = "red";
                ctx.fillStyle = "rgba(118,225,17, 0.5)";
            
                ctx.fillRect(previousPointX, previousPointY, width, height);
                ctx.stroke();
            }
        }

    }

    function handleMouseUp(event, ctx) {

        if (!activeModeTable) {
            var x = event.offsetX;
            var y = event.offsetY;
            var width = x - previousPointX;
            var height = y - previousPointY;
          
            setRectangle({ x: previousPointX, y: previousPointY, width: width, height: height })


            ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight); //clear canvas
            ctx.beginPath();
            setDown(false)

        }
    }

    return (
        <div style={{ height: '75vw' }}>
            <PDFDocumentWrapper>
                <div>

                    {!pdfDocument && <span>Loading...</span>}

                    <div style={{ position: 'relative' }}>

                        <canvas style={{ position: 'absolute' }} ref={canvasRef}/>

                        <canvas height="792" width="612" style={{ position: 'absolute'} } ref={canvRef}
                          onMouseDown={
                            e => {
                                let nativeEvent = e.nativeEvent;
                                const canvas = canvRef.current
                                const ctx = canvas.getContext('2d')
                                handleMouseDown(nativeEvent, ctx);
                            }}
                        onMouseMove={
                            e => {
                                let nativeEvent = e.nativeEvent;
                                const canvas = canvRef.current
                                const ctx = canvas.getContext('2d')
                                handleMouseMove(nativeEvent, ctx);
                            }}

                        onMouseUp={
                            e => {
                                let nativeEvent = e.nativeEvent;
                                const canvas = canvRef.current
                                const ctx = canvas.getContext('2d')
                                handleMouseUp(nativeEvent, ctx);
                            }}  />
                    </div>
                    {Boolean(pdfDocument && pdfDocument.numPages) && (
                        <nav>
                            <ul className="pager">
                                <li className="previous">
                                    <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                                        Previous
              </button>
                                </li>
                                <li className="next">
                                    <button
                                        disabled={page === pdfDocument.numPages}
                                        onClick={() => setPage(page + 1)}
                                    >
                                        Next
              </button>
                                </li>
                            </ul>
                        </nav>
                    )}

                </div>
            </PDFDocumentWrapper>

        </div>

    );
}

const mapStateToProps = (state) => ({
    json: state.EmbargosReducer.embargo.json,
    document: state.EmbargosReducer.embargo.document,
    tablaBounding: state.boundingReducer.tabla,

})
const mapDispatchToProps = (dispatch) => ({

    handleRegion: bindActionCreators(nuevaRegion, dispatch),

})
export default connect(mapStateToProps, mapDispatchToProps)(MyPdfViewer)