import React from 'react';

function Footer(props) {

    return (
        <div>
        {/* Footer Start */}
        <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
          <div className="container py-5">
            <div className="pb-4 mb-4" style={{borderBottom: '1px solid rgba(226, 175, 24, 0.5)'}}>
              <div className="row g-4">
                <div className="col-lg-3">
                  <a href="#">
                    <h1 className="text-primary mb-0">Products</h1>
                    <p className="text-secondary mb-0">Fresh products</p>
                  </a>
                </div>
                <div className="col-lg-6">
                  <div className="position-relative mx-auto">
                    <input className="form-control border-0 w-100 py-3 px-4 rounded-pill" type="number" placeholder="Your Email" />
                    <button type="submit" className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white" style={{top: 0, right: 0}}>Subscribe Now</button>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="d-flex justify-content-end pt-3">
                    <a className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-twitter" /></a>
                    <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-youtube" /></a>
                    <a className="btn btn-outline-secondary btn-md-square rounded-circle" href><i className="fab fa-linkedin-in" /></a>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
        </div>
        {/* Footer End */}
      </div>

    );

}

export default Footer;