import React, { useState } from 'react';
import { useLogin } from "react-admin";
import {
  EuiButton,
  EuiButtonEmpty,
  EuiCallOut,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiOverlayMask,
  EuiPopover,
  EuiText,
} from '@elastic/eui';
import "./login.scss";
import { validateLogin } from '../util/validateInput';
import { ApolloError } from '@apollo/client';

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);

  const login = useLogin();
  const BASE_URI = process.env.REACT_APP_SERVER_URL;

  const onButtonClick = () => {
    setPopoverOpen(prevState => !prevState);
  };

  const closePopover = () => {
    setPopoverOpen(false);
  };

  const dissMissErr = () => setErrorMsg(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const validationResult = validateLogin(username, password);
    console.table({"u":username,"p":password,"v":validationResult})
    if (validationResult === "Valid") {
      try {
        await login({ username, password });
        dissMissErr(); // clear any
      } catch (error: any) {
        console.error(error);
        if (error.message.includes("credentials")) {
          setErrorMsg("The passed credentials are incorrect");
          if (error instanceof ApolloError) {
            console.error("Apollo Error:", error.message);
            console.error("GraphQL Errors:", error.graphQLErrors);
            console.error("Network Errors:", error.networkError);
          } else {
            console.error("Generic Error:", error.message);
          }
        } else {
          setErrorMsg("An error occurred during login.");
        }
      }
    } else {
      setErrorMsg(`${validationResult}`);
    }
    setLoading(false);
  };
  
  const button = (
    <EuiButtonEmpty 
      color="warning"
      size="m"
      iconType="iInCircle"
      iconSize="m"
      onClick={onButtonClick}/>
  );

  return (
    <EuiFlexGroup
      className="login-page"
      direction="column"
      justifyContent="center"
      alignItems="center">
      <div className="login-page__box">
        <h2>recipe app</h2>
        <EuiForm component="form" onSubmit={submit}>
          <EuiFormRow label="Username">
            <EuiFieldText
              name="username"
              type="textbox"
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
          <EuiButton type="submit" isLoading={isLoading} isDisabled={isLoading}>
            Log in
          </EuiButton>
          {errorMsg &&
            <EuiCallOut title="Sorry, there was an error"
              color="danger"
              iconType="alert"
              className="error-message"
              onDismiss={dissMissErr}>
              <EuiText color="danger" size="s">{errorMsg}</EuiText>
            </EuiCallOut>
          }
        </EuiForm>
      </div>
      <EuiPopover
        className={`euiButton__popover`}
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        hasArrow={false}>
        <EuiOverlayMask>
          <EuiFlexGroup direction="column" alignItems="center">
            <EuiButtonEmpty 
              size="m"
              iconSize="m"
              iconType={`cross`}
              color="accent"
              onClick={closePopover}/>
            <EuiFlexItem 
              className={`login-page__box`}
              >
              <img
                src="https://amplication.com/assets/graphql.png"
                alt="GraphQL API"
              />
              <h2>Connect via GraphQL</h2>
              <div className={`login-page__box__message`}>
                Connect to the server using GraphQL API with a complete and
                understandable description of the data in your API
              </div>
              <EuiButton
                type="button"
                color="primary"
                href={`${BASE_URI}/graphql`}
              >
                Continue
              </EuiButton>
            </EuiFlexItem>

            <EuiFlexItem className={`login-page__box`}>
              <img
                src="https://amplication.com/assets/restapi.png"
                alt="REST API"
              />
              <h2>Connect via REST API</h2>
              <div className={`login-page__box__message`}>
                Connect to the server using REST API with a built-in Swagger
                documentation
              </div>
              <EuiButton type="button" color="primary" href={`${BASE_URI}/api`}>
                Continue
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiOverlayMask>
      </EuiPopover>
    </EuiFlexGroup>
  );
};

export default Login;
