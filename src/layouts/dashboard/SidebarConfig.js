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
    title: 'Add Student',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill')
  },
  {
    title: 'Display Students',
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
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill')
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill')
  },

  // SEE later
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill')
  // }

];

export default sidebarConfig;
