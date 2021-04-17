import { useState, useEffect, Fragment } from 'react';
import PostItem from './PostItem';
import postsService from '../../services/posts-service';
import PostFilter from './PostFilter';



function PostsList({ update, minSearchChars }) {

  const [state, setState] = useState({
    posts: [],
    loading: false
  });

  const [search, setSearch] = useState('');

  useEffect(() => {

    async function fetchPosts() {
      console.log('Fetching posts...');
      setState(state => ({
        ...state,
        loading: true
      }))
      const posts = await postsService.list(search);
      if (!isUnmounted) {
        setState({
          posts: posts,
          loading: false
        })
      }
    }
    let isUnmounted = false;
    
    if (search.length >= minSearchChars || search.length === 0) {
      fetchPosts();
    }

    return () => {
      isUnmounted = true;
    }

  }, [update, search, minSearchChars]);

  const handleSearch = search => setSearch(search);

  const { posts, loading } = state;
  return (
    <Fragment>
      <PostFilter className="mb-3" onSearch={handleSearch} loading={loading} />
      {loading && <div className="container d-flex justify-content-center align-items-center vh-100"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..." /></div>}
      <div className="row row-cols-4 ">
        {posts.map(post => (
          <div key={post.id} className="col mb-4"><PostItem post={post} /></div>
        ))}
      </div>
    </Fragment>
  )
}


PostsList.defaultProps = {
  minSearchChars: 4
}

export default PostsList;