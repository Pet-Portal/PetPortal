import { useState, useEffect } from 'react';
import PostItem from './PostItem';


import postsService from '../../services/posts-service';


function PostsList() {

  const [state, setState] = useState({
    posts: [],
    loading: false
  });

  useEffect(() => {
    // componentDidMount

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
    
  },[]);

  const { posts } = state;
  return (
      <div className="row row-cols-4">
        {posts.map(post => (
          <div key={post.id} className="col mb-4"><PostItem post={post} /></div>
        ))}
      </div>
  )
}

export default PostsList;