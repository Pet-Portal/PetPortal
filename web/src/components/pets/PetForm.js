import { useState } from "react";
import { useHistory } from "react-router";
import service from '../../services/pets-service';

const validations = {
  name: (value) => {
    let message;
    if (!value) {
      message = 'A pet name is required'
    }
  },
  image: (value) => {
    let message;
    if (!value) {
      message = 'A pet image is required'
    }
  },
  description: (value) => {
    let message;
    if (!value) {
      message = 'A pet description is required'
    }
  },
  species: (value) => {
    let message;
    if (!value) {
      message = 'A pet species is required'
    }
  },
  gender: (value) => {
    let message;
    if (!value) {
      message = 'A pet gender is required'
    }
  },
  age: (value) => {
    let message;
    if (!value) {
      message = 'A pet age is required'
    }
  }
}

const PetForm = () => {

  const history = useHistory();
  const [state, setState] = useState({
    pet: {
      name: '',
      image: '',
      description: '',
      species: '',
      gender: '',
      age: ''
    },
    errors: {
      name: validations.name(),
      image: validations.image(),
      description: validations.description(),
      species: validations.species(),
      gender: validations.gender(),
      age: validations.age()
    },
    touch: {}
  })

  const isValid = () => {
    const { errors } = state;
    return !Object.keys(errors).some(error => errors[error]);
  }

  const handleChange = (event) => {
    let { name, value } = event.target;

    if (event.target.files) {
      value = event.target.files[0]
    }

    setState(state => {
      return {
        ...state,
        pet: {
          ...state.event,
          [name]: value,
        },
        errors: {
          ...state.errors,
          [name]: validations[name] && validations[name](value)
        }
      }
    });
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setState(state => ({
      ...state,
      touch: {
        ...state.touch,
        [name]: true
      }
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isValid()) {
      try {
        const { pet } = state;
        await service.create(pet)
        history.push('/profile')
      }
      catch (error) {
        const { message, errors } = error && error.response ? error.response.data : error;
        console.error(message);
        setState(state => ({
          ...state,
          errors: errors
        }))
      }
    }
  }

  const { pet, errors, touch } = state;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-2">
          <span className="input-group-text"><i className="fa fa-tag fa-fw"></i></span>
          <input
            name="name"
            type="text"
            className={`form-control ${touch.name && errors.name ? 'is-invalid' : ''}`}
            onBlur={handleBlur}
            onChange={handleChange}
            value={pet.name}
            id="name"
            placeholder="Name"
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text"><i className="fa fa-picture-o fa-fw"></i></span>
          <input
            type="file"
            className={`form-control ${(touch.image && errors.image) ? 'is-invalid' : ''}`}
            id="image"
            placeholder="Examine file"
            name="image"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.image}</div>
        </div>

        <div className="input-group mb-2">
          <span className="input-group-text"><i className="fa fa-edit fa-fw"></i></span>
          <textarea
            name="description"
            type="text"
            className="form-control"
            id="text"
            rows="5"
            placeholder="Description"
          />
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text"><i className="fa fa-paw"></i></span>
          <select id="species" className="form-control" name="species">
            <option selected>Choose pet Species</option>
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
        <div className="input-group mb-2">
          <span className="input-group-text"><i className="fa fa-venus-mars"></i></span>
          <select id="gender" className="form-control" name="gender">
            <option selected>Choose pet gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="input-group mb-2">
        <span className="input-group-text"><i className="fa fa-birthday-cake"></i></span>
          <input
            name="age"
            type="number"
            className="form-control"
            id="age"
            placeholder="Age"
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PetForm;
