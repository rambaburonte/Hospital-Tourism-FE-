import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface MenuItem {
  name: string;
  icon: string;
  path?: string;
  subItems?: { name: string; path: string }[];
}

const Sidebar: React.FC = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const menuItems: MenuItem[] = [
    { name: 'Dashboard', icon: 'fas fa-home', path: '/admin/admindashboard' },
    { name: 'Users', icon: 'fas fa-users', path: '/users' },
    {
      name: 'Doctors',
      icon: 'fas fa-user-md',
      subItems: [
        { name: 'Upload', path: '/admin/doctors/upload' },
        { name: 'View', path: '/admin/doctors/viewdoctors' },
      ],
    },
    {
      name: 'Services',
      icon: 'fas fa-briefcase-medical',
      subItems: [
        { name: 'Hospital', path: '/services/hospital' },
        { name: 'Packages', path: '/services/packages' },
      ],
    },
    { name: 'Orders', icon: 'fas fa-shopping-cart', path: '/orders' },
    { name: 'Settings', icon: 'fas fa-cog', path: '/settings' },
  ];

  const toggleSubMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-green-50 text-green-800 border-r border-green-100 shadow-sm">
      <div className="p-6 text-2xl font-bold border-b border-green-100 text-green-700">
        Admin Panel
      </div>
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.name} className="border-b border-green-100">
            {item.subItems ? (
              <>
                <button
                  onClick={() => toggleSubMenu(item.name)}
                  className="flex items-center w-full p-4 hover:bg-green-100 transition-all"
                >
                  <i className={`${item.icon} mr-3 text-green-600`}></i>
                  <span className="font-medium">{item.name}</span>
                  <i
                    className={`fas fa-chevron-${
                      openMenus[item.name] ? 'up' : 'down'
                    } ml-auto text-sm text-green-500`}
                  ></i>
                </button>
                {openMenus[item.name] && (
                  <div className="pl-8 bg-white border-t border-green-100">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block py-2 px-4 text-sm text-green-700 hover:bg-green-100 rounded transition"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path!}
                className="flex items-center p-4 hover:bg-green-100 transition-colors"
              >
                <i className={`${item.icon} mr-3 text-green-600`}></i>
                <span className="font-medium">{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-green-100">
        <Link
          to="/logout"
          className="flex items-center text-red-600 hover:text-red-800 transition-colors"
        >
          <i className="fas fa-sign-out-alt mr-3"></i>
          <span className="font-medium">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
