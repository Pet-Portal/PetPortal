import React from 'react';
import ReactDOM from 'react-dom';


const UpdateProfileModal = ({
    isShowingModal,
    styles,
    component,
    toggleModal,
}) => {

    return isShowingModal
        ? ReactDOM.createPortal(
            <React.Fragment>
                <div className="updateProfileModal-overlay" />
                <div
                    className="updateProfileModal-wrapper"
                    aria-modal
                    aria-hidden
                    tabIndex={-1}
                    role="dialog"
                >
                    <div className="Modal w-100" style={styles}>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-danger m-2" onClick={toggleModal}>X</button>
                        </div>
                        
                        <div className="container">
                            <h3 className="title">Update your Profile!</h3>
                        </div>
                        {component}
                    </div>
                </div>
            </React.Fragment>,
            document.body
        )
        : null;
};
export default UpdateProfileModal;