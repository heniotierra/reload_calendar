import React, { useState, useLayoutEffect } from 'react';
import { getMonth, getYear } from 'date-fns'; 
import {
  IonRow,
  IonCol,
  IonImg,
  IonThumbnail,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';
import { connect } from 'react-redux';
import { ScheduleAppointment } from '../../store/models';
import {
  getEndOfMonth,
  getDayOfWeek,
  getStartOfMonth,
  formatYearMonth
} from '../../utils/date';
import { generateNumberSequence } from '../../utils/generators';
import './Calendar.css';

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
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<number[]>([]);

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
    setSelectedDays([]);
    setSelectedDateRange([]);
    setFirstDayInRange(0);
    setLastDayInRange(0);
  };

  const selectDate = (selectedDay: number) => {
    if (selectedDays.length >= 2){
      resetSelection();
      return;
    } else {
      selectedDays.push(selectedDay);
    }
    selectDateRange();
  };

  const cellCh = 'c';
  
  const selectDateRange = () => {
    if (selectedDays.length === 2) {
      let toSort: number[] = [...selectedDays];
      toSort = toSort.sort((a, b) => a - b);
      let left = toSort[0];
      while (left + 1 < toSort[1]) {
        ++left;
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
  useLayoutEffect(() => {}, [selectedDateRange]);

  const cellDays = selectedDateRange.map((day) => `${cellCh}${day}`);
  
  return (
    <div className="container">
      <IonList>
        <IonItem>
          <IonThumbnail slot="start" onClick={seePrevMonth} >
            <IonImg className="prev-calendar-btn" src="assets/arrow-back.svg"/>
          </IonThumbnail>
          <IonLabel className="current-date">{formatYearMonth(currentYear, currentMonth)}</IonLabel>
          <IonThumbnail slot="end" onClick={seeNextMonth} >
            <IonImg className="next-calendar-btn" src="assets/arrow-next.svg"/>
          </IonThumbnail>
        </IonItem>
      </IonList>
      <IonRow className="weekdays-names" key="r0">
        <IonCol offset-7 key="sun">
          <div>S</div>
        </IonCol>
        <IonCol key="mon">
          <div>M</div>
        </IonCol>
        <IonCol key="tur">
          <div>T</div>
        </IonCol>
        <IonCol key="wed">
          <div>W</div>
        </IonCol>
        <IonCol key="thu">
          <div>T</div>
        </IonCol>
        <IonCol key="fri">
          <div>F</div>
        </IonCol>
        <IonCol key="sat">
          <div>S</div>
        </IonCol>
      </IonRow>
      {
        generateNumberSequence(6).map((week) => {
          return (
            <IonRow className="monthdays-row" key={`r${week+1}`}>
            {
              generateNumberSequence(7).map((iteration) => {
                if (week === 0) {
                  const day = iteration + 1 - firstDayInMonth;
                  if (iteration < firstDayInMonth) {
                    return <IonCol key={`c${day}`}></IonCol>;
                  }
                  return (
                    <IonCol
                      id={`${cellCh}${day}`}
                      key={`${cellCh}${day}`}
                      className={`
                        monthday-col
                        ${cellDays.includes(`${cellCh}${day}`)? ' selected-date ' : ' '}
                        ${cellDays.length && `${cellCh}${firstDayInRange}` === `${cellCh}${day}` ? ' f-selected-date ' : ' '}
                        ${cellDays.length && `${cellCh}${lastDayInRange}` === `${cellCh}${day}` ? 'l-selected-date' : ''}
                      `}
                      onClick={() => selectDate(day)}>
                      <div>
                        {day}
                      </div>
                    </IonCol>
                  );
                }
                const day = (week * 7) + iteration + 1 - firstDayInMonth;
                if (day > lastDayInMonth) {
                  return <IonCol key={`${cellCh}${day}`}></IonCol>;
                }
                return (
                  <IonCol
                    id={`${cellCh}${day}`}
                    key={`${cellCh}${day}`}
                    className={`
                      monthday-col
                      ${cellDays.includes(`${cellCh}${day}`)? ' selected-date ' : ' '}
                      ${cellDays.length && `${cellCh}${firstDayInRange}` === `${cellCh}${day}` ? ' f-selected-date ' : ' '}
                      ${cellDays.length && `${cellCh}${lastDayInRange}` === `${cellCh}${day}` ? 'l-selected-date' : ''}
                    `}
                    onClick={() => selectDate(day)}>
                    <div>
                      {day}
                    </div>
                  </IonCol>
                );
              })
            }
            </IonRow>
          );
        })
      }
      <button className="apply-btn" onClick={
        () => addScheduleAppointment({
          startDate: new Date(currentYear, currentMonth, firstDayInRange, 0, 0, 0, 0),
          endDate: new Date(currentYear, currentMonth, lastDayInRange, 0, 0, 0, 0)
        })
      }>
        Apply
      </button>
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
