import { useState, useEffect, Fragment } from 'react';
import PostItem from './PostItem';


import postsService from '../../services/posts-service';


function PostsList() {

  const [state, setState] = useState({
    posts: [],
    loading: false
  });

  useEffect(() => {

    async function fetchPosts() {
      console.log('Fetching posts...');
      setState(state => ({
        ...state,
        loading: true
      }))
      const posts = await postsService.list();

      setState({
        posts: posts,
        loading: false
      })
    }

    fetchPosts();

  }, []);

  const { posts, loading } = state;
  return (
    <Fragment>
      {loading && <div className="container d-flex justify-content-center align-items-center vh-100"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..."/></div>}
      <div className="row row-cols-4 ">
        {posts.map(post => (
          <div key={post.id} className="col mb-4"><PostItem post={post} /></div>
        ))}
      </div>
    </Fragment>
  )
}

export default PostsList;