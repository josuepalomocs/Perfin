import React, { useState } from 'react';
import Button from '../Button/Button';
import Container from '../Container/Container';
import Form from '../Form/Form';
import HyperLink from '../HyperLink/HyperLink';
import Input from '../Input/Input';
import Label from '../Label/Label';
import Text from '../Text/Text';
import firebaseAuth from '../../firebase/index';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, fetchSignInMethodsForEmail } from "firebase/auth";
import styles from './loginSection.module.css';
import Image from '../Image/Image';

interface UserCredentials {
  email: string,
  password: string,
}

const LoginSection = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginWithCredentials = () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('User signed in successfully');
        console.log(user);
        // ...
      })
      .catch((error) => {
        console.log('User login failed');
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const googleAuthProvider = new GoogleAuthProvider();

  const loginWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if(credential) {
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          // ...
        }
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const facebookAuthProvider = new FacebookAuthProvider();

  const loginWithFacebook = () => {
    signInWithPopup(firebaseAuth, facebookAuthProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      console.log(result);
  
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      if(credential) {
        const accessToken = credential.accessToken;
      }
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      fetchSignInMethodsForEmail(firebaseAuth, email)
        .then((providers) => {
          if(providers[0] == 'google.com') {
            console.log('here');
            googleAuthProvider.setCustomParameters({ login_hint: email });
            loginWithGoogle();
          }
        })
      // ...
    });
  }

  return (
    <Container className={styles.loginFormContainer} type='div'>
      <Text className={styles.heading} type='h1'>Welcome back</Text>
      <Text className={styles.subHeading} type='p'>Login to access your Perfin dashboard</Text>
      <Form className={styles.form} onSubmit={(e: any) => {e.preventDefault()}}>
        <Container className={styles.inputFieldContainer} type='div'>
          <Label className={styles.inputFieldLabel} htmlFor={'loginInputFieldEmail'}>E-mail</Label>
          <Input id={'loginInputFieldEmail'} className={styles.inputFieldElement} type='email' placeholder='josue@perfin.com' onChange={setEmail} />
        </Container>
        <Container className={styles.inputFieldContainer} type='div'>
          <Label className={styles.inputFieldLabel} htmlFor={'loginInputFieldPassword'}>Password</Label>
          <Input id={'loginInputFieldPassword'} className={styles.inputFieldElement} type='password' placeholder='••••••••' onChange={setPassword} />
        </Container>
        <Container className={styles.optionsContainer}>
          <Label className={styles.rememberPasswordLabel}>
            <Input id={'loginRememberPassword'} className={styles.inputCheckboxElement} type='checkbox' />
            <span className={styles.customInputCheckboxStyles}></span>
            <Text className={styles.rememberPasswordText} type={'p'}>Remember Password</Text>
          </Label>
          <HyperLink className={styles.forgotPasswordLink} href={'#'}>Forgot Password?</HyperLink>
        </Container>
        <Button className={styles.loginWithCredentials} onClick={loginWithCredentials}>Login</Button>
      </Form>
      <Container className={styles.providersContainer} type='div'>
        <Button className={styles.loginWithGoogle} onClick={loginWithGoogle}>
          <Image className={styles.googleImage} src={'/google_icon.svg'} alt={'Google icon'} width={20} height={20} />
          <Text className={styles.continueWithGoogle}>Continue with Google</Text>
        </Button>
        <Button className={styles.loginWithFacebook} onClick={loginWithFacebook}>
          <Image className={styles.facebookImage} src={'/facebook_icon.svg'} alt={'Facebook icon'} width={22} height={22} />
          <Text className={styles.continueWithFacebook}>Continue with Facebook</Text>
        </Button>
      </Container>
      <Container className={styles.createAccountContainer}>
        <Text className={styles.createAccountText}>Don't have an account?</Text>
        <HyperLink className={styles.createAccountLink} href={'#'}>Sign up</HyperLink>
      </Container>
    </Container>
  );
};

export default LoginSection;