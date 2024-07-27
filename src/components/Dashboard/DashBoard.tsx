import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Nav from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import styles from './DashBoard.module.scss';
import styless from '../../components/Common/Common.module.scss';
import { User } from '../../types';
import { FaEllipsisH, FaFacebookMessenger, FaInstagram, FaTwitter } from 'react-icons/fa';
import { ApexOptions } from 'apexcharts';
import profile from '../../assets/images/user.jpeg';

const UserComponent: React.FC = () => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [totalLoan, setTotalLoan] = useState<number>(0);
    const [loanRepayments, setLoanRepayments] = useState<number[]>([]);
    const [expenses, setExpenses] = useState<number[]>([]);
    const [twitterCount, setTwitterCount] = useState<number>(60);
    const [facebookCount, setFacebookCount] = useState<number>(20);
    const [instagramCount, setInstagramCount] = useState<number>(90);

    const [chartOptions, setChartOptions] = useState<ApexOptions>({
        chart: {
            type: 'line',
            height: '100%',
            toolbar: { show: true }
        },
        stroke: { curve: 'smooth', width: 2 },
        xaxis: {
            categories: [],
            labels: { rotate: -45, style: { fontSize: '14px', fontFamily: 'Helvetica, Arial, sans-serif' } }
        },
        yaxis: {
            title: { text: 'Number of Users' },
            tickAmount: 5,
            labels: { style: { fontSize: '14px', fontFamily: 'Helvetica, Arial, sans-serif' } },
            min: 0,
            forceNiceScale: true
        },
        fill: { colors: ['#FF4560'] },
        tooltip: { y: { formatter: (val) => `${val} users` } },
        responsive: [
            { breakpoint: 1504, options: { chart: { height: '200px' } } },
            { breakpoint: 768, options: { chart: { height: '250px' } } }
        ]
    });

    const [barChartOptions, setBarChartOptions] = useState<ApexOptions>({
        chart: {
            type: 'bar',
            height: '100%',
            toolbar: { show: true }
        },
        xaxis: {
            categories: [],
            labels: { rotate: -45, style: { fontSize: '14px', fontFamily: 'Helvetica, Arial, sans-serif' } }
        },
        yaxis: {
            title: { text: 'Number of Users' },
            tickAmount: 5,
            labels: { style: { fontSize: '14px', fontFamily: 'Helvetica, Arial, sans-serif' } },
            min: 0,
            forceNiceScale: true
        },
        fill: { colors: ['#FF4560'] },
        tooltip: { y: { formatter: (val) => `${val} users` } },
        responsive: [
            { breakpoint: 1504, options: { chart: { height: '200px' } } },
            { breakpoint: 768, options: { chart: { height: '200px' } } }
        ]
    });

    const donutChartOptions: ApexOptions = {
        chart: { type: 'donut' },
        stroke: { curve: 'smooth', width: 0.5 },
        labels: ['Loan Repayments', 'Expenses'],
        responsive: [
            { breakpoint: 1504, options: { chart: { width: 300 } } },
            { breakpoint: 768, options: { chart: { width: 250 } } }
        ]
    };

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }

        fetch('https://steven-seidu-lendsqr-fe-test.vercel.app/api/users')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then((data: User[]) => {
                setUsers(data);
                setLoading(false);

                const dateFormatOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
                const userCounts: Record<string, number> = {};

                let totalLoanAmount = 0;
                let totalExpenses = 0;

                const currentYear = new Date().getFullYear();
                const sixYearsAgo = currentYear - 5; // To show the last 6 years

                data.forEach(user => {
                    const date = new Date(user.dateJoined);
                    const year = date.getFullYear();

                    if (year >= sixYearsAgo) {
                        const monthYear = date.toLocaleDateString('en-US', dateFormatOptions);

                        if (!userCounts[monthYear]) {
                            userCounts[monthYear] = 0;
                        }
                        userCounts[monthYear]++;

                        const loanAmount = parseFloat(user.loanRepayment.replace(/,/g, ''));
                        if (!isNaN(loanAmount)) {
                            totalLoanAmount += loanAmount;
                        }

                        const expenseAmount = parseFloat(user.monthlyIncome.replace(/,/g, ''));
                        if (!isNaN(expenseAmount)) {
                            totalExpenses += expenseAmount;
                        }
                    }
                });

                const categories = Object.keys(userCounts);
                const series = Object.values(userCounts);

                setChartOptions(prevOptions => ({
                    ...prevOptions,
                    xaxis: { categories: categories },
                    series: [{ name: 'Users', data: series }]
                }));

                setBarChartOptions(prevOptions => ({
                    ...prevOptions,
                    xaxis: { categories: categories.filter((_, index) => index % 20 === 0) },
                    series: [{ name: 'Users', data: series }]
                }));

                setTotalLoan(totalLoanAmount);
                setLoanRepayments([totalLoanAmount]);
                setExpenses([totalExpenses]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to load data.');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (users) {
            fetch('https://steven-seidu-lendsqr-fe-test.vercel.app/api/users')
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then((data: { twitter: number, facebook: number, instagram: number }) => {

                    setTwitterCount(data.twitter);
                    setFacebookCount(data.facebook);
                    setInstagramCount(data.instagram);
                })
                .catch(error => {
                    console.error('Error fetching social media stats:', error);
                });
        }
    }, [users]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const totalSocialMediaCounts = twitterCount + facebookCount + instagramCount;

    const twitterPercentage = (totalSocialMediaCounts === 0 ? 0 : (twitterCount / totalSocialMediaCounts) * 100);
    const facebookPercentage = (totalSocialMediaCounts === 0 ? 0 : (facebookCount / totalSocialMediaCounts) * 100);
    const instagramPercentage = (totalSocialMediaCounts === 0 ? 0 : (instagramCount / totalSocialMediaCounts) * 100);

    return (
        <>
        <Nav username={username} toggleSidebar={() => {}} />
        <Sidebar isVisible={true} toggleSidebar={() => {}} />
            <section className={styles.sec}>
                <div className={styles.secpad}>
                    <div className={styles.spacev}></div>
                    <div className={styles.userSec1}>
                        <div className={`${styles.User1} ${styles.userr1}`}>
                            <div className={styles.Us1}>
                                <div>
                                    <div className={styles.us1Txt}>
                                        <p>Statistics</p>
                                        <div className={styles.us1Icon}><i><FaEllipsisH /></i></div>
                                    </div>
                                    <div className={`${styles.chartContainer} ${styles.hiddenText}`}>
                                        <ReactApexChart
                                            options={donutChartOptions}
                                            series={loanRepayments}
                                            type="donut"
                                            height="100%"
                                            width="100%"
                                        />
                                    </div>
                                <div className={`${styles.chartContainer} ${styles.showCha}`}>
                                    <ReactApexChart
                                        options={barChartOptions}
                                        series={[{ name: 'Activity', data: [10, 15, 20, 25, 30] }]}
                                        type="bar"
                                        height="100%"
                                        width="100%"
                                    />
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.User1}>
                            <div className={styles.Us1}>
                                <div>
                                    <div className={styles.us1Txt}>
                                        <p>Statistics</p>
                                        <div className={styles.us1Icon}><i><FaEllipsisH /></i></div>
                                    </div>
                                    <div className={`${styles.chartContainer} ${styles.hiddenText}`}>
                                        <ReactApexChart
                                            options={donutChartOptions}
                                            series={expenses}
                                            type="donut"
                                            width="100%"
                                        />
                                    </div>
                                <div className={`${styles.chartContainer} ${styles.showCha}`}>
                                    <ReactApexChart
                                        options={barChartOptions}
                                        series={[{ name: 'Activity', data: [10, 15, 20, 25, 30] }]}
                                        type="bar"
                                        height="100%"
                                        width="100%"
                                    />
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.User1}>
                            <div className={styles.Us1}>
                                <div className={styles.us1Txt}>
                                    <p>Total Balance</p>
                                    <div className={styles.us1Icon}><i><FaEllipsisH /></i></div>
                                </div>
                                <div className={styles.chartContainer}>
                                    <p>{totalLoan}</p>
                                    <div className={styles.chartContainer}>
                                        <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height="70%" width="100%" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.userSec1}>
                        <div className={`${styles.User1} ${styles.userSec2}`}>
                            <div className={styles.Us1}>
                                <div className={styles.us1Txt}>
                                    <p>Unique Visitors</p>
                                    <div className={styles.us1Icon}><i><FaEllipsisH /></i></div>
                                </div>
                                <div className={styles.chartContainer}>
                                    <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height="100%" width="100%" />
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.User1} ${styles.userSec3}`}>
                            <div className={styles.Us1}>
                                <div className={styles.us1Txt}>
                                    <p>Activity Log</p>
                                    <div className={styles.us1Icon}><i><FaEllipsisH /></i></div>
                                </div>
                                <div className={styles.flex}>
                                <div className={`${styles.navPro} ${styles.imgp}`}>
                                    <img className={styless.navimg} src={profile} alt="Profile" />
                                    <h3>{username}</h3>
                                </div>
                                <div className={`${styles.navPro} ${styles.imgp}`}>
                                    <img className={styless.navimg} src={profile} alt="Profile" />
                                    <h3>{username}</h3>
                                </div>
                                <div className={`${styles.navPro} ${styles.imgp}`}>
                                    <img className={styless.navimg} src={profile} alt="Profile" />
                                    <h3>{username}</h3>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.userSec1}>
                        <div className={`${styles.User1} ${styles.userSec4}`}>
                            <div className={styles.Us1}>
                                <div className={styles.us1Txt}>
                                    <p className={styles.us1Txtt}>Visitors by Browser</p>
                                </div>
                                <div className={styles.chartContainer}>
                                    <div className={styles.browserStats}>
                                        <div className={styles.browserItem}>
                                            <div className={styles.browserIcon}><p><FaTwitter /></p></div>
                                            <div className={styles.progressBar}>
                                                <div className={styles.progress} style={{ width: `${twitterPercentage}%` }}></div>
                                            </div>
                                        </div>
                                        <div className={styles.browserItem}>
                                            <div className={styles.browserIcon}><p><FaFacebookMessenger /></p></div>
                                            <div className={styles.progressBar}>
                                                <div className={styles.progress} style={{ width: `${facebookPercentage}%` }}></div>
                                            </div>
                                        </div>
                                        <div className={styles.browserItem}>
                                            <div className={styles.browserIcon}><p><FaInstagram /></p></div>
                                            <div className={styles.progressBar}>
                                                <div className={styles.progress} style={{ width: `${instagramPercentage}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.User1}>
                            <div className={styles.Us1}>
                                <div className={styles.us1Txt}>
                                    <p><FaTwitter /></p>
                                    <div className={styles.us1Icon}><i><FaEllipsisH /></i></div>
                                </div>
                                <div className={styles.chartContainer}>
                                    <p>100</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.User1}>
                            <div className={styles.Us1}>
                                <div className={styles.us1Txt}>
                                    <p><FaFacebookMessenger /></p>
                                    <div className={styles.us1Icon}><i><FaEllipsisH /></i></div>
                                </div>
                                <div className={styles.chartContainer}>
                                    <p>100</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.User1}>
                            <div className={styles.Us1}>
                                <div className={styles.us1Txt}>
                                    <p><FaInstagram /></p>
                                    <div className={styles.us1Icon}><i><FaEllipsisH /></i></div>
                                </div>
                                <div className={styles.chartContainer}>
                                    <p>100</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.userSec1}>
                        <div className={styles.User1}>
                            <div className={styles.Us1}>
                                <div className={styles.us1Txt}>
                                    <p><FaTwitter /></p>
                                    <div className={styles.us1Icon}><i><FaEllipsisH /></i></div>
                                </div>
                                <div className={styles.chartContainer}>
                                    <ReactApexChart
                                        options={barChartOptions}
                                        series={[{ name: 'Activity', data: [10, 15, 20, 25, 30] }]}
                                        type="bar"
                                        height="100%"
                                        width="100%"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.User1}>
                            <div className={styles.Us1}>
                                <div className={styles.us1Txt}>
                                    <p><FaFacebookMessenger /></p>
                                    <div className={styles.us1Icon}><i><FaEllipsisH /></i></div>
                                </div>
                                <div className={styles.chartContainer}>
                                    <ReactApexChart
                                        options={barChartOptions}
                                        series={[{ name: 'Activity', data: [10, 15, 20, 25, 30] }]}
                                        type="bar"
                                        height="100%"
                                        width="100%"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.User1} ${styles.Us11}`}>
                            <div className={styles.Us1}>
                                <div className={styles.us1Txt}>
                                    <p><FaInstagram /></p>
                                    <div className={styles.us1Icon}><i><FaEllipsisH /></i></div>
                                </div>
                                <div className={styles.chartContainer}>
                                    <ReactApexChart
                                        options={barChartOptions}
                                        series={[{ name: 'Activity', data: [10, 15, 20, 25, 30] }]}
                                        type="bar"
                                        height="100%"
                                        width="100%"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className={styles.Base}>
                        <div className={styles.Tbase}>
                            <p>Showing</p>
                        </div>
                    </div> */}
            </section>
        </>
    );
}

export default UserComponent;
