import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Import models
import User from "../models/user.models.js";

// Import services
import AuthServices from "../services/auth.services.js";

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res) {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }
      const { token, user } = await this.authService.login(email, password);
      if (!token) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async logout(req, res) {
    try {
      // Implement logout logic if needed (e.g., invalidate token)
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const createAuthController = (authService) => {
  return new AuthController(authService);
};

const authService = new AuthServices(User, bcrypt, jwt);
const authController = createAuthController(authService);

export default authController;
