
function PostItem({ post: {  title, description, image, state, start, end, owner, pets, petsitter } }) {
    return (
        <div>
            <div className="card-body">
                <h1>Title: {title}</h1>
                <img src={image} className="card-img-top" alt={title} />
                <p>Descripción: {description}</p>
                <p>State: {state}</p>
                <p>Start: {start}</p>
                <p>End: {end}</p>
                <p>Owner: {owner.name}</p>
                {pets.map(pet => (
                    <div key={pet.id}>
                        <p>Pet name: {pet.name}</p>
                    </div>
                ))}      
            </div>
        </div>
    )
}

export default PostItem;