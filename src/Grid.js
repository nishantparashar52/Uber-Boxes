import React, { useState, useEffect } from 'react';

const colors = [
  'red',
  'green',
  'blue',
  'yellow',
  'red',
  'green',
  'blue',
  'yellow',
  'red',
  'red',
];

function Box({ color, onClick }) {
  return (
    <div
      className="box"
      style={{ backgroundColor: color }}
      onClick={onClick}
    ></div>
  );
}

export default function Grid() {
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [isUndoing, setIsUndoing] = useState(false);

  const handleBoxClick = (index) => {
    setSelectedBoxes((prevSelectedBoxes) => [...prevSelectedBoxes, index]);
  };

  useEffect(() => {
    if (selectedBoxes.length === 9) {
      setIsUndoing(true);
      let i = 0;
      const undoInterval = setInterval(() => {
        debugger;
        setSelectedBoxes((prevSelectedBoxes) => prevSelectedBoxes.slice(0, -1));
        i++;
        if (i === 9) {
          setIsUndoing(false);
          clearInterval(undoInterval);
        }
      }, 1000);
    }
  }, [selectedBoxes]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '200px' }}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
        <Box
          key={index}
          color={selectedBoxes.includes(index) ? colors[index] : 'white'}
          onClick={() => handleBoxClick(index)}
        />
      ))}
      {isUndoing && <div>Undoing...</div>}
    </div>
  );
}
