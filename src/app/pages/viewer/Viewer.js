import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom'
import { usePdf } from '@mikecousins/react-pdf';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import styled from 'styled-components';
import { nuevaRegion, setTablePoints} from '../../redux/actions/boundingAction'
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

    const canvRef = useRef(null)
    const canvasRef = useRef(null);

    const { pdfDocument, pdfPage } = usePdf({
        file: props.document,
        page,
        canvasRef,
        scale:3
    });
    React.useEffect(() => {
        const canvas = canvRef.current
        const ctx = canvas.getContext('2d')
        if (props.mode === 'MANUAL') {
            let vector = []
            props.json.pages[page - 1].words.map((item) => {
                var x = (((item.boundingPoly.vertices[1].x)) + ((item.boundingPoly.vertices[0].x))) / 2 * ctx.canvas.width
                var y = ((((item.boundingPoly.vertices[3].y)) + ((item.boundingPoly.vertices[0].y))) / 2) * ctx.canvas.height

                if ((x > rectangle.x && x < (rectangle.width + rectangle.x) && ((y > rectangle.y) && (y < rectangle.height + rectangle.y)))) {
                    vector.push(item)
                }
            })
            var palabra = ''
            vector.map((item) => {
                palabra = palabra + ' ' + item.text

            })
            props.handleRegion(palabra)

        }
        else{
            ctx.fillStyle = "rgba(0,0,0, 0.8)";
            ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
            ctx.stroke();
            const verti = [
                { x: (rectangle.x / ctx.canvas.width), y: (rectangle.y / ctx.canvas.height) },
                { x: (rectangle.x + rectangle.width) / ctx.canvas.width, y: rectangle.y / ctx.canvas.height },
                { x: (rectangle.x + rectangle.width) / ctx.canvas.width, y: (rectangle.y + rectangle.height) / ctx.canvas.height },
                { x: (rectangle.x / ctx.canvas.width), y: (rectangle.y + rectangle.height) / ctx.canvas.height },

            ]

            
            props.handlePointsModeTable(verti)
            
        }

    }, [rectangle]);
    React.useEffect(() => {
        const canvas = canvRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight); //clear canvas
        ctx.beginPath();
        if (props.points.length !== 0) {
            ctx.fillStyle = "rgba(0, 255, 26, 0.47)";
            props.points.map(item => {
                if (item[4] === (page - 1)) {
                    ctx.fillRect((item[0].x) * ctx.canvas.width, ((item[0].y) * ctx.canvas.height) - 3, ((item[1].x) - (item[0].x)) * ctx.canvas.width, (((item[3].y) - (item[0].y)) * ctx.canvas.height) + 5);
                }

            })
        }

    }, [props.points]);
    React.useEffect(() => {
        const canvas = canvRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight); //clear canvas
        ctx.beginPath();
        setPage(props.page)
    }, [props.page])
    React.useEffect(() => {
        const canvas = canvRef.current
        const ctx = canvas.getContext('2d')
        console.log('EL CANVAS')
        console.log(ctx)
        if (props.mode === 'MANUAL') {
            ctx.canvas.style.cursor = 'crosshair'
        }
        if (props.mode === 'TABLE') {
            ctx.canvas.style.cursor = 'cell'
        }
       
    })
    React.useEffect(() => {
        if(!props.modeTable.ready){ 
        const canvas = canvRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight); //clear canvas
        ctx.beginPath();
        }
    },[props.modeTable])

    
    function handleMouseDown(event, ctx) { //added code here
        const canvas = canvasRef.current
        const ctx1 = canvas.getContext('2d')
        ctx.canvas.width = ctx1.canvas.offsetWidth
        ctx.canvas.height = ctx1.canvas.offsetHeight
        setDown(true)
        setDownCount(1)
        setPreviousPointX(event.offsetX)
        setPreviousPointY(event.offsetY)
        console.log('MOUSE DOWN')
    }
    function handleMouseMove(event, ctx) {
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
            ctx.lineWidth = "3";
            ctx.strokeStyle = "green";
            ctx.fillStyle = "rgba(255,255,255, 0.3)";
            ctx.fillRect(previousPointX, previousPointY, width, height);
            ctx.stroke();
        }
    }
    function handleMouseUp(event, ctx) {
        if (props.mode === 'MANUAL') {
            var x = event.offsetX;
            var y = event.offsetY;
            var width = x - previousPointX;
            var height = y - previousPointY;

            setRectangle({ x: previousPointX, y: previousPointY, width: width, height: height })


            ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight); //clear canvas
            ctx.beginPath();
            setDown(false)

        }
        if (props.mode === 'TABLE') {
            var x = event.offsetX;
            var y = event.offsetY;
            var width = x - previousPointX;
            var height = y - previousPointY;
            setRectangle({ x: previousPointX, y: previousPointY, width: width, height: height })
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.fillStyle = "rgba(255,255,255, 0.5)";
            ctx.fillRect(previousPointX, previousPointY, width, height);
            setDown(false)
        }
    }

    return (
        <div style={{ height: '75vw' }}>
            <PDFDocumentWrapper>
                <div>

                    {!pdfDocument && <span>Loading...</span>}

                    <div style={{ position: 'relative' }}>

                        <canvas style={{ position: 'absolute' }} ref={canvasRef} />

                        <canvas height="792" width="612" style={{ position: 'absolute' }} ref={canvRef}
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
                                }} />
                    </div>


                </div>
            </PDFDocumentWrapper>

        </div>

    );
}

const mapStateToProps = (state) => ({
    json: state.EmbargosReducer.embargo.json,
    document: state.EmbargosReducer.embargo.document,
    tablaBounding: state.boundingReducer.tabla,
    points: state.boundingReducer.boundigTable.points,
    page: state.boundingReducer.page,
    mode: state.boundingReducer.mode,
    modeTable: state.boundingReducer.pointsModeTable,

})
const mapDispatchToProps = (dispatch) => ({
    handlePointsModeTable: bindActionCreators(setTablePoints, dispatch),
    handleRegion: bindActionCreators(nuevaRegion, dispatch),

})
export default connect(mapStateToProps, mapDispatchToProps)(MyPdfViewer)