import { useState } from "react";


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

    const [state, setState] = useState ({
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
        }
    })

    const isValid = () => {
        const { errors } = state;
        return !Object.keys(errors).some(error => errors[error]);
    }


    return (
    <div>
      <form>
        <div className="form-group">
          <label for="formGroupExampleInput">Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput2">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            placeholder="Examine file"
          />
        </div>

        <div className="form-group">
          <label for="formGroupExampleInput2">Description</label>
          <textarea
            name="description"
            type="text"
            className="form-control"
            id="text"
            rows="5"
            placeholder="Description"
          />
        </div>
        <div class="form-group">
          <label for="disabledSelect">Species</label>
          <select id="species" class="form-control" name="species">
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
        <div class="form-group">
          <label for="disabledSelect">Gender</label>
          <select id="gender" class="form-control" name="gender">
            <option selected>Choose pet gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label for="formGroupExampleInput2">Age</label>
          <input
            name="age"
            type="number"
            className="form-control"
            id="age"
            placeholder="Age"
          />
        </div>

        <button class="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PetForm;
