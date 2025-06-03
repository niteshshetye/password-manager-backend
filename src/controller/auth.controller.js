// Import models
import User from "../models/user.models.js";

// Import services
import AuthServices from "../services/auth.services.js";

// Import utility functions
import { signJwt } from "../utils/jwt.js";
import { deleteCookie } from "../utils/helper.js";

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res) {
    try {
      const user = await this.authService.register(req.body);

      if (!user) {
        return res.status(400).json({ error: "User registration failed" });
      }

      // This function will sign the JWT and set it in the response cookie
      signJwt({ id: user._id }, res);

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
      const user = await this.authService.login(email, password);

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Sign the JWT and set it in the response cookie
      signJwt({ id: user._id }, res);

      res.status(200).json({ user });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async logout(req, res) {
    try {
      // Clear the cookie by setting it with an expired date
      deleteCookie(res, "session-token");

      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const createAuthController = (authService) => {
  return new AuthController(authService);
};

const authService = new AuthServices(User);
const authController = createAuthController(authService);

export default authController;
