import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthStore";
import service from "../../services/users-service";

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const validations = {
    email: (value) => {
        let message;
        if (!EMAIL_PATTERN.test(value)) {
            message = 'The email is invalid';
        }
        return message;
    },
    latitude: (value) => {
        let message;
        if (Math.abs(Number(value)) > 90) {
            message = 'Latitude must be between -90 and 90';
        }
        return message;
    },
    longitude: (value) => {
        let message;
        if (Math.abs(Number(value)) > 180) {
            message = 'Longitude must be between -180 and 180';
        }
        return message;
    },
}

const UserForm = ({ toggleUserForm, toggleLoading }) => {
    const { user, onUserChange } = useContext(AuthContext)
    const [state, setState] = useState({
        userProfile: {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            longitude: user.location[0],
            latitude: user.location[1],
        },
        errors: {
            email: validations.email(user.email),
            longitude: validations.longitude(user.location[0]),
            latitude: validations.latitude(user.location[1])
        },
        touch: {},
    });

    const isValid = () => {
        const { errors } = state;
        return !Object.keys(errors).some(error => errors[error]);
    };

    const handleChange = (event) => {
        let { name, value } = event.target;
        if (event.target.files) {
            value = event.target.files[0];
        }

        setState(state => {
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    [name]: value,
                },
                errors: {
                    ...state.errors,
                    [name]: validations[name] && validations[name](value)
                },
            };
        });
    };

    const handleBlur = (event) => {
        const { name } = event.target;
        setState((state) => ({
            ...state,
            touch: {
                ...state.touch,
                [name]: true,
            },
        }));
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        toggleLoading()
        if (isValid()) {
            try {
                const userData = { ...state.userProfile };
                userData.location = [Number(userData.longitude), Number(userData.latitude)];
                const updatedUser = await service.update(user.id, userData);
                onUserChange({ ...user, ...updatedUser })
                toggleUserForm()
                toggleLoading()
            } catch (error) {
                const { message, errors } =
                    error && error.response ? error.response.data : error;
                console.error(message);
                setState((state) => ({
                    ...state,
                    errors: errors,
                }));
            }
        }
    };

    const { userProfile, errors, touch } = state;

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-4">
                    <span className="input-group-text">
                        <i className="fa fa-user fa-fw"></i>
                    </span>
                    <input
                        name="name"
                        type="text"
                        className={`form-control ${touch.name && errors.name ? "is-invalid" : ""
                            }`}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={userProfile.name}
                        id="name"
                        placeholder="Name"
                    />
                </div>



                <div className="input-group mb-4">
                    <span className="input-group-text">
                        <i className="fa fa-envelope fa-fw"></i>
                    </span>
                    <input
                        name="email"
                        type="text"
                        className={`form-control ${touch.email && errors.email ? "is-invalid" : ""
                            }`}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={userProfile.email}
                        id="email"
                        placeholder="Email"
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                </div>


                <div className="input-group mb-4">
                    <span className="input-group-text">
                        <i className="fa fa-picture-o fa-fw"></i>
                    </span>
                    <input
                        type="file"
                        className={`form-control ${touch.avatar && errors.avatar ? "is-invalid" : ""
                            }`}
                        id="avatar"
                        placeholder="Examine file"
                        name="avatar"
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group mb-4">
                    <span className="input-group-text"><i className="fa fa-globe fa-fw"></i></span>

                    <span className="input-group-text">Latitude</span>
                    <input name="latitude" type="number" className={`form-control ${(touch.latitude && errors.latitude) ? 'is-invalid' : ''}`}
                        value={userProfile.latitude} onBlur={handleBlur} onChange={handleChange} />

                    <span className="input-group-text">Longitude</span>
                    <input name="longitude" type="number" className={`form-control ${(touch.longitude && errors.longitude) ? 'is-invalid' : ''}`}
                        value={userProfile.longitude} onBlur={handleBlur} onChange={handleChange} />

                    {touch.latitude && errors.latitude && <div className="invalid-feedback">{errors.latitude}</div>}
                    {touch.longitude && errors.longitude && <div className="invalid-feedback">{errors.longitude}</div>}
                </div>

                <button className="btn btn-primary mb-3" type="submit">
                    Update
                </button>
            </form>
        </div>
    );
};

export default UserForm;