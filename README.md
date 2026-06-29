# 🛒 AI Ecommerce Platform

A modern full-stack AI-powered ecommerce platform built using **React, FastAPI, SQLAlchemy, Razorpay, and Generative AI**.

This project includes:

- 🔐 JWT Authentication
- 🛍️ Product Management
- 🛒 Smart Cart System
- 📦 Order Management
- 💳 Razorpay Payment Integration
- 🤖 AI Shopping Assistant Chatbot
- 👨‍💻 Admin Dashboard
- ☁️ Full Deployment (Vercel + Render)

---

#Demo-login

Email : demo@gmail.com
Pass : 1234

---

# Architecture Design

                React Frontend
                      │
                      │ REST API
                      ▼
               FastAPI Backend
      ┌─────────────┼─────────────┐
      ▼             ▼             ▼

    Authentication Product APIs AI Chatbot
       |             │             │
       └─────────────┼─────────────┘
                     ▼
                SQLAlchemy ORM
                     ▼
                SQLite Database
                     ▼
           Razorpay Payment API

---

# 🚀 Live Demo

## 🌐 Frontend

https://ai-ecommerce-platform-rho.vercel.app/

## ⚡ Backend API

https://ai-ecommerce-platform-2w1p.onrender.com/docs

# 📸 Screenshots

## 🔑 Login Page

![Login Page](Screenshots/login.png)

---

## 🛍️ Products Page

![Products Page](Screenshots/products.png)

---

## 🛒 Cart Page

![Cart Page](Screenshots/cart.png)

## 👨‍💻 Admin Dashboard

![Admin Dashboard](Screenshots/admin.png)

---

## 🤖 AI Shopping Assistant

![AI Chatbot](Screenshots/chatbot.png)

---

# ✨ Features

## 🔐 Authentication System

- User Registration
- Login with JWT Authentication
- Secure Password Hashing
- Protected Routes
- Role-based Admin Access

---

## 🛍️ Ecommerce Features

- View Products
- Add to Cart
- Update Cart Quantity
- Remove Items
- Order Summary
- Checkout System

---

## 💳 Payment Integration

Integrated Razorpay payment gateway for secure online payments.

Features:

- Dynamic Order Creation
- Razorpay Checkout Popup
- Payment Flow Integration

---

## 🤖 AI Shopping Assistant

Built an AI-powered shopping assistant that helps users:

- Discover products
- Ask shopping-related questions
- Improve shopping experience

---

## 👨‍💻 Admin Dashboard

Admin users can:

- Add Products
- Manage Product Listings
- Control Inventory

---

# 🏗️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- CSS
- React Toastify
- Vite

---

## Backend

- FastAPI
- SQLAlchemy
- JWT Authentication
- Pydantic
- Uvicorn

---

## Database

- SQLite

---

## AI

- Groq API / LLM Integration

---

## Payment

- Razorpay

---

## Deployment

- Vercel (Frontend)
- Render (Backend)

---

# 📂 Project Structure

```bash
AI-ECOMMERCE-PLATFORM
│
├── app
│   ├── routers
│   ├── schemas
│   ├── services
│   ├── main.py
│   ├── models.py
│   └── database.py
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   └── api.js
│
├── Screenshots
├── requirements.txt
└── README.md
```
