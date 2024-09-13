type User = {
  username: string
  password: string
}

const authenticatedUsers: User[] = [
  {
    username: "phah04",
    password: "123"
  },
  {
    username: "phah04@gmail.com",
    password: "123"
  }
]

// Xuất type bằng cú pháp `export type`
export { authenticatedUsers }
export type { User }
