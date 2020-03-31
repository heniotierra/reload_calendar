import React from 'react';
import './index.css';

interface ContainerProps {
  day: number,
  highlighted: boolean,
}

const DayCell: React.FC<ContainerProps> = ({
  day,
  highlighted,
}) => {
  return (
    <div className={`day-cell ${highlighted? 'highlighted-cell' : ''}`}>
      {day}
    </div>
  )
};

export default DayCell;
