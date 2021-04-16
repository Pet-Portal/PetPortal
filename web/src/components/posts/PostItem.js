import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';
import { Link } from 'react-router-dom';
import moment from 'moment';

function PostItem({
  post: {
    id,
    title,
    description,
    image,
    state,
    start,
    end,
    owner,
    pets,
    petsitter,
  },
}) {

  const { user } = useContext(AuthContext);

  return (

    <div className={`postList card shadow p-3 mb-5 bg-white ${user?.id === owner?.id ? 'border-3 border-success' : 'rounded-0 border-0'}`} style={{ width: "18rem" }}>
      <Link to={`/posts/${id}`}><img style={{maxHeight: "15rem"}} src={image} className="card-img-top" alt={title} /></Link>
      <div className="card-body">
        <p className="card-text"><b>{title}</b></p>
        <p className="card-text badge rounded-pill bg-primary me-2 p-2">{moment(start).format('llll')}</p>
        <p className="card-text badge rounded-pill bg-danger me-2 p-2">{moment(end).format('llll')}</p>
      </div>
    </div>

  );
}

export default PostItem;
