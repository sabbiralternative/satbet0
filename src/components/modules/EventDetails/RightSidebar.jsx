const RightSidebar = () => {
  return (
    <div className="col-lg-4 col-md-12 pl-2 pr-2">
      <div className="bet-slip-div">
        <div className="bottom-part side-bet-mob-hide">
          <div
            data-toggle="collapse"
            data-target="#collapseBets"
            aria-expanded="true"
            aria-controls="collapseBets"
            className="open-bets-header-bg top-radius"
          >
            <div className="row m-0 cursor">
              <div className="col-10 font-weight-bold">My Bets</div>
              <div className="col-2 text-right">
                <i className="fas fa-chevron-up pt-2" />
              </div>
            </div>
          </div>
          <div
            aria-expanded="true"
            aria-hidden="false"
            id="collapseBets"
            className="mybets-body in bottom-radius collapse show"
            style={{}}
          >
            <div className="mybets-wrapper">
              <div className="row open-bets-header m-0">
                <div className="bet-header">
                  <div className="unmatch-title">Matched Bets</div>
                  <div className="text-center justify-content-center d-flex setting-matched-bets">
                    <label className="d-flex">
                      <div style={{ paddingTop: "2px" }}>
                        <input
                          type="checkbox"
                          id="matchAverage-odd"
                          name="matchAverage-odd"
                        />
                      </div>
                      <div
                        className="title-option-setting averge-odds"
                        style={{ marginLeft: "5px" }}
                      >
                        Average odds
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mybets-wrapper">
              <div className="row open-bets-header m-0 mt-2">
                <div className="bet-header">
                  <div className="unmatch-title">Unmatched Bets</div>
                </div>
              </div>

              <div className="box-header" />
            </div>
          </div>
        </div>
        <div className="d-flex d-lg-none p-5 col-12" />
      </div>
    </div>
  );
};

export default RightSidebar;
