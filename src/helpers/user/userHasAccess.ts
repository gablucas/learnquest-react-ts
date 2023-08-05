import { getLoggedUser } from "./getLoggedUser";

function userHasAccess(access: 'student' | 'teacher' | 'admin'): boolean {
  return getLoggedUser()?.access === access
}

export { userHasAccess };