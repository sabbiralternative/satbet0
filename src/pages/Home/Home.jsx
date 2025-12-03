import ClubLoyaltyDownloadApp from "../../components/modules/Home/ClubLoyaltyDownloadApp";
import GameProvider from "../../components/modules/Home/GameProvider";
import Hero from "../../components/modules/Home/Hero";
import HowToPlay from "../../components/modules/Home/HowToPlay";
import NewGames from "../../components/modules/Home/NewGames";
import PopularCasinoGames from "../../components/modules/Home/PopularCasinoGames";
import TopSports from "../../components/modules/Home/TopSports";

const Home = () => {
  return (
    <div>
      <Hero />
      <TopSports />
      <PopularCasinoGames />
      <NewGames />
      <GameProvider />
      <HowToPlay />
      <ClubLoyaltyDownloadApp />
    </div>
  );
};

export default Home;
