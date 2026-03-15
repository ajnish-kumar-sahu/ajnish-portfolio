import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PortfolioPage } from '../Pages/PortfolioPage';
import { AdminLogin } from '../Admin/AdminLogin';
import { AdminDashboard } from '../Admin/AdminDashboard';
import { ClientAuth } from '../Client/ClientAuth';
import { Checkout } from '../Client/Checkout';
import { UserProfile } from '../Client/UserProfile';

export const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<ClientAuth />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </AnimatePresence>
  );
};
