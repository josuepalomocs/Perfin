import React from 'react';
import Button from '../Button/Button';
import Container from '../Container/Container';
import Image from '../Image/Image';
import List from '../List/List';
import ListItem from '../ListItem/ListItem';
import Text from '../Text/Text';
import { ViewColumnsIcon, CreditCardIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import styles from './navigationSection.module.css';

const NavigationSection = () => {
  return (
    <Container className={styles.container} type={'aside'}>
      <Text className={styles.logoText}>Perfin Logo</Text>
      {/* <Image src={''} className={styles.perfinLogo} alt={'Perfin logo'} width={40} height={40}/> */}
      <List className={styles.navigationList} type={'ul'}>
        <ListItem className={`${styles.navigationItem} ${styles.active}`}>
          <Button id={'navigationItemDashboard'} className={styles.navigationItemButton} onClick={() => {}}>
            <ViewColumnsIcon className={styles.buttonIcon} />
            <Text className={styles.dashboardText} type='p'>Dashboard</Text>
          </Button>
        </ListItem>
        <ListItem className={styles.navigationItem}>
          <Button id={'navigationItemCards'} className={styles.navigationItemButton} onClick={() => {}}>
            <CreditCardIcon className={styles.buttonIcon} />
            <Text className={styles.dashboardText} type='p'>Cards</Text>
          </Button>
        </ListItem>
        <ListItem className={styles.navigationItem}>
          <Button id={'navigationItemSettings'} className={styles.navigationItemButton} onClick={() => {}}>
          <Cog6ToothIcon className={styles.buttonIcon} />
            <Text className={styles.dashboardText} type='p'>Settings</Text>
          </Button>
        </ListItem>
      </List>
    </Container>
  );
}

export default NavigationSection;