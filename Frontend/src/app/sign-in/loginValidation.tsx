// validateSignupForm.ts

export const validateEmail = (email: string): string | null => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };
  
  export const validatePassword = (password: string): string | null => {
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return null;
  };
  