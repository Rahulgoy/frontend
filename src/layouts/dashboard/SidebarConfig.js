// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'Add New Student',
    path: '/dashboard/add',
    icon: getIcon('eva:person-add-fill')
   },
  { 
    title: 'Student Records',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill')
  },
  

  // ? SEE LATER
  // {   
  //   title: '',
  //   path: '/dashboard/products',
  //   icon: getIcon('eva:shopping-bag-fill')
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill')
  // },
  
  {
    title: 'View Attendance',
    path: '/dashboard/view',
    icon: getIcon('eva:search-outline')
  },

  // {
  //   title: 'Login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill')
  // },
  // {
  //   title: 'Register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill')
  // },

  // SEE later
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill')
  // }

];

export default sidebarConfig;
