import { Fragment } from 'react';


export const Home = () => {
    /* return (
        <div className="homeBg" style={{backgroundImage: `url(${homeImage})`}}>
            <div className="container">
                <div className="w-50">
                    <h1>Find someone to look after your Pets or become a Pet Sitter!</h1>
                    <p>We have over 1000+ requests Posts everyday!</p>
                    <p>Sign Up and be part of this animal lover community!</p>
                </div>

                <div></div>
            </div>
        </div>

    ) */

    return (
        <Fragment>
            <div className="page-header header-filter" data-parallax="true" style={{ backgroundImage: "url('/assets/img/homePage.png')" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="title">The new House for your Pets!</h1>
                            <h4>Find with us someone to take care of your Pets! Or maybe become a Pet-Sitter and show your inner love fo them!.</h4>
                            <br />
                            <a href="/login" className="btn btn-info btn-raised btn-lg">
                                <i className="fa fa-sign-in mr-3"></i>Get Started!
          </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main main-raised">
                <div className="container">
                    <div className="section text-center">
                        <div className="row">
                            <div className="col-md-8 ml-auto mr-auto">
                                <h2 className="title">Our vision of Pet cares!</h2>
                                <h5 className="description">You will find a big community and a lot of cares offers inside our portal.</h5>
                            </div>
                        </div>
                        <div className="features">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="info">
                                        <div className="icon icon-info">
                                            <i className="material-icons">import_contacts</i>
                                        </div>
                                        <div className="card card-nav-tabs">
                                            <div className="card-header card-header-info">
                                                <ul className="nav nav-tabs d-flex justify-content-center">
                                                    <li className="nav-item">
                                                        <h6>Posts</h6>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="card-body">
                                                <div className="tab-content text-center">
                                                    <div className="tab-pane active" id="#post">
                                                        <div className="card-img-top">
                                                            <img className="rounded" style={{ maxHeight: "15rem", width: "100%" }} src="/assets/img/examplePostImg.jpg" alt="postImg" />
                                                        </div>
                                                        <h5>Two days off for Mini</h5>
                                                        <p className="card-text badge rounded-pill bg-primary mr-2 p-2 text-white">SUN, JUL 4, 2021 5:34 PM</p>
                                                        <p className="card-text badge rounded-pill bg-success mr-2 p-2 text-white">FRI, JUL 9, 2021 5:34 PM</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p>Look for the Pet care request that best suits for you!</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="info">
                                        <div className="icon icon-success">
                                            <i className="material-icons">face</i>
                                        </div>
                                        <div className="card card-nav-tabs">
                                            <div className="card-header card-header-success">
                                                <ul className="nav nav-tabs d-flex justify-content-center">
                                                    <li className="nav-item">
                                                        <h6>Owners</h6>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="card-body">
                                                <div className="tab-content text-center">
                                                    <div className="tab-pane active">
                                                        <div className="card-img-top">
                                                            <img className="rounded" style={{ maxHeight: "15rem", width: "100%" }} src="/assets/img/exampleAvatar.jpg" alt="avatarImg" />
                                                        </div>
                                                        <h4>Rachel</h4>
                                                        <p>⭐⭐⭐⭐</p>
                                                        <p>rachel@example.org</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p>Check the owners ratings and contact them</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="info">
                                        <div className="icon icon-danger">
                                            <i className="material-icons">local_offer</i>
                                        </div>
                                        <div className="card card-nav-tabs">
                                            <div className="card-header card-header-danger">
                                                <ul className="nav nav-tabs d-flex justify-content-center">
                                                    <li className="nav-item">
                                                        <h6>Offers</h6>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="card-body">
                                                <div className="tab-content text-center">
                                                    <div className="tab-pane active">
                                                        <div className="row">
                                                            <div className="card-img-top col-md-6">
                                                                <img className="rounded" style={{ maxHeight: "15rem", width: "100%" }} src="/assets/img/exampleAvatar2.jpg" alt="avatarImg" />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <h5>Interested!</h5>
                                                                <p>I am looking for a pet-sitter job these days! I would include the food</p>
                                                                <p>Price: 10€ / d</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p>If you get an offer for your post, check the Pet-sitter and if you are agree with the conditions accept it!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="section section-contacts">
                        <div className="row">
                            <div className="col-md-8 ml-auto mr-auto">
                                <h2 className="text-center title">Work with us</h2>
                                <h4 className="text-center description">Divide details about your product or agency work into parts. Write a few lines about each one and contact us about any further collaboration. We will responde get back to you in a couple of hours.</h4>
                                <form className="contact-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">Your Name</label>
                                                <input type="email" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">Your Email</label>
                                                <input type="email" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleMessage" className="bmd-label-floating">Your Message</label>
                                        <textarea type="email" className="form-control" rows="4" id="exampleMessage"></textarea>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4 ml-auto mr-auto text-center">
                                            <button className="btn btn-primary btn-raised">
                                                Send Message
                  </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home;
