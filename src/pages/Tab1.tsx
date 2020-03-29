import React, { useState } from 'react';
import { 
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonImg,
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel
} from '@ionic/react';
import Schedule from '../components/Schedule';
import './Tab1.css';
import Calendar from '../components/Calendar';

const Tab1: React.FC = (_, ref) => {
  const [showModal, setShowModal] = useState(true);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Schedule</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Schedule</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Schedule name="Olef" />
        <IonModal 
          isOpen={showModal} 
          swipeToClose={true}
          presentingElement={ref.current} 
          onDidDismiss={() => setShowModal(false)}>
          <IonList>
            <IonItem>
              <IonThumbnail slot="start" onClick={() => setShowModal(false)} >
                <IonImg className={'close-calendar-btn'} src="assets/close.svg"/>
              </IonThumbnail>
              <IonLabel class="calendar-modal-title">Calendar</IonLabel>
            </IonItem>
          </IonList>
          <Calendar/>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
