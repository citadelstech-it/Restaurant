# Restaurant Server API Documentation

This document describes the available API routes for the Restaurant backend server.

---

## Base URL

```
http://localhost:5000/api
```

---

## Routes

### Users

- **POST /users/register**  
    Add a new user role should be Admin or User.  
  **Body:** `{ userName, password, role }`

- **POST /users/login**  
    Login a user.  
  **Body:** `{ userName, password}`

- **PUT /users/:id/resetPassword**  
  Admin resets a user's password by ID.  
  **Body:** `{ newPassword }`

### Categories

- **GET /categories**  
  Get all categories with their items.

- **GET /categories/:id**  
  Get a single category by ID (includes items).

- **POST /categories**  
  Add a new category.  
  **Body:** `{ name, description }`

- **PUT /categories/:id**  
  Update a category by ID.  
  **Body:** `{ name, description }`

- **DELETE /categories/:id**  
  Delete a category by ID.

---

### Items

**GET /items**  
  Get all items with pagination and filters.  
  **Query params:**  
  - `page` (number, optional)  
  - `limit` (number, optional)  
  - `item_name` (string, optional, filter by name)  
  - `stock_status` (string, optional: `low`, `in`, `out`, `all`)  
    - `low`: inStock < 10 and > 0  
    - `in`: inStock > 10  
    - `out`: inStock == 0  
    - `all`: all items

- **POST /items**  
  Add a new item.  
  **Body:** `{ name, price, description, inStock, categoryId }`  
  **File:** `image` (optional, multipart/form-data)

- **PUT /items/:id**  
  Update an item by ID.  
  **Body:** `{ name, price, description, inStock, categoryId }`  
  **File:** `image` (optional, multipart/form-data)

- **DELETE /items/:id**  
  Delete an item by ID.

---

### Cart

- **GET /cart/:user_id**  
  Get all cart items for a user.

- **POST /cart**  
  Add an item to cart.  
  **Body:** `{ user_id, item_id, quantity }`

- **DELETE /cart/remove/:cartItemId**  
  Remove a cart item by its ID.

- **DELETE /cart/clear/:user_id**  
  Clear all cart items for a user.

---

### Orders

- **GET /orders/getOrders**
  Get today's orders with pagination.  
  **Query params:**  
  - `page` (number, optional)  
  - `limit` (number, optional)

- **GET /orders/:id**  
  Get a single order by ID.

- **GET /orders/orderHistory**  
  Filter orders by order_id and/or order_date with pagination.  
  **Query params:**  
  - `order_id` (string, optional)  
  - `order_date` (YYYY-MM-DD, optional)  
  - `page` (number, optional)  
  - `limit` (number, optional)

- **POST /orders/checkout**  
  Place an order (checkout).  
  **Body:** `{ user_id, customer_name, customer_email, customer_phone, paymentMethod }`

- **PUT /orders/status/:id**  
  Change order status.  
  **Body:** `{ status }`

---

### Dashboard

- **GET orders/dashboard**  
  Get dashboard data:  
  - Total revenue  
  - Total orders count  
  - Menu items count  
  - Low stock item count (<= 10)  
  - Recent orders (limit 3)  
  - Low stock alert items (<= 10)

---

### Payment

- **POST /phonepe/pay**  
  Initiate a payment using PhonePe.  
  **Body:** `{ transactionId, MUID, name, amount, number }`  
  **Description:** Starts a payment transaction for the given order using PhonePe.

---

## Environment Variables

See `.env` for database and Cloudinary configuration.

---

## Notes

- All endpoints return JSON responses.
- For image upload, use `multipart/form-data` with the field name `image`.

---

