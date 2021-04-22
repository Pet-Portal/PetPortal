
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import service from '../../services/posts-service';
import OfferItem from './OfferItem';


const OfferUserList = () => {

    const [state, setState] = useState({
        offers: [],
        loading: false,
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


    const { offers, loading } = state;
    return (
        <div>
            {loading && <div className="d-flex justify-content-center align-items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..." /></div>}

            {offers.map((offer, i) => (
                <OfferItem key={i} offer={offer} />
            ))}

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