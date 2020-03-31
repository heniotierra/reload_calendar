import React from 'react';
import './index.css';

interface ContainerProps {
  day: number,
}

const DayCell: React.FC<ContainerProps> = ({
  day,
}) => {
  return (
    <div className={`day-cell`}>
      {day}
    </div>
  )
};

export default DayCell;
