/**
 * process.ds.js of pipeline
 * Created by beica on 2020/2/24
 */
export const addProcess = `
  mutation CreateProcess($process: InputProcess!) {
    createProcess(process: $process) {
      processId
    }
  }
`

export const readProcesses = `
  query QueryProcesses {
    processes {
      processId
      name
      phases {
        name
      }
    }
  }
`

export const removeProcess = `
  mutation RemoveProcess($processId: ID!) {
    removeProcess(processId: $processId)
  }
`
