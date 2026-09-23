import { createBrowserRouter } from 'react-router-dom';
import Layout from '../shared/ui/Layout';
import ProtectedRoute from '../shared/ui/ProtectedRoute';
import LoginPage from '../pages/auth/LoginPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import BookingPage from '../pages/booking/BookingPage';
import MyBookingsPage from '../pages/bookings/MyBookingsPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'booking/:roomId',
        element: <BookingPage />
      },
      {
        path: 'my-bookings',
        element: <MyBookingsPage />
      }
    ]
  }
]);
