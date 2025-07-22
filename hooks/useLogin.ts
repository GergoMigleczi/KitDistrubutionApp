import { useState } from 'react';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAndLogin = async () => {
    if (!validateForm()) return false;

    setIsLoading(true);
    try {
      // Your API call here
      //const response = await loginAPI(email, password);

      // Store token/user data if needed
      // await AsyncStorage.setItem('token', response.token);

      setIsLoading(false);
      return true; // Success - let the component handle navigation
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
      setIsLoading(false);
      return false; // Failed
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isLoading,
    validateAndLogin,
    clearErrors
  };
};