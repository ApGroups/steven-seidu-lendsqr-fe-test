import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import styles from './UserDetails.module.scss';
import { User } from '../../types';
import profile from '../../assets/images/user.jpeg';
import { FaRegStar, FaStarHalfAlt, FaStar, FaRegFileAlt, FaArrowLeft, FaFile, FaMoneyBill, FaMoneyBillWaveAlt, FaUniversity} from 'react-icons/fa';

const UserDetails: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<string>('generalDetails');
    const location = useLocation();
    const navigate = useNavigate();

    // Extract user index from the location state
    const { userIndex } = location.state as { userIndex: number };

    useEffect(() => {
        console.log('Index from params:', userIndex);
        if (userIndex === undefined) {
            setError('No user ID provided.');
            setLoading(false);
            return;
        }

        fetch(`http://localhost:8000/users/${userIndex}`)
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
                            <div className={styles.UserBp}>
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
            <Nav username={user?.username || ''} />
            <Sidebar />
            <section className={styles.sec}>
                <div className={styles.secpad}>
                    <div>
                        <span className={`${styles.logo} ${styles.Ulogo}`} onClick={() => navigate('/UserPage')}>
                            {/* <i>#</i> */}
                            <p><FaArrowLeft />Back to users</p>
                        </span>
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
                                            <p><i><FaStar/></i><i><FaRegStar/></i><i><FaRegStar/></i></p>
                                        </div>
                                    </div>
                                    <div className={styles.genSide}>
                                        <div className={styles.genSpa}>
                                            <h1>₦{user?.monthlyIncome}</h1>
                                            <p>{user?.phoneNumber}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.genDets}>
                                    <a
                                        href="#"
                                        onClick={() => handleSectionChange('generalDetails')}
                                        className={activeSection === 'generalDetails' ? styles.genAct : ''}
                                    >
                                        <p className={activeSection === 'generalDetails' ? styles.genActive : ''}><span className={styles.hiddenText}>General Details</span></p>
                                        <p className={styles.gendIco}><i><FaFile/></i></p>
                                    </a>
                                    <a
                                        href="#"
                                        onClick={() => handleSectionChange('documents')}
                                        className={activeSection === 'documents' ? styles.genAct : ''}
                                    >
                                        <span className={styles.hiddenText}> Documents</span>
                                        <p className={styles.gendIco}><i><FaRegFileAlt/></i></p>
                                    </a>
                                    <a
                                        href="#"
                                        onClick={() => handleSectionChange('bankDetails')}
                                        className={activeSection === 'bankDetails' ? styles.genAct : ''}
                                    >
                                        <span className={styles.hiddenText}> Bank Details</span>
                                        <p className={styles.gendIco}><i><FaUniversity/></i></p>
                                    </a>
                                    <a
                                        href="#"
                                        onClick={() => handleSectionChange('loans')}
                                        className={activeSection === 'loans' ? styles.genAct : ''}
                                    >
                                        <span className={styles.hiddenText}> Loans</span>
                                        <p className={styles.gendIco}><i><FaMoneyBill/></i></p>
                                    </a>
                                    <a
                                        href="#"
                                        onClick={() => handleSectionChange('savings')}
                                        className={activeSection === 'savings' ? styles.genAct : ''}
                                    >
                                        <span className={styles.hiddenText}> Savings</span>
                                        <p className={styles.gendIco}><i><FaMoneyBillWaveAlt/></i></p>
                                    </a>
                                    <a
                                        href="#"
                                        onClick={() => handleSectionChange('appAndSystem')}
                                        className={activeSection === 'appAndSystem' ? styles.genAct : ''}
                                    >
                                        <span className={styles.hiddenText}> App and Systems</span>
                                        <p className={styles.gendIco}><i>#</i></p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.spacev}>
                        {renderSection()}
                    </div>
                </div>
            </section>
        </>
    );
};

export default UserDetails;
