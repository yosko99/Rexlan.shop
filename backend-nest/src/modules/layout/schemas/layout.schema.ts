import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const layoutSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  footerDescription: {
    type: String,
    required: true,
  },
  logoURL: {
    type: String,
    required: true,
  },
  thumbnailURL1: {
    type: String,
    required: true,
  },
  thumbnailURL2: {
    type: String,
    required: false,
  },
  thumbnailURL3: {
    type: String,
    required: false,
  },
  grid1URL: {
    type: String,
    required: true,
  },
  grid2URL: {
    type: String,
    required: true,
  },
  grid3URL: {
    type: String,
    required: true,
  },
  infoBarTitle: {
    type: String,
    required: true,
  },
  infoBarDescription: {
    type: String,
    required: true,
  },
  homegrownFieldTopImage: {
    type: String,
    required: true,
  },
  homegrownFieldRightImage: {
    type: String,
    required: true,
  },
  homegrownFieldTitle: {
    type: String,
    required: true,
  },
  homegrownFieldDescription: {
    type: String,
    required: true,
  },
  sponsorsURL: {
    type: String,
    required: true,
  },
});
