import { Fragment } from 'react';
import PostList from '../components/posts/PostsList';

const Posts = () => {
    return (
        <Fragment>
            <h3 className="mb-3">Posts list</h3>
            <PostList />
        </Fragment>
    )
}

export default Posts
