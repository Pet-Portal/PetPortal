import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';




const ProfileItem = () => {
    const { user } = useContext(AuthContext)

    return (
        <div className="container">
            <div className="row border mt-3 shadow p-3 mb-5 bg-white">
                <div className="col-lg-5 m-3">
                    <div className="card shadow p-3 mb-5 bg-white" style={{ width: "18rem" }}>
                        <img src={user?.avatar} className="card-img-top" alt="avatar" />
                        <div className="card-body">
                            <p className="card-text"><b>{user?.name}</b></p>
                            <p className="card-text">{user?.email}</p>
                        </div>
                        
                    </div>
                </div>
                <div className="col-lg-6 m-3">
                    {user?.pets?.map((pet, i) =>
                        <div key={i} className="card shadow p-3 mb-5 bg-white" style={{ width: "16rem"}}>
                            <img src={pet.image} className="card-img-top" alt="pet" style={{maxHeight: "10rem"}}/>
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