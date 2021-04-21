import { AuthContext } from '../../contexts/AuthStore';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useContext, Fragment } from 'react';
import service from '../../services/users-service';


export const Navbar = () => {
  const { user, isAuthenticated, onUserChange } = useContext(AuthContext);
  const history = useHistory();
  async function handleLogout() {
    await service.logout();
    onUserChange(undefined);
    history.push("/login");
  }


  return (
    <nav className="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg" color-on-scroll="100" id="sectionsNav">
      <div className="container">
        <div className="navbar-translate">
          <Link className="navbar-brand" to="/"><img style={{ width: '100%', maxWidth: '5rem' }} src="https://res.cloudinary.com/djbn7xax3/image/upload/v1618339864/PetPortal/petportal_Alejandro_7163_epb0fg.png" alt="PetPortal" /></Link>
          
          <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
            <span className="navbar-toggler-icon"></span>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse">

          <ul className="navbar-nav ml-auto">
            <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/posts">Posts</NavLink></li>

            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/login">Sign In</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/register">Sign Up</NavLink></li>
              </Fragment>
            )}

            {isAuthenticated() && (
              <Fragment>
                <li className="dropdown nav-item">
                  <a href="#dropdown" className="dropdown-toggle nav-link" data-toggle="dropdown">
                    <i className="material-icons">user</i> {user.email}
                  </a>
                  <div className="dropdown-menu dropdown-with-icons">
                    <Link className="dropdown-item" to="/myProfile">Profile</Link>
                    <Link className="dropdown-item" to="/myPosts">My Posts</Link>
                    <Link className="dropdown-item" to="/myOffers">My Offers</Link>
                  </div>
                </li>
                <li className="nav-item"><button type="submit" className="btn btn-info btn-sm link-unstyled" onClick={handleLogout}><img src="/iconmonstr-log-out-14.svg" alt="Logout" /></button></li>
              </Fragment>
            )}
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
