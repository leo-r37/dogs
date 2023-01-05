import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import s from "./Breeds.module.css";
import {
  getData,
  getDogById,
  setNotification,
  hideNotification,
  showNotification,
} from "../redux/actions";

import Loading from "../components/Loading.jsx";
import Navbar from "../components/Navbar.jsx";
import BreedCard from "../components/BreedCard";
import PageController from "../components/PageController";
import { useEffect } from "react";
import Notification from "../components/Notification";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";

const Breeds = ({
  loading,
  items,
  getData,
  getDogById,
  firstElement,
  lastElement,
  notificationStatus,
  notificationTitle,
  hideNotification,
  showNotification,
}) => {
  useEffect(() => {
    if (items.length <= 0) getData();
    if (notificationTitle) {
      showNotification();
      setTimeout(() => {
        hideNotification();
      }, 3000);
    }
  }, [getData, items, notificationTitle, hideNotification, showNotification]);

  const history = useHistory();

  const handleOnClick = (id) => {
    getDogById(id);
    history.push(`/breeds/${id}`);
  };

  return (
    <div>
      <Navbar />
      {notificationStatus ? <Notification /> : null}
      {loading ? (
        <Loading />
      ) : (
        <div className={s.container}>
          <TopBar />
          <div className={s.main}>
            <PageController />
            <div className={s.cardsContainer}>
              {[...items].slice(firstElement, lastElement).map((b, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => handleOnClick(b.id)}
                    className={s.link}
                  >
                    <BreedCard
                      name={b.name}
                      weightMin={b.weightMin}
                      weightMax={b.weightMax}
                      image={b.image}
                      temperaments={b.temperaments}
                    />
                  </div>
                );
              })}
            </div>
            <PageController />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.breeds.loading,
  items: state.breeds.items,
  breeds: state.breeds.breeds,
  temperaments: state.breeds.temperaments,
  filters: state.filters.filters,
  firstElement: state.pages.firstElement,
  lastElement: state.pages.lastElement,
  notificationStatus: state.notification.status,
  notificationTitle: state.notification.title,
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getData()),
  getDogById: (id) => dispatch(getDogById(id)),
  setNotification: (title, msg, ico) =>
    dispatch(setNotification(title, msg, ico)),
  showNotification: () => dispatch(showNotification()),
  hideNotification: () => dispatch(hideNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
