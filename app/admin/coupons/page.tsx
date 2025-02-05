// generate coupons that can be used by customers to get discounts on their orders
import Coupon from "@/models/Coupon";
import React from "react";

const getCouponCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let couponCode = "";

  for (let i = 0; i < characters.length; i++) {
    couponCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return couponCode;
};

const Coupons = () => {};

export default Coupons;
