import React, { useState } from 'react';
import { useLogin, useNotify, Notification, defaultTheme } from "react-admin";
import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiIcon,
  EuiPopover,
} from '@elastic/eui';
import "./login.scss";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);
  const login = useLogin();
  const notify = useNotify();
  const BASE_URI = process.env.REACT_APP_SERVER_URL;
  const submit = (e: any) => {
    e.preventDefault();
    login({ username, password }).catch(() =>
      notify("Invalid username or password")
    );
  }
  const onButtonClick = () => {
    setPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopoverOpen(false);
  };

  const button = (
    <EuiButton iconType="iInCircle" onClick={onButtonClick}>
      ?
    </EuiButton>
  );

  return (
    <div className="login-page">
      <EuiPopover
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
      >
        {/* Your other menu options go here */}
      </EuiPopover>
      
      <div className="login-page__box">
        <img src="https://amplication.com/assets/react-admin.png" alt="React-Admin" />
        <h2>Admin UI</h2>
        <div className="login-page__box__message">
          Your message here
        </div>
        <EuiForm component="form" onSubmit={submit}>
          <EuiFormRow label="Username">
            <EuiFieldText
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </EuiFormRow>
          <EuiFormRow label="Password">
            <EuiFieldText
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </EuiFormRow>
          <EuiButton type="submit">
            Log in
          </EuiButton>
        </EuiForm>
      </div>
    </div>
  );
};

export default Login;
