import React, { useState } from 'react';
import Form from '../Form/Form';

interface UserCredentialsEmailAndPassword {
  email: string,
  password: string,
}

const LoginSection = () => {
  const [userCredentials, setUserCredentials] = useState<UserCredentialsEmailAndPassword>({
    email: '',
    password: '',
  });

  return (
    <Form onSubmit={() => {}}>
      
    </Form>
  );
};

export default LoginSection;