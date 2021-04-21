
import { Link } from 'react-router-dom';
import moment from 'moment';

const PetSitter = ({ post }) => {

    const { petsitter } = post;
    return (
        <div className="shadow p-3 mb-5 bg-white w-75 row" style={{ width: "18rem" }}>
        <Link to={`/profile/${petsitter.id}`} className="col-lg-4"><img src={petsitter?.avatar} className="rounded-circle" alt="petsitter" style={{ maxHeight: "18rem", maxWidth: "15rem" }} /></Link>
        <div className="col-lg-8">
            <p><i>{petsitter?.name}</i></p>
            <p>{petsitter.email}</p>
            <p>Account created: {moment(petsitter.createdAt).format("ll")}</p>
        </div>
    </div>
    )
}

export default PetSitter;