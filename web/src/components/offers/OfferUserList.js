
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';
import service from '../../services/posts-service';
import moment from 'moment';
import RatingModal from '../modals/RatingModal';
import RatingForm from '../ratings/RatingForm';


const OfferUserList = () => {

    const [state, setState] = useState({
        offers: [],
        loading: false,
        showRatingForm: false
    })

    const { user } = useContext(AuthContext);

    useEffect(() => {

        async function fetchOffers() {
            console.log('Fetching offers...');
            setState(state => ({
                ...state,
                loading: true
            }))
            const offers = await service.listUserOffers(user.id);
            if (!isUnmounted) {
                setState({
                    offers: offers,
                    loading: false
                })
            }
        }

        let isUnmounted = false
        fetchOffers();

        return () => {
            isUnmounted = true;
        }
    }, [user])

    const toggleRatingForm = () => {
        setState((state) => ({
            ...state,
            showRatingForm: !state.showRatingForm
        }))
    }

    const { offers, loading, showRatingForm } = state;
    return (
        <div>
            <div className="profile">
                <div className="avatar text-center" style={{ height: "150px" }}>
                    <Link to={"/myProfile"}><img src={user.avatar} style={{ width: "50%", maxWidth: "180px" }} alt="avatar" className="img-raised rounded-circle img-fluid" /></Link>
                </div>
            </div>
            {loading && <div className="d-flex justify-content-center align-items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..." /></div>}

            {offers.map((offer, i) => (
                <div key={i} id={i} className="carousel slide mb-3" data-ride="carousel">
                    {user.id === offer?.owner?.id && offer.state === "accepted" && user.id === offer?.post?.petsitter && moment().isAfter(offer?.post?.end) &&
                        <ol className="carousel-indicators">
                            <li data-target={`#${i}`} data-slide-to="0" className="active"></li>
                            <li data-target={`#${i}`} data-slide-to="1"></li>
                        </ol>
                    }
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img style={{ maxHeight: "23rem", width: "100%" }} src={offer?.post?.image} alt={offer.title} className="rounded mt-1" />
                            <div className="carousel-caption d-md-block">
                                <Link to={`/posts/${offer?.post?.id}`}><h2 className="title text-white font-weight-bold text-with-shadow" style={{ fontSize: "1.5vw" }}>{offer?.title}</h2></Link>
                                <h3 className="text-with-shadow" style={{ fontSize: "1vw" }}>{offer?.text}</h3>
                                <p className="text-with-shadow" style={{ fontSize: "1vw" }}>{offer?.price}€ /d</p>
                                <p className="text-with-shadow" style={{ fontSize: "1vw" }}>{moment(offer.createdAt).fromNow()}</p>
                                {user.id === offer?.owner?.id && offer?.state === "accepted" && moment().isBefore(offer?.post?.end) &&
                                    <span className="badge badge-pill badge-success text-white" style={{ fontSize: "1vw" }}>Your Offer was ACCEPTED</span>
                                }
                            </div>
                        </div>
                        {user.id === offer?.owner?.id && offer?.state === "accepted" && user.id === offer?.post?.petsitter && moment().isAfter(offer.post.end) &&
                            <div className="carousel-item">
                                <img style={{ maxHeight: "23rem", width: "100%" }} src={offer?.post?.image} alt={offer?.title} className="rounded mt-1" />
                                <div className="carousel-caption d-md-block">
                                    <div className="offer-rate">
                                    <Link to={`/profile/${offer?.post?.owner?.id}`}><img src={offer?.post?.owner?.avatar} alt={offer?.post?.owner?.name} style={{ maxHeight: "8vw" }} className="mt-2 rounded" /></Link>
                                        <p className="offer-rate-name">{offer?.post?.owner?.name}</p>
                                    </div>
                                    <h3 className="text-with-shadow">You can now vote the Owner!</h3>
                                    <button onClick={toggleRatingForm} className="btn btn-info">Rate the Owner</button>
                                    <RatingModal isShowingModal={showRatingForm} toggleModal={toggleRatingForm} text="Rate the Owner!" component={<RatingForm post={offer.post} reference={"userId"} referenceValue={offer?.post?.owner} />} />
                                </div>
                            </div>
                        }
                    </div>



                    {user.id === offer.owner.id && offer.state === "accepted" && user.id === offer.post.petsitter && moment().isAfter(offer.post.end) &&
                        <div>
                            <a className="carousel-control-prev" href={`#${i}`} role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href={`#${i}`} role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    }

                </div>
            ))
            }

            {offers.length === 0 &&
                <div className="card card-nav-tabs card-plain">
                    <div className="card-header card-header-info">
                        <div className="nav-tabs-navigation">
                            <div className="nav-tabs-wrapper">
                                <ul className="nav nav-tabs d-flex justify-content-center">
                                    <li className="nav-item">
                                        <h3 className="title">You have sent any Offers yet!</h3>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="card-body ">
                        <div className="tab-content text-center">
                            <div className="tab-pane active">
                                <img className="rounded w-100" src="/assets/img/myoffers.jpg" alt="myoffers" />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default OfferUserList;