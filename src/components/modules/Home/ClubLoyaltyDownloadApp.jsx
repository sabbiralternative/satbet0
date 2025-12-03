const ClubLoyaltyDownloadApp = () => {
  return (
    <div className="bt_common_align">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="club_loyalty_bg">
              <div className="section_header_div">
                <div className="title club_title">Club Loyalty</div>
                <div className="swiper_btn_sec position-relative d-flex align-items-center club_loyalty_btn_sec position-relative d-flex align-items-center">
                  <div className="swiper-pagination-section">
                    <div
                      className="swiper-button-prev swiper-button-prev6"
                      tabIndex={0}
                      role="button"
                      aria-label="Previous slide"
                      aria-disabled="true"
                      aria-controls="swiper-wrapper-9bd1bc7ce43c684b"
                    >
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhAQMAAABtKlAsAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAAxJREFUeNpjYBgOAAAAxgAB/v0USgAAAABJRU5ErkJggg=="
                        alt="slide-arrow"
                        className="swiper-left-arrow slide_arrow level-right-arrow"
                        width={33}
                        height={33}
                      />
                    </div>
                    <div
                      className="swiper-button-next swiper-button-next6"
                      tabIndex={0}
                      role="button"
                      aria-label="Next slide"
                      aria-disabled="false"
                      aria-controls="swiper-wrapper-9bd1bc7ce43c684b"
                    >
                      <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhAQMAAABtKlAsAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAAAxJREFUeNpjYBgOAAAAxgAB/v0USgAAAABJRU5ErkJggg=="
                        alt="slide-arrow"
                        className="swiper-right-arrow slide_arrow level-right-arrow"
                        width={33}
                        height={33}
                      />
                    </div>
                  </div>
                  <a href="#" className="know_more_btn">
                    Know More
                  </a>
                  <button
                    className="reg_btn"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#signupModal"
                  >
                    Register
                  </button>
                </div>
              </div>
              <div
                className="swiper-container swiper-initialized swiper-horizontal swiper-backface-hidden"
                id="club_loyalty_swipper"
              >
                <div
                  className="swiper-wrapper"
                  id="swiper-wrapper-9bd1bc7ce43c684b"
                  aria-live="polite"
                >
                  <div
                    className="swiper-slide club_loyalty_slider_img swiper-slide-active d-flex justify-content-start"
                    role="group"
                    aria-label="1 / 4"
                    data-swiper-slide-index={0}
                    style={{ width: "286.8px", marginRight: "10px" }}
                  >
                    <div className="user_level_box user_silver">
                      <div className="user_level_header_sec w-100 d-flex align-items-center justify-content-between">
                        <div className="user_level_left d-flex align-items-center">
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4AQMAAAADqqSRAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABdJREFUeNpjYBgFo2AUjIJRMApGAb0BAAeAAAGB8v1lAAAAAElFTkSuQmCC"
                            className="level-silver userlevel_image img fluid"
                            alt="icon"
                            width={120}
                            height={120}
                          />
                          <div className="user_level_text d-flex flex-column">
                            <span>Silver</span>
                            <span>Turn Over | ₹1k</span>
                          </div>
                        </div>
                        <div className="user_level_right">
                          <a href="#" className="tc_btn">
                            T &amp; C
                          </a>
                        </div>
                      </div>
                      <hr />
                      <div className="user_level_body_Sec">
                        <p>Benefits</p>
                        <ul>
                          <li>3% Bonus on every Deposit</li>
                          <li>
                            2% Weekly Lossback bonus for Live Casino and Live
                            Cards
                          </li>
                          <li>2% Weekly Lossback bonus for SportsBook</li>
                          {/* <li>Weekly 5 Free Spins</li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div
                    className="swiper-slide club_loyalty_slider_img d-flex justify-content-start swiper-slide-next"
                    role="group"
                    aria-label="2 / 4"
                    data-swiper-slide-index={1}
                    style={{ width: "286.8px", marginRight: "10px" }}
                  >
                    <div className="user_level_box user_gold">
                      <div className="user_level_header_sec w-100 d-flex align-items-center justify-content-between">
                        <div className="user_level_left d-flex align-items-center">
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4AQMAAAADqqSRAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABdJREFUeNpjYBgFo2AUjIJRMApGAb0BAAeAAAGB8v1lAAAAAElFTkSuQmCC"
                            className="level-gold userlevel_image img fluid"
                            alt="icon"
                            width={120}
                            height={120}
                          />
                          <div className="user_level_text d-flex flex-column">
                            <span>Gold</span>
                            <span>Turn Over | ₹10L</span>
                          </div>
                        </div>
                        <div className="user_level_right">
                          <a href="#" className="tc_btn">
                            T &amp; C
                          </a>
                        </div>
                      </div>
                      <hr />
                      <div className="user_level_body_Sec">
                        <p>Benefits</p>
                        <ul>
                          <li>4% Bonus on every Deposit</li>
                          <li>
                            2% Weekly Lossback bonus for Live Casino and Live
                            Cards
                          </li>
                          <li>2% Weekly Lossback bonus for SportsBook</li>
                          {/* <li>Weekly 8 Free Spins</li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div
                    className="swiper-slide club_loyalty_slider_img d-flex justify-content-start"
                    role="group"
                    aria-label="3 / 4"
                    data-swiper-slide-index={2}
                    style={{ width: "286.8px", marginRight: "10px" }}
                  >
                    <div className="user_level_box user_platinum">
                      <div className="user_level_header_sec w-100 d-flex align-items-center justify-content-between">
                        <div className="user_level_left d-flex align-items-center">
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4AQMAAAADqqSRAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABdJREFUeNpjYBgFo2AUjIJRMApGAb0BAAeAAAGB8v1lAAAAAElFTkSuQmCC"
                            className="level-platinum userlevel_image img fluid"
                            alt="icon"
                            width={120}
                            height={120}
                          />
                          <div className="user_level_text d-flex flex-column">
                            <span>Platinum</span>
                            <span>Turn Over | ₹50L</span>
                          </div>
                        </div>
                        <div className="user_level_right">
                          <a href="#" className="tc_btn">
                            T &amp; C
                          </a>
                        </div>
                      </div>
                      <hr />
                      <div className="user_level_body_Sec">
                        <p>Benefits</p>
                        <ul>
                          <li>5% Bonus on every Deposit</li>
                          <li>
                            2% Weekly Lossback bonus for Live Casino and Live
                            Cards
                          </li>
                          <li>2% Weekly Lossback bonus for SportsBook</li>
                          {/* <li>Weekly 10 Free Spins</li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div
                    className="swiper-slide club_loyalty_slider_img d-flex justify-content-start"
                    role="group"
                    aria-label="4 / 4"
                    data-swiper-slide-index={3}
                    style={{ width: "286.8px", marginRight: "10px" }}
                  >
                    <div className="user_level_box user_vip">
                      <div className="user_level_header_sec w-100 d-flex align-items-center justify-content-between">
                        <div className="user_level_left d-flex align-items-center">
                          <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4AQMAAAADqqSRAAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABdJREFUeNpjYBgFo2AUjIJRMApGAb0BAAeAAAGB8v1lAAAAAElFTkSuQmCC"
                            className="level-vip userlevel_image img fluid"
                            alt="icon"
                            width={120}
                            height={120}
                          />
                          <div className="user_level_text d-flex flex-column">
                            <span>VIP</span>
                            <span>Turn Over | ₹1CR</span>
                          </div>
                        </div>
                        <div className="user_level_right">
                          <a href="#" className="tc_btn">
                            T &amp; C
                          </a>
                        </div>
                      </div>
                      <hr />
                      <div className="user_level_body_Sec">
                        <p>Benefits</p>
                        <ul>
                          <li>6% Bonus on every Deposit</li>
                          <li>
                            3% Weekly Lossback bonus for Live Casino and Live
                            Cards
                          </li>
                          <li>3% Weekly Lossback bonus for SportsBook</li>
                          {/* <li>Weekly 15 Free Spins</li> */}
                        </ul>
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
          <div className="col-12 col-lg-6">
            <div className="dwnld-main-div position-relative">
              <img
                src="https://asset.satbet.com/homepage_assets/images/satbet-sprite-7.png"
                className="img-fluid"
                alt="icon"
                width={850}
                height={473}
              />
              <div className="dwnld_content_div position-absolute">
                <h1>Download The App</h1>
                <p>
                  Now Download the SATBET APP and get easier, quickly access to
                  your winings
                </p>
                <a href="#" className="reg_btn" id="install-pwd1">
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubLoyaltyDownloadApp;
