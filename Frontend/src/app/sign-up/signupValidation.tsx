export const validateSignupForm = (form: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const errors: { [key: string]: string } = {};
  
    if (!form.name.trim()) errors.name = "Name is required.";
    if (!form.email.trim()) errors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Invalid email format.";
    if (form.password.length < 6) errors.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match.";
  
    return errors;
  };
  