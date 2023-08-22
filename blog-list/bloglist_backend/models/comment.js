const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
  content: {
    type:String,
    required:true
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Even though the _id property of Mongoose objects looks like a string, it is in fact an object.
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//If you define a model with the name Person, mongoose will automatically name the associated collection as people.
module.exports = mongoose.model('Comment', commentSchema)