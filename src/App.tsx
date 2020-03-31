import React, { useState } from 'react';
import './flexbox.css';
import Modal from './components/Modal';
import Calendar from './components/Calendar';
import { Provider } from 'react-redux';
import store from './store';
import close from './assets/close.svg';
import Schedule from './components/Schedule';
import { useSwipeable } from 'react-swipeable';
import './App.css';

function App() {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const handlers = useSwipeable({ onSwiped: () => setModalShow(false) });
  
  return (
    <Provider store={store}>
      <div className="app">
        <header className="app-header">
          <div className="app-header-title">Schedule</div>
        </header>
        <div className="shedule-content">
          <button className="btn-blue" onClick={() => setModalShow(true)}>
            Open Calendar
          </button>
          <Schedule name="Olef" />
          <Modal isOpen={modalShow}>
            <div className="o-flex-grid w-100" {...handlers}>
              <div className="o-flex-grid--item w-5">
                <img className="close-calendar-btn" src={close} onClick={() => setModalShow(false)} />
              </div>
              <div className="o-flex-grid--item">
                <label className="calendar-title">Calendar</label>
              </div>
            </div>
            <Calendar />
          </Modal>
        </div>
      </div>
    </Provider>
  );
}

export default App;
