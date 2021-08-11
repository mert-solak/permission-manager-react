import React, { useCallback, useMemo } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthorizedRouteProps } from '../types/permission.type';
import { isDefined } from '../helpers/variable.helper';
import { usePermission } from '../hooks/usePermission.hook';

/** Authorized route for authentication and authorization */
export const AuthorizedRoute = <T extends string>({
  component: Component,
  exact,
  location,
  path,
  render,
  sensitive,
  strict,
  isAuthenticated,
  allowedPermissions,
  redirectPath,
  operator,
}: AuthorizedRouteProps<T>) => {
  /** verification method to verify permissions */
  const { verifyPermissions } = usePermission<T>();

  /** Redirection component to redirect a url */
  const RedirectComponent = useCallback(() => <Redirect to={redirectPath} />, [redirectPath]);

  /** checks if authenticated and returns RedirectComponent if it is false
   * @param isAuthenticated @type boolean
   */
  const checkIsAuthenticated = useCallback(
    () => (isAuthenticated ? undefined : <RedirectComponent />),
    [RedirectComponent, Component, isAuthenticated],
  );

  /** checks if authorized and returns RedirectComponent if it is false
   * @param allowedPermissions @type T[]
   */
  const checkIsAuthorized = useCallback(
    () => (verifyPermissions(allowedPermissions, operator) ? undefined : <RedirectComponent />),
    [RedirectComponent, Component, allowedPermissions],
  );

  /** It decides the element that needs to be rendered by looking at isAuthenticated and allowedPermissions */
  const RenderedElement = useCallback(() => {
    let component;

    if (isDefined(isAuthenticated) && isDefined(redirectPath)) {
      component = checkIsAuthenticated();
    }

    if (isDefined(allowedPermissions) && isDefined(redirectPath) && !isDefined(component)) {
      component = checkIsAuthorized();
    }

    return isDefined(component) ? component : <Component />;
  }, [checkIsAuthenticated, checkIsAuthorized, Component, isAuthenticated, allowedPermissions]);

  return useMemo(
    () => (
      <Route
        exact={exact}
        location={location}
        path={path}
        render={render}
        sensitive={sensitive}
        strict={strict}
        component={Component}
      >
        <RenderedElement />
      </Route>
    ),
    [render, RenderedElement, exact, location, path, sensitive, strict, Component],
  );
};
