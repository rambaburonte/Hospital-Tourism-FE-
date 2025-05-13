
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
    { name: 'Dashboard', icon: 'fas fa-home', path: '/admindashboard' },
    { name: 'Users', icon: 'fas fa-users', path: '/users' },
    {
      name: 'Doctors',
      icon: 'fas fa-user-md',
      subItems: [
        { name: 'Upload', path: '/doctors/upload' },
        { name: 'View', path: '/doctors/viewdoctors' },
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
    <div className="fixed top-0 left-0 h-screen w-64 bg-green-800 text-white flex flex-col shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-green-700">
        Admin Panel
      </div>
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <div>
                <button
                  onClick={() => toggleSubMenu(item.name)}
                  className="flex items-center w-full p-4 hover:bg-green-700 transition-colors"
                >
                  <i className={`${item.icon} mr-3`}></i>
                  <span>{item.name}</span>
                  <i
                    className={`fas fa-chevron-${
                      openMenus[item.name] ? 'up' : 'down'
                    } ml-auto`}
                  ></i>
                </button>
                {openMenus[item.name] && (
                  <div className="pl-8 bg-green-900">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="flex items-center p-3 hover:bg-green-700 transition-colors"
                        onClick={() => console.log(`Navigating to ${subItem.name}`)}
                      >
                        <span>{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.path!}
                className="flex items-center p-4 hover:bg-green-700 transition-colors"
                onClick={() => console.log(`Navigating to ${item.name}`)}
              >
                <i className={`${item.icon} mr-3`}></i>
                <span>{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-green-700">
        <Link
          to="/logout"
          className="flex items-center p-3 hover:bg-green-700 transition-colors"
          onClick={() => console.log('Logging out')}
        >
          <i className="fas fa-sign-out-alt mr-3"></i>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
