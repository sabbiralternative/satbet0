import ClubLoyaltyDownloadApp from "../../components/modules/Home/ClubLoyaltyDownloadApp";
import GameProvider from "../../components/modules/Home/GameProvider";
import Hero from "../../components/modules/Home/Hero";
import HowToPlay from "../../components/modules/Home/HowToPlay";
import NewGames from "../../components/modules/Home/NewGames";
import PopularCasinoGames from "../../components/modules/Home/PopularCasinoGames";
import TopSports from "../../components/modules/Home/TopSports";
import WhatsApp from "../../components/modules/Home/WhatsApp";
import { useLotusHomeLobby } from "../../hooks/lotusHomeLobby";

const Home = () => {
  const { data: lotusLobby } = useLotusHomeLobby();
  return (
    <div>
      <WhatsApp />
      <Hero />
      <TopSports />
      <GameProvider casinoProviders={lotusLobby?.casinoProviders} />
      <NewGames />
      <PopularCasinoGames popularGames={lotusLobby?.popularGames} />
      <HowToPlay />
      <ClubLoyaltyDownloadApp />
    </div>
  );
};

export default Home;
