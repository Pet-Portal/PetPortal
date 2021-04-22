
import React from 'react';
import ReactDOM from 'react-dom';
import petService from '../../services/pets-service';

const DeletePetModal = ({
    isShowingModal,
    styles,
    toggleModal,
    pet,
    user,
    onUserChange
}) => {


    const handleDeletePet = async () => {
        await petService.remove(pet.id)
        const newUser = { ...user, pets: user.pets.filter(item => item.id !== pet.id) }
        onUserChange(newUser)
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
                            <h3 className="title">Are your sure that you want to delete your Pet?</h3>
                            <button onClick={handleDeletePet} className="btn btn-danger m-2">DELETE</button>
                            <button className="btn btn-info m-2" onClick={toggleModal}>NO!</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>,
            document.body
        )
        : null;
};
export default DeletePetModal;