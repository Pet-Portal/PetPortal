import ProfileItem from "../components/users/ProfileItem";
import { Fragment } from "react";
import MainLayout from '../components/layouts/MainLayout';


const Profile = () => {

  return (
    <Fragment>
        <MainLayout title="Profile Page" bgImage="/assets/img/profileBackground.png">
            <ProfileItem />
        </MainLayout>
    </Fragment>
  );
};

export default Profile;