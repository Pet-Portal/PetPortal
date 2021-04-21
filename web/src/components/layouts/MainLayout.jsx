
import { Fragment } from 'react';

function MainLayout({ title, bgImage, children }) {
  return (
    <Fragment>
      <div className="profile-page">
        <div className="page-header header-filter justify-content-center" data-parallax="true" style={{ backgroundImage: `url('${bgImage}')` }}>
          {title && <h1 className="title text-info">{title}</h1>}
        </div>
        <div className="main main-raised">
          <div className="container">
            {children}
          </div>
        </div >
      </div>
      
    </Fragment>
  );
}

export default MainLayout;
