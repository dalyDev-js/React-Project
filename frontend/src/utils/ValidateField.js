export const validateForm = (name, value, formData) => {
  let errors = {};

  if (name === "name") {
    if (!value) {
      errors.name = "Name is required";
    } else if (value.length < 3) {
      errors.name = "Name must be at least 3 characters long";
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      errors.name = "Name can only contain letters and spaces";
    } else {
      errors.name = "";
    }
  } else if (name === "email") {
    if (!value) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      errors.email = "Email is invalid";
    } else {
      errors.email = "";
    }
  } else if (name === "password") {
    if (!value) {
      errors.password = "Password is required";
    } else if (value.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(value)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(value)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(value)) {
      errors.password = "Password must contain at least one number";
    } else {
      errors.password = "";
    }
  } else if (name === "repeatPassword") {
    if (!value) {
      errors.repeatPassword = "Repeat password is required";
    } else if (value !== formData.password) {
      errors.repeatPassword = "Passwords do not match";
    } else {
      errors.repeatPassword = "";
    }
  } else if (name === "termsAccepted") {
    if (!value) {
      errors.terms = "Please read and accept the terms first";
    } else {
      errors.terms = "";
    }
  }

  return errors;
};
