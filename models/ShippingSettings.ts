import mongoose from 'mongoose';

const ShippingSettingsSchema = new mongoose.Schema({
  freeDeliveryThreshold: {
    type: Number,
    default: 3500,
  },
  standardDeliveryTime: {
    type: String,
    default: 'Delivery starts from tomorrow',
  },
  standardDeliveryNote: {
    type: String,
    default: 'Check availability for your location.',
  },
  expressDeliveryAvailable: {
    type: Boolean,
    default: false,
  },
  expressDeliveryTime: {
    type: String,
    default: 'Same-day delivery available',
  },
  expressDeliveryPrice: {
    type: Number,
    default: 9.99,
  },
  returnWindowDays: {
    type: Number,
    default: 30,
  },
  returnPolicy: {
    type: String,
    default: 'Items must be returned in their original condition.',
  },
  protectionPlanText: {
    type: String,
    default: 'Protect your investment with QualityCare+ accidental damage coverage for up to 3 years.',
  },
}, { timestamps: true });

// Only ever keep one settings document
if (process.env.NODE_ENV !== 'production' && mongoose.models.ShippingSettings) {
  delete (mongoose.models as any).ShippingSettings;
}

export default mongoose.models.ShippingSettings || mongoose.model('ShippingSettings', ShippingSettingsSchema);
