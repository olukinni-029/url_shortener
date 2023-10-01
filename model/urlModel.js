import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  url: {
    required: true,
    type: String,
    },
  id: {
    required: true,
    type: String,
    unique:true,
    }
},
{
    timestamps: true,
    versionKey:false,

  }
);

const URL = mongoose.model("URL", urlSchema);
export default URL