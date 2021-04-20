import LoginForm from '../components/users/LoginForm';
import { Link } from 'react-router-dom';

/*
export const Login = () => {
  return (
    <div className="row">
      <div className="col-12 col-sm-4 mx-auto">
        <LoginForm />
        <hr/>
        <div className="d-grid gap-2">
          <Link className="btn btn-secondary" type="button" to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};
*/

export const Login = () => {
  return (
    <div className="page-header header-filter">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 ml-auto mr-auto">
            <div className="card card-login">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
