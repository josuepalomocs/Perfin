import { CreditCardIcon, Cog6ToothIcon, Squares2X2Icon, ArrowsUpDownIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';


export const getNavigationItems = () => {
  return [
    { text: 'Dashboard', Icon: Squares2X2Icon },
    { text: 'Cards', Icon: CreditCardIcon },
    { text: 'Transactions', Icon: ArrowsUpDownIcon },
    { text: 'Calendar', Icon: CalendarDaysIcon },
    { text: 'Settings', Icon: Cog6ToothIcon },
  ];
};