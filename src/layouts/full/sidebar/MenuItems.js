import {
  IconAdjustmentsCog,
  IconAperture, IconBasketCog, IconCopy, IconLayoutDashboard, IconLogin, IconMoneybag, IconMoodHappy, IconReportMoney, IconTypography, IconUserPlus,
  IconUsersGroup
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  // {
  //   navlabel: true,
  //   subheader: 'Home',
  // },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Reports',
  },
  {
    id: uniqueId(),
    title: 'Income',
    icon: IconMoneybag,
    href: '/Income',
  },
  {
    id: uniqueId(),
    title: 'Expenses',
    icon: IconReportMoney,
    href: '/expenses',
  },
  {
    navlabel: true,
    subheader: 'Data',
  },
  {
    id: uniqueId(),
    title: 'Residents',
    icon: IconUsersGroup,
    href: '/resident',
  },
  {
    id: uniqueId(),
    title: 'Payment Configuration',
    icon: IconAdjustmentsCog,
    href: '/resident',
  },
  {
    id: uniqueId(),
    title: 'Monthly Bill',
    icon: IconBasketCog,
    href: '/bill',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Typography',
  //   icon: IconTypography,
  //   href: '/ui/typography',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Shadow',
  //   icon: IconCopy,
  //   href: '/ui/shadow',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Auth',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Login',
  //   icon: IconLogin,
  //   href: '/auth/login',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Register',
  //   icon: IconUserPlus,
  //   href: '/auth/register',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Extra',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Icons',
  //   icon: IconMoodHappy,
  //   href: '/icons',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Sample Page',
  //   icon: IconAperture,
  //   href: '/sample-page',
  // },
];

export default Menuitems;
