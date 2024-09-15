import React, { useState } from 'react';
import { useGetOrdersQuery } from '../state/userApi';

export default function OrderList() {
  const [activeSize, setActiveSize] = useState('All');
  const sizes = ['All', 'S', 'M', 'L'];
  const { data: orders } = useGetOrdersQuery();

  // Filter orders based on active size
  const filteredOrders = orders
    ? orders.filter(order => activeSize === 'All' || order.size === activeSize)
    : [];

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>

      <ol>
        {filteredOrders.map(order => (
          <li key={order.id}>
            {order.customer} ordered a size {order.size} with
            {(order.toppings && order.toppings.length > 0)
              ? ` ${order.toppings.length} ${order.toppings.length === 1 ? 'topping' : 'toppings'}`
              : ' no toppings'}
          </li>
        ))}
      </ol>

      <div id="sizeFilters">
        Filter by size:
        {sizes.map(size => {
          const className = `button-filter${size === activeSize ? ' active' : ''}`;
          return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => setActiveSize(size)} // Update the active size when clicked
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
