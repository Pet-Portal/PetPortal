import { useState, useCallback } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthStore';
import PostItemDetails from '../components/posts/PostItemDetails';
import OfferList from '../components/offers/OfferList';
import OfferForm from '../components/offers/OfferForm';
import PetSitter from '../components/users/PetSitter';

const PostDetails = () => {

    const [state, setState] = useState({
        post: ""
    })

    const triggerPost = useCallback((post) => {
        setState({
            post: post
        })
    }, [])
    const { user } = useContext(AuthContext);
    const { post } = state;
    return (

        <div className="container">
            <PostItemDetails triggerPost={triggerPost} />
            {user.id === post.owner?.id && <OfferList post={post} />}
            {user.id !== post.owner?.id && post.state === "pending" && <OfferForm />}

            {post.state === "confirmed" && post.owner.id === user.id && <div><h1>Your new Pet-Sitter!</h1></div>}

            {post.state === "confirmed" && post.owner.id === user.id && <PetSitter post={post} />}

            {post.state === "confirmed" && post.petsitter.id === user.id && <div><h1>You are the new Pet-Sitter!</h1></div>}

            {post.state === "confirmed" && post.petsitter.id === user.id && <PetSitter post={post} />}
        </div>


    )

}

export default PostDetails;