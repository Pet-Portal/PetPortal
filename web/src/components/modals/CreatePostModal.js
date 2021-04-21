import React from 'react';
import ReactDOM from 'react-dom';

const CreatePostModal = ({
    isShowingModal,
    component,
    styles,
    toggleModal
}) => {
    return isShowingModal
        ? ReactDOM.createPortal(
            <React.Fragment>
                <div className="createPostModal-overlay" />
                <div
                    className="createPostModal-wrapper"
                    aria-modal
                    aria-hidden
                    tabIndex={-1}
                    role="dialog"
                >
                    <div className="Modal w-100" style={styles}>
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
export default CreatePostModal;