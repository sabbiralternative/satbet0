import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { scrollToLeft, scrollToRight } from "../../../utils/scroll";

const GameProvider = ({ casinoProviders }) => {
  const ref = useRef();
  const navigate = useNavigate();
  const sortedData =
    casinoProviders &&
    casinoProviders?.length > 0 &&
    casinoProviders?.sort((a, b) => a.sort - b.sort);

  const handleNavigate = (game) => {
    navigate(`/game-provider/${game?.game_name}/${game?.game_id}`);
  };

  return (
    <div className="bt_common_align  game_prvider_align">
      <div className="container-fluid">
        <div className="section_header_div">
          <div className="title">Game Providers</div>
          <div className="swiper_btn_sec position-relative d-flex align-items-center">
            <div className="swiper-pagination-section">
              <div
                onClick={() => scrollToLeft(ref)}
                className="swiper-button-prev swiper-button-prev4 "
                tabIndex={-1}
                role="button"
                aria-label="Previous slide"
                aria-disabled="true"
                style={{ display: "none" }}
                aria-controls="game_provider_slider"
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhAQMAAABtKlAsAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAAxJREFUeNpjYBgOAAAAxgAB/v0USgAAAABJRU5ErkJggg=="
                  alt="slide-arrow"
                  className="swiper-left-arrow slide_arrow"
                  width={33}
                  height={33}
                />
              </div>
              <div
                onClick={() => scrollToRight(ref)}
                className="swiper-button-next swiper-button-next4"
                tabIndex={0}
                role="button"
                aria-label="Next slide"
                aria-disabled="false"
                style={{ display: "none" }}
                aria-controls="game_provider_slider"
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhAQMAAABtKlAsAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAAxJREFUeNpjYBgOAAAAxgAB/v0USgAAAABJRU5ErkJggg=="
                  alt="slide-arrow"
                  className="swiper-right-arrow slide_arrow"
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
            id="game_provider_slider"
            aria-live="polite"
          >
            {sortedData?.map((game, idx) => {
              return (
                <div
                  onClick={() => handleNavigate(game)}
                  key={idx}
                  className="swiper-slide providers_slider swiper-slide-active"
                  role="group"
                  aria-label="1 / 11"
                  style={{
                    width: "186.875px",
                    marginRight: "10px",
                    height: "140px",
                  }}
                >
                  <a className="bg-[#e0e0e0] p-3 rounded-md h-full flex flex-col justify-between">
                    <img
                      style={{
                        backgroundImage: "none",
                        height: "70px",
                        objectFit: "contain",
                      }}
                      src={game?.url_thumb}
                      className="providers-img-4 img-fluid"
                      loading="lazy"
                      alt="icon"
                      width={141}
                      height={94}
                    />
                    <p className="provider_name">{game?.game_name}</p>
                  </a>
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
  );
};

export default GameProvider;
