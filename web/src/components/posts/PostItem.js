import { Link } from 'react-router-dom';
import moment from 'moment';

function PostItem({
  post: {
    id,
    title,
    image,
    state,
    start,
    end,
    owner
  },
}) {


  return (
    <div className="card card-nav-tabs">
      <div className="card-header card-header-info">
        {/*  <!-- colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" --> */}
        <div className="nav-tabs-navigation">
          <div className="nav-tabs-wrapper">
            <ul className="nav nav-tabs" data-tabs="tabs">
              <li className="nav-item">
                <a className="nav-link active d-flex align-items-center" href={`#${id}`} data-toggle="tab">
                  <i className="material-icons">import_contacts</i>
                  <span>Post</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link d-flex align-items-center" href={`#${id}`} data-toggle="tab">
                  <i className="material-icons">face</i>
                  <span>Owner</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="tab-content text-center">
          <div className="tab-pane active" id={`#${id}`}>
            <div className="card-img-top">
              <Link to={`/posts/${id}`}><img className="rounded" style={{ maxHeight: "15rem", width: "100%" }} src={image} alt="postImg" /></Link>
            </div>
            <h5>{title}</h5>
            <p className="card-text badge rounded-pill bg-primary mr-2 p-2">{moment(start).format('llll')}</p>
            <p className="card-text badge rounded-pill bg-success mr-2 p-2">{moment(end).format('llll')}</p>
          </div>
          <div className="tab-pane" id={`${id}`}>
            <Link to={`/profile/${owner.id}`}><img src={owner.avatar} style={{ maxHeight: "15rem", width: "100%" }} alt="owner"/></Link>
            <p>{owner.name}</p>
            <p>{owner.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem;
