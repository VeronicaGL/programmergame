import axios from "axios"

const service = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.REACT_APP_BASE_API_URL || "http://127.0.0.1:3000/api/v1"
})

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (
      error.response.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      localStorage.removeItem("user")
      window.location.assign("/login")
    } else {
      return Promise.reject(error)
    }
  }
)

export function login(data) {
  return service.post("/login", data)
}

export function logout() {
  return service.post("/logout")
}

export function createUser(body) {
  const formData = new FormData()

  formData.append('userName', body.userName)
  formData.append('email', body.email)
  formData.append('password', body.password)

  return service.post('/register', body)
}

export function profile(body) {
  return service.patch("/profile", body)
}

export function game(data) {
  return service.post("/play", data)
}

export function randomQuestionsList() {
  return service.get("/game/randomquestions")
}

export function checkAnswer(body) {
  return service.post("/game/checkanswer", body)
}

export function getInfoUser() {
  return service.get("/me")
}

export function getTopUsers(query = "") {
  return service.get(`/game/topUsers${query}`)
}
