# 🛒 ShopSphere

A Software-as-a-Service (SaaS) platform named ShopSphere is built to empower local grocery shopkeepers by allowing them to easily create and manage online stores — without any technical skills or the need to hire a developer.

---

## 🧩 Problem Statement

Local grocery shopkeepers often face challenges when trying to sell their products online due to limited technical knowledge and budget. This restricts their reach and revenue.

---

## 🚀 Solution

ShopSphere allows shopkeepers to:

- Sign up and set up their online store in minutes.
- Add products with details like price, image,StockStaus etc.
- Share a unique store link with customers.
- Manage and fulfill orders from a centralized dashboard.

All technical aspects (design, hosting, backend, etc.) are handled by the ShopSphere.

---

## 🎯 Key Features

- **Shopkeeper Dashboard**: Add/edit products, manage orders and profile.
- **Customer Store Page**: Public-facing store for browsing and ordering.
- **Order Management**: Accept, reject, and update delivery status.
- **Image Upload Support**: Add product images via mobile or web.
- **Unique Store Links**: Like `/store/yourshopname`
- **Role-based Logins**: Separate portals for Customers and Shopkeepers.
- **Analytics**: View most ordered products, total orders, views, etc.
- **Responsive Design**: Mobile-first, fully responsive UI.
- **Admin Panel**: Monitor and manage shops, users, and platform activity.

---

## 🧑‍💼 User Roles Overview (Multi-Role System)

The platform follows a **multi-role architecture** with 3 main types of users: Customer, Shopkeeper, and Admin. Each role has its own set of permissions and dashboard features to ensure a focused and secure experience.

### 👤 1. Customer

- **Purpose**: To browse shops and place orders
- **Access Rights**:
  - View shops available in their area (based on location) By Default.
  - Search for products
  - Place orders
  - View unique store pages shared by shopkeepers.
  - No access to shop management or admin features.

✅ _Simple and intuitive shopping experience focused on locality and convenience._

---

### 🏪 2. Shopkeeper

- **Purpose**: To manage their online grocery store and fulfill customer orders.
- **Access Rights**:
  - Register their shop and set up shop profile.
  - Add/edit/delete products with price, stock,etc.
  - Accept or reject customer orders .
  - Share their store link (e.g. `/store/shopname`) with customers.
  - View analytics such as order stats, best-selling products, and customer interest.

✅ _Empowers small vendors to go online with no technical knowledge required._

---

### 🛡️ 3. Admin

- **Purpose**: To manage the overall platform, users, and shops.
- **Access Rights**:
  - View and manage all registered shops and users.

✅ _Ensures security, smooth operations, and platform-wide control._

---

### 📍 Location-Based Shop Filtering

When a customer signs in or opens the app:

- They are first shown **only the shops available in their local area**.

#### ✅ Why This Is Useful:

- 🗺️ **Better User Experience**: Customers don’t waste time browsing shops that don’t deliver to them.
- ⏱️ **Faster Deliveries**: Orders go to nearby shops, reducing delivery time and cost.

---

## 🛠 Tech Stack

- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node +express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Image Storage**: Multer
- **Payment Integration** : Razorpay
- **Deployment**: Soon

---

## 🔁 How It Works

1. Shopkeeper signs up and sets up shop details.
2. Adds products with prices, images, and stock.
3. Shares unique store link with customers.
4. Customers browse products and place orders.
5. Shopkeeper receives order notifications and updates status.
6. Admin can monitor all activity via the platform dashboard.

---

## 📌 Future Scope

- Multi-language support
- Promotions and discounts
- Subscription plans for shopkeepers

-
