import React from 'react';
import { connect } from 'react-redux';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { AppState, ScheduleAppointment } from '../../store/models';
import { formatDate } from '../../utils/date';
import { getYear, getMonth, getDate } from 'date-fns';
import './Schedule.css';

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
      <IonList>
        {
          schedule.map((appointment, i) => {
            const startDate = new Date(appointment.startDate);
            const endDate = new Date(appointment.endDate);
            return (
              <IonItem key={`a${i}`} className="schedule-dates">
                <IonLabel>Start: {formatDate(getYear(startDate),getMonth(startDate),getDate(startDate))}</IonLabel>
                <IonLabel>End: {formatDate(getYear(endDate),getMonth(endDate),getDate(endDate))}</IonLabel>
              </IonItem>
            );
          })
        }
      </IonList>
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
