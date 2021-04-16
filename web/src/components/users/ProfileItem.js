import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import service from '../../services/users-service';
const ProfileItem = () => {

    const params = useParams();

    const [state, setState] = useState({
        user: "",
        loading: false
    })

    useEffect(() => {

        async function fetchUser() {
            console.log('Fetching user...');
            setState(state => ({
                ...state,
                loading: true
            }))
            const user = await service.userProfile(params.id)
            setState({
                user: user,
                loading: false
            })
        }

        fetchUser();

    }, [params]);

    const { user } = state;

    return (
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
            </div>
        </div>

    )
}

export default ProfileItem;