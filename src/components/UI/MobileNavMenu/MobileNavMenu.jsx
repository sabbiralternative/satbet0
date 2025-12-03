import { Link } from "react-router-dom";

const MobileNavMenu = () => {
  return (
    <div
      className="collapse navbar-collapse"
      id="navbarTogglerDemo02"
      style={{ visibility: "visible" }}
    >
      <ul className="navbar-nav nav-mob-align navbar_menu_align position-relative">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/exchange">
            <div className="nav_menus">
              <img
                src="https://asset.satbet.com/images/exchange.gif"
                alt="icons"
                className="exchange-gif"
                loading="lazy"
              />
              <p>Exchange</p>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/sportsbook">
            <div className="nav_menus">
              <img
                src="https://asset.satbet.com/images/sports.gif"
                alt="icons"
                loading="lazy"
              />
              <p>Sports</p>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/casino-games">
            <div className="nav_menus">
              <img
                src="https://asset.satbet.com/images/casino.gif"
                alt="icons"
                loading="lazy"
              />
              <p>Casino</p>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            aria-current="page"
            to="/live-casino-games"
          >
            <div className="nav_menus">
              <img
                src="https://asset.satbet.com/images/live.gif"
                alt="icons"
                loading="lazy"
              />
              <p>Live Casino</p>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/promotions">
            <div className="nav_menus">
              <img
                src="https://asset.satbet.com/images/promo.gif"
                alt="icons"
                loading="lazy"
                style={{ borderRadius: "var(--sb_px15)", border: "2px solid" }}
              />
              <p>Promotions</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNavMenu;
