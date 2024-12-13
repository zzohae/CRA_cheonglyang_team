// react
import React, { useEffect } from "react";
// data
import historydata from '../../db/infoHistoryData.json';
// svg
import { ReactComponent as Circle } from '../../asset/svg/graphic/infoHistory-circle.svg';
// style
import styles from './infoHistory.module.scss';

const { infoHistoryData } = historydata;

const C2infohistory = () => {
  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll(`.${styles["infoHistory-item"]}`);
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          item.classList.add(styles.visible);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
  <div
        className={styles.infoHistory}
        style={{
          marginTop: "50px",
          borderTop: "2px solid #d2d2d2",
        }}>
        {infoHistoryData.map((item, index) => (
          <div className={styles["infoHistory-item"]} key={index}>
            <div
              className={`${styles["infoHistory-content"]} ${
                index % 2 === 0 ? styles.left : styles.right
              }`}>
              <h3 className="fs-h3" style={{ color: "#214aee" }}>
                {item.year}
              </h3>
              <p
                className="fs-h5"
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></p>
            </div>

            <div className={styles["infoHistory-circle"]}>
              <Circle />
            </div>
          </div>
        ))}
      </div>

  );
};

export default C2infohistory;
