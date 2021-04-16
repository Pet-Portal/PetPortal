import service from '../../services/posts-service';
import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import moment from 'moment';
import { Link } from 'react-router-dom';
import OfferForm from '../offers/OfferForm';

const PostItemDetails = () => {

    const params = useParams();

    const [state, setState] = useState({
        post: "",
        loading: false
    });
    useEffect(() => {

        async function fetchPost() {
            console.log('Fetching post...');
            setState(state => ({
                ...state,
                loading: true
            }))
            const post = await service.get(params.id);
            setState({
                post: post,
                loading: false
            })
        }

        fetchPost();

    }, [params]);

    const { post, loading } = state;

    return (
        <Fragment>
            {loading && <div className="d-flex justify-content-center align-items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..." /></div>}
            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card shadow p-3 mb-5 bg-white" style={{ width: "16rem" }}>
                            <Link to={`/profile/${post.owner?.id}`}><img src={post.owner?.avatar} className="card-img-top" alt="owner" style={{ maxHeight: "18rem" }} /></Link>
                            <div className="card-body">
                                <p className="card-text"><b>{post.owner?.name}</b></p>
                                <p className="card-text">{post.owner?.email}</p>
                                <p className="card-text">{post.owner?.ratings?.rate}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <img style={{maxHeight: "25rem", width: "25rem"}} src={post.image} alt={post.title} />
                        <h1>{post.title}</h1>
                        <p>{post.description}</p>
                        <p className="badge rounded-pill bg-primary me-2 p-2" style={{fontSize: "20px"}}>Start: {moment(post.start).format('llll')}</p>
                        <p className="badge rounded-pill bg-danger me-2 p-2" style={{fontSize: '20px' }}>End: {moment(post.end).format('llll')}</p>
                        <p>{post.owner?.location}</p>
                    </div>
                </div>
                <OfferForm />
            </div>
        </Fragment>
    )
}

export default PostItemDetails;