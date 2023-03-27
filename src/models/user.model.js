const userSchema = mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      maxLength: 50,
      minLength: 4
    },
  
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      maxLength: 50,
      minLength: 4
    },
  
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      length: 50,
    },
  
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    
    password: {
      type: String,
      required: true
    },

    city: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    postal: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 5
    },

    tel: {
        type: String,
        required: true,
        minLength: 10
    }
  },
    {
      timestamps: true
    }
  )
  
  userSchema.pre('save', function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      this.password = hashedPassword
      next();
    });
  
  })
  
  module.exports = mongoose.model('User', userSchema);