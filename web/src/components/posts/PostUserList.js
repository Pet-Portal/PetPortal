
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
                    <Link to={"/myProfile"}><img src={user.avatar} style={{ width: "50%", maxWidth: "180px" }} alt="avatar" className="img-raised rounded-circle img-fluid" /></Link>
                </div>
            </div>
            {loading && <div className="d-flex justify-content-center align-items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..." /></div>}
            {posts.map((post, i) => (
                <div key={i} id={i} className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target={`#${i}`} data-slide-to="0" className="active"></li>
                        <li data-target={`#${i}`} data-slide-to="1"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img style={{ maxHeight: "23rem", width: "100%" }} src={post.image} alt={post.title} className="rounded mt-1" />
                            <div className="carousel-caption d-md-block">
                                <Link to={`/posts/${post.id}`}><p className="text-white font-weight-bold text-with-shadow" style={{ fontSize: "1.7vw", lineHeight: "2rem" }}>{post?.title}</p></Link>
                                <br className="text-white" />
                                <p className="text-with-shadow" style={{ fontSize: "1.1vw", lineHeight: "2rem" }}>{post?.description}</p>
                                <div>
                                    <p className="badge rounded-pill bg-info m-2 p-2" style={{ fontSize: "0.8vw" }}>Start: {moment(post.start).format('llll')}</p>
                                    <p className="badge rounded-pill bg-danger m-2 p-2" style={{ fontSize: "0.8vw" }}>End: {moment(post.end).format('llll')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img style={{ maxHeight: "23rem", width: "100%" }} src={post.image} alt={post.title} className="rounded mt-1" />
                            <div className="carousel-caption d-md-block">
                                {post?.petsitter &&
                                    <div className="row rounded" style={{ maxHeight: "20vw", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                                        <div className="col-lg-4 p-0 m-0">
                                            <h4>Pet-Sitter</h4>
                                            <Link to={`/profile/${post.petsitter.id}`}>
                                                <img src={post?.petsitter?.avatar} className="rounded" alt="petsitter" style={{ maxHeight: "6vw" }} />
                                            </Link>
                                            <h4 className="m-0">{post?.petsitter?.name}</h4>
                                        </div>
                                        {moment().isBefore(post?.end) &&
                                            <div className="col-lg-6 m-auto">
                                                <p className="badge rounded-pill bg-info m-2 p-2" style={{ fontSize: "0.8vw" }}>Start: {moment(post.start).format('llll')}</p>
                                                <p className="badge rounded-pill bg-danger m-2 p-2" style={{ fontSize: "0.8vw" }}>End: {moment(post.end).format('llll')}</p>
                                                <p>{post?.petsitter?.email}</p>
                                            </div>
                                        }
                                        <RatingModal isShowingModal={showRatingForm} toggleModal={toggleRatingForm} text={"Rate the Pet-Sitter!"} component={<RatingForm post={post} reference={"userId"} referenceValue={post.petsitter?.id} />} />
                                        {moment().isAfter(post.end) &&
                                            <Fragment>
                                            <div className="col-lg-6 m-auto">
                                                <h3 className="title text-white">Time to rate the Pet-Sitter!</h3>
                                            </div>
                                            <div className="col-lg-12">
                                                <button onClick={toggleRatingForm} className="btn btn-info w-25">Rate!
                                            </button>
                                            </div>
                                            </Fragment>
                                        }
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
