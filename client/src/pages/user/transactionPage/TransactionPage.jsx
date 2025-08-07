import React from "react";
import styles from "../transactionPage/TransactionPage.module.css";
import warningIcon from "../../../assets/transactionFailImg/warning-image1-remove.png";
import { useNavigate } from "react-router-dom";

const TransactionPage = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate("/payment"); 
  };

  return (
    <div className={styles.container}>
      <img src={warningIcon} alt="Warning" className={styles.icon} />
      <h1 className={styles.text}>Transaction Failed</h1>
      <button className={styles.tryButton} onClick={handleTryAgain}>
        Try Again
      </button>
    </div>
  );
};

export default TransactionPage;
