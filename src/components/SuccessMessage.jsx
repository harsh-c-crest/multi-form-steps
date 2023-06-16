import React from 'react';

// React component to alert user on successful submission of form
const SuccessPopup = ({ handleClose }) => {
  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Success!</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Your form has been submitted successfully.
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
