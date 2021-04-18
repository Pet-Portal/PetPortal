import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';
import moment from 'moment';
import service from '../../services/posts-service';
import DeleteModal from '../modals/DeleteModal';
import UpdatePostModal from '../modals/UpdatePostModal';

const PostItemDetails = ({ triggerPost }) => {

    const params = useParams();
    const { user } = useContext(AuthContext);

    const [state, setState] = useState({
        post: "",
        loading: false,
        showDeleteModal: false,
        showUpdateModal: false
    });
    useEffect(() => {

        async function fetchPost() {
            console.log('Fetching post...');
            setState(state => ({
                ...state,
                loading: true
            }))
            const post = await service.get(params.id);
            triggerPost(post)
            if (!isUnmounted) {
                setState({
                    post: post,
                    loading: false
                }) 
            }
            
        }
        let isUnmounted = false
        fetchPost();
        return () => {
            isUnmounted = true;
        }

    }, [params]);

    
    
    const toggleDeleteModal = () => {
        setState((state) => ({
            ...state,
            showDeleteModal: !state.showDeleteModal
        }))
    }

    const toggleUpdateModal = () => {
        setState((state) => ({
            ...state,
            showUpdateModal: !state.showUpdateModal
        }))
    }

    
    const { post, loading, showDeleteModal, showUpdateModal } = state;

    return (
        <Fragment>
            {loading && <div className="d-flex justify-content-center align-items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..." /></div>}
            <div className="container mt-3">
                <div className="row shadow p-3 mb-5 bg-white">
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
                        <img style={{ maxHeight: "25rem", width: "25rem" }} src={post.image} alt={post.title} />
                        <h1>{post.title}</h1>
                        <p>{post.description}</p>
                        <p className="badge rounded-pill bg-info me-2 p-2" style={{ fontSize: "20px" }}>Start: {moment(post.start).format('llll')}</p>
                        <p className="badge rounded-pill bg-danger me-2 p-2" style={{ fontSize: '20px' }}>End: {moment(post.end).format('llll')}</p>
                        <p>{post.owner?.location}</p>

                        <UpdatePostModal isShowingModal={showUpdateModal} toggleModal={toggleUpdateModal} post={post}/>

                        <DeleteModal isShowingModal={showDeleteModal} toggleModal={toggleDeleteModal} post={post}/>
                        {user.id === post.owner?.id && post.state === "pending" && <button type="button" className="btn btn-info mb-3 me-2" onClick={toggleUpdateModal}>Update Post</button>}
                        {user.id === post.owner?.id && <button type="button" className="btn btn-danger mb-3 ms-2" onClick={toggleDeleteModal}>Delete Post</button>}
                    </div>
                </div>
                
            </div>
        </Fragment>
    )
}

export default PostItemDetails;