import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface SubItem {
  name: string;
  path: string;
}

interface MenuItem {
  name: string;
  icon: string;
  path?: string;
  subItems?: SubItem[];
}

interface Permission {
  [key: string]: string[];
}

interface AdminUser {
  role?: string;
  permissions?: string[];
  adminName?: string;
  adminEmail?: string;
}

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState<AdminUser>({});
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
    const storedPermissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    
    // Ensure permissions are included in the user object
    const userWithPermissions = {
      ...storedUser,
      permissions: storedUser.permissions || storedPermissions || []
    };
    
    setAdminUser(userWithPermissions);
  }, []);

  const getFilteredMenuItems = (): MenuItem[] => {
    if (!adminUser || !adminUser.role) {
      return [];
    }

    // Create dynamic menu items based on current user
    const allMenuItems: MenuItem[] = [      { 
        name: 'Dashboard', 
        icon: 'fas fa-home', 
        path: adminUser.role?.toLowerCase() === 'admin' ? '/admin/admindashboard' : '/subadmin/dashboard'
      },
      { name: 'Users', icon: 'fas fa-users', path: '/patientlist' },
      {
        name: 'Sub-Admin',
        icon: 'fas fa-user-plus',
        subItems: [
          { name: 'Add Sub-Admin', path: '/admin/subadminregister' },
          { name: 'View Sub-Admins', path: '/admin/viewsubadmins' },
          { name: 'Edit Sub-Admin', path: '/admin/editsubadmin' },
          { name: 'Delete Sub-Admin', path: '/admin/deletesubadmin' },
          { name: 'Download Sub-Admins', path: '/admin/downloadsubadmins' },
        ],
      },
      {
        name: 'Doctors',
        icon: 'fas fa-user-md',
        subItems: [
          { name: 'Add Doctor', path: '/admin/doctors/upload' },
          { name: 'Edit Doctor', path: '/admin/doctors/edit' },
          { name: 'View Doctors', path: '/admin/doctors/viewdoctors' },
          { name: 'Delete Doctor', path: '/admin/doctors/delete' },
          { name: 'Download Doctors', path: '/admin/doctors/download' },
        ],
      },
      {
        name: 'Hospitals',
        icon: 'fas fa-hospital',
        subItems: [
          { name: 'Add Hospital', path: '/admin/uploadhospital' },
          { name: 'Edit Hospital', path: '/admin/edithospital' },
          { name: 'View Hospitals', path: '/admin/viewHospitals' },
          { name: 'Delete Hospital', path: '/admin/deletehospital' },
          { name: 'Download Hospitals', path: '/admin/downloadhospitals' },
        ],
      },
      {
        name: 'Diagnostics',
        icon: 'fas fa-stethoscope',
        subItems: [
          { name: 'Add Diagnostics', path: '/admin/uploadDiagnostics' },
          { name: 'Edit Diagnostics', path: '/admin/editdiagnostics' },
          { name: 'View Diagnostics', path: '/admin/viewdiagnostics' },
          { name: 'Delete Diagnostics', path: '/admin/deletediagnostics' },
          { name: 'Download Diagnostics', path: '/admin/downloaddiagnostics' },
        ],
      },
      {
        name: 'Lab Tests',
        icon: 'fas fa-vial',
        subItems: [
          { name: 'Add Lab Tests', path: '/admin/uploadlabtests' },
          { name: 'Edit Lab Tests', path: '/admin/editlabtests' },
          { name: 'View Lab Tests', path: '/admin/viewlabtests' },
          { name: 'Delete Lab Tests', path: '/admin/deletelabtests' },
          { name: 'Download Lab Tests', path: '/admin/downloadlabtests' },
        ],
      },
      {
        name: 'Translators',
        icon: 'fas fa-language',
        subItems: [
          { name: 'Add Translators', path: '/admin/uploadTranslators' },
          { name: 'Edit Translators', path: '/admin/edittranslators' },
          { name: 'View Translators', path: '/admin/translators' },
          { name: 'Delete Translators', path: '/admin/deletetranslators' },
          { name: 'Download Translators', path: '/admin/downloadtranslators' },
        ],
      },
      {
        name: 'Chefs',
        icon: 'fas fa-utensils',
        subItems: [
          { name: 'Add Chefs', path: '/admin/uploadchefs' },
          { name: 'Edit Chefs', path: '/admin/editchefs' },
          { name: 'View Chefs', path: '/admin/ChefList' },
          { name: 'Delete Chefs', path: '/admin/deletechefs' },
          { name: 'Download Chefs', path: '/admin/downloadchefs' },
        ],
      },
      {
        name: 'Physios',
        icon: 'fas fa-dumbbell',
        subItems: [
          { name: 'Add Physios', path: '/admin/uploadPhysios' },
          { name: 'Edit Physios', path: '/admin/editphysios' },
          { name: 'View Physios', path: '/admin/Physios' },
          { name: 'Delete Physios', path: '/admin/deletephysios' },
          { name: 'Download Physios', path: '/admin/downloadphysios' },
        ],
      },
      {
        name: 'Spa Centers',
        icon: 'fas fa-spa',
        subItems: [
          { name: 'Add Spa Centers', path: '/admin/uploadCenters' },
          { name: 'Edit Spa Centers', path: '/admin/editspacenters' },
          { name: 'View Spa Centers', path: '/admin/viewcenters' },
          { name: 'Delete Spa Centers', path: '/admin/deletespacenters' },
          { name: 'Download Spa Centers', path: '/admin/downloadspacenters' },
        ],
      },
      {
        name: 'Spa Services',
        icon: 'fas fa-concierge-bell',
        subItems: [
          { name: 'Add Spa Services', path: '/admin/uploadspaServices' },
          { name: 'Edit Spa Services', path: '/admin/editspaservices' },
          { name: 'View Spa Services', path: '/admin/viewspaservices' },
          { name: 'Delete Spa Services', path: '/admin/deletespaservices' },
          { name: 'Download Spa Services', path: '/admin/downloadspaservices' },
        ],
      },
      {
        name: 'Blogs',
        icon: 'fas fa-blog',
        subItems: [
          { name: 'Add Blog', path: '/admin/AddBlog' },
          { name: 'Edit Blog', path: '/admin/EditBlog' },
          { name: 'View Blogs', path: '/admin/ViewBlogs' },
          { name: 'Delete Blog', path: '/admin/DeleteBlog' },
          { name: 'Download Blogs', path: '/admin/DownloadBlogs' },
          { name: 'Add Blog Category', path: '/admin/AddBlogCategory' },
          { name: 'Edit Blog Category', path: '/admin/EditBlogCategory' },
          { name: 'Delete Blog Category', path: '/admin/DeleteBlogCategory' },
          { name: 'View Blog Categories', path: '/admin/ViewBlogCategory' },
        ],
      },
      {
        name: 'Pharmacy',
        icon: 'fas fa-pills',
        subItems: [
          { name: 'Add Capsule', path: '/admin/addMedicine' },
          { name: 'Edit Capsule', path: '/admin/editMedicine' },
          { name: 'View Capsule', path: '/admin/medicineList' },
          { name: 'Delete Capsule', path: '/admin/deleteMedicine' },
          { name: 'Download Capsules', path: '/admin/downloadMedicines' },
        ],
      },
      {
        name: 'Packages',
        icon: 'fas fa-box-open',
        subItems: [
          { name: 'Add Packages', path: '/admin/addpackages' },
          { name: 'Edit Packages', path: '/admin/editpackages' },
          { name: 'View Packages', path: '/admin/viewpackages' },
          { name: 'Delete Packages', path: '/admin/deletepackages' },
          { name: 'Download Packages', path: '/admin/downloadpackages' },
          { name: 'Booking', path: '/admin/packagebookings' },
        ],
      },
      {
        name: 'Sales Team & Tasks',
        icon: 'fas fa-users-cog',
        subItems: [
          { name: 'Sales Team', path: '/admin/salesTeam' },
          { name: 'Tasks', path: '/admin/salesTasks' },
          { name: 'Add Team Member', path: '/admin/addsalesteam' },
          { name: 'Edit Team Member', path: '/admin/editsalesteam' },
          { name: 'Delete Team Member', path: '/admin/deletesalesteam' },
          { name: 'Download Team Members', path: '/admin/downloadsalesteam' },
        ],
      },
      { name: 'BusinessLocation', icon: 'fas fa-map-marker-alt', path: '/admin/businessLocations' },
      { name: 'Orders', icon: 'fas fa-shopping-cart', path: '/admin/AllOrders' },
      { name: 'Settings', icon: 'fas fa-cog', path: '/admin/settings' },
    ];

    // Normalize role to lowercase for consistent comparison
    const userRole = adminUser.role?.toLowerCase();

    if (userRole === 'admin') {
      return allMenuItems;
    }

    // For sub-admins, filter based on their permissions
    const userPermissions = adminUser.permissions || [];
    const filteredItems: MenuItem[] = [];

    allMenuItems.forEach((item) => {
      // Skip Sub-Admin management for sub-admins
      if (item.name === 'Sub-Admin' && userRole === 'subadmin') {
        return;
      }

      if (item.subItems) {
        const allowedSubItems = item.subItems.filter((subItem) => {
          const hasPermission = userPermissions.includes(subItem.name);
          return hasPermission;
        });
        
        if (allowedSubItems.length > 0) {
          filteredItems.push({
            ...item,
            subItems: allowedSubItems,
          });
        }
      } else {
        // For top-level items without sub-items
        // Dashboard should always be visible for any logged-in user
        if (item.name === 'Dashboard') {
          filteredItems.push(item);
        } else if (userPermissions.includes(item.name)) {
          filteredItems.push(item);
        }
      }
    });

    return filteredItems;
  };

  const menuItems = getFilteredMenuItems();

  const toggleSubMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  
  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-green-50 text-green-800 border-r border-green-100 shadow-sm flex flex-col">
      <div className="p-6 border-b border-green-100">
        <Link 
          to={adminUser.role?.toLowerCase() === 'admin' ? '/admin/admindashboard' : '/subadmin/dashboard'}
          className="text-2xl font-bold text-green-700 hover:text-green-800 transition-colors"
        >
          {adminUser.role?.toLowerCase() === 'admin' ? 'Admin Panel' : 'Sub-Admin Panel'}
        </Link>
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
                    className={`fas fa-chevron-${openMenus[item.name] ? 'up' : 'down'} ml-auto text-sm text-green-500`}
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
              item.path && (
                <Link
                  to={item.path}
                  className="flex items-center p-4 hover:bg-green-100 transition-colors text-green-800"
                >
                  <i className={`${item.icon} mr-3 text-green-600`}></i>
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            )}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-green-100">
        <button
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:text-red-800 transition-colors"
          aria-label="Logout"
        >
          <i className="fas fa-sign-out-alt mr-3"></i>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
