import { useContext, Fragment } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { useState } from 'react';
import PetForm from '../pets/PetForm';
import UserForm from './UserForm';

const ProfileItem = () => {
    const { user } = useContext(AuthContext)

    const [state, setState] = useState({
        showPetForm: false,
        showUserForm: false,
        loading: false
    })

    const togglePetForm = () => {
        setState((state) => ({
            showPetForm: !state.showPetForm
        }))
    }

    const toggleUserForm = () => {
        setState((state) => ({
            showUserForm: !state.showUserForm
        }))
    }

    const toggleLoading = () => {
        setState(state => ({
            loading: !state.loading
        }))
    }

    const { showUserForm, showPetForm, loading } = state;

    return (
        <Fragment >
            {loading && <div className="d-flex justify-content-center align-items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..." /></div>}
            <div className="container">
                <div className="row border mt-3 shadow p-3 mb-5 bg-white">
                    <div className="col-lg-4 m-1">
                        <h1 className="fw-bold text-info">User:</h1>
                        <div className="card shadow p-3 mb-5 bg-white" style={{ width: "18rem" }}>
                            <img src={user?.avatar} className="card-img-top" alt="avatar" />
                            <div className="card-body">
                                <p className="card-text"><b>{user?.name}</b></p>
                                <p className="card-text">{user?.email}</p>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-4 m-1 border mt-3 shadow p-3 mb-5 bg-white d-flex flex-column align-items-center">
                        <h1>Pets:</h1>
                        {user?.pets?.map((pet, i) =>
                            <div key={i} className="card shadow p-3 mb-5 bg-white" style={{ width: "16rem" }}>
                                <img src={pet.image} className="card-img-top" alt="pet" style={{ maxHeight: "10rem" }} />
                                <div className="card-body">
                                    <p className="card-text"><b>{pet.name}</b></p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="col-lg-12 d-flex flex-column">
                        <button
                            className={`btn mb-2 ${showPetForm ? 'btn-danger' : 'btn-primary'}`}
                            onClick={togglePetForm}
                        >
                            {state.showPetForm ? 'Close' : 'Add Pet +'}
                        </button>
                        <button
                            className={`btn mb-2 ${showUserForm ? 'btn-danger' : 'btn-primary'}`}
                            onClick={toggleUserForm}
                        >
                            {state.showUserForm ? 'Close' : 'Update User'}
                        </button>
                        {showPetForm &&
                            <PetForm togglePetForm={togglePetForm} toggleLoading={toggleLoading} />
                        }
                        {showUserForm &&
                            <UserForm toggleUserForm={toggleUserForm} toggleLoading={toggleLoading} />
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProfileItem;