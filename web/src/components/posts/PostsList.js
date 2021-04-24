import { useState, useEffect, Fragment, useCallback } from 'react';
import PostItem from './PostItem';
import postsService from '../../services/posts-service';
import PostFilter from './PostFilter';
import PostMap from '../maps/Map';
import { Marker } from '@react-google-maps/api';
import { useHistory } from 'react-router';
function PostsList({ update, minSearchChars }) {

  const [state, setState] = useState({
    posts: [],
    loading: false,
    showMap: false
  });

  const [postFilter, setPostFilter] = useState({
    title: '',
    species: ''
  });

  const history = useHistory();

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

  const handleMap = () => {
    setState((state) => ({
      ...state,
      showMap: !state.showMap
    }))
  }
  const handlePostFilter = useCallback(postFilter => setPostFilter(postFilter), []);

  const { posts, loading, showMap } = state;
  const postMarkers = posts.map((post, i) => <Marker key={i} onClick={() => history.push(`/posts/${post.id}`)} position={{ lng: post?.owner?.location[0], lat: post?.owner?.location[1] }} />)


  return (
    <Fragment>
      {loading &&
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" alt="Loading..." />
        </div>
      }
      <button className="btn btn-info ml-3" onClick={() => handleMap()}>
        <i className="fa fa-globe fa-fw"></i>Pet Map!
        </button>
      {showMap &&
        <div className="mb-3">
          <PostMap posts={postMarkers} />
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
