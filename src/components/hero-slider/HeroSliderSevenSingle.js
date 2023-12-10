import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const HeroSliderSevenSingle = ({data}) => {
  return (
    <div
      className="single-slider-2 slider-height-18 d-flex align-items-center slider-overly-res bg-cover"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + data.image})`,
      }}
    >
      <div className="slider-content-7 slider-animated-1 ml-70">
        <h3 className="animated">{data.title}</h3>
        <h1
          className="animated"
          dangerouslySetInnerHTML={{__html: data.subtitle}}
        />
        <div className="slider-btn-9 btn-hover">
          <Link className="animated" to={data.url}>
            SHOP NOW HeroSliderSevenSingle
          </Link>
        </div>
      </div>
    </div>
  );
};

HeroSliderSevenSingle.propTypes = {
  data: PropTypes.shape({}),
};

export default HeroSliderSevenSingle;
