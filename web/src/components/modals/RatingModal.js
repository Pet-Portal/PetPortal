
import React from 'react';
import ReactDOM from 'react-dom';


const RatingModal = ({
    isShowingModal,
    styles,
    component,
    toggleModal,
    text
}) => {

    return isShowingModal
        ? ReactDOM.createPortal(
            <React.Fragment>
                <div className="ratingModal-overlay" />
                <div
                    className="ratingModal-wrapper"
                    aria-modal
                    aria-hidden
                    tabIndex={-1}
                    role="dialog"
                >
                    <div className="Modal" style={styles}>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-danger m-2" onClick={toggleModal}>X</button>
                        </div>
                        <div className="container">
                            <h3 className="title">{text}</h3>
                        </div>
                        {component}
                    </div>
                </div>
            </React.Fragment>,
            document.body
        )
        : null;
};
export default RatingModal;