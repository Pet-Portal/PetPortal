
import { Fragment } from 'react';

const RatingStars = ({ user, isSimplified }) => {

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

    const rateAverageSimplified = () => {
        let userRating = user?.ratings?.map(rating => rating.rate)
        let sumRates = userRating?.reduce((acc, el) => acc + el, 0)
        let total = Math.round(sumRates / userRating.length);
        if (total === 5) {
            return <div className="row">
            <span className="material-icons icon icon-warning" style={{fontSize: "25px"}}>star</span>
            <p style={{fontSize: "25px"}}>5</p>
        </div>
        } else if (total === 4) {
            return <div className="row">
                <span className="material-icons icon icon-warning" style={{fontSize: "25px"}}>star</span>
                <p style={{fontSize: "25px"}}>4</p>
            </div>

        } else if (total === 3) {
            return <div className="row">
            <span className="material-icons icon icon-warning" style={{fontSize: "25px"}}>star</span>
            <p style={{fontSize: "25px"}}>3</p>
        </div>
        } else if (total === 2) {
            return <div className="row">
            <span className="material-icons icon icon-warning" style={{fontSize: "25px"}}>star</span>
            <p style={{fontSize: "25px"}}>2</p>
        </div>
        } else if (total === 1) {
            return <div className="row">
            <span className="material-icons icon icon-warning" style={{fontSize: "25px"}}>star</span>
            <p style={{fontSize: "25px"}}>1</p>
        </div>
        }
    }

    return (
        <Fragment>
            {isSimplified ?
                <div>
                    {rateAverageSimplified()}
                </div>
                :
                <div>
                    {rateAverage()}
                </div>
            }

        </Fragment>
    )
}

export default RatingStars
