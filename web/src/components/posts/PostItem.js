function PostItem({
  post: {
    title,
    description,
    image,
    state,
    start,
    end,
    owner,
    pets,
    petsitter,
  },
}) {
  return (
    <div className="card" style={{width: "18rem"}}>
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <p className="card-text">{description}</p>
        <p className="card-text">{start}</p>
        <p className="card-text">{end}</p>
      </div>
    </div>

  );
}

export default PostItem;
