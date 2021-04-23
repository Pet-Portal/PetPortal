/* import RegisterForm from "../components/users/RegisterForm"

export const Register = () => {
    return (
        <div>
            <RegisterForm />
        </div>
    )
}

export default Register; */

import RegisterForm from "../components/users/RegisterForm"
export const Register = () => {
    return (
        <div className="page-header header-filter" data-parallax="true" style={{ backgroundImage: "url('/assets/img/pexels-ruel-madelo-928447.jpg')"}}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 ml-auto mr-auto">
            <div className="card card-login">
            <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
    );       
}
export default Register; 