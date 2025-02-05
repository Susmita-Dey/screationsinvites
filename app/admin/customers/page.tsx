// Get a list of users using the application

import User from "@/models/User";
import React from "react";

const Customers = async () => {
  // Get all customers
  const customers = await User.find({ role: "user" });
  return (
    <section>
      <h3 className="text-2xl font-bold">Your Customers</h3>
      <div className="space-y-4 space-x-2 justify-center items-center">
        <table className="table-auto table-column w-full">
          <thead className="bg-gray-200 text-gray-600">
            <tr className="text-left">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Orders</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Customers;
