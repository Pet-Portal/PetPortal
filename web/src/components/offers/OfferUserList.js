
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import service from '../../services/posts-service';
import OfferItem from './OfferItem';


const OfferUserList = () => {

    const [state, setState] = useState({
        offers: [],
        loading: false,
        showRatingForm: undefined
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

    /* const toggleRatingForm = () => {
        setState((state) => ({
            ...state,
            showRatingForm: !state.showRatingForm
        }))
    } */

    const { offers, loading } = state;
    return (
        <div>
            {loading && <div className="d-flex justify-content-center align-items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..." /></div>}
            {offers.map((offer, i) => (
                <div key={i} className="container">
                    <OfferItem offer={offer}/>
                </div>
            ))}
        </div>
    )
}

export default OfferUserList;