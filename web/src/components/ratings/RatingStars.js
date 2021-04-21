

const RatingStars = ({ user }) => {

    const rateAverage = () => {
        let userRating = user?.ratings?.map(rating => rating.rate)
        let sumRates = userRating?.reduce((acc, el) => acc + el, 0)
        let total = Math.round(sumRates / userRating.length);
        if (total === 5) {
            return <div className="icon icon-warning">
                <span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star</span>
            </div>
        } else if (total === 4) {
            return <div className="icon icon-warning">
            <span className="material-icons icon-warning">star</span><span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star_border</span>
        </div>
        } else if (total === 3) {
            return <div className="icon icon-warning">
            <span className="material-icons icon-warning">star</span><span className="material-icons">star</span><span className="material-icons">star</span><span className="material-icons">star_border</span><span className="material-icons">star_border</span>
        </div>
        } else if (total === 2) {
            return <div className="icon icon-warning">
            <span className="material-icons icon-warning">star</span><span className="material-icons">star</span><span className="material-icons">star_border</span><span className="material-icons">star_border</span><span className="material-icons">star_border</span>
        </div>
        } else if (total === 1) {
            return <div className="icon icon-warning">
            <span className="material-icons icon-warning">star</span><span className="material-icons">star_border</span><span className="material-icons">star_border</span><span className="material-icons">star_border</span><span className="material-icons">star_border</span>
        </div>
        }
    }

    return (
        <div>
            {rateAverage()}
        </div>
    )
}

export default RatingStars
