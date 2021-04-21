import React from 'react';
import ReactDOM from 'react-dom';


const CreatePetModal = ({
    isShowingModal,
    styles,
    component,
    toggleModal,
}) => {

    return isShowingModal
        ? ReactDOM.createPortal(
            <React.Fragment>
                <div className="createPetModal-overlay" />
                <div
                    className="createPetModal-wrapper"
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
                            <h3 className="title">Register a new Pet</h3>
                        </div>
                        {component}
                    </div>
                </div>
            </React.Fragment>,
            document.body
        )
        : null;
};
export default CreatePetModal;