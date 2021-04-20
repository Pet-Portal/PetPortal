import { useState } from 'react';
import PostList from '../components/posts/PostsList';
import PostForm from '../components/posts/PostForm';
import Modal from '../components/modals/Modal';
import MainLayout from '../components/layouts/MainLayout';

const Posts = () => {
    const [state, setState] = useState({
        showPostForm: false,
        loading: false,
        update: false
    })

    const togglePostForm = () => {
        setState((state) => ({
            ...state,
            update: false,
            showPostForm: !state.showPostForm
        }))
    }

    const { showPostForm } = state;
    return (
        <MainLayout title="Posts super chulos!!" bgImage="/assets/img/profile_city.jpg">
            <button
                className="btn btn-primary mb-3 mt-3"
                onClick={togglePostForm}
            > Add Post +</button>

            <Modal isShowingModal={showPostForm} toggleModal={togglePostForm} component={<PostForm openForm={setState} />} />

            <h3 className="mb-3">Posts list</h3>
            <PostList update={state.update} />
        </MainLayout>
    )
};

export default Posts
