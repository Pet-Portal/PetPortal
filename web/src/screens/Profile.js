import ProfileItem from "../components/users/ProfileItem";
import PetForm from "../components/pets/PetForm";
import { Fragment } from "react";

const Profile = () => {
  return (
    <Fragment>
      <ProfileItem />
      <PetForm />
    </Fragment>
  );
};

export default Profile;
