import MainContent from "../../components/modules/EventDetails/MainContent";
import Header from "../../components/modules/Exchange/Header";
import LeftSidebar from "../../components/modules/Exchange/LeftSidebar";

const EventDetails = () => {
  return (
    <div className="main-wrapper">
      <Header />

      <div className="container-main d-flex left-menu-active justify-content-end">
        <LeftSidebar />
        <MainContent />
      </div>
    </div>
  );
};

export default EventDetails;
