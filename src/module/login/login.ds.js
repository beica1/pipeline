/**
 * login.ds.js of pipeline
 * Created by beica on 2020/1/10
 */
export const login = `
  mutation Login($user: String!, $pwd: String!) {
    login(user: $user, pwd: $pwd) {
      userId
      name
    }
  }
`

export const auth = `
  mutation Auth($code: String!) {
    auth(code: $code) {
      userId
      name
    }
  }
`
