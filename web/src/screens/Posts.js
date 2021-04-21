import { useState } from 'react';
import PostList from '../components/posts/PostsList';
import PostForm from '../components/posts/PostForm';
import CreatePostModal from '../components/modals/CreatePostModal';
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
        <MainLayout title="The pets to take care!" bgImage="/assets/img/postPageImg-1.png">
            <button
                className="btn btn-primary mb-3 mt-3"
                onClick={togglePostForm}
            >   <div className="d-flex align-items-center">
                    <span className="mr-2">Add Post</span>
                    <i className="material-icons">post_add</i>
                </div>
            </button>
            <CreatePostModal isShowingModal={showPostForm} toggleModal={togglePostForm} component={<PostForm openForm={setState} />} />
            <PostList update={state.update} />
        </MainLayout>
    )
};

export default Posts
