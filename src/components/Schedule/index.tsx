import React from 'react';
import { connect } from 'react-redux';
import { AppState, ScheduleAppointment } from '../../store/models';
import { formatDate } from '../../utils/date';
import { getYear, getMonth, getDate } from 'date-fns';
import './index.css';

interface ContainerProps {
  schedule: ScheduleAppointment[],
  name: string,
}

const Schedule: React.FC<ContainerProps> = ({
  schedule,
  name,
}) => {
  return (
    <div className="container">
      <strong>Hi, {name}! Below is your schedule:</strong>
      <div className="o-flex-grid w-80">
        <div className="o-flex-grid--item">
          {
            schedule.length? schedule.map((appointment, i) => {
              const startDate = new Date(appointment.startDate);
              const endDate = new Date(appointment.endDate);
              return (
                <div className="o-flex-grid schedule-dates" key={`a${i}`}>
                  <div className="o-flex-grid--item">Start: {formatDate(getYear(startDate),getMonth(startDate),getDate(startDate))}</div>
                  <div className="o-flex-grid--item">End: {formatDate(getYear(endDate),getMonth(endDate),getDate(endDate))}</div>
                </div>
              );
            }) : (
              <div key="a1" className="schedule-dates">
                <b>You have no scheduled appointments</b>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

const mapState = (state: AppState) => ({
	schedule: state.schedule,
});

const ScheduleContainer = connect(
  mapState,
  () => {},
)(Schedule);

export default ScheduleContainer;
