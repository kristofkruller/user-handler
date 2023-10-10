export function validateLogin(username: string, password: string) {
  // whitespace rem beg && end
  username = username.trim();
  password = password.trim();

  const usernameRegex = /^[a-zA-Z0-9_.-]*$/;
  const passwordRegex = /^.{5,}$/;

  if (username === '' && password === '') {
    return "Please enter a username and a password."
  } else if (username === '') {
    return "Please enter a username."
  } else if (password === '') {
    return "Please enter a password."
  }
  
  if (!usernameRegex.test(username)) {
    return "Invalid username. Only alphanumeric characters, underscores, hyphens, and periods are allowed.";
  }
  if (!passwordRegex.test(password)) {
    return "Invalid password. It must contain a minimum of 5 characters.";
  }
  return "Valid";
}