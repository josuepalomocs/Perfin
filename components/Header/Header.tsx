import { ArrowsUpDownIcon, CalendarDaysIcon, Cog6ToothIcon, CreditCardIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { Box, List, ListItem, ListItemButton } from "@mui/material";
import styles from "./styles/header.module.css";

const Header = () => {
  return (
    <Box className={styles.container}>
      <List className={styles.scrollActionList}>
        <ListItem className={styles.scrollActionItem}>
          <ListItemButton className={styles.scrollActionButton}>
            <Squares2X2Icon className={styles.scrollActionIcon} />
          </ListItemButton>
        </ListItem>
        <ListItem className={styles.scrollActionItem}>
          <ListItemButton className={styles.scrollActionButton}>
            <CreditCardIcon className={styles.scrollActionIcon} />
          </ListItemButton>
        </ListItem>
        <ListItem className={styles.scrollActionItem}>
          <ListItemButton className={styles.scrollActionButton}>
            <ArrowsUpDownIcon className={styles.scrollActionIcon} />
          </ListItemButton>
        </ListItem>
        <ListItem className={styles.scrollActionItem}>
          <ListItemButton className={styles.scrollActionButton}>
            <CalendarDaysIcon className={styles.scrollActionIcon} />
          </ListItemButton>
        </ListItem>
        <ListItem className={styles.scrollActionItem}>
          <ListItemButton className={styles.scrollActionButton}>
            <Cog6ToothIcon className={styles.scrollActionIcon} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Header;
