import { useState, useEffect } from "react";


function PostFilter({ className, onFilterChange, loading }) {


    const [filter, setFilter] = useState({
        title: '',
        specie: ''
    });

    const handleTitleChange = (event) => {
        const { value } = event.target;
        setFilter((filter) => {
            const newState = {
                ...filter,
                title: value
            }
            return newState;
        });
    };

    const handleSpeciesChange = (specie) => {
        setFilter((filter) => ({
            ...filter,
            specie
        }));
    };

    useEffect(() => {
        onFilterChange(filter);
    }, [filter]);

    const { title } = filter;

    return (
        <div className={`row ${className}`}>
            <div className="col-lg-3">
                <div className="input-group mb-2">
                    <span className="input-group-text">
                        <i
                            className={`fa fa-${loading ? "refresh fa-spin" : "search"}`}
                        ></i>
                    </span>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Search by title..."
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
            </div>
            <div className="col-lg-9">
                <button onClick={() => handleSpeciesChange("Dog")} className="btn btn-info me-1">Dogs</button>
                <button onClick={() => handleSpeciesChange("Cat")} className="btn btn-info me-1">Cats</button>
                <button onClick={() => handleSpeciesChange("Bird")} className="btn btn-info me-1">Birds</button>
                <button onClick={() => handleSpeciesChange("Fish")} className="btn btn-info me-1">Fishes</button>
                <button onClick={() => handleSpeciesChange("Turtle")} className="btn btn-info me-1">Turtles</button>
                <button onClick={() => handleSpeciesChange("Hamster")} className="btn btn-info me-1">Hamsters</button>
                <button onClick={() => handleSpeciesChange("Horse")} className="btn btn-info me-1">Horses</button>
                <button onClick={() => handleSpeciesChange("Other")} className="btn btn-info me-1">Other</button>
            </div>
        </div>
    );
}
PostFilter.defaultProps = {
    loading: false,
    className: "",
    onSearch: () => { },
};
export default PostFilter;
