import { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router";
import service from "../../services/users-service";
import { AuthContext } from "../../contexts/AuthStore";

const LoginForm = () => {
    const location = useLocation();
    const history = useHistory();
    const { onUserChange } = useContext(AuthContext)
    const [state, setState] = useState({
        user: {
            email: location.state?.email || '',
            password: ''
        },
        errors: {}
    })


    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(state => ({
            ...state,
            user: {
                ...state.user,
                [name]: value
            },
            errors: {}
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const user = await service.login(state.user.email, state.user.password);
            onUserChange(user)
            history.push('/posts')
        } catch (error) {
            const { message, errors } = error.response ? error.response.data : error;
            console.error(message);
            setState(state => ({
                ...state,
                errors: errors
            }));
        };
    };


    const { user, errors } = state;


    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="card-header card-header-primary text-center">
                <h4 className="card-title">Login</h4>
                <div className="social-line">
                    <a href="#pablo" className="btn btn-just-icon btn-link">
                        <i className="fa fa-facebook-square"></i>
                    </a>
                    <a href="#pablo" className="btn btn-just-icon btn-link">
                        <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#pablo" className="btn btn-just-icon btn-link">
                        <i className="fa fa-google-plus"></i>
                    </a>
                </div>
            </div>
            <p className="description text-center">Or Be Classical</p>
            <div className="card-body">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="material-icons">mail</i>
                        </span>
                    </div>
                    <input type="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        required placeholder="user@example.org" onChange={handleChange} value={user.email} />
                    <div className="invalid-feedback">{errors.email}</div>
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="material-icons">lock_outline</i>
                        </span>
                    </div>
                    <input type="password" name="password" className="form-control"
                        required placeholder="Password" onChange={handleChange} value={user.password} />
                </div>
            </div>
            <div className="footer text-center">
                <button type="submit" className="btn btn-primary btn-link btn-wd btn-lg">Login</button>
            </div>
        </form>
    )
};

export default LoginForm;
