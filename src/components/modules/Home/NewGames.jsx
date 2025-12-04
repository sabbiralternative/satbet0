import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../../api";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import { scrollToLeft, scrollToRight } from "../../../utils/scroll";
import { AxiosSecure } from "../../../lib/AxiosSecure";

const NewGames = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getGames = async () => {
      const res = await AxiosSecure.post(API.mac88, {
        gameList: "ALL",
        product: "ALL",
        isHome: false,
      });

      if (res?.status === 200) {
        const result = res?.data;
        setData(result);
      }
    };
    getGames();
  }, []);

  const handleAuraCasino = (code, name) => {
    if (token) {
      navigate(`/casino/${name.replace(/ /g, "")}/${code}`);
    } else {
      dispatch(setShowLoginModal(true));
    }
  };

  return (
    <Fragment>
      <div className="bt_common_align" id="popular_casino_games_slider_box">
        <div className="container-fluid">
          <div className="section_header_div">
            <div className="title">Indian Card Games</div>
            <div className="swiper_btn_sec position-relative d-flex align-items-center ">
              <div className="swiper-pagination-section">
                <div
                  onClick={() => scrollToLeft(ref)}
                  className="swiper-button-prev"
                  tabIndex={-1}
                  role="button"
                  aria-label="Previous slide"
                  aria-disabled="true"
                  aria-controls="popular_casino_games_slider"
                >
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhAQMAAABtKlAsAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAAxJREFUeNpjYBgOAAAAxgAB/v0USgAAAABJRU5ErkJggg=="
                    alt="slide-arrow"
                    className="swiper-left-arrow "
                    width={33}
                    height={33}
                  />
                </div>
                <div
                  onClick={() => scrollToRight(ref)}
                  className="swiper-button-next"
                  tabIndex={0}
                  role="button"
                  aria-label="Next slide"
                  aria-disabled="false"
                  aria-controls="popular_casino_games_slider"
                >
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhAQMAAABtKlAsAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAAxJREFUeNpjYBgOAAAAxgAB/v0USgAAAABJRU5ErkJggg=="
                    alt="slide-arrow"
                    className="swiper-right-arrow"
                    width={33}
                    height={33}
                  />
                </div>
              </div>
              <Link to="/casino-games" className="see_more_btn">
                See All
              </Link>
            </div>
          </div>
          <div
            ref={ref}
            className="swiper-container double_layer swiper-initialized swiper-horizontal"
          >
            <div
              className="swiper-wrapper"
              id="popular_casino_games_slider"
              aria-live="polite"
            >
              {data?.data?.map((item, idx) => {
                return (
                  <div
                    onClick={() =>
                      handleAuraCasino(item?.game_id, item?.game_name)
                    }
                    key={idx}
                    className="swiper-slide swiper-slide-active"
                    role="group"
                    aria-label="1 / 15"
                    style={{ width: "186.875px", marginRight: "10px" }}
                  >
                    <div className="game_overlay_main" data-game-id="aviator">
                      <img
                        src={item?.img}
                        className="spb-aviator newgame-img img-fluid"
                        loading="lazy"
                        alt="Aviator"
                        width={300}
                        height={225}
                      />
                      <div className="overlay1">
                        <div className="text play_btn" id="Login_play">
                          <img
                            className="play_icon"
                            src="https://asset.satbet.com/images/login_icon.svg"
                            border={0}
                            alt="play-icon"
                          />
                        </div>
                        <div className="game-name">{item?.game_name}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <span
              className="swiper-notification"
              aria-live="assertive"
              aria-atomic="true"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewGames;
