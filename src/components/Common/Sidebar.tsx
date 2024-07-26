import React from 'react';
import { FaHome, FaUsers, FaUserShield, FaDollarSign, FaChartLine, FaUniversity, FaHandHoldingUsd, FaCogs, FaRegFileAlt, FaBoxes, FaBriefcase, FaExchangeAlt, FaTools, FaLock, FaRegFileCode, FaPowerOff, FaThList } from 'react-icons/fa';
import styles from './Common.module.scss'; // Adjust the path if necessary
import { Link } from 'react-router-dom';

interface SidebarProps {
  isVisible: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible }) => {
  return (
    <div className={`${styles.sidebar} ${isVisible ? styles.visible : styles.hidden}`}>
    <div className={styles.leftbar}>
      <div className={styles.leftpad}>
        <ul className={styles.switchO}>
          <li><FaHome /><span className={styles.hiddenText}>Switch Organization </span><FaExchangeAlt /></li>
          <li><Link className={styles.nodeco} to="/DashBoard"><FaThList /><span className={styles.hiddenText}>DASHBOARD</span></Link></li>
        </ul>
        <ul className={`${styles.leftCust} ${styles.lefthov}`}>
          <p className={styles.liHead}><b><span className={styles.hiddenText}>CUSTOMERS</span></b></p>
          <li><Link className={styles.nodeco} to="/UserPage"><FaUsers /><span className={styles.hiddenText}>Users</span></Link></li>
          <li><FaUserShield /><span className={styles.hiddenText}>Guarantors</span></li>
          <li><FaDollarSign /><span className={styles.hiddenText}>Loans</span></li>
          <li><FaChartLine /><span className={styles.hiddenText}>Decision Models</span></li>
          <li><FaUniversity /><span className={styles.hiddenText}>Savings</span></li>
          <li><FaRegFileAlt /><span className={styles.hiddenText}>Loan Requests</span></li>
          <li><FaLock /><span className={styles.hiddenText}>Whitelist</span></li>
          <li><FaRegFileCode /><span className={styles.hiddenText}>Karma</span></li>
        </ul>
        <ul className={`${styles.leftBuss} ${styles.lefthov}`}>
          <p className={styles.liHead}><b><span className={styles.hiddenText}>BUSINESS</span></b></p>
          <li><FaBriefcase /><span className={styles.hiddenText}>Organization</span></li>
          <li><FaBoxes /><span className={styles.hiddenText}>Loan Products</span></li>
          <li><FaHandHoldingUsd /><span className={styles.hiddenText}>Savings Products</span></li>
          <li><FaDollarSign /><span className={styles.hiddenText}>Fees and Charges</span></li>
          <li><FaExchangeAlt /><span className={styles.hiddenText}>Transactions</span></li>
          <li><FaTools /><span className={styles.hiddenText}>Services</span></li>
          <li><FaTools /><span className={styles.hiddenText}>Service Account</span></li>
          <li><FaDollarSign /><span className={styles.hiddenText}>Settlements</span></li>
          <li><FaBoxes /><span className={styles.hiddenText}>Reports</span></li>
        </ul>
        <ul className={`${styles.leftSet} ${styles.lefthov}`}>
          <p className={styles.liHead}><b><span className={styles.hiddenText}>SETTINGS</span></b></p>
          <li><FaCogs /><span className={styles.hiddenText}>Preferences</span></li>
          <li><FaDollarSign /><span className={styles.hiddenText}>Fees and Pricing</span></li>
          <li><FaRegFileAlt /><span className={styles.hiddenText}>Audit Logs</span></li>
          <li><FaRegFileAlt /><span className={styles.hiddenText}>Systems Messages</span></li>
        </ul>
        <ul className={`${styles.lefthov} ${styles.logou}`}>
          <li><FaPowerOff /><span className={styles.hiddenText}>Logout</span></li>
          <p><span className={styles.hiddenText}>v1.2.0</span></p>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
