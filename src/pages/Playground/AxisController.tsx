import React, { useRef, useEffect, useState, useContext, useDebugValue } from "react";
import { Box } from "@mui/material";
import { useActionData } from "react-router-dom";

interface AxisControllerProps {
  xValue: number;
  yValue: number;
  setX: Function;
  setY: Function;
}

export const AxisController = ({
  xValue,
  yValue,
  setX,
  setY,
}: AxisControllerProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);
const [score,setScore]=useState(0);
  // Canvas parameters
  const width = 400;
  const height = 300;
  const padding = 40;
  const maxX = 100;
  const maxY = 100;
  const kaleXpos=95;
  const kaleYpos1=70;
  const kaleYpos2=20;
let takescore=false;
  const pointRadius = 5;
  let kaleX=((width - 2 * padding) / maxX)*kaleXpos;
  let kaleY1=((height - 2 * padding) / maxY)*kaleYpos1;
  let kaleY2=((height - 2 * padding) / maxY)*kaleYpos2;
  const scaledX = ((width - 2 * padding) / maxX) * xValue;
  const scaledY = ((height - 2 * padding) / maxY) * yValue;
  // Convert data to canvas coordinates
  const dataToCanvas = (xVal: number, yVal: number) => {
    const scaledX = ((width - 2 * padding) / maxX) * xVal;
    const scaledY = ((height - 2 * padding) / maxY) * yVal;

    // After transform:
    // xCanvas = padding + scaledX
    // yCanvas = height - padding - scaledY (because we scale y by -1)
    const xCanvas = padding + scaledX;
    const yCanvas = height - padding - scaledY;
    return { x: xCanvas, y: yCanvas };
  };

  // Convert canvas coords to data
  const canvasToData = (canvasX: number, canvasY: number) => {
    const xAfterTrans = canvasX - padding;
    const yAfterTrans = height - padding - canvasY; // invert the y transform

    const dataX = (xAfterTrans / (width - 2 * padding)) * maxX;
    const dataY = (yAfterTrans / (height - 2 * padding)) * maxY;
    return { dataX, dataY };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function Kale(ctx:CanvasRenderingContext2D,x:number[],y:number[]){
  ctx.beginPath();
  ctx.strokeStyle="gray";
  ctx.lineWidth=5;
  ctx.moveTo(x[0],y[0]);
  ctx.lineTo(x[1],y[1]);
ctx.stroke();
}
    // Clear
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    // Apply transforms for drawing axes
    ctx.translate(padding, height - padding);
    ctx.scale(1, -1);

  
    // Draw axes
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    // X axis
    ctx.moveTo(0, 0);
    ctx.lineTo(width - 2 * padding, 0);
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height - 2 * padding);
    ctx.stroke();

    // Draw point
   

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(scaledX, scaledY, pointRadius, 0, Math.PI * 2);
    ctx.fill();
    
    Kale(ctx,[kaleX,kaleX],[kaleY1,kaleY2]);
    
 

    ctx.restore();

  },[xValue, yValue]);
 
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const { x: pX, y: pY } = dataToCanvas(xValue, yValue);
    const dist = Math.sqrt((mouseX - pX) ** 2 + (mouseY - pY) ** 2);

    if (dist < pointRadius + 5) {
      // The user clicked near the point
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const { dataX, dataY } = canvasToData(mouseX, mouseY);

    // Clamp values
    const clampedX = Math.max(0, Math.min(maxX, dataX));
    const clampedY = Math.max(0, Math.min(maxY, dataY));

    setX(clampedX);
    setY(clampedY);
if(clampedX>kaleXpos && clampedY>kaleYpos2 && clampedY<kaleYpos1 && takescore==false){
  takescore=true;


}
if(takescore==true){
  setScore(score+1);
  setIsDragging(false);
  setX(0);
setY(0);
}
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    // If mouse leaves the canvas, we should stop dragging
    setIsDragging(false);
  };
// setTimeout(() => {
    
//     if (scaledX>kaleX && scaledY<kaleY1 && scaledY>kaleY2 && takescore==true) {
    
//     SetScore(score+1);



//   }

// }, 1);
 
  return (
    <Box>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          border: "1px solid #ccc",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
      <div>
        X: {xValue.toFixed(2)}, Y: {yValue.toFixed(2)}

        Score: {score}
      </div>
    </Box>
  );
};
