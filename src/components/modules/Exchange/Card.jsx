import { useNavigate } from "react-router-dom";

const Card = ({ data, keys }) => {
  const navigate = useNavigate();
  const navigateGameList = (keys) => {
    navigate(`/event-details/${data[keys]?.eventTypeId}/${keys}`);
  };

  return (
    <div
      onClick={() => navigateGameList(keys)}
      className="row vevent align-items-center valign-wrapper markets market-data"
    >
      {data?.[keys]?.inPlay === 1 ? (
        <span className="date-span-color md:hidden">
          <span className="align-items-center d-inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={38}
              height={10}
              viewBox="0 0 38 10"
              fill="none"
            >
              <path
                d="M2.80557 0.177697C2.75132 0.122129 2.6867 0.0778373 2.6154 0.047352C2.54411 0.0168667 2.46752 0.000785651 2.39003 2.80761e-05C2.31254 -0.000729499 2.23566 0.013851 2.16378 0.0429366C2.0919 0.0720222 2.02644 0.115043 1.97113 0.16954C1.34546 0.794072 0.849158 1.53681 0.510848 2.3549C0.172538 3.17299 -0.00108222 4.05025 5.07545e-06 4.93605C-0.0010097 5.85584 0.186274 6.76602 0.550232 7.61011C0.91419 8.4542 1.44705 9.21417 2.11575 9.84287C2.2283 9.94732 2.37697 10.0036 2.53019 9.99982C2.68341 9.99601 2.82912 9.93239 2.93638 9.82247C3.19313 9.56469 3.16144 9.15436 2.91444 8.91698C2.37778 8.40348 1.95073 7.78579 1.65922 7.10143C1.36772 6.41708 1.21786 5.68036 1.21875 4.93605C1.21875 3.43015 1.82082 2.06456 2.79744 1.07096C3.03306 0.830309 3.05744 0.430584 2.80557 0.177697ZM4.23638 1.61589C4.12937 1.50534 3.98308 1.44189 3.82956 1.43945C3.67605 1.437 3.52782 1.49576 3.41738 1.60284C2.97777 2.03842 2.62884 2.55743 2.39087 3.12966C2.15291 3.7019 2.03066 4.31594 2.03125 4.93605C2.03125 6.31632 2.62438 7.5571 3.56931 8.41528C3.68093 8.5141 3.82614 8.566 3.97484 8.56023C4.12353 8.55445 4.26432 8.49145 4.368 8.38428C4.6345 8.11671 4.58494 7.69578 4.33469 7.45921C3.99166 7.13546 3.71841 6.7445 3.53185 6.31052C3.34528 5.87653 3.24935 5.40873 3.25 4.93605C3.25 3.99792 3.62131 3.14626 4.225 2.52139C4.45738 2.28155 4.49556 1.8753 4.23638 1.61589ZM8.76362 1.61507C8.87063 1.50453 9.01692 1.44108 9.17044 1.43863C9.32395 1.43619 9.47218 1.49494 9.58262 1.60202C10.0223 2.0377 10.3713 2.55684 10.6093 3.12922C10.8473 3.70161 10.9694 4.3158 10.9687 4.93605C10.9687 6.31632 10.3756 7.5571 9.43069 8.41528C9.31907 8.5141 9.17386 8.566 9.02516 8.56023C8.87647 8.55445 8.73568 8.49145 8.632 8.38428C8.3655 8.11671 8.41506 7.69578 8.66531 7.45921C9.00834 7.13546 9.28159 6.7445 9.46815 6.31052C9.65472 5.87653 9.75065 5.40873 9.75 4.93605C9.75 3.99792 9.37869 3.14626 8.775 2.52139C8.54262 2.28155 8.50444 1.87449 8.76362 1.61507ZM10.1944 0.177697C10.2487 0.122129 10.3133 0.0778373 10.3846 0.047352C10.4559 0.0168667 10.5325 0.000785651 10.61 2.80761e-05C10.6875 -0.000729499 10.7643 0.013851 10.8362 0.0429366C10.9081 0.0720222 10.9736 0.115043 11.0289 0.16954C11.6545 0.794072 12.1508 1.53681 12.4892 2.3549C12.8275 3.17299 13.0011 4.05025 13 4.93605C13.001 5.85584 12.8137 6.76602 12.4498 7.61011C12.0858 8.4542 11.5529 9.21417 10.8842 9.84287C10.7717 9.94732 10.623 10.0036 10.4698 9.99982C10.3166 9.99601 10.1709 9.93239 10.0636 9.82247C9.80687 9.56469 9.83856 9.15436 10.0864 8.91698C10.6229 8.40341 11.0498 7.78568 11.3411 7.10133C11.6325 6.41698 11.7822 5.6803 11.7812 4.93605C11.7812 3.43015 11.1792 2.06456 10.2026 1.07096C9.96694 0.830309 9.94256 0.430584 10.1944 0.177697ZM6.5 3.7124C6.17677 3.7124 5.86677 3.84132 5.63821 4.0708C5.40965 4.30028 5.28125 4.61152 5.28125 4.93605C5.28125 5.26058 5.40965 5.57182 5.63821 5.8013C5.86677 6.03078 6.17677 6.15969 6.5 6.15969C6.82323 6.15969 7.13323 6.03078 7.36179 5.8013C7.59035 5.57182 7.71875 5.26058 7.71875 4.93605C7.71875 4.61152 7.59035 4.30028 7.36179 4.0708C7.13323 3.84132 6.82323 3.7124 6.5 3.7124Z"
                fill="url(#paint0_linear_335_111)"
              />
              <path
                d="M17.5905 9.033H16.848C16.5327 9.033 16.2833 8.94133 16.1 8.758C15.9167 8.57467 15.825 8.3235 15.825 8.0045V1.487L15.902 1.4155H16.5455C16.8828 1.4155 17.1413 1.5035 17.321 1.6795C17.5007 1.85183 17.5905 2.13417 17.5905 2.5265V9.033ZM20.5275 7.515C20.5275 8.07233 20.4358 8.46467 20.2525 8.692C20.0728 8.91933 19.7648 9.033 19.3285 9.033H16.848L15.902 7.757C16.3823 7.67267 16.8572 7.61217 17.3265 7.5755C17.7995 7.53517 18.2303 7.515 18.619 7.515H20.5275ZM21.5996 1.487C21.7389 1.45767 21.8929 1.43933 22.0616 1.432C22.2339 1.42467 22.3732 1.421 22.4796 1.421C22.5969 1.421 22.7362 1.42467 22.8976 1.432C23.0589 1.43933 23.2129 1.45767 23.3596 1.487V9C23.2129 9.02567 23.0589 9.04217 22.8976 9.0495C22.7362 9.0605 22.5969 9.066 22.4796 9.066C22.3732 9.066 22.2339 9.0605 22.0616 9.0495C21.8929 9.04217 21.7389 9.02567 21.5996 9V1.487ZM29.1503 1.487C29.2786 1.45767 29.4088 1.43933 29.5408 1.432C29.6765 1.42467 29.8011 1.421 29.9148 1.421C30.0211 1.421 30.1531 1.43017 30.3108 1.4485C30.4685 1.46683 30.606 1.49617 30.7233 1.5365L30.7948 1.6355L28.7323 9C28.5306 9.022 28.3033 9.0385 28.0503 9.0495C27.7973 9.0605 27.5571 9.066 27.3298 9.066C26.9998 9.066 26.7413 9.01283 26.5543 8.9065C26.3673 8.7965 26.2298 8.58567 26.1418 8.274L24.3103 1.6465C24.4716 1.57683 24.6403 1.51633 24.8163 1.465C24.996 1.41367 25.1811 1.388 25.3718 1.388C25.6321 1.388 25.8356 1.45767 25.9823 1.597C26.129 1.73633 26.2408 1.95817 26.3178 2.2625L27.1648 5.392C27.2235 5.60833 27.2766 5.83017 27.3243 6.0575C27.3756 6.28117 27.4233 6.50667 27.4673 6.734C27.5113 6.95767 27.5498 7.17767 27.5828 7.394C27.6011 7.48567 27.6396 7.5315 27.6983 7.5315L29.1503 1.487ZM31.7127 1.564L31.7897 1.487H33.4452V2.9335C33.4452 3.0875 33.447 3.225 33.4507 3.346C33.4544 3.467 33.4562 3.60267 33.4562 3.753V6.778C33.4562 6.921 33.4544 7.05117 33.4507 7.1685C33.447 7.28583 33.4452 7.41967 33.4452 7.57V9.033H32.7247C32.4094 9.033 32.1619 8.94133 31.9822 8.758C31.8025 8.57467 31.7127 8.3235 31.7127 8.0045V1.564ZM35.8762 4.5065C35.9165 4.61283 35.944 4.73567 35.9587 4.875C35.9734 5.01433 35.9807 5.13167 35.9807 5.227C35.9807 5.326 35.9734 5.4415 35.9587 5.5735C35.944 5.7055 35.9165 5.82833 35.8762 5.942H34.1987C34.107 5.942 33.9769 5.942 33.8082 5.942C33.6395 5.93833 33.4654 5.93467 33.2857 5.931C33.1097 5.92733 32.963 5.92367 32.8457 5.92V4.5285C32.963 4.52483 33.1097 4.52117 33.2857 4.5175C33.4654 4.51383 33.6395 4.512 33.8082 4.512C33.9769 4.50833 34.107 4.5065 34.1987 4.5065H35.8762ZM36.5307 1.487C36.56 1.619 36.5765 1.74367 36.5802 1.861C36.5875 1.97467 36.5912 2.081 36.5912 2.18C36.5912 2.279 36.5784 2.40183 36.5527 2.5485C36.5307 2.6915 36.4959 2.829 36.4482 2.961H34.1987C34.107 2.961 33.9769 2.961 33.8082 2.961C33.6395 2.95733 33.4654 2.95367 33.2857 2.95C33.1097 2.94633 32.963 2.94267 32.8457 2.939V1.487H36.5307ZM36.8057 7.559C36.8057 8.043 36.7305 8.40967 36.5802 8.659C36.4299 8.90833 36.12 9.033 35.6507 9.033H32.8457V7.614C33.084 7.603 33.3114 7.592 33.5277 7.581C33.7477 7.56633 33.9915 7.559 34.2592 7.559H36.8057Z"
                fill="url(#paint1_linear_335_111)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_335_111"
                  x1="6.5"
                  y1={0}
                  x2="6.5"
                  y2={10}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="var(--live-gr-start-color)" />
                  <stop offset={1} stopColor="var(--live-gr-end-color)" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_335_111"
                  x1="26.5"
                  y1={1}
                  x2="26.5"
                  y2={9}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="var(--live-gr-start-color)" />
                  <stop offset={1} stopColor="var(--live-gr-end-color)" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          {data?.[keys]?.date}
        </span>
      ) : (
        <span className="date-span-color md:hidden">
          <font dir="auto" style={{ verticalAlign: "inherit" }}>
            <font dir="auto" style={{ verticalAlign: "inherit" }}>
              {data?.[keys]?.date}
            </font>
          </font>
        </span>
      )}

      <div className="col-12 col-md-8 p-0">
        <div className="row m-0 cursor">
          {data?.[keys]?.inPlay === 1 ? (
            <div
              className="col-md-2 col-xl-2 hidden md:block pt-1 pl-2"
              style={{ maxWidth: "78px" }}
            >
              <span>
                <div className="date-height">
                  <div className="date-height">
                    <div className="date-time in-play">
                      <div className="animate">
                        <ul className="flip-animation">
                          <li className="time_date">
                            <span className="time"> {data?.[keys]?.date}</span>
                          </li>
                          <li>
                            <span className="in-play-light">
                              <div className="icon-holder-small">
                                <div className="inplay-light-icon">
                                  <i
                                    aria-hidden="true"
                                    className="fa fa-play text-white size-2"
                                  />
                                </div>
                              </div>
                              In-Play
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          ) : (
            <div
              className="col-md-2 col-xl-2 hidden md:block pt-1 pl-2"
              style={{ maxWidth: "78px" }}
            >
              <div className="date-height">
                <div className="date-height">
                  <div className="date-time dateTime-bg">
                    <div>
                      <ul>
                        <li className="time_date">
                          <span className="time">
                            <font
                              dir="auto"
                              style={{ verticalAlign: "inherit" }}
                            >
                              <font
                                dir="auto"
                                style={{ verticalAlign: "inherit" }}
                              >
                                {data?.[keys]?.date}
                              </font>
                            </font>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="col p-0 pl-md-3 d-flex flex-column justify-content-center">
            <div className="d-flex justify-content-center justify-content-md-start text-capitalize match-name notranslate">
              <span className="col col-md-auto d-flex justify-content-end p-0 notranslate">
                {data[keys]?.player1}
              </span>
              <span className="col-auto pl-1 pr-1">
                &nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width={18}
                  height={18}
                  viewBox="0 0 65.141 65.34"
                  fill="var(--primary-color)"
                  className="svg-vs"
                  style={{
                    transform: "scale(0.8)",
                  }}
                >
                  <g>
                    <g transform="translate(-757.532 -436.426)">
                      <path
                        d="M27,54A27.007,27.007,0,0,1,16.49,2.122,27.007,27.007,0,0,1,37.51,51.878,26.832,26.832,0,0,1,27,54Zm5.451-22.123L28.6,32.7a6.748,6.748,0,0,0,3.262,4.27,11.626,11.626,0,0,0,5.729,1.37,10.188,10.188,0,0,0,6.324-1.861,6.086,6.086,0,0,0,2.442-5.1A6.335,6.335,0,0,0,45.2,27.7c-.77-1.106-2.3-1.955-4.56-2.522L36.9,24.24c-2.031-.5-3.061-1.392-3.061-2.643a2.414,2.414,0,0,1,.975-1.966,4.488,4.488,0,0,1,2.828-.773c2.117,0,3.483.84,4.061,2.5l3.77-.935a5.612,5.612,0,0,0-2.844-3.513,10.3,10.3,0,0,0-5.068-1.24,8.643,8.643,0,0,0-5.607,1.78,5.813,5.813,0,0,0-2.191,4.73,6.448,6.448,0,0,0,.62,2.787,5.048,5.048,0,0,0,1.651,2.022,10.4,10.4,0,0,0,3.191,1.281l4.206,1.1a3.722,3.722,0,0,1,2.208,1.2,2.938,2.938,0,0,1,.516,1.668,2.512,2.512,0,0,1-1.136,2.078,5.426,5.426,0,0,1-3.247.838,6.961,6.961,0,0,1-3.641-.818A3.639,3.639,0,0,1,32.451,31.877ZM9.065,16.006,15.848,38h4.028l6.881-21.994h-3.3L18.3,32.86,13.254,16.006Z"
                        transform="translate(763 442)"
                      />
                      <path
                        d="M768.4,489.5l2.639,2.463-9.473,9.438h0s-1.527,1.734-3.042.172a1.77,1.77,0,0,1,.2-2.8Z"
                        transform="translate(1580.574 938.646) rotate(180)"
                      />
                      <path
                        d="M768.4,489.5l2.639,2.463-9.473,9.438h0s-1.527,1.734-3.042.172a1.77,1.77,0,0,1,.2-2.8Z"
                        transform="translate(-0.369 -0.455)"
                      />
                    </g>
                  </g>
                </svg>
                &nbsp;
              </span>
              <span
                className="col col-md-auto d-flex justify-content-start p-0"
                id="sport-tab"
              >
                {data[keys]?.player1}
              </span>
            </div>

            {/* <div className="d-flex justify-content-center sub-title text-capitalize justify-content-md-start tournament-name">
              {" "}
              One Day Internationals{" "}
            </div> */}
          </div>
          <div className="align-items-center col-md-3 col-xl-3 justify-content-end px-0 md:flex hidden">
            <div className="tag-counters hidden md:flex col-md-3 justify-content-end">
              <div className="tag-item notranslate" title="Manual Odds">
                <div className="tag-counter"> 1 </div>
                <div className="tag-name">B</div>
              </div>

              <div className="tag-item notranslate" title="Fancy markets">
                <div className="tag-counter"> 20 </div>
                <div className="tag-name">F</div>
              </div>

              <div className="tag-item notranslate" title="Match odds">
                <div className="tag-counter"> 1 </div>
                <div className="tag-name">M</div>
              </div>

              <div className="tag-item notranslate" title="Other markets">
                <div className="tag-counter"> 1 </div>
                <div className="tag-name">O</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-4 p-0">
        <div className="row m-0">
          <div id="runnerData" className="col-4 p-0">
            <div className="event-meta">
              <ul className="d-flex list-unstyled notranslate">
                <li>
                  <button className="selection-btn meto-bg-back back-cell">
                    <span className="price">
                      {" "}
                      {data?.[keys]?.[0]?.ex?.availableToBack[0]?.price || "-"}
                    </span>
                  </button>
                </li>
                <li>
                  <button className="selection-btn meto-bg-lay lay-cell">
                    <span className="price">
                      {" "}
                      {data?.[keys]?.[0]?.ex?.availableToLay?.[0]?.price || "-"}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div id="runnerData" className="col-4 p-0">
            <div className="event-meta">
              <ul className="d-flex list-unstyled notranslate">
                <li>
                  <button className="selection-btn meto-bg-back back-cell">
                    <span className="price">
                      {" "}
                      {data?.[keys]?.[2]?.ex?.availableToBack[0]?.price || "-"}
                    </span>
                  </button>
                </li>
                <li>
                  <button className="selection-btn meto-bg-lay lay-cell">
                    <span className="price">
                      {" "}
                      {data?.[keys]?.[2]?.ex?.availableToLay?.[0]?.price || "-"}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div id="runnerData" className="col-4 p-0">
            <div className="event-meta">
              <ul className="d-flex list-unstyled notranslate">
                <li>
                  <button className="selection-btn meto-bg-back back-cell">
                    <span className="price">
                      {" "}
                      {data?.[keys]?.[1]?.ex?.availableToBack[0]?.price || "-"}
                    </span>
                  </button>
                </li>
                <li>
                  <button className="selection-btn meto-bg-lay lay-cell">
                    <span className="price">
                      {" "}
                      {data?.[keys]?.[1]?.ex?.availableToLay?.[0]?.price || "-"}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
