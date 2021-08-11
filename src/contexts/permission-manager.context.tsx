import React, { createContext, useState, useMemo, useEffect } from 'react';
import { createPermissionObject } from '@mertsolak/permission-manager';

import { ContextProps, PermissionObject, PermissionContextValue } from '../types/permission.type';

/** Default value of the context value */
const permissionContextValue: PermissionContextValue<string> = {
  permissionNumber: '0x0',
  permissionObject: {},
  setPermissionNumber: () => {},
};

/** Permission context created with default value */
export const PermissionContext = createContext(permissionContextValue);

/** Permission provider that provides
 * @param permissionNumber @type string
 * @param permissionObject @type [key: string]: string
 * @param setPermissionNumber @type (string) => void
 */
export const PermissionProvider = <T extends string>({
  initialPermissionNumber = '0x0',
  permissionNames,
  children,
}: ContextProps<T>) => {
  /** permission number that stores all permissions as hexadecimal number */
  const [permissionNumber, setPermissionNumber] = useState<string>(initialPermissionNumber);
  /** permission object that stores all permissions with their permission numbers */
  const [permissionObject, setPermissionObject] = useState<PermissionObject<T>>(
    createPermissionObject(permissionNames),
  );

  /** sets permissionObject if permissionNames props changes */
  useEffect(() => {
    setPermissionObject(createPermissionObject(permissionNames));
  }, [permissionNames]);
  /** sets permissionNumber if initialPermissionNumber props changes */
  useEffect(() => {
    setPermissionNumber(initialPermissionNumber);
  }, [initialPermissionNumber]);

  return useMemo(
    () => (
      <PermissionContext.Provider value={{ permissionNumber, permissionObject, setPermissionNumber }}>
        {children}
      </PermissionContext.Provider>
    ),
    [permissionNumber, permissionObject],
  );
};
