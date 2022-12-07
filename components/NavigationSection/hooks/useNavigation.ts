import { ArrowsUpDownIcon, CalendarDaysIcon, Cog6ToothIcon, CreditCardIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { NavigationItem } from "../../../types/navigation";

const useNavigation = () => {
  const navigationItemList: NavigationItem[] = [
    { id: "dashboardSection", name: "Dashboard", icon: Squares2X2Icon },
    { id: "cardSection", name: "Cards", icon: CreditCardIcon },
    { id: "transactionSection", name: "Transactions", icon: ArrowsUpDownIcon },
    { id: "calendarSection", name: "Calendar", icon: CalendarDaysIcon },
    { id: "settingsSection", name: "Settings", icon: Cog6ToothIcon },
  ];

  const [selectedNavigationItem, setSelectedNavigationItem] = useState<NavigationItem>({ id: "dashboardSection", name: "Dashboard", icon: Squares2X2Icon });

  return { navigationItemList, selectedNavigationItem, setSelectedNavigationItem };
};

export default useNavigation;
