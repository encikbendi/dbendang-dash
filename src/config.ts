declare let process: {
    env: {
      REACT_APP_NODE_ENV: string
      REACT_APP_API_URL: string
      REACT_APP_M2M: string
    }
  }

export const config = {
    shop: {
        apiURL: process.env.REACT_APP_API_URL
    },
    token: {
      m2m: process.env.REACT_APP_M2M
    }
}