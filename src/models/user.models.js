import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Instance Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;

/*
In Mongoose, there are mainly two types of methods you can define on a schema:

1. Instance Methods:
  - Defined on `schema.methods`.
  - Available on individual document instances.
  - Example: comparePassword (as defined above).
  - Usage:
      const user = await User.findOne({ email: "test@example.com" });
      const isMatch = await user.comparePassword("plaintextPassword");

2. Static Methods:
  - Defined on `schema.statics`.
  - Called directly on the Model, not on document instances.
  - Example:
      userSchema.statics.findByEmail = function(email) {
        return this.findOne({ email });
      };
  - Usage:
      const user = await User.findByEmail("test@example.com");

There are also "query helpers" (schema.query), but the primary types are instance and static methods.
*/
/*
In Mongoose, there are mainly two types of middleware (also called hooks):

1. Document Middleware:
  - Runs during document actions like save, validate, remove, updateOne, deleteOne, etc.
  - Example:
      Pre-save document middleware
      userSchema.pre('save', function(next) {
        Hash password or perform actions before saving
        next();
      });

      Post-save document middleware
      userSchema.post('save', function(doc) {
        Actions after saving the document
      });

2. Query Middleware:
  - Runs during query actions like find, findOne, update, delete, etc.
  - Example:
      Pre-find query middleware
      userSchema.pre('find', function(next) {
        Modify query or perform actions before executing find
        next();
      });

      Post-find query middleware
      userSchema.post('find', function(result) {
        Actions after executing find
      });

There are also Aggregate and Model middleware, but Document and Query middleware are the primary types.
*/
