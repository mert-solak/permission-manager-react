import { useContext } from 'react';
import * as permissionManager from '@mertsolak/permission-manager';

import { PermissionContext } from '../contexts/permission-manager.context';
import { PermissionContextValue, Operator } from '../types/permission.type';

/** provides some methods to manipulate permission states
 * @param addPermissions @type (T[]) => string
 * @param removePermissions @type (T[]) => string
 * @param verifyPermissions @type (T[], Operator) => boolean
 * @param permissionNumber @type string
 * @param permissionObject @type [key: string]: string
 */
export const usePermission = <T extends string>() => {
  /** global permissionNumber, permissionObject and setPermissionNumber callback from context */
  const { permissionNumber, permissionObject, setPermissionNumber } =
    useContext<PermissionContextValue<T>>(PermissionContext);

  /** if permissions matches with expected permissions returns true
   * @param expectedPermissions @type T[]
   * @param operator @type Operator
   */
  const verifyPermissions = (expectedPermissions: T[], operator?: Operator): boolean =>
    permissionManager.verifyPermissions(permissionNumber, permissionObject, expectedPermissions, operator);

  /** it adds new permissions to permissionNumber
   * @param newPermissions @type T[]
   */
  const addPermissions = (newPermissions: T[]): void => {
    setPermissionNumber(permissionManager.addPermissions(permissionNumber, permissionObject, newPermissions));
  };

  /** it removes permissions from permissionNumber
   * @param removedPermissions @type T[]
   */
  const removePermissions = (removedPermissions: T[]): void => {
    setPermissionNumber(
      permissionManager.removePermissions(permissionNumber, permissionObject, removedPermissions),
    );
  };

  return { addPermissions, removePermissions, verifyPermissions, permissionNumber, permissionObject };
};
