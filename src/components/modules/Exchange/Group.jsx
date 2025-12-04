import { useSelector } from "react-redux";
import Card from "./Card";
import SliderCategory from "./SliderCategory";
import { useGroupQuery } from "../../../redux/features/events/events";
import { Fragment, useEffect, useState } from "react";

const Group = () => {
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
        <div className="col-12 p-0 landing-page">
          <div className="sport-content px-md-2">
            <div className="row m-0">
              <div className="col-sm-12 p-0">
                <div
                  id="sport-highlight"
                  className="row sport-highlight m-0"
                  style={{ alignContent: "start" }}
                >
                  <SliderCategory />
                  <div className="sport-highlight-content">
                    <div
                      id="tabsJustifiedContent"
                      className="tab-content"
                      style={{ display: "block" }}
                    >
                      <div className="tab-pane fade active show">
                        <div className="container-event-info p-0">
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
                              <Fragment key={category}>
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
                              </Fragment>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
