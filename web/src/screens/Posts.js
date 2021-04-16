import PostList from '../components/posts/PostsList';
import PostForm from '../components/posts/PostForm';
import { useState } from 'react';

const Posts = () => {
    const [state, setState] = useState(({
        showPostForm: false,
        loading: false
    }))

    const togglePostForm = () => {
        setState((state) => ({
            showPostForm: !state.showPostForm
        }))
    }

    const { showPostForm } = state;
    return (
        <div className="container">
            <button
                className="btn btn-primary mb-3 mt-3"
                onClick={togglePostForm}
            >
                {showPostForm ? 'Close' : 'Add Post +'}
            </button>
            {showPostForm && <PostForm />}
            <h3 className="mb-3">Posts list</h3>
            <PostList />
        </div>
    )
};

export default Posts
