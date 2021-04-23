import { useState } from 'react';
import { useHistory } from 'react-router';
import service from '../../services/users-service';

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;

const validations = {
    name: (value) => {
        let message;
        if (!value) {
            message = 'An user name is required'
        }
        return message;
    },
    email: (value) => {
        let message;
        if (!value) {
            message = 'A valid email is required';
        } else if (!EMAIL_PATTERN.test(value)) {
            message = 'The email is invalid';
        }
        return message;
    },
    password: (value) => {
        let message;
        if (!value) {
            message = 'A valid password is required';
        } else if (!PASSWORD_PATTERN.test(value)) {
            message = 'You need at least 8 chars';
        }
        return message;
    },
    latitude: (value) => {
        let message;
        if (!value) {
            message = 'Latitude is required';
        } else if (Math.abs(Number(value)) > 90) {
            message = 'Latitude must be between -90 and 90';
        }
        return message;
    },
    longitude: (value) => {
        let message;
        if (!value) {
            message = 'Longitude is required';
        } else if (Math.abs(Number(value)) > 180) {
            message = 'Longitude must be between -180 and 180';
        }
        return message;
    },
}

const RegisterForm = () => {
    const history = useHistory();
    const [state, setState] = useState({
        user: {
            name: '',
            email: '',
            password: '',
            latitude: '',
            longitude: ''
        },
        errors: {
            name: validations.name(),
            email: validations.email(),
            password: validations.password(),
            latitude: validations.latitude(),
            longitude: validations.longitude()
        },
        touch: {}
    })

    const isValid = () => {
        const { errors } = state;
        return !Object.keys(errors).some(error => errors[error]);
    }

    const handleBlur = (event) => {
        const { name } = event.target;
        setState(state => ({
            ...state,
            touch: {
                ...state.touch,
                [name]: true
            }
        }));
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(state => ({
            ...state,
            user: {
                ...state.user,
                [name]: value
            },
            errors: {
                ...state.errors,
                [name]: validations[name] && validations[name](value)
            }
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isValid()) {
            try {
                const { user } = state;
                user.location = [Number(user.longitude), Number(user.latitude)];
                await service.register(user);
                history.push('/login', { email: user.email });
            } catch (error) {
                const { message, errors } = error && error.response ? error.response.data : error;
                console.error(message);
                setState(state => ({
                    ...state,
                    errors: errors || {}
                }));
            };
        };
    };

    const { user, errors, touch } = state;

    return (
        

    <form className="mt-3 mb-3 ml-3 mr-4" onSubmit={handleSubmit}>
        <div className="card-header  card-header-primary text-center">
          <h4 className="card-title">Sing Up</h4>
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
        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className="fa fa-user fa-fw"></i>
          </span>
          <input
            type="text"
            name="name"
            className={`form-control ${
              touch.name && errors.name ? "is-invalid" : ""
            }`}
            placeholder="Username"
            onBlur={handleBlur}
            onChange={handleChange}
            value={user.name}
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className="fa fa-envelope fa-fw"></i>
          </span>
          <input
            type="text"
            name="email"
            className={`form-control ${
              touch.email && errors.email ? "is-invalid" : ""
            }`}
            placeholder="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={user.email}
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className="fa fa-globe fa-fw"></i>
          </span>
          <span className="input-group-text">Latitude</span>
          <input
            name="latitude"
            type="number"
            className={`form-control ${
              touch.latitude && errors.latitude ? "is-invalid" : ""
            }`}
            value={user.latitude}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <span className="input-group-text">Longitude</span>
          <input
            name="longitude"
            type="number"
            className={`form-control ${
              touch.longitude && errors.longitude ? "is-invalid" : ""
            }`}
            value={user.longitude}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touch.latitude && errors.latitude && (
            <div className="invalid-feedback">{errors.latitude}</div>
          )}
          {touch.longitude && errors.longitude && (
            <div className="invalid-feedback">{errors.longitude}</div>
          )}
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className="fa fa-lock fa-fw"></i>
          </span>
          <input
            type="password"
            name="password"
            className={`form-control ${
              touch.password && errors.password ? "is-invalid" : ""
            }`}
            placeholder="Password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={user.password}
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>
        <button className="btn btn-primary" type="submit" disabled={!isValid()}>
          Register
        </button>
      </form>
    )
};

export default RegisterForm;