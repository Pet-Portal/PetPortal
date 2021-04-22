import { useState, useEffect, Fragment, useCallback } from 'react';
import PostItem from './PostItem';
import postsService from '../../services/posts-service';
import PostFilter from './PostFilter';



function PostsList({ update, minSearchChars, openForm }) {

  const [state, setState] = useState({
    posts: [],
    loading: false
  });

  const [postFilter, setPostFilter] = useState({
    title: '',
    species: ''
  });

  useEffect(() => {

    async function fetchPosts() {
      console.log('Fetching posts...');
      setState(state => ({
        ...state,
        loading: true
      }))
      const posts = await postsService.list(postFilter);
      if (!isUnmounted) {
        setState({
          posts: posts,
          loading: false
        })
      }
    }
    let isUnmounted = false;

    if (postFilter.title.length >= minSearchChars || postFilter.title.length === 0) {
      fetchPosts();
    }

    return () => {
      isUnmounted = true;
    }

  }, [update, postFilter, minSearchChars]);

  const handlePostFilter = useCallback(postFilter => setPostFilter(postFilter), []);

  const { posts, loading } = state;
  return (
    <Fragment>
      {loading &&
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..." />
        </div>
      }
      <div className="row">
        <div className="col-lg-2">
          <PostFilter className="mb-3" onFilterChange={handlePostFilter} loading={loading} />
        </div>
        <div className="col-lg-10">
          <div className="row">
            {posts.map(post => (
              <div key={post.id} className="col-lg-4 mb-4">
                <PostItem post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}


PostsList.defaultProps = {
  minSearchChars: 4
}

export default PostsList;
