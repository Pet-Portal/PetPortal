
import { Fragment } from "react";
import PetsList from '../components/pets/PetsList';

function Pets() {
  return (
    <Fragment>
      <h3 className="mb-3">Pet List</h3>
      <PetsList />
    </Fragment>
  );
}

export default Pets;