import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Settings } from "../../../api";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import WarningCondition from "../../UI/WarningCondition/WarningCondition";
import { scrollToLeft, scrollToRight } from "../../../utils/scroll";

const PopularCasinoGames = ({ popularGames }) => {
  const ref = useRef();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [gameInfo, setGameInfo] = useState({ gameName: "", gameId: "" });
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleNavigate = (game) => {
    if (token) {
      if (Settings.casinoCurrency !== "AED") {
        navigate(
          `/casino/${game?.game_name.replace(/ /g, "")}/${game?.game_id}`
        );
      } else {
        setGameInfo({ gameName: "", gameId: "" });
        setGameInfo({ gameName: game?.game_name, gameId: game?.game_id });
        setShowWarning(true);
      }
    } else {
      dispatch(setShowLoginModal(true));
    }
  };

  return (
    <Fragment>
      {showWarning && (
        <WarningCondition gameInfo={gameInfo} setShowWarning={setShowWarning} />
      )}
      <div className="bt_common_align" id="popular_casino_games_slider_box">
        <div className="container-fluid">
          <div className="section_header_div">
            <div className="title">Popular Casino Games</div>
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
              {popularGames?.map((game, idx) => {
                return (
                  <div
                    onClick={() => handleNavigate(game)}
                    key={idx}
                    className="swiper-slide swiper-slide-active"
                    role="group"
                    aria-label="1 / 15"
                    style={{ width: "186.875px", marginRight: "10px" }}
                  >
                    <div className="game_overlay_main" data-game-id="aviator">
                      <img
                        src={game?.url_thumb}
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
                        <div className="game-name">{game?.game_name}</div>
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

export default PopularCasinoGames;
