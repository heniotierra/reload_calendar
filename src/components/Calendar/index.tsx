import React, { useState, useLayoutEffect } from 'react';
import { getMonth, getYear } from 'date-fns'; 
import { connect } from 'react-redux';
import { ScheduleAppointment } from '../../store/models';
import {
  getDayOfWeek,
  getEndOfMonth,
  getStartOfMonth,
  formatYearMonth
} from '../../utils/date';
import { generateNumberSequence } from '../../utils/generators';
import './index.css';
import backArrow from '../../assets/arrow-back.svg';
import nextArrow from '../../assets/arrow-next.svg';
import DayCell from '../DayCell';

interface ContainerProps {
  addScheduleAppointment(scheduleAppointment: ScheduleAppointment): void
}

const Calendar: React.FC<ContainerProps> = ({
  addScheduleAppointment,
}) => {
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>(0);
  const [firstDayInMonth, setFirstDayInMonth] = useState<number>(0);
  const [lastDayInMonth, setLastDayInMonth] = useState<number>(0);
  const [firstDayInRange, setFirstDayInRange] = useState<number>(0);
  const [lastDayInRange, setLastDayInRange] = useState<number>(0);
  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<number[]>([]);
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);

  const seePrevMonth = () => {
    resetSelection();
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear-1);
      return;
    }
    setCurrentMonth(currentMonth-1);
  };

  const seeNextMonth = () => {
    resetSelection();
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear+1);
      return;
    }
    setCurrentMonth(currentMonth+1);
  };

  const resetSelection = () => {
    setSelectedDates([]);
    setSelectedDateRange([]);
    setFirstDayInRange(0);
    setLastDayInRange(0);
  };

  const selectDate = (selectedDate: number) => {
    if (selectedDates.length >= 2){
      resetSelection();
      return;
    } else {
      selectedDates.push(selectedDate);
      setSelectedDates([...selectedDates]);
    }
    selectDateRange();
  };

  const cellCh = 'c';
  
  const selectDateRange = () => {
    if (selectedDates.length === 2) {
      let toSort: number[] = [...selectedDates];
      toSort = toSort.sort((a, b) => a - b);
      let left = toSort[0];
      while (++left < toSort[1]) {
        if (![0,6].includes(getDayOfWeek(currentYear, currentMonth, left))) {
          toSort.push(left);
        }
      }
      toSort = toSort.sort((a, b) => a - b);
      setFirstDayInRange(toSort[0]);
      setLastDayInRange(toSort.reverse()[0]);
      setSelectedDateRange([...toSort]);
    }
  };

  useLayoutEffect(() => {
    const todayTime: Date = new Date();
    setCurrentMonth(getMonth(todayTime));
    setCurrentYear(getYear(todayTime));
  }, []);
  useLayoutEffect(() => {
    setFirstDayInMonth(getStartOfMonth(currentYear, currentMonth));
    setLastDayInMonth(getEndOfMonth(currentYear, currentMonth));
  }, [currentYear, currentMonth]);
  useLayoutEffect(() => {}, [selectedDateRange, showSuccessMsg]);

  const cellDays = selectedDateRange.map((day) => `${cellCh}${day}`);
  
  return (
    <div className="container">
      <div className="o-flex-grid">
          <div className="o-flex-grid--item" onClick={seePrevMonth}>
            <img className="back-calendar-btn" src={backArrow}/>
          </div>
          <div className="o-flex-grid--item current-date">{formatYearMonth(currentYear, currentMonth)}</div>
          <div className="o-flex-grid--item" onClick={seeNextMonth} >
            <img className="next-calendar-btn" src={nextArrow}/>
          </div>
      </div>
      <div className="o-flex-grid weekdays-names" key="r0">
        <div className="o-flex-grid--item" key="sun">
          <div>S</div>
        </div>
        <div className="o-flex-grid--item" key="mon">
          <div>M</div>
        </div>
        <div className="o-flex-grid--item" key="tur">
          <div>T</div>
        </div>
        <div className="o-flex-grid--item" key="wed">
          <div>W</div>
        </div>
        <div className="o-flex-grid--item" key="thu">
          <div>T</div>
        </div>
        <div className="o-flex-grid--item" key="fri">
          <div>F</div>
        </div>
        <div className="o-flex-grid--item" key="sat">
          <div>S</div>
        </div>
      </div>
      {
        generateNumberSequence(6).map((week) => {
          return (
            <div className="o-flex-grid monthdays-row" key={`r${week+1}`}>
            {
              generateNumberSequence(7).map((iteration) => {
                if (week === 0) {
                  const day = iteration + 1 - firstDayInMonth;
                  if (iteration < firstDayInMonth) {
                    return <div className="o-flex-grid--item" key={`c${day}`}></div>;
                  }
                  return (
                    <div
                      id={`${cellCh}${day}`}
                      key={`${cellCh}${day}`}
                      className={`
                        o-flex-grid--item
                        monthday-col
                        ${cellDays.includes(`${cellCh}${day}`)? ' selected-date ' : ' '}
                        ${cellDays.length && `${cellCh}${firstDayInRange}` === `${cellCh}${day}` ? ' f-selected-date ' : ' '}
                        ${cellDays.length && `${cellCh}${lastDayInRange}` === `${cellCh}${day}` ? 'l-selected-date' : ''}
                      `}
                      onClick={() => selectDate(day)}>
                      <div>
                        <DayCell day={day} highlighted={selectedDates.includes(day)} />
                      </div>
                    </div>
                  );
                }
                const day = (week * 7) + iteration + 1 - firstDayInMonth;
                if (day > lastDayInMonth) {
                  return <div className="o-flex-grid--item" key={`${cellCh}${day}`}></div>;
                }
                return (
                  <div
                    id={`${cellCh}${day}`}
                    key={`${cellCh}${day}`}
                    className={`
                      o-flex-grid--item
                      monthday-col
                      ${cellDays.includes(`${cellCh}${day}`)? ' selected-date ' : ' '}
                      ${cellDays.length && `${cellCh}${firstDayInRange}` === `${cellCh}${day}` ? ' f-selected-date ' : ' '}
                      ${cellDays.length && `${cellCh}${lastDayInRange}` === `${cellCh}${day}` ? 'l-selected-date' : ''}
                    `}
                    onClick={() => selectDate(day)}>
                    <div>
                      <DayCell day={day} highlighted={selectedDates.includes(day)} />
                    </div>
                  </div>
                );
              })
            }
            </div>
          );
        })
      }
      <button className="apply-btn" onClick={
        () => {
          setTimeout(() => setShowSuccessMsg(false), 3000);
          setShowSuccessMsg(true);
          resetSelection();
          addScheduleAppointment({
            startDate: new Date(currentYear, currentMonth, firstDayInRange, 0, 0, 0, 0),
            endDate: new Date(currentYear, currentMonth, lastDayInRange, 0, 0, 0, 0),
          });
        }
      }>
        Apply
      </button>
      <div>
        {showSuccessMsg ? "Appointment scheduled successfully!" : ""}
      </div>
    </div>
  );
};

const mapDispatch = ({ schedule: { addScheduleAppointment } }: any) => ({
	addScheduleAppointment: (appointment: ScheduleAppointment) => addScheduleAppointment(appointment),
});

const CalendarContainer = connect(
	null,
	mapDispatch,
)(Calendar);

export default CalendarContainer;
