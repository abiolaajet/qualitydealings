import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required'],
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
  // Keep legacy single category field for backwards compat
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
  images: [{
    type: String,
    required: true,
  }],
  stock: {
    type: Number,
    required: [true, 'Stock count is required'],
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  specifications: {
    type: Map,
    of: String,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  condition: {
    type: String,
    enum: ['new', 'used'],
    default: 'new',
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

// Delete cached model in development so schema changes always apply
if (process.env.NODE_ENV !== 'production' && mongoose.models.Product) {
  delete (mongoose.models as any).Product;
}

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
