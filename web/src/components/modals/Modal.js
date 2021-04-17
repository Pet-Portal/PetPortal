import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({
    isShowingModal,
    component,
    styles,
    toggleModal
}) => {
    return isShowingModal
        ? ReactDOM.createPortal(
            <React.Fragment>
                <div className="modal-overlay" />
                <div
                    className="modal-wrapper"
                    aria-modal
                    aria-hidden
                    tabIndex={-1}
                    role="dialog"
                >
                    <div className="Modal" style={styles}>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-danger mb-3" onClick={toggleModal}>X</button>
                        </div>
                        {component}
                    </div>
                </div>
            </React.Fragment>,
            document.body
        )
        : null;
};
export default Modal;