
import { Fragment } from 'react';
import img404 from '../images/404.png';

function Errors({ code }) {
    console.log(code)
    return (
        <Fragment>
            {code === 404 && <div className="container">
                <img src={img404} alt="" />
            </div>}
            {code === 403 && <div className="container">
                <img src="/404.png" alt="" />
            </div>}
        </Fragment>
    )
}
export default Errors;