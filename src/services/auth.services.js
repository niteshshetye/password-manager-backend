class AuthServices {
  constructor(userModel, bcrypt, jwt) {
    this.userModel = userModel;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
  }

  async register(userData) {
    try {
      // Check if user already exists
      const existingUser = await this.userModel.findOne({
        email: userData.email,
      });

      if (existingUser) throw new Error("User already exists");

      // Check for required fields and validate input
      if (!userData.email || !userData.password) {
        throw new Error("Email and password are required");
      }

      // Validate password length and email format
      if (userData.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      // Validate email format using a simple regex
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
        throw new Error("Invalid email format");
      }

      const newUser = new this.userModel({
        email: userData.email,
        password: userData.password, // Password will be hashed in the model's pre-save hook
      });

      return await newUser.save();
    } catch (error) {
      // You can customize error handling/logging here
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  async login(email, password) {
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) throw new Error("User not found");

      // instance method to compare password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = this.jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION || "1h",
      });
      return { user, token };
    } catch (error) {
      // You can customize error handling/logging here
      throw new Error(`Login failed: ${error.message}`);
    }
  }
}

export default AuthServices;
