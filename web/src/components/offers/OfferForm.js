import { useState } from 'react';
import { useParams } from 'react-router';
import service from '../../services/posts-service';
import { useHistory } from 'react-router';
const validations = {
    title: (value) => {
        let message;
        if (!value) {
            message = "Title is required";
        } else if (value.length < 5) {
            message = "Title needs at least 5 chars"
        }
        return message;
    },
    text: (value) => {
        let message;
        if (!value) {
            message = "Text is required";
        } else if (value.length < 20) {
            message = "Text needs at least 20 chars"
        }
        return message;
    },
    price: (value) => {
        let message;
        if (!value) {
            message = "Price is required"
        }
        return message;
    }
}

const OfferForm = () => {
    const params = useParams()
    const history = useHistory();

    const [state, setState] = useState({
        offer: {
            title: "",
            text: "",
            price: ""
        },
        errors: {
            title: validations.title(),
            text: validations.text(),
            price: validations.price()
        },
        touch: {}
    })

    const isValid = () => {
        const { errors } = state;
        return !Object.keys(errors).some(error => errors[error]);
    };
    
    const handleChange = (event) => {
        let { name, value } = event.target;

        setState(state => {
            return {
                ...state,
                offer: {
                    ...state.offer,
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
            const { offer } = state;
            await service.offer(params.id, offer);
            history.push("/posts")
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

    const { offer, errors, touch } = state;

    return(
        <div className="w-75">
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
                        value={offer?.title}
                        id="title"
                        placeholder="Offer Title"
                    />
                    <div className="invalid-feedback">{errors.title}</div>
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
                        id="text"
                        rows="3"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={offer?.text}
                        placeholder="Text"
                    />
                    <div className="invalid-feedback">{errors.text}</div>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">
                        <i className="me-1 fa fa-eur"></i>
                    </span>
                    <input
                        type="number"
                        min="0"
                        id="price"
                        className={`form-control ${touch.price && errors.price ? "is-invalid" : ""
                    }`}
                        name="price"
                        placeholder="Price per day"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={offer?.price}
                    >
                    </input>
                    <div className="invalid-feedback">{errors.price}</div>
                </div>

                <button className="btn btn-primary mb-3 ml-3" type="submit" disabled={!isValid()}>
                    Send Offer!
        </button>
            </form>
        </div>
    )
}

export default OfferForm