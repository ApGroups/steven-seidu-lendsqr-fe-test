import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import styles from './UserPage.module.scss';
import { User } from '../../types';
import { FaFilter, FaAngleRight, FaAngleLeft, FaEllipsisV, FaEye, FaUserSlash, FaUserCheck, FaRegUser, FaUsers, FaFileContract, FaMoneyCheck} from 'react-icons/fa';

const UserComponent: React.FC = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [username, setUsername] = useState<string>('');
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }

        fetch('http://localhost:8000/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: User[]) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to load data.');
                setLoading(false);
            });
    }, []);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleDropdownClick = (index: number) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const handleViewDetails = (index: number) => {
        navigate('/UserDetails', { state: { userIndex: index } });
    };

    const paginatedUsers = users?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = users ? Math.ceil(users.length / itemsPerPage) : 1;

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const maxPageNumbersToShow = 5;
    const startIndex = Math.max(currentPage - Math.floor(maxPageNumbersToShow / 2), 0);
    const endIndex = Math.min(startIndex + maxPageNumbersToShow, totalPages);

    const pagesToShow = [
        ...pageNumbers.slice(startIndex, endIndex),
        ...(endIndex < totalPages ? ['...'] : []),
        ...(totalPages > maxPageNumbersToShow && endIndex < totalPages ? [totalPages] : [])
    ];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
        <Nav username={username} toggleSidebar={() => {}} />
        <Sidebar isVisible={true} toggleSidebar={() => {}} />
            <section className={styles.sec}>
                <div className={styles.secpad}>
                    <div>
                        <div className={styles.spacev}></div>
                        <span className={`${styles.logo} ${styles.Ulogo}`}>
                            <h1>Users</h1>
                        </span>
                    </div>
                    <div className={styles.spacev}></div>
                    <div className={styles.userSec1}>
                        <div className={styles.User1}>
                            <div className={styles.Us1}>
                                <div className={styles.us1Icon}><i><FaRegUser/></i></div>
                                <div className={styles.us1Txt}>
                                    <p>USERS</p>
                                </div>
                                <div className={styles.us1Num}>
                                    <h1>{users?.length || 0}</h1>
                                </div>
                            </div>
                        </div>
                        <div className={styles.User1}>
                            <div className={styles.Us1}>
                                <div className={`${styles.us1Icon} ${styles.Usi2}`}><i><FaUsers /></i></div>
                                <div className={styles.us1Txt}>
                                    <p>ACTIVE USERS</p>
                                </div>
                                <div className={styles.us1Num}>
                                    <h1>{users?.length || 0}</h1>
                                </div>
                            </div>
                        </div>
                        <div className={styles.User1}>
                            <div className={styles.Us1}>
                                <div className={`${styles.us1Icon} ${styles.Usi3}`}><i><FaFileContract /></i></div>
                                <div className={styles.us1Txt}>
                                    <p>USERS WITH LOANS</p>
                                </div>
                                <div className={styles.us1Num}>
                                    <h1>{users?.filter(user => parseFloat(user.loanRepayment.replace(/,/g, '')) > 0).length || 0}</h1>
                                </div>
                            </div>
                        </div>
                        <div className={styles.User1}>
                            <div className={styles.Us1}>
                                <div className={`${styles.us1Icon} ${styles.Usi4}`}><i><FaMoneyCheck /></i></div>
                                <div className={styles.us1Txt}>
                                    <p>USERS WITH SAVINGS</p>
                                </div>
                                <div className={styles.us1Num}>
                                    <h1>{users?.filter(user => parseFloat(user.monthlyIncome.replace(/,/g, '')) >= 300000).length || 0}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.table}>
                        <div className={styles.tabpad}>

                            <table>
                                <thead>
                                    <tr>
                                        <th className={styles['hide-on-small']}>
                                            <div className={styles.thflex}>
                                                <p>ORGANIZATION</p>
                                                <div className={styles.dropdown}>
                                                    <button
                                                        className={styles.dropbtn}
                                                        onClick={() => handleDropdownClick(0)}
                                                    >
                                                        <i><FaFilter /></i>
                                                    </button>
                                                    <div
                                                        className={`${styles.dropdownContent}`}
                                                        style={{
                                                            display: activeDropdown === 0 ? 'block' : 'none',
                                                            opacity: activeDropdown === 0 ? '1' : '0',
                                                            transform: activeDropdown === 0 ? 'translateY(0)' : 'translateY(10px)',
                                                            transition: 'opacity 0.5s ease, transform 0.5s ease'
                                                        }}
                                                    >
                                                        <form action="">
                                                            <div className={styles.formContainer}>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="organization">Organization</label>
                                                                    <select id="status" name="status">
                                                                        <option value="active">Choose</option>
                                                                        <option value="active">Lendsqr</option>
                                                                        <option value="active">Palmpay</option>
                                                                        <option value="active">Opay</option>
                                                                    </select>
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="username">Username</label>
                                                                    <input type="text" id="username" name="username" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="email">Email</label>
                                                                    <input type="email" id="email" name="email" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="date">Date</label>
                                                                    <input type="date" id="date" name="date" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="phone">Phone Number</label>
                                                                    <input type="tel" id="phone" name="phone" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="status">Status</label>
                                                                    <select id="status" name="status">
                                                                        <option value="active">Active</option>
                                                                        <option value="pending">Pending</option>
                                                                        <option value="inactive">Inactive</option>
                                                                        <option value="blacklisted">Blacklisted</option>
                                                                    </select>
                                                                </div>
                                                                <div className={styles.formActions}>
                                                                    <button className={styles.btnStroke} type="submit">Filter</button>
                                                                    <button className={styles.btnFill} type="submit">Filter</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                        <th>
                                            <div className={styles.thflex}>
                                                <p>USERNAME</p>
                                                <div className={styles.dropdown}>
                                                    <button
                                                        className={styles.dropbtn}
                                                        onClick={() => handleDropdownClick(1)}
                                                    >
                                                        <i><FaFilter /></i>
                                                    </button>
                                                    <div
                                                        className={`${styles.dropdownContent}`}
                                                        style={{
                                                            display: activeDropdown === 1 ? 'block' : 'none',
                                                            opacity: activeDropdown === 1 ? '1' : '0',
                                                            transform: activeDropdown === 1 ? 'translateY(0)' : 'translateY(10px)',
                                                            transition: 'opacity 0.5s ease, transform 0.5s ease'
                                                        }}
                                                    >
                                                        <form action="">
                                                            <div className={styles.formContainer}>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="organization">Organization</label>
                                                                    <select id="status" name="status">
                                                                        <option value="active">Choose</option>
                                                                        <option value="active">Lendsqr</option>
                                                                        <option value="active">Palmpay</option>
                                                                        <option value="active">Opay</option>
                                                                    </select>
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="username">Username</label>
                                                                    <input type="text" id="username" name="username" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="email">Email</label>
                                                                    <input type="email" id="email" name="email" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="date">Date</label>
                                                                    <input type="date" id="date" name="date" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="phone">Phone Number</label>
                                                                    <input type="tel" id="phone" name="phone" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="status">Status</label>
                                                                    <select id="status" name="status">
                                                                        <option value="active">Active</option>
                                                                        <option value="pending">Pending</option>
                                                                        <option value="inactive">Inactive</option>
                                                                        <option value="blacklisted">Blacklisted</option>
                                                                    </select>
                                                                </div>
                                                                <div className={styles.formActions}>
                                                                    <button className={styles.btnStroke} type="submit">Filter</button>
                                                                    <button className={styles.btnFill} type="submit">Filter</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                        <th className={styles['hide-on-Vsmall']}>
                                            <div className={styles.thflex}>
                                                <p>EMAIL</p>
                                                <div className={styles.dropdown}>
                                                    <button
                                                        className={styles.dropbtn}
                                                        onClick={() => handleDropdownClick(2)}
                                                    >
                                                        <i><FaFilter /></i>
                                                    </button>
                                                    <div
                                                        className={`${styles.dropdownContent}`}
                                                        style={{
                                                            display: activeDropdown === 2 ? 'block' : 'none',
                                                            opacity: activeDropdown === 2 ? '1' : '0',
                                                            transform: activeDropdown === 2 ? 'translateY(0)' : 'translateY(10px)',
                                                            transition: 'opacity 0.5s ease, transform 0.5s ease'
                                                        }}
                                                    >
                                                        <form action="">
                                                            <div className={styles.formContainer}>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="organization">Organization</label>
                                                                    <select id="status" name="status">
                                                                        <option value="active">Choose</option>
                                                                        <option value="active">Lendsqr</option>
                                                                        <option value="active">Palmpay</option>
                                                                        <option value="active">Opay</option>
                                                                    </select>
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="username">Username</label>
                                                                    <input type="text" id="username" name="username" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="email">Email</label>
                                                                    <input type="email" id="email" name="email" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="date">Date</label>
                                                                    <input type="date" id="date" name="date" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="phone">Phone Number</label>
                                                                    <input type="tel" id="phone" name="phone" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="status">Status</label>
                                                                    <select id="status" name="status">
                                                                        <option value="active">Active</option>
                                                                        <option value="pending">Pending</option>
                                                                        <option value="inactive">Inactive</option>
                                                                        <option value="blacklisted">Blacklisted</option>
                                                                    </select>
                                                                </div>
                                                                <div className={styles.formActions}>
                                                                    <button className={styles.btnStroke} type="submit">Filter</button>
                                                                    <button className={styles.btnFill} type="submit">Filter</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                        <th className={styles['hide-on-small']}>
                                            <div className={styles.thflex}>
                                                <p>PHONE NUMBER</p>
                                                <div className={styles.dropdown}>
                                                    <button
                                                        className={styles.dropbtn}
                                                        onClick={() => handleDropdownClick(3)}
                                                    >
                                                        <i><FaFilter /></i>
                                                    </button>
                                                    <div
                                                        className={`${styles.dropdownContent}`}
                                                        style={{
                                                            display: activeDropdown === 3 ? 'block' : 'none',
                                                            opacity: activeDropdown === 3 ? '1' : '0',
                                                            transform: activeDropdown === 3 ? 'translateY(0)' : 'translateY(10px)',
                                                            transition: 'opacity 0.5s ease, transform 0.5s ease'
                                                        }}
                                                    >
                                                        <form action="">
                                                            <div className={styles.formContainer}>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="organization">Organization</label>
                                                                    <select id="status" name="status">
                                                                        <option value="active">Choose</option>
                                                                        <option value="active">Lendsqr</option>
                                                                        <option value="active">Palmpay</option>
                                                                        <option value="active">Opay</option>
                                                                    </select>
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="username">Username</label>
                                                                    <input type="text" id="username" name="username" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="email">Email</label>
                                                                    <input type="email" id="email" name="email" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="date">Date</label>
                                                                    <input type="date" id="date" name="date" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="phone">Phone Number</label>
                                                                    <input type="tel" id="phone" name="phone" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="status">Status</label>
                                                                    <select id="status" name="status">
                                                                        <option value="active">Active</option>
                                                                        <option value="pending">Pending</option>
                                                                        <option value="inactive">Inactive</option>
                                                                        <option value="blacklisted">Blacklisted</option>
                                                                    </select>
                                                                </div>
                                                                <div className={styles.formActions}>
                                                                    <button className={styles.btnStroke} type="submit">Filter</button>
                                                                    <button className={styles.btnFill} type="submit">Filter</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                        <th className={styles['hide-on-small']}>
                                            <div className={styles.thflex}>
                                                <p>DATE JOINED</p>
                                                <div className={styles.dropdown}>
                                                    <button
                                                        className={styles.dropbtn}
                                                        onClick={() => handleDropdownClick(4)}
                                                    >
                                                        <i><FaFilter /></i>
                                                    </button>
                                                    <div
                                                        className={`${styles.dropdownContent}`}
                                                        style={{
                                                            display: activeDropdown === 4 ? 'block' : 'none',
                                                            opacity: activeDropdown === 4 ? '1' : '0',
                                                            transform: activeDropdown === 4 ? 'translateY(0)' : 'translateY(10px)',
                                                            transition: 'opacity 0.5s ease, transform 0.5s ease'
                                                        }}
                                                    >
                                                        <form action="">
                                                            <div className={styles.formContainer}>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="organization">Organization</label>
                                                                    <select id="status" name="status">
                                                                        <option value="active">Choose</option>
                                                                        <option value="active">Lendsqr</option>
                                                                        <option value="active">Palmpay</option>
                                                                        <option value="active">Opay</option>
                                                                    </select>
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="username">Username</label>
                                                                    <input type="text" id="username" name="username" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="email">Email</label>
                                                                    <input type="email" id="email" name="email" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="date">Date</label>
                                                                    <input type="date" id="date" name="date" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="phone">Phone Number</label>
                                                                    <input type="tel" id="phone" name="phone" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="status">Status</label>
                                                                    <select id="status" name="status">
                                                                        <option value="active">Active</option>
                                                                        <option value="pending">Pending</option>
                                                                        <option value="inactive">Inactive</option>
                                                                        <option value="blacklisted">Blacklisted</option>
                                                                    </select>
                                                                </div>
                                                                <div className={styles.formActions}>
                                                                    <button className={styles.btnStroke} type="submit">Filter</button>
                                                                    <button className={styles.btnFill} type="submit">Filter</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                        <th>
                                            <div className={styles.thflex}>
                                                <p>STATUS</p>
                                                <div className={styles.dropdown}>
                                                    <button
                                                        className={styles.dropbtn}
                                                        onClick={() => handleDropdownClick(5)}
                                                    >
                                                       <i><FaFilter /></i>
                                                    </button>
                                                    <div
                                                        className={`${styles.dropdownContent}`}
                                                        style={{
                                                            display: activeDropdown === 5 ? 'block' : 'none',
                                                            opacity: activeDropdown === 5 ? '1' : '0',
                                                            transform: activeDropdown === 5 ? 'translateY(0)' : 'translateY(10px)',
                                                            transition: 'opacity 0.5s ease, transform 0.5s ease'
                                                        }}
                                                    >
                                                        <form action="">
                                                            <div className={styles.formContainer}>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="organization">Organization</label>
                                                                    <select id="status" name="status">
                                                                        <option value="active">Choose</option>
                                                                        <option value="active">Lendsqr</option>
                                                                        <option value="active">Palmpay</option>
                                                                        <option value="active">Opay</option>
                                                                    </select>
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="username">Username</label>
                                                                    <input type="text" id="username" name="username" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="email">Email</label>
                                                                    <input type="email" id="email" name="email" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="date">Date</label>
                                                                    <input type="date" id="date" name="date" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="phone">Phone Number</label>
                                                                    <input type="tel" id="phone" name="phone" />
                                                                </div>
                                                                <div className={styles.formGroup}>
                                                                    <label htmlFor="status">Status</label>
                                                                    <select id="status" name="status">
                                                                        <option value="active">Active</option>
                                                                        <option value="pending">Pending</option>
                                                                        <option value="inactive">Inactive</option>
                                                                        <option value="blacklisted">Blacklisted</option>
                                                                    </select>
                                                                </div>
                                                                <div className={styles.formActions}>
                                                                    <button className={styles.btnStroke} type="submit">Filter</button>
                                                                    <button className={styles.btnFill} type="submit">Filter</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedUsers?.map((user, index) => (
                                        <tr key={index}>
                                            <td className={styles['hide-on-small']}>{user.organization}</td>
                                            <td>{user.username}</td>
                                            <td className={styles['hide-on-Vsmall']}>{user.email}</td>
                                            <td className={styles['hide-on-small']}>{user.phoneNumber}</td>
                                            <td className={styles['hide-on-small']}>{user.dateJoined}</td>
                                            <td>
                                                <div className={styles[user.status]}><span>{user.status}</span></div>
                                            </td>
                                            <td>
                                                <div className={styles.thflex}>
                                                    <div className={styles.dropdown}>
                                                        <button className={styles.dropbtn} onClick={() => handleDropdownClick(index)}>
                                                            <i><FaEllipsisV/></i>
                                                        </button>
                                                        <div className={`${styles.dropdownContent}`} style={{
                                                            display: activeDropdown === index ? 'block' : 'none',
                                                            opacity: activeDropdown === index ? '1' : '0',
                                                            transform: activeDropdown === index ? 'translateY(0)' : 'translateY(10px)',
                                                            transition: 'opacity 0.5s ease, transform 0.5s ease'
                                                        }}>
                                                            <button
                                                                className={styles.dropdownItem}
                                                                onClick={() => handleViewDetails(index)}
                                                            >
                                                                <i><FaEye/></i>View Details
                                                            </button>
                                                            <Link to={`/UserDetails/`} className={styles.dropdownItem}>
                                                                <i><FaUserSlash/></i>Blacklist User
                                                            </Link>
                                                            <Link to={`/UserDetails/`} className={styles.dropdownItem}>
                                                                <i><FaUserCheck/></i>Activate User
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={styles.Base}>
                        <div className={styles.Tbase}>
                            <p>Showing</p>
                            <div className={styles.padBa}>
                                <h1>{(currentPage - 1) * itemsPerPage + (paginatedUsers?.length || 0)}</h1><i> out of </i>
                            </div>
                            <p>{users?.length || 0}</p>
                        </div>
                        <div className={styles.Cbase}>
                            <p
                                className={styles.prevIcon}
                                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                            >
                                <i><FaAngleLeft/></i>
                            </p >
                            {pagesToShow.map((page, index) => (
                                <span className={styles['hide-on-small']}> <p
                                    key={index}
                                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                                    className={page === currentPage ? `${styles.cbaseNum} ${styles.active}` : styles.cbaseNum}
                                >
                                    {page}
                                </p></span>
                            ))}
                            <p
                                className={styles.nextIcon}
                                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                            >
                                <i><FaAngleRight/></i>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UserComponent;

