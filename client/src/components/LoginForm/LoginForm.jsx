import { Formik } from 'formik';
import './LoginForm.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({onLogin}) => {
    const navigate=useNavigate();
  return (
    <div className="login-form">
      <h1 className="login-form__title">Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }

          if (!values.password) {
            errors.password = 'Required';
          }

          return errors;
        }}
        onSubmit={async(values, { setSubmitting,setErrors }) => {
         try{
            const response=await axios.post('http://localhost:8081/api/admin/login',values);
            localStorage.setItem('token',response.data.token);
            onLogin();
            navigate('/admin/dashboard');
         }
         catch(error){
            if(error.response && error.response.status ===401){
                setErrors({password:'Invalid email or password for admin'});
            }else{
                console.log(error);
                setErrors({password:'Please enter correct credentials and try again later'});
            }
         }
         finally{
            setSubmitting(false);
         }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="login-form__form" onSubmit={handleSubmit}>
            <div className="login-form__field">
              <input
                type="email"
                name="email"
                className="login-form__input"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email"
              />
              {errors.email && touched.email && (
                <div className="login-form__error">{errors.email}</div>
              )}
            </div>

            <div className="login-form__field">
              <input
                type="password"
                name="password"
                className="login-form__input"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Password"
              />
              {errors.password && touched.password && (
                <div className="login-form__error">{errors.password}</div>
              )}
            </div>

            <button type="submit" className="login-form__button" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
