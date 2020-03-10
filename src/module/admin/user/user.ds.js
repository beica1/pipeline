/**
 * user.ds.js of pipeline
 * Created by beica on 2020/1/10
 */
export const addQuery = `
  mutation CreateUser($user: InputUser!) {
    addUser(user: $user)
  }
`

export const removeUser = `
  mutation RemoveUser($userId: ID!) {
    removeUser(userId: $userId)
  }
`

const userFragment = `
  userId
  name
`

export const readAll = `
  query ReadUser {
    users {
      ${userFragment}
      groups {
        groupId
        name
      }
      roles {
        roleId
        name
      }
      expiredIn
    }
  }
`

export const readUser = `
  query FilterUser($filter: UserFilter!) {
    users(filter: $filter) {
      ${userFragment}
    }
  }
`

export const updateUser = `
  mutation UpdateUser($userId: ID!, $user: InputUser!) {
    updateUser(userId: $userId, user: $user)
  }
`

export const queryGroups = `
  query QueryGroups {
    groups {
      groupId
      name
    }
  }
`

export const queryRoles = `
  query QueryRoles {
    roles {
      roleId
      name
    }
  }
`
