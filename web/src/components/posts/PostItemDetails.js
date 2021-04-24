import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';
import moment from 'moment';
import service from '../../services/posts-service';
import DeleteModal from '../modals/DeleteModal';
import UpdatePostModal from '../modals/UpdatePostModal';
import RatingStars from '../ratings/RatingStars';

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

            if (!isUnmounted) {
                triggerPost(post)
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

    }, [params, triggerPost]);



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
            <div className="profile">
                <div className="avatar text-center">
                    <Link to={`/profile/${post.owner?.id}`}><img src={post.owner?.avatar} style={{ width: "50%", maxWidth: "180px" }} alt="avatar" className="img-raised rounded-circle img-fluid" /></Link>
                </div>
                <div className="name text-center">
                    <Link to={`/profile/${post.owner?.id}`}><h3 className="title">{post?.owner?.name}</h3></Link>
                    {post?.owner?.ratings && <RatingStars user={post.owner} />}
                    <p className="card-text text-dark" style={{ fontSize: "1.5rem" }}>{post?.owner?.email}</p>
                    <a href="#pablo" className="btn btn-just-icon btn-link btn-dribbble"><i className="fa fa-dribbble"></i></a>
                    <a href="#pablo" className="btn btn-just-icon btn-link btn-twitter"><i className="fa fa-twitter"></i></a>
                    <a href="#pablo" className="btn btn-just-icon btn-link btn-pinterest"><i className="fa fa-pinterest"></i></a>
                </div>
            </div>
            {loading && <div className="d-flex justify-content-center align-items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..." /></div>}

            <div className="container mt-3">
                <div className="mb-5 border rounded">
                    <img style={{ maxHeight: "25rem", width: "100%" }} src={post.image} alt={post.title} />
                    <div className="p-2">
                        <h3 className="title">{post.title}</h3>
                        <p style={{ fontSize: "1.3rem" }}>{post.description}</p>
                        <p className="badge rounded-pill bg-info mr-2 p-2" style={{ fontSize: "20px" }}>Start: {moment(post.start).format('llll')}</p>
                        <p className="badge rounded-pill bg-danger mr-2 p-2" style={{ fontSize: '20px' }}>End: {moment(post.end).format('llll')}</p>
                        <p>{post?.owner?.place}</p>
                    </div>

                    <DeleteModal isShowingModal={showDeleteModal} toggleModal={toggleDeleteModal} post={post} />
                    {user.id === post.owner?.id && post.state === "pending" &&
                        <div className="d-flex justify-content-center">
                            <UpdatePostModal isShowingModal={showUpdateModal} toggleModal={toggleUpdateModal} post={post} />
                            <button type="button" className="btn btn-info mb-3 mr-2 ml-2" onClick={toggleUpdateModal}>Update Post</button>
                            <button type="button" className="btn btn-danger mb-3 ml-2" onClick={toggleDeleteModal}>Delete Post</button>
                        </div>
                    }
                </div>

            </div>
        </Fragment>
    )
}

export default PostItemDetails;