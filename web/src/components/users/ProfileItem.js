import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import service from '../../services/users-service';
import RatingStars from '../ratings/RatingStars';

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

    const { user } = state;

    return (
        <Fragment>
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
            <div className="tab-content tab-space">
                <div className="tab-pane active text-center gallery" id="studio">
                    <h4 className="title">Pets</h4>
                    <div className="row">
                        {user?.pets?.map((pet, i) => (
                            <div key={i} className="col-md-3 mx-auto">
                                <p>{pet.name}</p>
                                <img src={pet.image} style={{ width: "100%", maxWidth: "15rem" }} className="rounded" alt={pet.name} />
                            </div>
                        ))}
                    </div>

                </div>
                <div className="row w-75">
                    {user?.ratings && <h3 className="title">Ratings</h3>}
                    {user?.ratings?.map((rating, i) => (
                        <div key={i} className="col-md-12 border rounded">
                            <h3><b>{rating?.title}</b></h3>
                            {starsRate(rating?.rate)}
                            <h4>{rating?.text}</h4>
                            <p>{rating?.owner?.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default ProfileItem;