import React from 'react';
import Logo from '../../assets/images/Logo.png';
import profile from '../../assets/images/user.jpeg';
import styles from './Common.module.scss'; 
import { Link } from 'react-router-dom';
import { FaBell, FaSearch, FaAngleDown, FaEllipsisV } from 'react-icons/fa';

interface NavProps {
  username: string;
  toggleSidebar: () => void;
}

const Nav: React.FC<NavProps> = ({ username, toggleSidebar }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.pad}>
        <div className={styles.Mnav}>
          <div className={styles.logo}>
            <img src={Logo} alt="Lendsqr Logo" />
            <h1><Link className={styles.nodeco} to="/DashBoard">Lendsqr</Link></h1>
          </div>
          <div className={styles.form}>
            <form action="#" method="post">
              <div className={styles.formGroup}>
                <div className={styles.searchContainer}>
                  <input
                    type="search"
                    id="search"
                    placeholder="Search for anything"
                    required
                  />
                  <span className={styles.showSearch} id="showSearch">
                    <i><FaSearch /></i>
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.doc}>
            <ul className={styles.docUl}>
              <div className={styles.docUll}>
                <li><button type="button">Docs</button></li>
                <li><button type="button"><i><FaBell /></i></button></li>
              </div>
              <li className={styles.nolipad}>
                <div className={styles.navPro}>
                  <img className={styles.navimg} src={profile} alt="Profile" />
                  <h3>{username}</h3>
                  <i><FaAngleDown /></i>
              <div className={styles.leftbarbtn} onClick={toggleSidebar}>
                <i>< FaEllipsisV/></i>
              </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
