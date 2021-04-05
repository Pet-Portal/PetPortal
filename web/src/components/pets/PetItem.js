
function PetItem({ pet: { id, name, image, gender, owner, description, age, species } }) {
    return (
        <div>
            <div className="card-body">
                <h1>Nombre: {name}</h1>
                <img src={image} className="card-img-top" alt={name} />
                <p>Descripción: {description}</p>
                <p>Género: {gender}</p>
                <p>Edad: {age}</p>
                <p>Species: {species}</p>
                <p>Owner: {owner.name}</p>
            </div>
        </div>
    )
}

export default PetItem;