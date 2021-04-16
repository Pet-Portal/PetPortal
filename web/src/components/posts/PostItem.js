import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthStore';

function PostItem({
  post: {
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

    <div className={`card shadow-sm ${user?.id === owner?.id ? 'border border-primary' : 'rounded-0 border-0'}`} style={{ width: "18rem" }}>
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <p className="card-text"><b>{title}</b></p>
        <p className="card-text">{start}</p>
        <p className="card-text">{end}</p>
      </div>
    </div>

  );
}

export default PostItem;
