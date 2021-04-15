import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { userProfile } from '../../services/users-service';



const ProfileItem = () => {
    const [state, setState] = useState({
        profile: []
    })

    const { user } = useContext(AuthContext)
    useEffect(() => {
        async function fetchProfile() {
            console.log('Fetching profile...');
            const profile = await userProfile(user.id);
            setState({
                profile: profile
            })
        }

        fetchProfile();
    }, [user]);

    const { profile } = state;
    return (
        <div className="container">
            <div className="row border mt-3 shadow p-3 mb-5 bg-white">
                <div className="col-lg-5 m-3">
                    <div className="card shadow p-3 mb-5 bg-white" style={{ width: "18rem" }}>
                        <img src={profile.avatar} className="card-img-top" alt="avatar" />
                        <div className="card-body">
                            <p className="card-text"><b>{profile.name}</b></p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 m-3">
                    {profile.pets && profile.pets.map((pet, i) =>
                        <div key={i} className="card shadow p-3 mb-5 bg-white" style={{ width: "16rem" }}>
                            <img src={pet.image} className="card-img-top" alt="pet" />
                            <div className="card-body">
                                <p className="card-text"><b>{pet.name}</b></p>
                            </div>
                        </div>
                    )}



                </div>
            </div>
        </div>
    )
}

export default ProfileItem;