## Permission Manager React

Developed for permission management using hexadecimal numbers with typescript and react support

![npm](https://img.shields.io/npm/v/@mertsolak/permission-manager-react)
![license](https://img.shields.io/npm/l/@mertsolak/permission-manager-react)
![size](https://img.shields.io/bundlephobia/min/@mertsolak/permission-manager-react)
![issue](https://img.shields.io/github/issues/mert-solak/permission-manager-react)

## Installation

Use node package manager to install @mertsolak/permission-manager-react.

```bash
npm i @mertsolak/permission-manager-react
```

## Basic Usage

```typescript
// index.tsx
import React from "react";
import ReactDOM from "react-dom";

import { PermissionProvider, createPermissionNames } from "@mertsolak/permission-manager-react";

import App from "./App";

// it is important to use this method for typescript support
// permission names should match with backend's permission names
const permissionNames = createPermissionNames('login', 'logout');

 // this type can be used to provide typescript support for usePermission hook
export type PermissionNamesType = typeof permissionNames[number];

// initial permission number can be updated at any time
ReactDOM.render(
    <PermissionProvider permissionNames={permissionNames} initialPermissionNumber='0x0'>
      <App />
    </PermissionProvider>
  document.getElementById("root")
```

```typescript
// App.tsx
import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { AuthorizedRoute } from '@mertsolak/permission-manager-react';

const LoginComponent = () => <p>login page</p>;

export const App = () => (
  <BrowserRouter>
    <Switch>
      <AuthorizedRoute
        component={LoginComponent}
        path="/"
        redirectPath="/login" // this is needed for redirection
        isAuthenticated // it is optional, if it is false, it ignores allowedPermissions
        allowedPermissions={['login']} // it is optional, it uses operator parameter for permissions
        operator="&" // allowedPermissions uses this for authorization, default = '|', it is optional
      />
    </Switch>
  </BrowserRouter>
);
```

```typescript
// AnyComponent.tsx

import React from 'react';

import { usePermissions } from '@mertsolak/permission-manager-react';

import { PermissionNamesType } from './index';

export const AnyComponent = () => {
  const { addPermissions, removePermissions, verifyPermissions, permissionNumber, permissionObject } =
    usePermissions<PermissionNamesType>(); // type is needed for better typescript support

  useEffect(() => {
    // adds permissions globally to permissionNumber
    addPermissions(['home', 'profile']);
    // removes permissions globally from permissionNumber
    removePermissions(['login']);
    // it verifies that permissionNumber includes these permissions with operator &
    const hasPermission = verifyPermissions(['home', 'profile', 'login', 'logout'], '&');

    // global permissionNumber
    console.log(permissionNumber);
    // global permissionObject
    console.log(permissionObject);
  }, []);

  return <p>Any Component</p>;
};
```
