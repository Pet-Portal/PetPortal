import { useState, useCallback } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthStore';
import PostItemDetails from '../components/posts/PostItemDetails';
import OfferList from '../components/offers/OfferList';
import OfferForm from '../components/offers/OfferForm';
import PetSitter from '../components/users/PetSitter';
import MainLayout from '../components/layouts/MainLayout';

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

        <MainLayout title="Post Details" bgImage="/assets/img/profileBackground.png">
            <PostItemDetails triggerPost={triggerPost} />
            {user.id === post.owner?.id && post.state === "pending" && <OfferList post={post} />}
            {user.id !== post.owner?.id && post.state === "pending" && <div><h3 className="title">Send an Offer</h3><OfferForm /></div>}

            {post.state === "confirmed" && post.petsitter.id === user.id &&
                <div>
                    <h3 className="title">You are the new Pet-Sitter!</h3>
                    <PetSitter post={post} />
                </div>
            }

        </MainLayout>



    )

}

export default PostDetails;