import { useState } from "react";
import { FaStar } from 'react-icons/fa'
import service from "../../services/posts-service";
import { useHistory } from 'react-router';

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

const RatingForm = ({ post, reference, referenceValue }) => {

    const history = useHistory();

    const [state, setState] = useState({
        rating: {
            title: "",
            rate: 0,
            text: "",
            [reference]: referenceValue
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

    const handleRatingChange = (rate) => {
        setState((state) => ({
            ...state,
            rating: {
                ...state.rating,
                rate: rate
            }
        }))
    }

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
            await service.createRating(post.id, ratingData)
            history.push(`/profile/${referenceValue}`)
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
                                <input type="radio" name="rate" value={ratingValue} onClick={() => handleRatingChange(ratingValue)}/>
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
                    <textarea
                        name="text"
                        type="text"
                        className={`form-control ${touch.text && errors.text ? "is-invalid" : ""
                            }`}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={rating.text}
                        id="text"
                        placeholder="Rating Text"
                        rows="4"
                    ></textarea>
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