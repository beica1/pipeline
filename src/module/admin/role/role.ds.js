/**
 * role.ds.js of pipeline
 * Created by beica on 2020/1/10
 */
export const readQuery = `
  query ReadRoles {
    roles {
      roleId
      name
      description
    }
  }
`
