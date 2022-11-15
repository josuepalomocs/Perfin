import React from 'react';
import Container from '../Container/Container';
import Image from '../Image/Image';
import Text from '../Text/Text';
import styles from './cardSection.module.css';

interface CardSectionProps {

}

const CardSection = ({  } : CardSectionProps) => {
  return (
    <Container className={styles.container} type='div'>
      <Image src={'/visa_logo.svg'} className={styles.cardBrand} alt={'Card brand logo'} width={80} height={40} />
      <Container className={styles.middle} type='div'>
        <Text className={styles.cardNumber} type='p'>0000 0000 0000 0000</Text>
      </Container>
    </Container>
  );
};

export default CardSection;