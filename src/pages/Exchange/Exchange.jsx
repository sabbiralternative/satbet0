/* eslint-disable react/no-unknown-property */
import Header from "../../components/modules/Exchange/Header";
import LeftSidebar from "../../components/modules/Exchange/LeftSidebar";
import MainContent from "../../components/modules/Exchange/MainContent";

const Exchange = () => {
  return (
    <div _ngcontent-xqs-c22 className="main-wrapper">
      <Header />

      <div
        _ngcontent-xqs-c22
        className="container-main d-flex left-menu-active justify-content-end"
      >
        <LeftSidebar />
        <MainContent />
      </div>
    </div>
  );
};

export default Exchange;
