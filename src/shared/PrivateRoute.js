import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  allowVisit,
  component: Component,
  redirectTo,
  render,
  ...rest
}) => {
  const renderedComponent = Component
    ? (props) => <Component {...props} />
    : (props) => render(props);
  return (
    <Route
      {...rest}
      render={(props) =>
        allowVisit ? (
          renderedComponent(props)
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
