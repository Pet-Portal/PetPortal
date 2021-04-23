import React from 'react';
import ReactDOM from 'react-dom';
import PostForm from '../posts/PostForm';

const UpdatePostModal = ({
    isShowingModal,
    styles,
    toggleModal,
    post
}) => {

    return isShowingModal
        ? ReactDOM.createPortal(
            <React.Fragment>
                <div className="updateModal-overlay" />
                <div
                    className="updateModal-wrapper"
                    aria-modal
                    aria-hidden
                    tabIndex={-1}
                    role="dialog"
                >
                    <div className="Modal" style={styles}>
                        <div className="container">
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-danger" onClick={toggleModal}>X</button>
                            </div>
                            <h1>Update your Post!</h1>
                            <PostForm post={post} />
                        </div>
                    </div>
                </div>
            </React.Fragment>,
            document.body
        )
        : null;
};
export default UpdatePostModal;