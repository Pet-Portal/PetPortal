import { AuthContext } from '../../contexts/AuthStore';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useContext, Fragment } from 'react';
import { logout } from '../../services/users-service';


export const Navbar = () => {
  const { user, isAuthenticated, onUserChange } = useContext(AuthContext);
  const history = useHistory();
  async function handleLogout() {
    await logout();
    onUserChange(undefined);
    history.push("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><img style={{width: "5rem"}} src="https://res.cloudinary.com/djbn7xax3/image/upload/v1618339864/PetPortal/petportal_Alejandro_7163_epb0fg.png" alt="PetPortal"/></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/posts">Posts</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav d-flex">
            {!isAuthenticated() ? (
              <Fragment>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/login">Sign In</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/register">Sign Up</NavLink></li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="nav-item"><Link className="nav-link text-light" to="/create-event"><i className="fa fa-plus" /></Link></li>
                <li className="nav-item"><NavLink className="nav-link" activeClassName="active" to="/profile">{user.email}</NavLink></li>
                <li className="nav-item"><button type="submit" className="btn btn-link link-unstyled" onClick={handleLogout}><img src="/iconmonstr-log-out-14.svg" alt=""/></button></li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;