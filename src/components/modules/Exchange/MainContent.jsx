import { useSelector } from "react-redux";
import Group from "./Group";
import InPlay from "./InPlay";
import Upcoming from "./Upcoming";

const MainContent = () => {
  const { group } = useSelector((state) => state.global);
  return (
    <div className="main-content-wrapper container-fluid p-0 m-0">
      <div className="row main-body">
        <div className="col-12 p-0">
          <div className="main-content m-0">
            {group > 0 && <Group />}
            {group === 0 && <InPlay />}
            {group === "upcoming" && <Upcoming />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
