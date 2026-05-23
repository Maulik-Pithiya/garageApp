import { useState, useEffect } from 'react';
import {
  Menu,
  LayoutDashboard,
  Users,
  Package,
  Car,
  Settings,
  X,
  Shield,
  CarFront,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';


function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Set initial sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); // expanded by default on desktop
      } else {
        setSidebarOpen(false); // hidden by default on mobile
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <div className="flex h-screen bg-gray-50 text-gray-800">
        {/* Sidebar */}
        <aside
          className={`
          z-41
          fixed md:relative inset-y-0 left-0
          border border-gray-100 shadow-sm
          transform transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          ${sidebarOpen ? 'md:w-64' : 'md:w-20'}
          w-64 bg-white shadow-xl flex flex-col
        `}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
            {/* Logo area - visible only when expanded */}
            {sidebarOpen && (
              <div className="flex items-center gap-2 text-black font-medium">
                <Shield size={18} className="text-blue-600" />
                <span className="text-base">Admin</span>
              </div>
            )}

            {/* Toggle button (desktop) / Close button (mobile) */}
            <button
              onClick={toggleSidebar}
              className="ml-1 p-2 rounded-lg hover:bg-gray-100 transition-colors md:flex hidden"
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Close button only on mobile */}
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 py-6">
            <NavItem active to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" expanded={sidebarOpen} />
            <NavItem to="/admin/messages" icon={Users} label="Messages" expanded={sidebarOpen} />
            <NavItem to="/admin/manageVehicles" icon={CarFront} label="Vehicles" expanded={sidebarOpen} />
            <NavItem to="/admin/soldVehicles" icon={Car} label="Sold Vehicles" expanded={sidebarOpen} />
          </div>


        </aside>

        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top header – menu button only visible on mobile */}
          <header className="md:hidden flex items-center justify-between h-16 px-6 border-b border-gray-50 shadow-sm">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>

            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">Admin</span>
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-sm">
                A
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-auto p-6 bg-white">
            <Outlet /> {/* Child routes will render here */}
          </main>


        </div>
      </div>
    </>
  );
}

// Sidebar navigation item – hides label when collapsed
// Sidebar navigation item – icons stay fixed, labels slide smoothly
function NavItem({ icon: Icon, label, active = false, expanded, to }) {
  return (
    <NavLink
      to={to}
      end={to === "/admin"} // ensures exact match for dashboard
      className={({ isActive }) => `
        flex items-center ps-4 py-3 my-1 mx-2 rounded-lg transition-colors font-medium 
        ${isActive
          ? 'bg-blue-100 text-blue-600'
          : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
        }
      `}
    >
      {/* Icon container – fixed width to prevent shifting */}
      <div className="w-5 h-5 ml-1  justify-center">
        <Icon size={20} />
      </div>

      {/* Label – slides in/out with smooth transition */}
      <span
        className={`
          overflow-hidden whitespace-nowrap transition-all duration-200 ease-in-out
          ${expanded ? 'w-auto opacity-100 ml-3' : 'w-0 opacity-0 ml-0'}
        `}
      >
        {label}
      </span>
    </NavLink>
  );
}

export default Sidebar;