import { SetMetadata } from '@nestjs/common';
import { UserRoleTypes } from '../../user/types/user-role.types';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoleTypes[]) =>
  SetMetadata(ROLES_KEY, roles);
