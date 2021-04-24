import { Link } from 'react-router-dom';
import moment from 'moment';
import RatingStars from '../ratings/RatingStars';


function PostItem({
  post: {
    id,
    title,
    image,
    state,
    start,
    end,
    owner,
    pets
  },
}) {

  const maxCharsTitle = (str, n) => {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <div className="card card-nav-tabs post-card mt-0">
      <div className="tab-content">
        <div className="tab-pane active" id={`1${id}`}>
          <div className="card-img-top">
            <Link to={`/posts/${id}`}><img style={{ maxHeight: "170px", width: "100%", height: "320px"}} src={image} alt="postImg" /></Link>
            <h3 className="post-pet">{pets[0].name}</h3>
          </div>
          <div className="card-body">
            <h5 className="text-center font-weight-bold">{maxCharsTitle(title, 25)}</h5>
            <div className="text-center">
              <p className="card-text badge rounded-pill bg-warning mr-2 p-2" style={{ fontSize: "0.7rem" }}>{moment(start).format('MMMM Do')}</p>
              <i className="fa fa-arrow-right"></i>
              <p className="card-text badge rounded-pill bg-success ml-2 p-2" style={{ fontSize: "0.7rem" }}>{moment(end).format('MMMM Do')}</p>
              <p>{maxCharsTitle(owner.place, 30)}</p>
            </div>
          </div>
        </div>
        <div className="tab-pane" id={`2${id}`}>
          <div className="card-img-top">
            <Link to={`/profile/${owner.id}`}><img src={owner.avatar} style={{ maxHeight: "325px", width: "100%", height: "322px" }} alt="owner" /></Link>
            <h3 className="post-owner">{owner.name}</h3>
            <div className="post-rating">
              <RatingStars user={owner} isSimplified={true} />
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer card-header-info">
        <div className="nav-tabs-navigation">
          <div className="nav-tabs-wrapper">
            <ul className="nav nav-tabs" data-tabs="tabs">
              <li className="nav-item">
                <a className="nav-link active d-flex align-items-center" href={`#1${id}`} data-toggle="tab">
                  <i className="material-icons">import_contacts</i>
                  <span>Post</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link d-flex align-items-center" href={`#2${id}`} data-toggle="tab">
                  <i className="material-icons">face</i>
                  <span>Owner</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem;
