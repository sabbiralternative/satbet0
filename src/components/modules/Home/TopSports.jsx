import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGroup } from "../../../redux/features/global/globalSlice";

const TopSports = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (g) => {
    dispatch(setGroup(g));
    navigate("/exchange");
  };
  return (
    <div className="bt_common_align" id="top_sports_slider_box">
      <div className="container-fluid">
        <div className="section_header_div">
          <div className="title">Top Sports</div>
        </div>
        <div className="swiper-container single_layer swiper-initialized swiper-horizontal swiper-backface-hidden">
          <div
            className="swiper-wrapper top_sports_wrapper"
            id="top_sports_slider"
            aria-live="polite"
            style={{
              transitionDuration: "0ms",
              transform: "translate3d(-40.3846px, 0px, 0px)",
              transitionDelay: "0ms",
            }}
          >
            <div
              className="swiper-slide swiper-slide-active"
              role="group"
              aria-label="1 / 8"
              style={{ width: "191.923px", marginRight: "10px" }}
            >
              <a onClick={() => handleNavigate(4)} className="sport_category">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAEXAQMAAADMQKkgAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB5JREFUeNrtwYEAAAAAw6D5U9/gBFUBAAAAAAAAPAMcVgAB6AAwugAAAABJRU5ErkJggg=="
                  className="group-480987684 img-fluid"
                  loading="lazy"
                  alt="Cricket"
                  width={198}
                  height={279}
                />
                <div className="sport_name">Cricket</div>
              </a>
            </div>
            <div
              className="swiper-slide swiper-slide-next"
              role="group"
              aria-label="2 / 8"
              style={{ width: "191.923px", marginRight: "10px" }}
            >
              <a onClick={() => handleNavigate(1)} className="sport_category">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAEXAQMAAADMQKkgAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB5JREFUeNrtwYEAAAAAw6D5U9/gBFUBAAAAAAAAPAMcVgAB6AAwugAAAABJRU5ErkJggg=="
                  className="group-48099031 img-fluid"
                  loading="lazy"
                  alt="Football"
                  width={198}
                  height={279}
                />
                <div className="sport_name">Football</div>
              </a>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="3 / 8"
              style={{ width: "191.923px", marginRight: "10px" }}
            >
              <a onClick={() => handleNavigate(2)} className="sport_category">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAEXAQMAAADMQKkgAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB5JREFUeNrtwYEAAAAAw6D5U9/gBFUBAAAAAAAAPAMcVgAB6AAwugAAAABJRU5ErkJggg=="
                  className="group-48099032 img-fluid"
                  loading="lazy"
                  alt="Tennis"
                  width={198}
                  height={279}
                />
                <div className="sport_name">Tennis</div>
              </a>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="4 / 8"
              style={{ width: "191.923px", marginRight: "10px" }}
            >
              <a
                href="https://www.satbet0.in/sportsbook"
                className="sport_category"
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAEXAQMAAADMQKkgAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB5JREFUeNrtwYEAAAAAw6D5U9/gBFUBAAAAAAAAPAMcVgAB6AAwugAAAABJRU5ErkJggg=="
                  className="group-48099036 img-fluid"
                  loading="lazy"
                  alt="Basket ball"
                  width={198}
                  height={279}
                />
                <div className="sport_name">Basket ball</div>
              </a>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="5 / 8"
              style={{ width: "191.923px", marginRight: "10px" }}
            >
              <a
                href="https://www.satbet0.in/sportsbook"
                className="sport_category"
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAEXAQMAAADMQKkgAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB5JREFUeNrtwYEAAAAAw6D5U9/gBFUBAAAAAAAAPAMcVgAB6AAwugAAAABJRU5ErkJggg=="
                  className="group-48099034 img-fluid"
                  loading="lazy"
                  alt="Rugby"
                  width={198}
                  height={279}
                />
                <div className="sport_name">Rugby</div>
              </a>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="6 / 8"
              style={{ width: "191.923px", marginRight: "10px" }}
            >
              <a
                href="https://www.satbet0.in/sportsbook"
                className="sport_category"
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAEXAQMAAADMQKkgAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB5JREFUeNrtwYEAAAAAw6D5U9/gBFUBAAAAAAAAPAMcVgAB6AAwugAAAABJRU5ErkJggg=="
                  className="group-48099035 img-fluid"
                  loading="lazy"
                  alt="Baseball"
                  width={198}
                  height={279}
                />
                <div className="sport_name">Baseball</div>
              </a>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="7 / 8"
              style={{ width: "191.923px", marginRight: "10px" }}
            >
              <a
                href="https://www.satbet0.in/sportsbook"
                className="sport_category"
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAEXAQMAAADMQKkgAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB5JREFUeNrtwYEAAAAAw6D5U9/gBFUBAAAAAAAAPAMcVgAB6AAwugAAAABJRU5ErkJggg=="
                  className="group-48099022 img-fluid"
                  loading="lazy"
                  alt="Hockey"
                  width={198}
                  height={279}
                />
                <div className="sport_name">Hockey</div>
              </a>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="8 / 8"
              style={{ width: "191.923px", marginRight: "10px" }}
            >
              <a
                href="https://www.satbet0.in/sportsbook"
                className="sport_category"
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAEXAQMAAADMQKkgAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB5JREFUeNrtwYEAAAAAw6D5U9/gBFUBAAAAAAAAPAMcVgAB6AAwugAAAABJRU5ErkJggg=="
                  className="group-48098768 img-fluid"
                  loading="lazy"
                  alt="Table Tennis"
                  width={198}
                  height={279}
                />
                <div className="sport_name">Table Tennis</div>
              </a>
            </div>
          </div>
          <span
            className="swiper-notification"
            aria-live="assertive"
            aria-atomic="true"
          />
        </div>
      </div>
    </div>
  );
};

export default TopSports;
