
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthStore';
import service from '../../services/posts-service';
import moment from 'moment';
import RatingModal from '../modals/RatingModal';
import RatingForm from '../ratings/RatingForm';



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
            {loading && <div className="d-flex justify-content-center align-items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..." /></div>}
            {posts.map((post, i) => (
                <div key={i} className="container pb-2 mt-2 ml-5 border rounded">
                    <div className="row shadow p-3 mb-5 bg-white">
                        <div className="col-lg-8">
                            <img style={{ maxHeight: "23rem", width: "100%" }} src={post.image} alt={post.title} className="rounded mt-1"/>
                            <h2>{post.title}</h2>
                            <p className="font-size-14px">{post.description}</p>
                            <p className="badge rounded-pill bg-info m-2 p-2" style={{ fontSize: "18px" }}>Start: {moment(post.start).format('llll')}</p>
                            <p className="badge rounded-pill bg-danger m-2 p-2" style={{ fontSize: "18px" }}>End: {moment(post.end).format('llll')}</p>
                        </div>
                        <div className="col-lg-4 ">
                            {post.petsitter &&
                                <div className="container pb-2 mt-8 ml-5">
                                    <Link className="text-decoration-none" style={{ fontSize: "18px" }} to={`/profile/${post.petsitter.id}`}>
                                        <div key={i} className="card shadow p-3  mb-2 bg-white" >
                                            <p className="badge badge-info "><b>Your Pet-Sitter!</b></p>
                                            <img src={post.petsitter?.avatar} className="card-img-top" alt="petsitter" style={{ maxHeight: "15rem" }} />
                                            <div className="card-body">
                                                <p className="card-text text-dark"><b>{post.petsitter?.name}</b></p>
                                            </div>
                                        </div>
                                    </Link>
                                    <RatingModal isShowingModal={showRatingForm} toggleModal={toggleRatingForm} component={<RatingForm post={post} reference={"userId"} referenceValue={post.petsitter?.id} />} />
                                    {moment().isAfter(post.end) && <button onClick={toggleRatingForm} className="btn btn-primary">Rate your Pet-Sitter!</button>}
                                    
                                </div>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default PostUserList
