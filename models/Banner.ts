import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Banner image URL is required'],
  },
  title: {
    type: String,
    required: [true, 'Banner title is required'],
  },
  subtitle: {
    type: String,
    default: '',
  },
  cta: {
    type: String,
    default: 'Shop Now',
  },
  link: {
    type: String,
    default: '/',
  },
}, { timestamps: true });

export default mongoose.models.Banner || mongoose.model('Banner', BannerSchema);
