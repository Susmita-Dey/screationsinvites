import mongoose, { Schema, model, models } from "mongoose";

export interface ICoupon {
  _id?: mongoose.Types.ObjectId;
  code: string;
  discount: number;
  validFrom: Date;
  validTill: Date;
  usedBy?: mongoose.Types.ObjectId[];
  usageLimit: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true, min: 0 },
    validFrom: { type: Date, required: true },
    validTill: { type: Date, required: true },
    usedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    usageLimit: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Coupon = models?.Coupon || model<ICoupon>("Coupon", couponSchema);

export default Coupon;
