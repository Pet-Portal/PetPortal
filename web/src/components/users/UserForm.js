import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthStore";
import service from "../../services/users-service";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const validations = {
    name: (value) => {
        let message;
        if (!value) {
            message = "Name is required";
        }
        return message;
    },
    email: (value) => {
        let message;
        if (!EMAIL_PATTERN.test(value)) {
            message = 'The email is invalid';
        }
        return message;
    },
    latitude: (value) => {
        let message;
        if (!value) {
            message = 'Your location is required';
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
            place: user.place
        },
        errors: {
            name: validations.name(user.name),
            email: validations.email(user.email),
            latitude: validations.latitude(user.location[1])
        },
        touch: {},
    });
    const [address, setAddress] = useState("");

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0])
        setAddress(value)
        setState(state => ({
            ...state,
            userProfile: {
                ...userProfile,
                longitude: latLng.lng,
                latitude: latLng.lat,
                place: value
            },
            errors: {
                ...state.errors,
                latitude: validations.latitude && validations.latitude(value)
            }
        }))
    }

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
                    <div className="invalid-feedback">{errors.name}</div>
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

                <PlacesAutocomplete onChange={setAddress} onSelect={handleSelect} value={address}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="input-group mb-2">
                        <span className="input-group-text">
                            <i className="fa fa-globe fa-fw"></i>
                        </span>
                        <input {...getInputProps({ placeholder: "Enter a place" })} name="latitude" onBlur={handleBlur} className={`form-control ${touch.latitude && errors.latitude ? "is-invalid" : ""
                        }`}/>
                            <div className="invalid-feedback">{errors.latitude}</div>
                        <div>
                            {loading && <div>...loading</div>}
                            {suggestions.map((suggestion, i) => {
                                const style = { backgroundColor: suggestion.active ? "rgba(152, 71, 179, 0.4)" : "#fff" }
                                return <div key={i} {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>

                <button className="btn btn-primary mb-3" type="submit" disabled={!isValid()}>
                    Update
                </button>
            </form>
        </div>
    );
};

export default UserForm;