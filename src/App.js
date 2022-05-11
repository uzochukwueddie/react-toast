import { useState } from 'react';

import './App.css';
import Toast from './components/toast/Toast';
import Button from './components/button/Button';
import { BUTTON_PROPS, TOAST_PROPERTIES } from './toastProperties';
import Checkmark from './components/checkmark/Checkmark';

const App = () => {
  const [list, setList] = useState([]);
  const [position, setPosition] = useState('Select Position');
  let [checkValue, setCheckValue] = useState(false);
  const [autoDeleteTime, setAutoDeleteTime] = useState(0);

  const selectPosition = (e) => {
    setPosition(e.target.value);
    setList([]);
  }

  const showToast = type => {
    const toastProperties = TOAST_PROPERTIES.find((toast) => toast.title.toLowerCase() === type);
    setList([...list, toastProperties]);
  }
  
  const onCheckBoxChange = () => {
    checkValue = !checkValue;
    setCheckValue(checkValue);
    setList([]);
  }

  return (
    <>
      <div className="app">
        <p>React Toast Component</p>
        <div className="select">
          <Checkmark 
            label="Auto Dismiss"
            checkValue={checkValue}
            onCheckBoxChange={onCheckBoxChange}
          />
          <br />
          <input 
            className={`${!checkValue ? 'disabled' : ''}`}
            type="text"
            name="dismiss"
            placeholder="Dismiss time Ex: 3000"
            autoComplete="false"
            onChange={(e) => setAutoDeleteTime(parseInt(e.target.value, 10))}
          />
          <br />
          <select
            name="position"
            value={position}
            onChange={selectPosition}
            className="position-select"
          >
            <option>Select Position</option>
            <option value="top-right">Top Right</option>
            <option value="top-left">Top Left</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-right">Bottom Right</option>
          </select>
        </div>
        <br />
        <div className="toast-buttons">
          {
            BUTTON_PROPS.map(e => 
              <Button 
                key={e.id}
                className={`${position === 'Select Position' ? `${e.className} btn-disable` : `${e.className}`}`}
                label={e.label}
                handleClick={() => showToast(e.type)}
              />
            )
          }
        </div>
      </div>

      <Toast 
        toastList={list}
        position={position}
        autoDelete={checkValue}
        autoDeleteTime={autoDeleteTime}
      />
    </>
  );
}

export default App;
