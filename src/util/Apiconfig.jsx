const PORT = 3030;

class ApiConfig {
  static login = `http://localhost:${PORT}/api/auth/login`;
  static register = `http://localhost:${PORT}/api/auth/register`;
  static logout = `http://localhost:${PORT}/api/auth/logout`;
}

export default ApiConfig;