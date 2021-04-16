import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthStore";

import service from "../../services/pets-service";

const validations = {
  name: (value) => {
    let message;
    if (!value) {
      message = "A pet name is required";
    }
    return message
  },
  image: (value) => {
    let message;
    if (!value) {
      message = "A pet image is required";
    }
    return message
  },
  description: (value) => {
    let message;
    if (!value) {
      message = "A pet description is required";
    } else if (value.length < 10) {
      message = "A description needs at least 10 chars";
    }
    return message
  },
  age: (value) => {
    let message;
    if (!value) {
      message = "A pet age is required";
    } else if (Number(value) < 0) {
      message = "A pet age must be greater than 0";
    }
    return message
  },
  species: (value) => {
    let message;
    if (!value) {
      message = "A pet species is required";
    }
    return message
  },
  gender: (value) => {
    let message;
    if (!value) {
      message = "A pet gender is required";
    }
    return message
  },
};

const PetForm = ({ togglePetForm, toggleLoading }) => {

  const { user, onUserChange } = useContext(AuthContext);

  const [state, setState] = useState({
    pet: {
      name: "",
      image: "",
      description: "",
      age: "",
      species: "",
      gender: "",
    },
    errors: {
      name: validations.name(),
      image: validations.image(),
      description: validations.description(),
      age: validations.age(),
      species: validations.species(),
      gender: validations.gender(),
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
        pet: {
          ...state.pet,
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
      toggleLoading()
      const { pet } = state;
      const newPet = await service.create(pet);
      user.pets.push(newPet)
      onUserChange({ ...user })
      togglePetForm()
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
  };

  const { pet, errors, touch } = state;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className="fa fa-tag fa-fw"></i>
          </span>
          <input
            name="name"
            type="text"
            className={`form-control ${touch.name && errors.name ? "is-invalid" : ""
              }`}
            onBlur={handleBlur}
            onChange={handleChange}
            value={pet.name}
            id="name"
            placeholder="Pet Name"
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>
        <br />

        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className="fa fa-picture-o fa-fw"></i>
          </span>
          <input
            type="file"
            className={`form-control ${touch.image && errors.image ? "is-invalid" : ""
              }`}
            id="image"
            placeholder="Examine file"
            name="image"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.image}</div>
        </div>
        <br />
        <div className="input-group mb-2">
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
            value={pet.description}
            placeholder="Description"
          />
          <div className="invalid-feedback">{errors.description}</div>
        </div>
        <br />

        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className="fa fa-paw"></i>
          </span>
          <select
            id="species"
            className="form-control"
            name="species"
            onChange={handleChange}
            onBlur={handleBlur}
            value={pet.species}
          >
            <option defaultValue>Choose pet Species</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Fish">Fish</option>
            <option value="Turtle">Turtle</option>
            <option value="Hamster">Hamster</option>
            <option value="Horse">Horse</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <br />
        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className="fa fa-venus-mars"></i>
          </span>
          <select
            name="gender"
            type="text"
            className={`form-control ${touch.gender && errors.gender ? "is-invalid" : ""
              }`}
            onBlur={handleBlur}
            onChange={handleChange}
            value={pet.gender}
            id="gender"
            placeholder="Gender"
          >
            <option defaultValue>Choose pet gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <div className="invalid-feedback">{errors.gender}</div>
        </div>
        <br />

        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className="fa fa-birthday-cake"></i>
          </span>
          <input
            name="age"
            type="number"
            min="0"
            className={`form-control ${touch.age && errors.age ? "is-invalid" : ""
              }`}
            onBlur={handleBlur}
            onChange={handleChange}
            value={pet.age}
            id="age"
            placeholder="age"
          />
          <div className="invalid-feedback">{errors.age}</div>
        </div>
        <br />
        <button className="btn btn-primary mb-3" type="submit" disabled={!isValid()}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PetForm;

