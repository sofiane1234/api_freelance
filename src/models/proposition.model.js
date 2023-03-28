const mongoose = require('mongoose');

const propositionSchema = mongoose.Schema({
  status: {
    type: String,
    enum: ['PENDING', 'REFUSED', 'ACCEPTED'],
    required: true
  },
  
  freelance: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Freelance',
  },

  missions: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Mission',
  }
},

  {
    timestamps: true
  }
)

module.exports = mongoose.model('Proposition', propositionSchema);
