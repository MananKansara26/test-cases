import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    image: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

mongoose.connect("mongodb://localhost:27017/post");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

async function getUserById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve({ id: 1, name: 'Alice' })
      } else {
        reject('User not found')
      }
    }, 1000)
  })
}

async function checkUserExists(email) {
  const user = await User.findOne({email});
  return !!user;
}

(async () => {
  console.log(await checkUserExists("manan@gmail.com"));
})();

export { add, subtract, getUserById, checkUserExists, User };
