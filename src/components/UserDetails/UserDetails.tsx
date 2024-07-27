import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import styles from './UserDetails.module.scss';
import { User } from '../../types';
import profile from '../../assets/images/user.jpeg';
import { FaRegStar, FaStar, FaRegFileAlt, FaArrowLeft, FaFile, FaMoneyBill, FaMoneyBillWaveAlt, FaUniversity } from 'react-icons/fa';

const UserDetails: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<string>('generalDetails');
    const location = useLocation();
    const navigate = useNavigate();

    const userIndex = location.state?.userIndex;

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }

        if (userIndex === undefined) {
            setError('No user ID provided.');
            setLoading(false);
            return;
        }

        fetch(`https://steven-seidu-lendsqr-fe-test.vercel.app/api/users?index=${userIndex}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: User) => {
                setUser(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                setError('Failed to load user details.');
                setLoading(false);
            });
    }, [userIndex]);

    const handleSectionChange = (section: string) => {
        setActiveSection(section);
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'generalDetails':
                return (
                    <div className={styles.spacev}>
                        <div className={styles.User1}>
                            {/* Personal Information */}
                            <div className={styles.userPb}>
                                <table className={styles.infoTable}>
                                    <thead>
                                        <tr>
                                            <th colSpan={5}>Personal Information</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Phone Number</th>
                                            <th>Email Address</th>
                                            <th>BVN</th>
                                            <th>Gender</th>
                                        </tr>
                                        <tr>
                                            <td>{user?.fullName}</td>
                                            <td>{user?.phoneNumber}</td>
                                            <td>{user?.email}</td>
                                            <td>{user?.bvn}</td>
                                            <td>{user?.gender}</td>
                                        </tr>
                                        <tr>
                                            <th>Marital Status</th>
                                            <th>Children</th>
                                            <th>Type of Residence</th>
                                            <th colSpan={2}></th>
                                        </tr>
                                        <tr>
                                            <td>{user?.maritalStatus}</td>
                                            <td>{user?.children}</td>
                                            <td>{user?.typeOfResidence}</td>
                                            <td colSpan={2}></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Education and Employment */}
                            <div className={styles.userPb}>
                                <table className={styles.infoTable}>
                                    <thead>
                                        <tr>
                                            <th colSpan={4}>Education and Employment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Level of Education</th>
                                            <th>Employment Status</th>
                                            <th>Sector of Employment</th>
                                            <th>Duration of Employment</th>
                                        </tr>
                                        <tr>
                                            <td>{user?.levelOfEducation}</td>
                                            <td>{user?.employmentStatus}</td>
                                            <td>{user?.sectorOfEmployment}</td>
                                            <td>{user?.durationOfEmployment}</td>
                                        </tr>
                                        <tr>
                                            <th>Office Email</th>
                                            <th>Monthly Income</th>
                                            <th>Loan Repayment</th>
                                            <th></th>
                                        </tr>
                                        <tr>
                                            <td>{user?.officeEmail}</td>
                                            <td>₦{user?.monthlyIncome}</td>
                                            <td>₦{user?.loanRepayment}</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Socials */}
                            <div className={styles.userPb}>
                                <table className={styles.infoTable}>
                                    <thead>
                                        <tr>
                                            <th colSpan={3}>Socials</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Twitter</th>
                                            <th>Facebook</th>
                                            <th>Instagram</th>
                                        </tr>
                                        <tr>
                                            <td>{user?.twitter}</td>
                                            <td>{user?.facebook}</td>
                                            <td>{user?.instagram}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Guarantor */}
                            <div className={styles.userPb}>
                                <table className={styles.infoTable}>
                                    <thead>
                                        <tr>
                                            <th colSpan={4}>Guarantor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Phone Number</th>
                                            <th>Email Address</th>
                                            <th>Relationship</th>
                                        </tr>
                                        {user?.guarantor.map((g, index) => (
                                            <tr key={index}>
                                                <td>{g.fullName}</td>
                                                <td>{g.phoneNumber}</td>
                                                <td>{g.emailAddress}</td>
                                                <td>{g.relationship}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            case 'documents':
                return <div>Documents Section</div>;
            case 'bankDetails':
                return <div>Bank Details Section</div>;
            case 'loans':
                return <div>Loans Section</div>;
            case 'savings':
                return <div>Savings Section</div>;
            case 'appAndSystem':
                return <div>App and System Section</div>;
            default:
                return <div>Select a section</div>;
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Nav username={username} toggleSidebar={() => { }} />
            <Sidebar isVisible={true} toggleSidebar={() => { }} />
            <section className={styles.sec}>
                <div className={styles.secpad}>
                    <div>
                        <button className={`${styles.logo} ${styles.Ulogo}`} onClick={() => navigate('/UserPage')}>
                            <FaArrowLeft /> Back to users
                        </button>
                        <div className={styles.uselogo}>
                            <span className={`${styles.logo} ${styles.Ulogo}`}>
                                <h1>User Details</h1>
                            </span>
                            <div className={`${styles.uselogo} ${styles.uLo}`}>
                                <div>
                                    <button className={`${styles.userDBTN} ${styles.blockred}`}>
                                        Blacklist User
                                    </button>
                                </div>
                                <div>
                                    <button className={`${styles.userDBTN} ${styles.actigren}`}>
                                        Activate User
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.spacev}></div>
                    <div className={styles.userSec1}>
                        <div className={`${styles.User1} ${styles.userDash}`}>
                            <div className={styles.Us1}>
                                <div className={styles.genHead}>
                                    <div className={styles.genim}>
                                        <img className={styles.proImg} src={profile} alt="Profile" />
                                    </div>
                                    <div className={styles.genSide}>
                                        <div className={styles.genSpa}>
                                            <h1>{user?.fullName}</h1>
                                            <p>{user?.username}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.genSide} ${styles.genS}`}>
                                        <div className={`${styles.genSpa} ${styles.genspar} ${styles.dengol}`}>
                                            <h1>User’s Tier</h1>
                                            <p><FaStar /><FaRegStar /><FaRegStar /></p>
                                        </div>
                                    </div>
                                    <div className={`${styles.genSide} ${styles.genS}`}>
                                        <div className={`${styles.genSpa} ${styles.genspar} ${styles.dengol}`}>
                                            <h1>Account Balance</h1>
                                            <p>₦{user?.accountBalance}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.genSide} ${styles.genS}`}>
                                        <div className={`${styles.genSpa} ${styles.genspar} ${styles.dengol}`}>
                                            <h1>Phone Number</h1>
                                            <p>{user?.phoneNumber}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.genSide} ${styles.genS}`}>
                                        <div className={`${styles.genSpa} ${styles.genspar} ${styles.dengol}`}>
                                            <h1>Nationality</h1>
                                            <p>{user?.nationality}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.genSide} ${styles.genS}`}>
                                        <div className={`${styles.genSpa} ${styles.genspar} ${styles.dengol}`}>
                                            <h1>Gender</h1>
                                            <p>{user?.gender}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.genBottom}>
                                    <div className={styles.tabBtns}>
                                        <button onClick={() => handleSectionChange('generalDetails')} className={activeSection === 'generalDetails' ? styles.active : ''}>
                                            <FaRegFileAlt /> General Details
                                        </button>
                                        <button onClick={() => handleSectionChange('documents')} className={activeSection === 'documents' ? styles.active : ''}>
                                            <FaFile /> Documents
                                        </button>
                                        <button onClick={() => handleSectionChange('bankDetails')} className={activeSection === 'bankDetails' ? styles.active : ''}>
                                            <FaMoneyBill /> Bank Details
                                        </button>
                                        <button onClick={() => handleSectionChange('loans')} className={activeSection === 'loans' ? styles.active : ''}>
                                            <FaMoneyBillWaveAlt /> Loans
                                        </button>
                                        <button onClick={() => handleSectionChange('savings')} className={activeSection === 'savings' ? styles.active : ''}>
                                            <FaUniversity /> Savings
                                        </button>
                                        <button onClick={() => handleSectionChange('appAndSystem')} className={activeSection === 'appAndSystem' ? styles.active : ''}>
                                            <FaRegFileAlt /> App and System
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.User1}>{renderSection()}</div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UserDetails;
