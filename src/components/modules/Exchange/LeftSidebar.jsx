import { useDispatch } from "react-redux";
import { setGroup } from "../../../redux/features/global/globalSlice";
import { useNavigate } from "react-router-dom";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChangeGroup = (g) => {
    navigate("/exchange");
    dispatch(setGroup(g));
  };
  return (
    <div className="left-menu d-block menu-hide-in-mobile left-menu-show">
      <div className="page-container bgcolor">
        <div id="left-menu">
          <div className="up-levels main">
            <div
              onClick={() => handleChangeGroup(0)}
              className="item-level-inplay active inplay-icon item-level"
              tabIndex={0}
            >
              <div className="sidebar-menu-icon live-icon" />
              <span>In Play</span>
              <span className="badge ms-auto">2</span>
            </div>
            <div
              onClick={() => handleChangeGroup("upcoming")}
              className="item-level-inplay item-level"
              tabIndex={0}
            >
              <div className="sidebar-menu-icon upcoming" />
              <span>
                <font dir="auto" style={{ verticalAlign: "inherit" }}>
                  <font dir="auto" style={{ verticalAlign: "inherit" }}>
                    Upcoming
                  </font>
                </font>
              </span>
              <span className="badge ms-auto">126</span>
            </div>

            <div className="item-level0 active text-uppercase mb-1">
              Sports{" "}
            </div>
          </div>
          <div className="downs-levels category">
            <div onClick={() => handleChangeGroup(4)} className="level">
              <div className="item-level1">
                <div className="d-flex">
                  <div className="sports-icon-image cricket" />
                  <span className="text-uppercase">Cricket</span>
                  <span className="badge">67</span>
                </div>
              </div>
            </div>
            <div onClick={() => handleChangeGroup(1)} className="level">
              <div className="item-level1">
                <div className="d-flex">
                  <div className="sports-icon-image soccer" />
                  <span className="text-uppercase">Soccer</span>
                  <span className="badge">96</span>
                </div>
              </div>
            </div>
            <div onClick={() => handleChangeGroup(2)} className="level">
              <div className="item-level1">
                <div className="d-flex">
                  <div className="sports-icon-image tennis" />
                  <span className="text-uppercase">Tennis</span>
                  <span className="badge">15</span>
                </div>
              </div>
            </div>
            <div className="level">
              <div className="item-level1">
                <div className="d-flex">
                  <div className="sports-icon-image horse-racing" />
                  <span className="text-uppercase">Horse Racing</span>
                  <span className="badge">57</span>
                </div>
              </div>
            </div>
            <div className="level">
              <div className="item-level1">
                <div className="d-flex">
                  <div className="sports-icon-image rugby-union" />
                  <span className="text-uppercase">Rugby Union</span>
                  <span className="badge">3</span>
                </div>
              </div>
            </div>
            <div className="level">
              <div className="item-level1">
                <div className="d-flex">
                  <div className="sports-icon-image greyhound-racing" />
                  <span className="text-uppercase">Greyhound Racing</span>
                  <span className="badge">
                    <font dir="auto" style={{ verticalAlign: "inherit" }}>
                      <font dir="auto" style={{ verticalAlign: "inherit" }}>
                        67
                      </font>
                    </font>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
