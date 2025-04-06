export const loginHandler = (email, password, onLogin) => {
    if (email && password) {
      onLogin({ email, password });
    }
  };
  