import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGroupQuery } from "../../../redux/features/events/events";
import Card from "./Card";

const InPlay = () => {
  const eventName = { 4: "Cricket", 2: "Tennis", 1: "Soccer" };
  const [categories, setCategories] = useState([]);
  const { group } = useSelector((state) => state.global);
  const { data } = useGroupQuery(
    { sportsType: group },
    {
      pollingInterval: 1000,
    }
  );

  useEffect(() => {
    if (data) {
      const categories = Array.from(
        new Set(
          Object.values(data)
            .filter((item) => item.visible)
            .map((item) => item.eventTypeId)
        )
      );
      const sortedCategories = categories.sort((a, b) => {
        const order = { 4: 0, 1: 1, 2: 2 };
        return order[a] - order[b];
      });
      setCategories(sortedCategories);
    }
  }, [data]);
  return (
    <div>
      <div className="row m-0">
        <div className="div-scroll col-12 p-0">
          <div className="sport-content px-md-2">
            <div className="row m-0">
              <div className="highlight-page col-sm-12 p-1">
                <div className="sport-highlight-content">
                  <div className="sport-header">
                    <h2 className="text-capitalize header sport-header meto-bg-sport">
                      <font dir="auto" style={{ verticalAlign: "inherit" }}>
                        <font dir="auto" style={{ verticalAlign: "inherit" }}>
                          In-Play Matches
                        </font>
                      </font>
                    </h2>
                  </div>
                  {categories?.map((category) => {
                    const filteredData = Object.entries(data)
                      .filter(
                        ([, value]) =>
                          value.eventTypeId === category &&
                          value.visible === true
                      )
                      .reduce((obj, [key, value]) => {
                        obj[key] = value;
                        return obj;
                      }, {});
                    return (
                      <div key={category} className="sport-inplay mb-2">
                        <div className="accordion" id="accordionCricket0">
                          <div className="card">
                            <div
                              id="headingOne"
                              className="card-header position-relative"
                            >
                              <h2 className="mb-0">
                                <button
                                  type="button"
                                  data-toggle="collapse"
                                  aria-expanded="true"
                                  className="btn btn-link  w-100 flex px-1 pr-2"
                                  data-target="#collapseOne0"
                                  aria-controls="collapseOne0"
                                >
                                  <div
                                    className={`sports-icon-image ${eventName[
                                      category
                                    ]?.toLowerCase()}`}
                                  />
                                  <p className="w-full">
                                    {" "}
                                    {eventName[category]}
                                  </p>
                                </button>
                              </h2>
                            </div>
                            <div
                              style={{ visibility: "visible" }}
                              className="collapse show"
                              id="collapseOne0"
                              aria-labelledby="headingOne0"
                              data-parent="#accordionCricket0"
                            >
                              <div className="card-body p-0">
                                <div className="container-event-info p-0">
                                  {data &&
                                    Object.values(data).length > 0 &&
                                    Object.keys(filteredData)
                                      .sort(
                                        (keyA, keyB) =>
                                          data[keyA].sort - data[keyB].sort
                                      )
                                      .map((keys, index) => {
                                        if (!data?.[keys]?.visible) {
                                          return null;
                                        }

                                        return (
                                          <Card
                                            key={index}
                                            data={data}
                                            keys={keys}
                                          />
                                        );
                                      })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InPlay;
