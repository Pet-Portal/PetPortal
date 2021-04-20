import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import postsService from '../../services/posts-service';
import OfferItem from './OfferItem';


function OfferList({ post }) {


    const [state, setState] = useState({
        offers: [],
        loading: false
    });

    const params = useParams();

    

    useEffect(() => {

        async function fetchOffers() {
            console.log('Fetching offers...');
            setState(state => ({
                ...state,
                loading: true
            }))
            const offers = await postsService.listOffersFromPost(params.id);
            setState({
                offers: offers,
                loading: false
            })
        }

        fetchOffers();

    }, [params, post]);
    

    const { offers, loading } = state;
    return (
        <Fragment>
            {loading && <div className="container d-flex justify-content-center align-items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..." /></div>}

            {post.state === "pending" && <h1>Your incoming Offers!</h1>}

            {offers.map(offer => (
                <div key={offer.id} className="row row-cols-4 ">
                    <div className="col mb-4"><OfferItem offer={offer} setState={setState} post={post} /></div>
                </div>
            ))}
        </Fragment>
    )
}

export default OfferList;