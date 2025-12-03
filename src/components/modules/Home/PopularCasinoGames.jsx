const PopularCasinoGames = () => {
  return (
    <div className="bt_common_align" id="popular_casino_games_slider_box">
      <div className="container-fluid">
        <div className="section_header_div">
          <div className="title">Popular Casino Games</div>
          <div className="swiper_btn_sec position-relative d-flex align-items-center ">
            <div className="swiper-pagination-section">
              <div
                className="swiper-button-prev swiper-button-disabled"
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
            <a
              href="https://www.satbet0.in/casino-games"
              className="see_more_btn"
            >
              See All
            </a>
          </div>
        </div>
        <div className="swiper-container double_layer swiper-initialized swiper-horizontal">
          <div
            className="swiper-wrapper"
            id="popular_casino_games_slider"
            aria-live="polite"
          >
            <div
              className="swiper-slide swiper-slide-active"
              role="group"
              aria-label="1 / 15"
              style={{ width: "186.875px", marginRight: "10px" }}
            >
              <div className="game_overlay_main" data-game-id="aviator">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADhAQMAAABIshroAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB1JREFUeNrtwQEBAAAAgJD+r+4ICgAAAAAAAAAAGiJHAAHrw0NSAAAAAElFTkSuQmCC"
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
                  <div className="game-name">Aviator</div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide swiper-slide-next"
              role="group"
              aria-label="2 / 15"
              style={{ width: "186.875px", marginRight: "10px" }}
            >
              <div
                className="game_overlay_main"
                data-game-id="ts-tg-paperplane"
              >
                <img
                  src="https://prod.bollytech.com/topspingames/images/ts-tg-paperplane.jpg"
                  className="spb-aviator newgame-img img-fluid"
                  loading="lazy"
                  alt="Paper Plane"
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
                  <div className="game-name">Paper Plane</div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="3 / 15"
              style={{ width: "186.875px", marginRight: "10px" }}
            >
              <div
                className="game_overlay_main"
                data-game-id="sx-sg-jackpotpinball"
              >
                <img
                  src="https://prod.bollytech.com/topspingames/images/sx-sg-jackpotpinball.jpg"
                  className="spb-aviator newgame-img img-fluid"
                  loading="lazy"
                  alt="Jackpot Pinball"
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
                  <div className="game-name">Jackpot Pinball</div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="4 / 15"
              style={{ width: "186.875px", marginRight: "10px" }}
            >
              <div
                className="game_overlay_main"
                data-game-id="sx-sg-ninjasfortune"
              >
                <img
                  src="https://prod.bollytech.com/topspingames/images/sx-sg-ninjasfortune.jpg"
                  className="spb-aviator newgame-img img-fluid"
                  loading="lazy"
                  alt="Ninja Fortune"
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
                  <div className="game-name">Ninja Fortune</div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="5 / 15"
              style={{ width: "186.875px", marginRight: "10px" }}
            >
              <div className="game_overlay_main" data-game-id="JetX3">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADhAQMAAABIshroAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB1JREFUeNrtwQEBAAAAgJD+r+4ICgAAAAAAAAAAGiJHAAHrw0NSAAAAAElFTkSuQmCC"
                  className="jetx3 newgame-img img-fluid"
                  loading="lazy"
                  alt="JetX3"
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
                  <div className="game-name">JetX3</div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="6 / 15"
              style={{ width: "186.875px", marginRight: "10px" }}
            >
              <div className="game_overlay_main" data-game-id="Balloon">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADhAQMAAABIshroAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB1JREFUeNrtwQEBAAAAgJD+r+4ICgAAAAAAAAAAGiJHAAHrw0NSAAAAAElFTkSuQmCC"
                  className="balloon newgame-img img-fluid"
                  loading="lazy"
                  alt="Balloon"
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
                  <div className="game-name">Balloon</div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="7 / 15"
              style={{ width: "186.875px", marginRight: "10px" }}
            >
              <div className="game_overlay_main" data-game-id="JetX">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADhAQMAAABIshroAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB1JREFUeNrtwQEBAAAAgJD+r+4ICgAAAAAAAAAAGiJHAAHrw0NSAAAAAElFTkSuQmCC"
                  className="jetx newgame-img img-fluid"
                  loading="lazy"
                  alt="JetX"
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
                  <div className="game-name">JetX</div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="8 / 15"
              style={{ width: "186.875px", marginRight: "10px" }}
            >
              <div
                className="game_overlay_main"
                data-game-id="TK-midasgoldentouch"
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADhAQMAAABIshroAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB1JREFUeNrtwQEBAAAAgJD+r+4ICgAAAAAAAAAAGiJHAAHrw0NSAAAAAElFTkSuQmCC"
                  className="tk-midasgoldentouch newgame-img img-fluid"
                  loading="lazy"
                  alt="Midas Golden Touch"
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
                  <div className="game-name">Midas Golden Touch</div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="9 / 15"
              style={{ width: "186.875px", marginRight: "10px" }}
            >
              <div className="game_overlay_main" data-game-id={1000148}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADhAQMAAABIshroAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB1JREFUeNrtwQEBAAAAgJD+r+4ICgAAAAAAAAAAGiJHAAHrw0NSAAAAAElFTkSuQmCC"
                  className="img-1000148 newgame-img img-fluid"
                  loading="lazy"
                  alt="Crazy Time"
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
                  <div className="game-name">Crazy Time</div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="10 / 15"
              style={{ width: "186.875px", marginRight: "10px" }}
            >
              <div className="game_overlay_main" data-game-id={1000074}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADhAQMAAABIshroAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB1JREFUeNrtwQEBAAAAgJD+r+4ICgAAAAAAAAAAGiJHAAHrw0NSAAAAAElFTkSuQmCC"
                  className="img-1000074 newgame-img img-fluid"
                  loading="lazy"
                  alt="Dragon Tiger"
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
                  <div className="game-name">Dragon Tiger</div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="11 / 15"
              style={{ width: "186.875px", marginRight: "10px" }}
            >
              <div className="game_overlay_main" data-game-id={1000609}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADhAQMAAABIshroAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB1JREFUeNrtwQEBAAAAgJD+r+4ICgAAAAAAAAAAGiJHAAHrw0NSAAAAAElFTkSuQmCC"
                  className="img-1000609 newgame-img img-fluid"
                  loading="lazy"
                  alt="Lightning Sic Bo"
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
                  <div className="game-name">Lightning Sic Bo</div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="12 / 15"
              style={{ width: "186.875px", marginRight: "10px" }}
            >
              <div className="game_overlay_main" data-game-id={1000610}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADhAQMAAABIshroAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB1JREFUeNrtwQEBAAAAgJD+r+4ICgAAAAAAAAAAGiJHAAHrw0NSAAAAAElFTkSuQmCC"
                  className="img-1000610 newgame-img img-fluid"
                  loading="lazy"
                  alt="Lightning Storm Live"
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
                  <div className="game-name">Lightning Storm Live</div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="13 / 15"
              style={{ width: "186.875px", marginRight: "10px" }}
            >
              <div className="game_overlay_main" data-game-id={1000608}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADhAQMAAABIshroAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB1JREFUeNrtwQEBAAAAgJD+r+4ICgAAAAAAAAAAGiJHAAHrw0NSAAAAAElFTkSuQmCC"
                  className="img-1000608 newgame-img img-fluid"
                  loading="lazy"
                  alt="FP Hilo"
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
                  <div className="game-name">FP Hilo</div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="14 / 15"
              style={{ width: "186.875px", marginRight: "10px" }}
            >
              <div className="game_overlay_main" data-game-id={1000607}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADhAQMAAABIshroAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB1JREFUeNrtwQEBAAAAgJD+r+4ICgAAAAAAAAAAGiJHAAHrw0NSAAAAAElFTkSuQmCC"
                  className="img-1000607 newgame-img img-fluid"
                  loading="lazy"
                  alt="Balloon Race"
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
                  <div className="game-name">Balloon Race</div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              role="group"
              aria-label="15 / 15"
              style={{ width: "186.875px", marginRight: "10px" }}
            >
              <div className="game_overlay_main" data-game-id={1000605}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADhAQMAAABIshroAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAB1JREFUeNrtwQEBAAAAgJD+r+4ICgAAAAAAAAAAGiJHAAHrw0NSAAAAAElFTkSuQmCC"
                  className="img-1000605 newgame-img img-fluid"
                  loading="lazy"
                  alt="Lightning Dragon Tiger"
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
                  <div className="game-name">Lightning Dragon Tiger</div>
                </div>
              </div>
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

export default PopularCasinoGames;
