const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const DEFAULT_ADMIN = 'vero@example.com';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    match: [EMAIL_PATTERN, 'Invalid email format']
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  score: {
    type: Number,
  },
  isAdmin: {
    type: Boolean
  },
  rightQuestions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Question"
  },
  wrongQuestions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Question"
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret.password;
      ret.totalAnswers = ret.rightQuestions.length + ret.wrongQuestions.length
    }
  }
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified('password')) {
      return next()
    }
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash
    this.isAdmin = process.env.USERS_ADMIN ? process.env.USERS_ADMIN.includes(this.email) : DEFAULT_ADMIN.includes(this.email)
    next()
  } catch (error) {
    return next(error)
  }
})

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

const User = mongoose.model('User', userSchema);
module.exports = User;