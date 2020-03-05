/**
 * group.ds.js of pipeline
 * Created by beica on 2020/1/8
 */
export const readGroups = `
  query ReadGroups {
    groups {
      groupId
      name
      desc
      color
      member {
        userId
        name
        avatar
      }
    }
  }
`

export const createGroup = `
  mutation CreateGroup($group: InputGroup!) {
    addGroup(group: $group) {
      groupId
    }
  }
`

export const removeGroup = `
  mutation RemoveGroup($groupId: ID!) {
    removeGroup(groupId: $groupId)
  }
`
