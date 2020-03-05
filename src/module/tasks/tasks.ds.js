/**
 * tasks.ds.js of pipleline
 * Created by beica on 2020/1/3
 */
export const tasks = `
  query Tasks {
    tasks {
      id
    }
  }
`

export const task = `
  query Task($taskId: ID!) {
    task(taskId: $taskId) {
      id
    }
  }
`
