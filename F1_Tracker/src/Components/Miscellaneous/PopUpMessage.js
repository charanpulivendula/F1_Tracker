import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const PopUpMessage = (props) => {
  return (
    <Popup open={!!props.message} modal nested>
      <div className="popup-content">
        <div className="header">Notification</div>
        <div className="content">{props.message}</div>
        <div className="actions">
          <button className="button" onClick={props.closePopup}>
            Close
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default PopUpMessage;

