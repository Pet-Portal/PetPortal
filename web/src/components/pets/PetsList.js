import { useState, useEffect } from 'react';
import PetItem from './PetItem';

import petsService from '../../services/pets-service';
import { Fragment } from 'react';


function PetsList() {

  const [state, setState] = useState({
    pets: [],
    loading: false
  });

  useEffect(() => {
    // componentDidMount

    async function fetchPets() {
      console.log('Fetching pets...');
      setState(state => ({
        ...state,
        loading: true
      }))
      const pets = await petsService.list();

        setState({
          pets: pets,
          loading: false
        })
    }

      fetchPets();
    
  },[]);

  const { pets } = state;
  return (
    <Fragment>
      <div className="row row-cols-4">
        {pets.map(pet => (
          <div key={pet.id} className="col mb-4"><PetItem pet={pet} /></div>
        ))}
      </div>
    </Fragment>
    
  )
}

export default PetsList;