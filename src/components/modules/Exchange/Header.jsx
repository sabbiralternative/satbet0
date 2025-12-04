import { useDispatch } from "react-redux";
import { setGroup } from "../../../redux/features/global/globalSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChangeGroup = (g) => {
    navigate("/exchange");
    dispatch(setGroup(g));
  };
  return (
    <header className="hide-in-mobile">
      <nav className="navbar navbar-expand navbar-light bg-faded nav-height">
        <a href="javascript:void(0);" className="menu-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="18pt"
            height="18pt"
            viewBox="0 0 18 18"
            version="1.1"
          >
            <g id="surface1">
              <path
                d="M 0.582031 10.953125 C 0.582031 10.292969 1.121094 9.753906 1.78125 9.753906 L 16.363281 9.753906 C 17.023438 9.753906 17.5625 10.292969 17.5625 10.953125 C 17.5625 11.609375 17.023438 12.152344 16.363281 12.152344 L 1.78125 12.152344 C 1.121094 12.152344 0.582031 11.609375 0.582031 10.953125 Z M 0.582031 16.945312 C 0.582031 16.289062 1.121094 15.746094 1.78125 15.746094 L 16.363281 15.746094 C 17.023438 15.746094 17.5625 16.289062 17.5625 16.945312 C 17.5625 17.605469 17.023438 18.144531 16.363281 18.144531 L 1.78125 18.144531 C 1.121094 18.144531 0.582031 17.605469 0.582031 16.945312 Z M 4.574219 5.707031 L 16.320312 5.707031 C 16.976562 5.707031 17.511719 5.175781 17.511719 4.515625 C 17.511719 3.859375 16.976562 3.324219 16.320312 3.324219 L 4.601562 3.324219 L 5.898438 2.019531 C 6.125 1.792969 6.25 1.488281 6.25 1.179688 C 6.25 0.875 6.125 0.566406 5.898438 0.34375 C 5.441406 -0.117188 4.683594 -0.117188 4.222656 0.34375 L 0.925781 3.707031 C 0.464844 4.164062 0.464844 4.921875 0.925781 5.382812 L 3.898438 8.375 C 4.125 8.597656 4.429688 8.726562 4.738281 8.726562 C 5.042969 8.726562 5.351562 8.597656 5.574219 8.390625 C 5.800781 8.164062 5.925781 7.886719 5.925781 7.554688 C 5.925781 7.246094 5.800781 6.941406 5.59375 6.714844 Z M 4.574219 5.707031 "
                style={{
                  stroke: "none",
                  fillRule: "nonzero",
                  fillOpacity: 1,
                }}
              />
            </g>
          </svg>
        </a>
        <ul className="navbar-nav mr-autod-lg-flex pl-5">
          <li
            onClick={() => handleChangeGroup(4)}
            className="nav-item home-sports py-0 pointer selected-tab"
            tabIndex={0}
          >
            <a className="nav-link">Home</a>
          </li>

          <li
            onClick={() => handleChangeGroup(0)}
            className="nav-item py-0 pointer"
            tabIndex={0}
          >
            <a className="nav-link">In-Play</a>
          </li>
          <li
            onClick={() => handleChangeGroup("upcoming")}
            className="hidden md:flex nav-item pointer py-0"
            tabIndex={0}
          >
            <a className="nav-link">Upcoming</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
