import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import Logo from '../../assets/images/Logo.png';

const UserComponent: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://steven-seidu-lendsqr-fe-test.vercel.app/api/users', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Store the username in local storage or context
      localStorage.setItem('username', data.username); 
  
      navigate('/DashBoard'); 
    } catch (error) {
      setError('Authentication failed. Please check your credentials.');
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.sec}>
      <div className={styles.login}>
        <div className={styles.logleft}>
          <div>
            <div className={styles.logospace}></div>
            <span className={styles.img}>
              <img src={Logo} alt="Lendsqr Logo" />
              <h1>Lendsqr</h1>
            </span>
            <div className={styles.logospace}></div>
            <div className={styles.vectspace}></div>
            <div className={styles.vectsi}>
              <div className={styles.vectbg}></div>
            </div>
          </div>
        </div>
        <div className={styles.centspace}></div>
        <div className={styles.logright}>
          <div className={styles.titl}>
            <div className={styles.titlespace}></div>
            <div className={styles.title}>
              <h1>Welcome!</h1>
              <p>Enter details to login.</p>
            </div>
            <div className={styles.logospace}></div>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <div className={styles.passwordContainer}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className={styles.showPassword}
                    id="showPassword"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </span>
                </div>
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <a href="forgot_password.php" className={styles.forgotPassword}>FORGOT PASSWORD?</a>
              <div className={styles.formGroup}>
                <input
                  type="submit"
                  value="LOG IN"
                  disabled={loading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserComponent;
