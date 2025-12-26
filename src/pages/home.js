import DisplayCard from "../components/display-card";
import FeaturedProduct from "../components/featured";
import Footer from "../components/footer";
import MainView from "../components/main-view.component";
const HomeScreen = () => {
  return (
    <>
      <MainView />
      <FeaturedProduct type={"popular"} />
      <DisplayCard />
      <FeaturedProduct type={"featured"} />
      <Footer />
    </>
  );
};

export default HomeScreen;
