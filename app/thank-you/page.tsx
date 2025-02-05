// A thank you page after the order is placed.

import Link from "next/link";
import React from "react";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen my-2 gap-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <h2 className="text-2xl font-bold">Thank you for your order</h2>
      <p className="text-lg">
        Your order is confirmed and will be shipped soon.
      </p>
      <p className="text-lg">
        An email confirmation has been sent to your email address.
      </p>
      <Link href="/products">
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};

export default ThankYou;
