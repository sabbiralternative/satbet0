import { useDispatch, useSelector } from "react-redux";
import { setGroup } from "../../../redux/features/global/globalSlice";

const SliderCategory = () => {
  const { group } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const handleChangeGroup = (g) => {
    dispatch(setGroup(g));
  };
  return (
    <div className="col-12 p-0 sticky-slider">
      <div id="SliderCategory" className="slider-cat">
        <div className="category-scroll-slider">
          <div className="category-box">
            <a
              onClick={() => handleChangeGroup(4)}
              className={`category-item ${group === 4 ? "active" : ""}`}
            >
              <div className="inner-content">
                <span className="tag-live">
                  <strong>14</strong> 2{" "}
                </span>
                <div className="sports-icon-image cricket" />
                <div className="category-scroll-slider-name">
                  <div className="title"> Cricket </div>
                </div>
              </div>
            </a>
          </div>
          <div className="category-box">
            <a
              onClick={() => handleChangeGroup(1)}
              className={`category-item ${group === 1 ? "active" : ""}`}
            >
              <div className="inner-content">
                <span className="tag-live">
                  <strong>
                    <font
                      dir="auto"
                      style={{
                        verticalAlign: "inherit",
                      }}
                    >
                      <font
                        dir="auto"
                        style={{
                          verticalAlign: "inherit",
                        }}
                      >
                        96
                      </font>
                    </font>
                  </strong>{" "}
                  0{" "}
                </span>
                <div className="sports-icon-image soccer" />
                <div className="category-scroll-slider-name">
                  <div className="title"> Soccer </div>
                </div>
              </div>
            </a>
          </div>
          <div className="category-box">
            <a
              onClick={() => handleChangeGroup(2)}
              className={`category-item ${group === 2 ? "active" : ""}`}
            >
              <div className="inner-content">
                <span className="tag-live">
                  <strong>
                    <font
                      dir="auto"
                      style={{
                        verticalAlign: "inherit",
                      }}
                    >
                      <font
                        dir="auto"
                        style={{
                          verticalAlign: "inherit",
                        }}
                      >
                        15
                      </font>
                    </font>
                  </strong>
                  <font
                    dir="auto"
                    style={{
                      verticalAlign: "inherit",
                    }}
                  >
                    <font
                      dir="auto"
                      style={{
                        verticalAlign: "inherit",
                      }}
                    >
                      0
                    </font>
                  </font>
                </span>
                <div className="sports-icon-image tennis" />
                <div className="category-scroll-slider-name">
                  <div className="title"> Tennis </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderCategory;
