import ProfileItem from "../components/users/ProfileItem";
import PetForm from "../components/pets/PetForm";
import { Fragment, useState } from "react";
import UserForm from '../components/users/UserForm';

const Profile = () => {

  const [state, setState] = useState(({
    showPetForm: false,
    showUserForm: false
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

  const { showPetForm, showUserForm } = state;
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
      
      {showPetForm &&
        <PetForm togglePetForm={togglePetForm} />
      }
      {showUserForm &&
        <UserForm toggleUserForm={toggleUserForm}/>
      }
    </Fragment>
  );
};

export default Profile;
