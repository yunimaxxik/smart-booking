import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import boardIcon from '../../assets/icons/board.png';
import calendarIcon from '../../assets/icons/calendar.png';

const Sidebar = () => {
  const logout = useAuthStore((store) => store.logout);
  const user = useAuthStore((store) => store.user);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Доска комнат', icon: boardIcon },
    { path: '/my-bookings', label: 'Мои бронирования', icon: calendarIcon },
    { path: '/profile', label: 'Мой профиль', icon: '👤' }
  ];

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-[#3D2B1F] shadow-xl">
      {/* Логотип */}
      <div className="border-b border-[#5A4432] p-6">
        <h1 className="text-2xl font-bold tracking-tight text-[#F5EFE6]">
          Smart <span className="text-[#C49A6C]">Booking</span>
        </h1>
      </div>

      {/* Навигация — скроллится, если пунктов станет много */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? 'bg-[#8B5E34] font-semibold text-[#FAF6F0] shadow-inner'
                      : 'text-[#D8C7B0] hover:bg-[#4A3626] hover:text-[#F5EFE6]'
                  }`}
                >
                  <img
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0"
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Профиль и выход — всегда внизу */}
      <div className="border-t border-[#5A4432] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#C49A6C] to-[#8B5E34] font-bold text-[#FAF6F0]">
            {user?.userName?.charAt(0).toUpperCase() || '?'}
          </div>

          <Link
            to={'/profile'}
            className="min-w-0 flex-1"
          >
            <p className="truncate text-sm font-medium text-[#F5EFE6]">
              {user?.userName}
            </p>
            <p className="truncate text-xs text-[#A89279]">{user?.email}</p>
          </Link>

          <button
            type="button"
            onClick={() => logout()}
            className="rounded-lg border border-[#5A4432] px-3 py-1.5 text-sm text-[#D8C7B0] transition-colors hover:border-[#C49A6C] hover:bg-[#4A3626] hover:text-[#F5EFE6] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/50"
            title="Выйти"
          >
            Выйти
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
