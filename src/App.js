import React, { useEffect, useState } from "react";
import "./App.css";
const axios = require("axios");

class NodeClass {
  constructor(isActive) {
    this.isActive = isActive;
  }
}

function App() {
  const [grid, setGrid] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [isNumber7, setIsNumber7] = useState(null);

  const columns = 28;
  const rows = 28;

  useEffect(() => {
    createGrid();
  }, []);

  const createGrid = () => {
    const temporary_grid = [];
    for (let i = 0; i < columns; i++) {
      temporary_grid[i] = [];
      for (let j = 0; j < rows; j++) {
        temporary_grid[i][j] = new NodeClass(0);
      }
    }

    setGrid(temporary_grid);
  };

  const onMouseDownEvent = () => {
    setDrawing(true);
  };

  const onMouseEnterEvent = (i, j) => {
    if (!drawing) return;
    const nodeElement = document.getElementById(`node_${i}_${j}`);
    const nodeReact = grid[i][j];

    nodeReact.isActive = 255;
    nodeElement.className = "node-active";
  };

  const onMouseUpEvent = () => {
    setDrawing(false);
  };

  const captureNumber = async () => {
    const numberArr = [];
    for (let i = 0; i < 28; i++) {
      for (let j = 0; j < 28; j++) {
        numberArr.push(grid[j][i].isActive);
      }
    }

    const response = await axios.post("http://localhost:5000/", numberArr);
    setIsNumber7(response.data);
  };

  return (
    <>
      <div className="background-container">
        <div className="left-container">
          <div className="columns">
            {grid.map((column, i) => (
              <div className="rows">
                {column.map((row, j) => (
                  <div
                    className="node"
                    id={`node_${i}_${j}`}
                    onMouseDown={() => onMouseDownEvent()}
                    onMouseEnter={() => onMouseEnterEvent(i, j)}
                    onMouseUp={() => onMouseUpEvent()}
                  />
                ))}
              </div>
            ))}
          </div>
          <button className="guess-button" onClick={() => captureNumber()}>
            ejecutar
          </button>
        </div>
        <div className="right-container">
          {isNumber7 === "True" ? (
            <div>el número es un 7</div>
          ) : isNumber7 === null ? (
            <></>
          ) : (
            <div>el número NO es un 7</div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
