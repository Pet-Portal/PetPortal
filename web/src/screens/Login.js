import LoginForm from '../components/users/LoginForm';
import { Link } from 'react-router-dom';

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

export default Login;