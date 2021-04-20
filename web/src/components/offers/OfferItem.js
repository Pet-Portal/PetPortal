import { Link, useHistory } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import service from '../../services/posts-service';
import moment from 'moment';
import { AuthContext } from '../../contexts/AuthStore';
import PostItem from '../posts/PostItem';

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
    const { user } = useContext(AuthContext);

    const history = useHistory()
    const acceptOffer = async () => {

        if (state === "pending" && post.state === "pending") {
            await service.acceptOffer(post.id, id)
            history.push(`/posts/${post.id}`)
        }
    }

    return (
        <Fragment>
                <div className="shadow p-3 mb-5 bg-white w-75 row" style={{ width: "18rem" }}>
                    {user.id !== owner.id &&
                        <Link to={`/profile/${owner.id}`} className="col-lg-4">
                            <img src={owner?.avatar} alt="owner" style={{ maxHeight: "18rem", maxWidth: "15rem" }} />
                        </Link>
                    }
                    <div className="col-lg-6">
                        <p><b>{title}</b></p>
                        <p>{text}</p>
                        <p>{price} € / day</p>
                        <p><i>{owner?.name}</i></p>
                        <p>{moment(createdAt).fromNow()}</p>
                    </div>
                    {user.id === owner.id &&
                        <div className="col-lg-4">
                            <h3>Post:</h3>
                            <PostItem post={post} />
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