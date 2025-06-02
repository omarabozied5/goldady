# Gold ADY - Premium Gold E-Commerce Platform

A modern React/TypeScript e-commerce app for selling premium gold products with real-time cart management.

## 🌐 Live Demo

**[View Live Application](https://goldady.netlify.app/)**

## 🚀 Overview

Gold ADY is a luxury e-commerce platform for premium gold bars and jewelry. Features include product browsing, cart management, real-time pricing, and a sleek black-and-gold design.

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **HTTP Client**: Axios
- **Icons**: Material-UI + Lucide React

## ✨ Key Features

- Responsive mobile-first design
- Real-time cart updates
- Type-safe development
- Session-based authentication
- Error handling with user feedback
- Loading states and smooth transitions

## 🏗️ Architecture Highlights

### State Management

Uses Redux Toolkit for predictable cart operations and async handling:

```typescript
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (request, { dispatch, rejectWithValue }) => {
    try {
      await updateCart(request);
      await dispatch(fetchCartItems());
      return "Cart updated successfully";
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

### API Layer

Axios interceptors automatically inject session tokens:

```typescript
apiClient.interceptors.request.use((config) => {
  const token = getSessionToken();
  if (config.method === "get") {
    config.params = { ...config.params, token };
  } else {
    config.data = { ...config.data, token };
  }
  return config;
});
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 📱 Try the Demo

1. Browse products on the main page
2. Add items to cart and see instant updates
3. Manage quantities in the cart
4. Test responsive design on different screen sizes

## 🌍 Deployment

Deployed on Netlify with automatic builds and global CDN distribution.

## 📁 Project Structure

```
src/
├── api/          # HTTP client and API calls
├── app/          # Redux store setup
├── components/   # Reusable UI components
├── features/     # Products and cart logic
├── pages/        # Route components
└── utils/        # Helper functions
```

## 🎨 Design

- Luxury black and gold color scheme
- Mobile-first responsive design
- Smooth animations and transitions
- Clean typography and consistent spacing
