declare let process: {
    env: {
      REACT_APP_NODE_ENV: string
      REACT_APP_API_URL: string
    }
  }

export const config = {
    shop: {
        apiURL: process.env.REACT_APP_API_URL
    }
}