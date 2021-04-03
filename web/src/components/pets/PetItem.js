
function PetItem({ pet: { id, name, image, gender, owner, description, age, species, children} }) {
    return (
        <div>
            <div className="card-body">
                <h1 className="fw-bold">Nombre: {name}</h1>
                <img src={image} className="card-img-top" alt={name} />
                <p>Descripción: {description}</p>
                <p>Género: {gender}</p>
                <p>Edad: {age}</p>
                <p>Species: {species}</p>
                <p>{owner.name}</p>
            </div>
        </div>
    )
}

export default PetItem;