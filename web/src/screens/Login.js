import LoginForm from '../components/users/LoginForm';



export const Login = () => {
  return (
    <div className="page-header header-filter" data-parallax="true" style={{ backgroundImage: "url('/assets/img/photo-1566806986629-33d23de90fce.jpg')"}}>
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
