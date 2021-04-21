import { Link, useHistory } from 'react-router-dom';
import { Fragment, useContext, useState } from 'react';
import service from '../../services/posts-service';
import moment from 'moment';
import { AuthContext } from '../../contexts/AuthStore';
import RatingModal from '../modals/RatingModal';
import RatingForm from '../ratings/RatingForm';

function OfferItem({
    offer: {
        title,
        text,
        price,
        owner,
        createdAt,
        state,
        id,
        post
    },

}) {
    const [rating, setRating] = useState({
        showRatingForm: undefined
    })
    const { user } = useContext(AuthContext);

    const history = useHistory()
    const acceptOffer = async () => {

        if (state === "pending" && post.state === "pending") {
            await service.acceptOffer(post.id, id)
            history.push(`/posts/${post.id}`)
        }
    }

    const toggleRatingForm = () => {
        setRating((rating) => ({
            ...rating,
            showRatingForm: !state.showRatingForm
        }))
    }

    const { showRatingForm } = rating;
    return (
        <Fragment>
            <div className="shadow border rounded p-3 mb-5 bg-white w-100 row d-flex align-items-center" style={{ width: "18rem" }}>
                {user.id !== owner.id &&
                    <Link to={`/profile/${owner.id}`} className="col-lg-3">
                        <img src={owner?.avatar} alt="owner" style={{ maxHeight: "18rem", maxWidth: "15rem" }} />
                    </Link>
                }
                <div className="col-lg-4">
                    <p><b>{title}</b></p>
                    <p>{text}</p>
                    <p>{price} € / day</p>
                    <p><i>{owner?.name}</i></p>
                    <p>{moment(createdAt).fromNow()}</p>
                </div>
                {user.id === owner.id &&
                    <div className="col-lg-3">
                        <Link to={`/posts/${post.id}`}>
                            <div className="card" style={{ maxWidth: "12rem" }}>
                                <img src={post.image} style={{ maxWidth: "12rem", width: "100%", maxHeight: "10rem" }} className="card-img-top" alt={post.id} />
                                <div className="card-body">
                                    <p className="card-text">{post.title}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                }
                {user.id === owner.id && state === "accepted" && user.id === post.petsitter && moment().isAfter(post.end) &&
                    <div className="col-lg-4">
                        <h4 className="title">You can now vote the Owner and Pet!</h4>
                        <button onClick={toggleRatingForm} className="btn btn-info">Rate the Owner</button>
                        <button className="btn btn-success">Rate the Pet</button>
                        <RatingModal isShowingModal={showRatingForm} toggleModal={toggleRatingForm} text="Rate the Owner!" component={<RatingForm post={post} reference={"userId"} referenceValue={post.petsitter?.id} />} />
                    </div>
                }
                {user.id === owner.id && state === "accepted" && moment().isBefore(post.end) &&
                    <div> 
                        <span className="p-3 fs-3 badge badge-pill badge-success text-white" style={{ fontSize: "20px" }}>Your Post was ACCEPTED</span>
                    </div>
                }

                {user.id !== owner.id &&
                    <div className="mt-3">
                        <button className="btn btn-info" onClick={acceptOffer} >Accept Offer</button>
                    </div>
                }
            </div>
        </Fragment>
    );
}

export default OfferItem;