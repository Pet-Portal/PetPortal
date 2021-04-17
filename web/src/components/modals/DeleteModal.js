import { useHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import service from '../../services/posts-service';

const DeleteModal = ({
    isShowingModal,
    styles,
    toggleModal,
    post
}) => {

    const history = useHistory();

    const handleDeleteEvent = async () => {
        await service.remove(post.id);
        history.push('/posts');
    }
    return isShowingModal
        ? ReactDOM.createPortal(
            <React.Fragment>
                <div className="deleteModal-overlay" />
                <div
                    className="deleteModal-wrapper"
                    aria-modal
                    aria-hidden
                    tabIndex={-1}
                    role="dialog"
                >
                    <div className="Modal" style={styles}>
                        <div className="container">
                            <h1>Are your sure that you want to delete your Post?</h1>
                            <button onClick={handleDeleteEvent} className="btn btn-danger m-2">DELETE</button>
                            <button className="btn btn-info m-2" onClick={toggleModal}>NO!</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>,
            document.body
        )
        : null;
};
export default DeleteModal;