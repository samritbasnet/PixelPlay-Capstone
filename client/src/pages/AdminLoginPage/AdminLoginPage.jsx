import LoginForm from '../../components/LoginForm/LoginForm';
import './AdminLoginPage.scss';

const AdminLogin = ({ onLogin }) => {
  return (
    <div className="admin-login-wrapper">
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default AdminLogin;
