import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthStore";
import service from "../../services/posts-service";

const validations = {
    image: (value) => {
        let message;
        if (!value) {
            message = "Image is required";
        }
        return message
    },
    pets: (value) => {
        let message;
        if (!value) {
            message = "One pet at least is required"
        }
        return message
    },
    title: (value) => {
        let message;
        if (!value) {
            message = "Title is required";
        } else if (value.length < 5) {
            message = "Title needs at least 5 chars"
        }
        return message
    },
    description: (value) => {
        let message;
        if (!value) {
            message = "Description is required";
        } else if (value.length < 10) {
            message = "Description needs at least 10 chars";
        }
        return message
    },
    start: (value) => {
        let message;
        if (!value) {
            message = 'Start date is required';
        }
        return message;
    },
    end: (value) => {
        let message;
        if (!value) {
            message = 'End date is required';
        }
        return message;
    },
};

const PostForm = ({ openForm, post: postToEdit = {} }) => {


    const [state, setState] = useState({
        post: {
            image: "",
            pets: "",
            title: "",
            description: "",
            start: "",
            end: "",
            ...postToEdit
        },
        errors: {
            image: validations.image(postToEdit.image),
            title: validations.title(postToEdit.title),
            description: validations.description(postToEdit.description),
            start: validations.start(postToEdit.start),
            end: validations.end(postToEdit.end),
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
                post: {
                    ...state.post,
                    [name]: value,
                },
                errors: {
                    ...state.errors,
                    [name]: validations[name] && validations[name](value),
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
        try {
            
            const postData = { ...state.post };
            const post = postData.id ? await service.update(postData) : await service.create(postData);
            setState(state => ({
                ...state,
                post: {
                    ...state.post,
                    post: post
                }
            }))

            openForm({
                showPostForm: false,
                loading: false,
                update: true
            })
        } catch (error) {
            const { message, errors } =
                error && error.response ? error.response.data : error;
            console.error(message);
            setState((state) => ({
                ...state,
                errors: {
                    ...errors,
                    title: errors && message
                },
            }));
        }
    };

    const toggleBoxes = (event, pet) => {

        if (event.target.checked) {
            setState(state => ({
                ...state,
                post: {
                    ...state.post,
                    pets: [...state.post.pets, pet.id]
                }
            }))
        } else {
            const newPets = state.post.pets.filter(newPet => newPet !== pet.id)
            setState(state => ({
                ...state,
                post: {
                    ...state.post,
                    pets: newPets
                }
            }))
        }
    }

    const { user } = useContext(AuthContext);
    const { post, errors, touch } = state;

    return (
        <div className="w-100">
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <span className="input-group-text">
                        <i className="fa fa-picture-o fa-fw"></i>
                    </span>
                    <input
                        type="file"
                        className={`form-control ${touch.image && errors.image ? "is-invalid" : ""
                            }`}
                        id="image"
                        name="image"
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.image}</div>
                </div>
                <div className="input-group mb-3">
                    <fieldset className="row">
                            <legend><h3 className="title">Click your Pets!</h3></legend>
                            {user?.pets?.map((pet, i) => (
                                <div key={i} className="card col-lg-3 m-3">
                                    <img className="card-img-top" style={{ width: "100%", maxWidth: "55rem" }} src={pet.image} alt={pet.name} />
                                    <div className="card-body">
                                        <span className="card-title"><b>{pet.name}</b> <input onChange={event => toggleBoxes(event, pet)} type="checkbox" name="pets" /></span>
                                    </div>
                                </div>
                            ))}
                    </fieldset>
                    <div className="invalid-feedback">{errors.image}</div>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">
                        <i className="fa fa-tag fa-fw"></i>
                    </span>
                    <input
                        name="title"
                        type="text"
                        className={`form-control ${touch.title && errors.title ? "is-invalid" : ""
                            }`}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={post.title}
                        id="title"
                        placeholder="Post Title"
                    />
                    <div className="invalid-feedback">{errors.title}</div>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">
                        <i className="fa fa-edit fa-fw"></i>
                    </span>
                    <textarea
                        name="description"
                        type="text"
                        className={`form-control ${touch.description && errors.description ? "is-invalid" : ""
                            }`}
                        id="Description"
                        rows="3"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={post.description}
                        placeholder="Description"
                    />
                    <div className="invalid-feedback">{errors.description}</div>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">
                        <i className="me-1 fa fa-calendar-plus-o"></i>Start Date
                    </span>
                    <input
                        type="datetime-local"
                        id="start"
                        className={`form-control ${touch.start && errors.start ? "is-invalid" : ""
                            }`}
                        name="start"
                        placeholder="Start of cares"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={post.start}
                    >
                    </input>
                    <div className="invalid-feedback">{errors.start}</div>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">
                        <i className="me-1 fa fa-calendar-times-o"></i>End Date
                    </span>
                    <input
                        type="datetime-local"
                        id="end"
                        className={`form-control ${touch.end && errors.end ? "is-invalid" : ""
                            }`}
                        name="end"
                        placeholder="End of cares"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={post.end}
                    >
                    </input>
                    <div className="invalid-feedback">{errors.end}</div>
                </div>

                <button className="btn btn-primary mb-3" type="submit" disabled={!isValid()}>
                    {post.id && <span>Update Event</span>}
                    {!post.id && <span>Create Event</span>}
                </button>
            </form>
        </div>
    );
};

export default PostForm;