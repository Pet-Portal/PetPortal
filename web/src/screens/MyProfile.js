import { useContext, Fragment, useState } from 'react';
import { AuthContext } from '../contexts/AuthStore';
import PetForm from '../components/pets/PetForm';
import UserForm from '../components/users/UserForm';
import MainLayout from '../components/layouts/MainLayout';
import CreatePetModal from '../components/modals/CreatePetModal';
import UpdateProfileModal from '../components/modals/UpdateProfileModal';
import RatingStars from '../components/ratings/RatingStars';
import DeletePetModal from '../components/modals/DeletePetModal';

const MyProfile = () => {

  const { user, onUserChange } = useContext(AuthContext);

  const [state, setState] = useState({
    showPetForm: false,
    showUserForm: false,
    showDeletePet: false,
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

  const toggleDeletePetForm = () => {
    setState((state) => ({
      showDeletePet: !state.showDeletePet
    }))
  }

  const toggleLoading = () => {
    setState(state => ({
      loading: !state.loading
    }))
  }

  /* const handlePetDelete = async (pet) => {
    await petService.remove(pet.id)
    const newUser = { ...user, pets: user.pets.filter(item => item.id !== pet.id) }
    onUserChange(newUser)
  } */

  const starsRate = (rate) => {
    if (rate === 5) {
        return <div className="icon icon-warning">
            <span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star</span>
        </div>
    } else if (rate === 4) {
        return <div className="icon icon-warning">
        <span className="material-icons icon-warning">star</span><span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star_border</span>
    </div>
    } else if (rate === 3) {
        return <div className="icon icon-warning">
        <span className="material-icons icon-warning">star</span><span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star_border</span><span className="material-icons">star_border</span>
    </div>
    } else if (rate === 2) {
        return <div className="icon icon-warning">
        <span className="material-icons icon-warning">star</span><span className="material-icons">star</span><span className="material-icons">star_border</span><span className="material-icons">star_border</span><span className="material-icons">star_border</span>
    </div>
    } else if (rate === 1) {
        return <div className="icon icon-warning">
        <span className="material-icons icon-warning">star</span><span className="material-icons">star_border</span><span className="material-icons">star_border</span><span className="material-icons">star_border</span><span className="material-icons">star_border</span>
    </div>
    }
}
  
  const { showUserForm, showPetForm, showDeletePet, loading } = state;
  return (
    <Fragment>
      {loading && <div className="d-flex justify-content-center align-items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..." /></div>}
      <MainLayout title="Your Profile" bgImage="/assets/img/profileBackground.png">
            <div className="row">
              <div className="col-md-6 ml-auto mr-auto">
                <div className="profile">
                  <div className="avatar text-center">
                    <img src={user.avatar} style={{ width: "50%", maxWidth: "180px" }} alt="avatar" className="img-raised rounded-circle img-fluid" />
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
                {user?.pets?.length !== 0 && <h3 className="title">Your Pets</h3>}
                <div className="row">
                  {user.pets.map((pet, i) => (
                    <div key={i} className="col-md-3 mx-auto pet-profile">
                      <p className="font-weight-bold" style={{fontSize: "1rem"}}>{pet.name}</p>
                      <img src={pet.image} style={{ width: "100%", maxWidth: "15rem" }} className="rounded" alt={pet.name}/>
                      <button className="btn btn-link link-unstyled pet-delete text-danger p-0" onClick={toggleDeletePetForm} ><h1 class="material-icons" style={{fontSize: "30px"}}>delete</h1></button>
                      <DeletePetModal isShowingModal={showDeletePet} toggleModal={toggleDeletePetForm} user={user} onUserChange={onUserChange} pet={pet}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="row w-75">
                    {user?.ratings?.length !== 0 && <h3 className="title">Ratings</h3>}
                    {user?.ratings?.map((rating, i) => (
                        <div key={i} className="col-md-12 border rounded mb-3">
                            <h3><b>{rating?.title}</b></h3>
                            {starsRate(rating?.rate)}
                            <h4>{rating?.text}</h4>
                            <p>{rating?.owner?.name}</p>
                        </div>
                    ))}
                </div>
      
      <CreatePetModal isShowingModal={showPetForm} toggleModal={togglePetForm} component={<PetForm togglePetForm={togglePetForm} toggleLoading={toggleLoading} />} />

      <UpdateProfileModal isShowingModal={showUserForm} toggleModal={toggleUserForm} component={<UserForm toggleUserForm={toggleUserForm} toggleLoading={toggleLoading} />} />
      </MainLayout>
    </Fragment>
  )
};

export default MyProfile;
