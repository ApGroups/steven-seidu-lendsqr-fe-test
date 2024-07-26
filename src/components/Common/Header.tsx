import React, { useState } from 'react';
import Logo from '../../assets/images/Logo.png';
import profile from '../../assets/images/user.jpeg';
import styles from './Common.module.scss'; 
import { Link } from 'react-router-dom';
import { FaBell, FaSearch, FaAngleDown} from 'react-icons/fa';

const Nav: React.FC<{ username: string }> = ({ username }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.pad}>
        <div className={styles.Mnav}>
          <div className={styles.logo}>
            <img src={Logo} alt="Lendsqr Logo" />
            <h1><Link className={styles.nodeco} to="/UserPage">Lendsqr</Link></h1>
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
                    <i>< FaSearch/></i>
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.doc}>
            <ul className={styles.docUl}>
              <div className={styles.docUll}>
              <li><a href="#">Docs</a></li>
              <li><a href="#"><i>< FaBell/></i></a></li>
              </div>
              <li className={styles.nolipad}>
                <div className={styles.navPro}>
                  <img className={styles.navimg} src={profile} alt="Profile" />
                  <h3>{username}</h3>
                  <i>< FaAngleDown/></i>
                </div>
              </li>
              <li className={styles.leftbarbtn}><i>#</i></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
