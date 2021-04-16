import ProfileItem from "../components/users/ProfileItem";
import PetForm from "../components/pets/PetForm";
import { Fragment, useState } from "react";
import UserForm from '../components/users/UserForm';

const Profile = () => {

  const [state, setState] = useState(({
    showPetForm: false,
    showUserForm: false,
    loading: false
  }))

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

  const { showPetForm, showUserForm, loading } = state;
  return (
    <Fragment>
      <ProfileItem/>
      <div className="container mb-3">
      <button
        className="btn btn-primary me-2"
        onClick={togglePetForm}
      >
        {state.showPetForm ? 'Close' : 'Add Pet +'}
      </button>
      <button
        className="btn btn-primary ms-2"
        onClick={toggleUserForm}
      >
        {state.showUserForm ? 'Close' : 'Update User'}
      </button>
      </div>

      {loading && <div className="d-flex justify-content-center align-items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..."/></div>}

      {showPetForm &&
        <PetForm togglePetForm={togglePetForm} toggleLoading={toggleLoading} />
      }
      {showUserForm &&
        <UserForm toggleUserForm={toggleUserForm} toggleLoading={toggleLoading}/>
      }
    </Fragment>
  );
};

export default Profile;
