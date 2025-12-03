const MobileNavMenu = () => {
  return (
    <div
      className="collapse navbar-collapse"
      id="navbarTogglerDemo02"
      style={{ visibility: "visible" }}
    >
      <ul className="navbar-nav nav-mob-align navbar_menu_align position-relative">
        <li className="nav-item">
          <a
            className="nav-link active"
            aria-current="page"
            href="https://www.satbet0.in/exchange"
          >
            <div className="nav_menus">
              <img
                src="https://asset.satbet.com/images/exchange.gif"
                alt="icons"
                className="exchange-gif"
                loading="lazy"
              />
              <p>Exchange</p>
            </div>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            aria-current="page"
            href="https://www.satbet0.in/sportsbook"
          >
            <div className="nav_menus">
              <img
                src="https://asset.satbet.com/images/sports.gif"
                alt="icons"
                loading="lazy"
              />
              <p>Sports</p>
            </div>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            aria-current="page"
            href="https://www.satbet0.in/casino-games"
          >
            <div className="nav_menus">
              <img
                src="https://asset.satbet.com/images/casino.gif"
                alt="icons"
                loading="lazy"
              />
              <p>Casino</p>
            </div>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            aria-current="page"
            href="https://www.satbet0.in/live-casino-games"
          >
            <div className="nav_menus">
              <img
                src="https://asset.satbet.com/images/live.gif"
                alt="icons"
                loading="lazy"
              />
              <p>Live Casino</p>
            </div>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            aria-current="page"
            href="https://www.satbet0.in/promotions"
          >
            <div className="nav_menus">
              <img
                src="https://asset.satbet.com/images/promo.gif"
                alt="icons"
                loading="lazy"
                style={{ borderRadius: "var(--sb_px15)", border: "2px solid" }}
              />
              <p>Promotions</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MobileNavMenu;
