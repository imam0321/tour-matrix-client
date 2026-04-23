# Tour Matrix Fullstack Project

**Tour Matrix** is a full-stack travel and tour booking platform built entirely with **TypeScript**. It offers secure, role-based dashboards for **Users, Guides, Admins, and Super Admins**, ensuring that each type of user has access to the features they need.

The frontend is developed using **React.js with TypeScript**, **Redux Toolkit**, and **RTK Query** for efficient state management and seamless API communication. The backend is powered by **Node.js/Express with TypeScript**, **MongoDB** for data storage, and **JWT-based authentication** for secure login and role management.

This platform simulates a real-world travel booking ecosystem, providing features like:
- Tour listings  
- Booking management  
- Secure payments  
- Comprehensive administrative controls  

All designed to deliver a smooth and reliable experience for travelers and administrators alike.

---

## 🔗 Live Link

* **Frontend**: [https://tour-matrix.vercel.app](https://tour-matrix.vercel.app) 
* **Backend**: [https://tour-matrix-server.vercel.app](https://tour-matrix-server.vercel.app)
* **Backend Repository**: [https://github.com/imam0321/tour-matrix-server](https://github.com/imam0321/tour-matrix-server)
---

## 🚀 Project Overview  

- **Role-Based Dashboards**: Different features for Users, Guides, Admins, and Super Admins.  
- **Tour Management**: Add, update, delete, and explore tour packages.  
- **Booking System**: Users can book tours and track booking history.  
- **Authentication & Authorization**: JWT-based login/registration + Social Auth + OTP verification and Forget Password.  
- **Payment Integration**: Integrated with **SSLCommerz** for secure transactions.  
- **Admin Controls**: Manage users, guides, tours, bookings, and payments.  
- **Guide Features**: Manage assigned tours and assist users.  
- **Responsive Design**: Mobile-first modern UI with **Shadcn UI + Tailwind CSS**.

---

## 🧱 Tech Stack  

**Frontend**:  
- React.js + TypeScript  
- Redux Toolkit & RTK Query  
- Axios  
- React Router DOM  
- Tailwind CSS + Shadcn UI  
- Framer Motion  

**Backend**:  
- Node.js + TypeScript  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Passport.js (Social Auth)  
- SSLCommerz Payment Gateway  
- Redis

**Development Tools**:  
- Vite  
- ESLint + Prettier  
- Postman (API Testing)  
---

# 📦 Installation & Setup
```bash
git clone https://github.com/imam0321/tour-matrix-client.git
cd tour-matrix-client
bun install
bun run dev
```
Frontend runs on http://localhost:3000
 by default.

 ```bash
git clone https://github.com/imam0321/tour-matrix-server.git
cd tour-matrix-server
bun install
bun run dev
```
Backend runs on http://localhost:5000
 by default.

# 🧪 Features & Functionalities

## 🌐 Public Pages
- Home, Tours, Tour Details  
- Search & Filter Tours  
- Reviews & About Page  

## 🔐 Authentication
- Register, Login (JWT-based)  
- Social Login (Google)  
- OTP Verification  
- Forget Password
- Secure Logout & Token Refresh  

## 👤 User Dashboard
- Browse & book tours  
- View booking history  
- Manage profile & payments    

## 🛠️ Admin Dashboard
- Create, edit, and delete tours (including division & tour types)  
- Manage tours, bookings, and payments  
- Manage and update admin profile  
- Access booking, user, and payment analytics  
- Access reports and analytics   

## ⚙️ General Features
- Loading & error states  
- Form validation + toast notifications  
- Charts & tables for analytics  
- Fully responsive design  

---

# 🚀 Upcoming Features (Future Work)

## 🧭 Guide Dashboard
- Manage assigned tours  
- Support travelers with details  
- Track booking requests  

## 📧 Contact

* Email: [imam.hossain0321@gmail.com](mailto:imam0321@gmail.com)
