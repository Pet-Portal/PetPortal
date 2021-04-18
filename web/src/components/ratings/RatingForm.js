import { useState } from "react";
import { FaStar } from 'react-icons/fa'
import service from "../../services/posts-service";

const validations = {
    title: (value) => {
        let message;
        if (!value) {
            message = "Title is required";
        } else if (value.length < 5) {
            message = "Title needs at least 5 chars"
        }
        return message
    },
    rate: (value) => {
        let message;
        if (!value) {
            message = "Rate is required"
        }
        return message
    },
    text: (value) => {
        let message;
        if (!value) {
            message = "Text is required";
        }
        return message
    },
};

const RatingForm = ({ post }) => {

    const [state, setState] = useState({
        rating: {
            title: "",
            rate: "",
            text: ""
        },
        errors: {
            title: validations.title(),
            text: validations.text()
        },
        touch: {},
    });

    const [hover, setHover] = useState(null)

    const isValid = () => {
        const { errors } = state;
        return !Object.keys(errors).some(error => errors[error]);
    };

    const handleChange = (event) => {
        let { name, value } = event.target;

        setState(state => {
            return {
                ...state,
                rating: {
                    ...state.rating,
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
            const ratingData = { ...state.rating}
            console.log(ratingData)
            await service.createRating(post.id, ratingData)
        } catch (error) {
            const { message, errors } =
                error && error.response ? error.response.data : error;
            console.error(message);
            setState((state) => ({
                ...state,
                errors: errors,
            }));
        }
    };


    const { rating, errors, touch } = state;

    return (
        <div className="w-100">
            <form onSubmit={handleSubmit}>

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
                        value={rating.title}
                        id="title"
                        placeholder="Rating Title"
                    />
                    <div className="invalid-feedback">{errors.title}</div>
                </div>
                <div className="input-group mb-3">
                    {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                            <label key={i} className="star">
                                <input type="radio" name="rate" value={ratingValue} onClick={() => setState((state) => ({
                                    ...state, ...ratingValue
                                }))}/>
                                <FaStar size={50} color={ratingValue <= (hover || state.rating.rate) ? "#ffc107" : "#e4e5e9"}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                                />
                            </label>
                        )
                    })}
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">
                        <i className="fa fa-edit fa-fw"></i>
                    </span>
                    <input
                        name="text"
                        type="text"
                        className={`form-control ${touch.text && errors.text ? "is-invalid" : ""
                            }`}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={rating.text}
                        id="text"
                        placeholder="Rating Text"
                    />
                    <div className="invalid-feedback">{errors.text}</div>
                </div>

                <button className="btn btn-primary mb-3" type="submit" disabled={!isValid()}>
                    Rate!
                </button>
            </form>
        </div>
    );
};

export default RatingForm;