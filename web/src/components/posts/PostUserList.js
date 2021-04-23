
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthStore';
import service from '../../services/posts-service';
import moment from 'moment';
import RatingModal from '../modals/RatingModal';
import RatingForm from '../ratings/RatingForm';
import { Fragment } from 'react';



const PostUserList = () => {

    const [state, setState] = useState({
        posts: [],
        loading: false,
        showRatingForm: undefined
    })

    const { user } = useContext(AuthContext);

    useEffect(() => {

        async function fetchPosts() {
            console.log('Fetching posts...');
            setState(state => ({
                ...state,
                loading: true
            }))
            const posts = await service.listUserPosts(user.id);
            if (!isUnmounted) {
                setState({
                    posts: posts,
                    loading: false
                })
            }
        }

        let isUnmounted = false
        fetchPosts();

        return () => {
            isUnmounted = true;
        }
    }, [user])

    const toggleRatingForm = () => {
        setState((state) => ({
            ...state,
            update: false,
            showRatingForm: !state.showRatingForm
        }))
    }

    const { posts, loading, showRatingForm } = state;

    return (
        <div>
            <div className="profile">
                <div className="avatar text-center" style={{ height: "150px" }}>
                    <img src={user.avatar} style={{ width: "50%", maxWidth: "180px" }} alt="avatar" className="img-raised rounded-circle img-fluid" />
                </div>
            </div>
            {posts.map((post, i) => (
                <div key={i} id={i} className="carousel slide mb-3" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target={`#${i}`} data-slide-to="0" className="active"></li>
                        <li data-target={`#${i}`} data-slide-to="1"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img style={{ maxHeight: "23rem", width: "100%" }} src={post.image} alt={post.title} className="rounded mt-1" />
                            <div className="carousel-caption d-md-block">
                                <Link to={`/posts/${post.id}`}><h2 className="title text-white font-weight-bold">{post?.title}</h2></Link>
                                <p>{post?.description}</p>
                                <div>
                                    <p className="badge rounded-pill bg-info m-2 p-2" style={{ fontSize: "1rem" }}>Start: {moment(post.start).format('llll')}</p>
                                    <p className="badge rounded-pill bg-danger m-2 p-2" style={{ fontSize: "1rem" }}>End: {moment(post.end).format('llll')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img style={{ maxHeight: "23rem", width: "100%" }} src={post.image} alt={post.title} className="rounded mt-1" />
                            <div className="carousel-caption d-md-block">
                                {post?.petsitter &&
                                    <div className="row bg-secondary rounded" style={{ maxHeight: "20rem" }}>
                                        <div className="col-lg-3 p-0 m-0">
                                            <h4>Pet-Sitter</h4>
                                            <Link to={`/profile/${post.petsitter.id}`}>
                                                <img src={post?.petsitter?.avatar} className="rounded" alt="petsitter" style={{ maxHeight: "10rem" }} />
                                            </Link>
                                            <h4 className="m-0">{post?.petsitter?.name}</h4>
                                        </div>
                                        {moment().isBefore(post?.end) &&
                                            <div className="col-lg-6 m-auto">
                                                <p className="badge rounded-pill bg-info m-2 p-2" style={{ fontSize: "1rem" }}>Start: {moment(post.start).format('llll')}</p>
                                                <p className="badge rounded-pill bg-danger m-2 p-2" style={{ fontSize: "1rem" }}>End: {moment(post.end).format('llll')}</p>
                                                <p>{post?.petsitter?.email}</p>
                                            </div>
                                        }
                                        <RatingModal isShowingModal={showRatingForm} toggleModal={toggleRatingForm} component={<RatingForm post={post} reference={"userId"} referenceValue={post.petsitter?.id} />} />
                                        {moment().isAfter(post.end) && <button onClick={toggleRatingForm} className="btn btn-primary">Rate your Pet-Sitter!</button>}
                                    </div>
                                }
                                {!post?.petsitter &&
                                    <div className="bg-secondary rounded">
                                        <h3>You have still any Pet-Sitter</h3>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href={`#${i}`} role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href={`#${i}`} role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            ))
            }
        </div >
    )
}

export default PostUserList
