import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const HeroSliderTwentySixSingle = ({data}) => {
  return (
    <div
      className="single-slider-2 slider-height-1 slider-height-res15 d-flex align-items-center slider-height-res bg-img"
      style={{backgroundImage: `url(${process.env.PUBLIC_URL + data.image})`}}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-7 ms-auto">
            <div className="slider-content-2 slider-content-flower slider-animated-1">
              <h3 className="animated">{data.title}</h3>
              <h1
                className="animated"
                dangerouslySetInnerHTML={{__html: data.subtitle}}
              />
              <div className="slider-btn btn-hover">
                <Link
                  className="animated"
                  to={process.env.PUBLIC_URL + data.url}
                >
                  SHOP NOW SixSingle.js
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderTwentySixSingle.propTypes = {
  data: PropTypes.shape({}),
};

export default HeroSliderTwentySixSingle;
