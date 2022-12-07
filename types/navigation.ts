import { ReactElement, SVGProps } from "react";

export type NavigationItemId = "dashboardSection" | "cardSection" | "transactionSection" | "calendarSection" | "settingsSection";

export type NavigationItemName = "Dashboard" | "Cards" | "Transactions" | "Calendar" | "Settings";

export interface NavigationItem {
  id: NavigationItemId;
  name: NavigationItemName;
  icon: (props: React.SVGProps<SVGSVGElement> & { title?: string | undefined; titleId?: string | undefined }) => JSX.Element;
}
