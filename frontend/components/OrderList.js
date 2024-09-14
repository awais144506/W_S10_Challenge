import React from 'react'
import { useGetOrdersQuery } from '../state/userApi'
export default function OrderList() {
  const {data:orders} = useGetOrdersQuery()
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
      {orders && orders.map(order => (
          <li key={order.id}>
            {order.customer} ordered a size {order.size} with {order.toppings.length} {order.toppings.length===1?"topping":"toppings"}
          </li>
        ))}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
