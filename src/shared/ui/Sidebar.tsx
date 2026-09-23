import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Sidebar = () => {
  const logout = useAuthStore((store) => store.logout);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/my-bookings', label: 'My Bookings', icon: '📅' }
  ];
  return (
    <aside className="w-64 bg-amber-950 shadow-md flex flex-col">
      <div className="p-6 border-b border-amber-100">
        <h1 className="text-2xl font-bold text-amber-100">Smart Booking</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'text-amber-200 font-semibold'
                      : 'text-amber-100 hover:text-amber-500'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center text-white font-bold">
            U
          </div>
          <div>
            <p className="font-medium text-amber-100">User</p>
            <p className="text-sm text-amber-300">user@test.com</p>
          </div>
          <button
            type="submit"
            onClick={() => logout()}
          >
            Выйти
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
