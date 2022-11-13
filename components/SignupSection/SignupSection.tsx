import React, { useState } from 'react';
import Button from '../Button/Button';
import Container from '../Container/Container';
import Form from '../Form/Form';
import HyperLink from '../HyperLink/HyperLink';
import Image from '../Image/Image';
import Input from '../Input/Input';
import Label from '../Label/Label';
import Text from '../Text/Text';
import { CheckIcon } from '@heroicons/react/24/solid';
import firebaseAuth from '../../firebase/index';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, fetchSignInMethodsForEmail, createUserWithEmailAndPassword } from "firebase/auth";
import styles from './signupSection.module.css';

const SignupSection = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const loginWithCredentials = () => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User created account successfully.', user);
        setSubmitted(true);
      })
      .catch((error) => {
        setSubmitted(true);
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
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

  const validEmailRegex = new RegExp(/^\S+@\S+\.\S+$/);
  const validPasswordRegex = new RegExp(/^.{8,}$/);

  if(!validEmail && validEmailRegex.test(email)) {
    setValidEmail(true);
  } else if(validEmail && !validEmailRegex.test(email)) {
    setValidEmail(false);
  }

  if(!validPassword && validPasswordRegex.test(password)) {
    setValidPassword(true);
  } else if(validPassword && !validPasswordRegex.test(password)) {
    setValidPassword(false);
  }

  return (
    <Container className={styles.loginFormContainer} type='div'>
      <Text className={styles.heading} type='h1'>Get started</Text>
      <Text className={styles.subHeading} type='p'>Sign up to set up your Perfin dashboard</Text>
      <Form className={styles.form} onSubmit={(e: any) => {e.preventDefault()}}>
        <Container className={styles.inputFieldContainer} type='div'>
          <Label className={styles.inputFieldLabel} htmlFor={'signupInputFieldEmail'}>Email</Label>
          <Input id={'signupInputFieldEmail'} className={styles.inputFieldElement} type='email' placeholder='josue@perfin.com' onChange={setEmail} />
          <CheckIcon className={`${styles.checkIcon} ${validEmail && styles.active}`} />
        </Container>
        {!validEmail && submitted ? <Text className={styles.invalidEmailWarning}>Please enter a valid email address</Text> : <></>}
        <Container className={styles.inputFieldContainer} type='div'>
          <Label className={styles.inputFieldLabel} htmlFor={'signupInputFieldPassword'}>Password</Label>
          <Input id={'signupInputFieldPassword'} className={styles.inputFieldElement} type='password' placeholder='••••••••' onChange={setPassword} />
          <CheckIcon className={`${styles.checkIcon} ${validPassword && styles.active}`} />
        </Container>
        {!validPassword && submitted ? <Text className={styles.invalidPasswordWarning}>Password must be at least 8 characters long</Text> : <></>}
        <Container className={styles.optionsContainer}>
          <Label className={styles.rememberPasswordLabel}>
            <Input id={'loginRememberPassword'} className={styles.inputCheckboxElement} type='checkbox' />
            <span className={styles.customInputCheckboxStyles}></span>
            <Text className={styles.rememberPasswordText} type={'p'}>Remember Password</Text>
          </Label>
        </Container>
        <Button className={styles.loginWithCredentials} onClick={loginWithCredentials}>Sign up</Button>
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
        <Text className={styles.createAccountText}>Already have an account?</Text>
        <HyperLink className={styles.createAccountLink} href={'/login'}>Log in</HyperLink>
      </Container>
    </Container>
  );
};

export default SignupSection;