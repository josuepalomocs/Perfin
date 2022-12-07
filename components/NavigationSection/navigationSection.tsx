import React, { Dispatch, SetStateAction } from "react";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import styles from "./styles/navigationSection.module.css";
import useNavigation from "./hooks/useNavigation";
import { NavigationItem } from "../../types/navigation";

interface NavigationSectionProps {
  navigationItemList: NavigationItem[];
  selectedNavigationItem: NavigationItem;
  setSelectedNavigationItem: Dispatch<SetStateAction<NavigationItem>>;
}

const NavigationSection = ({ navigationItemList, selectedNavigationItem, setSelectedNavigationItem }: NavigationSectionProps) => {
  return (
    <Drawer className={styles.drawer} variant="permanent">
      <Box className={styles.logoBox}>
        <Box className={styles.logoGraphic} />
      </Box>
      <Divider className={styles.divider} />
      <List className={styles.list}>
        {navigationItemList.map(({ id, name, icon }: NavigationItem) => {
          const Icon = icon;
          const isNavigationItemSelected = id === selectedNavigationItem.id;
          return (
            <ListItemButton
              className={`${styles.listItemButton} ${isNavigationItemSelected && styles.selected}`}
              id={id}
              key={id}
              onClick={() => {
                setSelectedNavigationItem({ id, name, icon });
              }}
            >
              <Icon className={styles.icon} />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};

export default NavigationSection;
