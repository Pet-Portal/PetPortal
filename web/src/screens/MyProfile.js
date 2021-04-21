import { useContext, Fragment, useState } from 'react';
import { AuthContext } from '../contexts/AuthStore';
import PetForm from '../components/pets/PetForm';
import UserForm from '../components/users/UserForm';
import MainLayout from '../components/layouts/MainLayout';
import CreatePetModal from '../components/modals/CreatePetModal';
import UpdateProfileModal from '../components/modals/UpdateProfileModal';
import RatingStars from '../components/ratings/RatingStars';
import petService from '../services/pets-service';

const MyProfile = () => {

  const { user } = useContext(AuthContext);

  const [state, setState] = useState({
    showPetForm: false,
    showUserForm: false,
    loading: false,
  })

  const togglePetForm = () => {
    setState((state) => ({
      ...state,
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

  const handlePetDelete = (pet) => {
    petService.remove(pet.id)
  }

  
  const { showUserForm, showPetForm, loading } = state;
  return (
    <Fragment>
      {loading && <div className="d-flex justify-content-center align-items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..." /></div>}
      <MainLayout title="Your Profile" bgImage="/assets/img/profileBackground.png">
            <div className="row">
              <div className="col-md-6 ml-auto mr-auto">
                <div className="profile">
                  <div className="avatar text-center">
                    <img src={user.avatar} style={{ width: "50%", maxWidth: "180px", marginTop: "4rem" }} alt="avatar" className="img-raised rounded-circle img-fluid" />
                  </div>
                  <div className="name text-center">
                    <h3 className="title">{user.name}</h3>
                    {user?.ratings && <RatingStars user={user}/>}
                    <a href="#pablo" className="btn btn-just-icon btn-link btn-dribbble"><i className="fa fa-dribbble"></i></a>
                    <a href="#pablo" className="btn btn-just-icon btn-link btn-twitter"><i className="fa fa-twitter"></i></a>
                    <a href="#pablo" className="btn btn-just-icon btn-link btn-pinterest"><i className="fa fa-pinterest"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="description text-center">
              <p>{user.email}</p>
            </div>
            <div className="text-center">
              <button onClick={togglePetForm} className="btn btn-info">New Pet</button>
              <button onClick={toggleUserForm} className="btn btn-info">Update Profile</button>
            </div>
            <div className="tab-content tab-space">
              <div className="tab-pane active text-center gallery" id="studio">
                <h4 className="title">Your Pets</h4>
                <div className="row">
                  {user.pets.map((pet, i) => (
                    <div key={i} className="col-md-3 mx-auto">
                      <p>{pet.name}</p>
                      <img src={pet.image} style={{ width: "100%", maxWidth: "15rem" }} className="rounded" alt={pet.name}/>
                      <button className="btn btn-danger rounded-circle" onClick={() => handlePetDelete(pet)} >X</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        
      <CreatePetModal isShowingModal={showPetForm} toggleModal={togglePetForm} component={<PetForm togglePetForm={togglePetForm} toggleLoading={toggleLoading} />} />

      <UpdateProfileModal isShowingModal={showUserForm} toggleModal={toggleUserForm} component={<UserForm toggleUserForm={toggleUserForm} toggleLoading={toggleLoading} />} />
      </MainLayout>
    </Fragment>
  )
};

export default MyProfile;
