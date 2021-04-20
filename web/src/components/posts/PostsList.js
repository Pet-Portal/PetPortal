import { useState, useEffect, Fragment } from 'react';
import PostItem from './PostItem';
import postsService from '../../services/posts-service';
import PostFilter from './PostFilter';



function PostsList({ update, minSearchChars }) {

  const [state, setState] = useState({
    posts: [],
    loading: false
  });

  const [postSearch, setPostSearch] = useState('');
  const [speciesSearch, setSpeciesSearch] = useState('');

  useEffect(() => {

    async function fetchPosts() {
      console.log('Fetching posts...');
      setState(state => ({
        ...state,
        loading: true
      }))
      const posts = await postsService.list(postSearch, speciesSearch);
      if (!isUnmounted) {
        setState({
          posts: posts,
          loading: false
        })
      }
    }
    let isUnmounted = false;

    if (postSearch.length >= minSearchChars || postSearch.length === 0) {
      fetchPosts();
    }

    return () => {
      isUnmounted = true;
    }

  }, [update, postSearch, minSearchChars, speciesSearch]);

  const handlePostSearch = postSearch => setPostSearch(postSearch);
  const handleSpeciesSearch = speciesSearch => setSpeciesSearch(speciesSearch);

  const { posts, loading } = state;
  return (
    <Fragment>
      <PostFilter className="mb-3" onPostSearch={handlePostSearch} onSpeciesSearch={handleSpeciesSearch} loading={loading} />
      {loading &&
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..." />
        </div>
      }
      <div className="row">
        {posts.map(post => (
          <div key={post.id} className="col-lg-4 mb-4">
            <PostItem post={post} />
          </div>
        ))}
      </div>
    </Fragment>
  )
}


PostsList.defaultProps = {
  minSearchChars: 4
}

export default PostsList;