import React from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { ViewColumnsIcon, CreditCardIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import styles from './styles/navigationSection.module.css';
import { getNavigationItems } from './utilities';

const NavigationSection = () => {
  return (
    <Drawer 
      className={styles.drawer}
      variant='permanent'>
      <Box className={styles.logoContainer}>
        <Box className={styles.logoContent3} />
        <Typography className={styles.logoText}>Perfin</Typography>
      </Box>
      <Divider className={styles.divider} />
      <List>
        {
          getNavigationItems().map(({ text, Icon }) => {
            return (
              <ListItem className={styles.listItem} key={text}>
                <ListItemButton className={styles.listItemButton}>
                  <ListItemIcon className={styles.listItemIcon}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText className={styles.listItemText}>
                    {text}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })
        }
      </List>
    </Drawer>
  );
};

export default NavigationSection;