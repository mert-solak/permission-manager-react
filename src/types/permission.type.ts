import React from 'react';
import { RouteProps } from 'react-router-dom';

export type PermissionObject<T extends string> = Record<T, string>;

export type Operator = '&' | '|';

export interface ContextProps<T extends string> {
  permissionNames: T[];
  initialPermissionNumber?: string;
  children?: React.ReactNode;
}

export interface PermissionContextValue<T extends string> {
  permissionNumber: string;
  permissionObject: PermissionObject<T>;
  setPermissionNumber: (permissionNumber: string | ((previousPermissionNumber: string) => string)) => void;
}

export interface AuthorizedRouteProps<T extends string> extends RouteProps {
  isAuthenticated?: boolean;
  allowedPermissions?: T[];
  redirectPath?: string;
  operator?: Operator;
  component: React.FC;
}
