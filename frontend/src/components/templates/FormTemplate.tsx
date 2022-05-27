import React, { useState, FC, useContext, useRef, useEffect } from 'react';

import axios from 'axios';
import { Form, Alert, Spinner, Button } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { TokenContext } from '../../context/TokenContext';

interface Props {
  className?: string;
  mutateURL: string;
  onSuccessFn?: () => void;
  redirectOnSuccess?: boolean;
  inputs: React.ReactChild;
  updateRequest?: boolean;
}

interface ErrorResponse {
  response: {
    data: string;
  }
}

const getFormInputs = (formRef: React.RefObject<HTMLFormElement>) => {
  const inputs = formRef.current!.elements;
  const tempObj = {};

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].nodeName === 'INPUT') {
      Object.defineProperty(
        tempObj,
        inputs[i].getAttribute('name') as string,
        { value: inputs[i].getAttribute('value') });
    }
  }

  return tempObj;
};

const FormTemplate: FC<Props> = ({ className, mutateURL, inputs, redirectOnSuccess = true, onSuccessFn, updateRequest }) => {
  const [data, setData] = useState({});
  const formRef = useRef<HTMLFormElement>(null);
  const [formValidated, setFormValidated] = useState<boolean>(false);
  const [onMutateAlert, setOnMutateAlert] = useState<React.ReactNode>();
  const token = useContext(TokenContext);
  const navigate = useNavigate();

  const mutation = useMutation(data => {
    return !updateRequest
      ? axios.post(mutateURL, data, {
        headers: {
          authorization: 'Bearer ' + token!.token
        }
      })
      : axios.put(mutateURL, data, {
        headers: {
          authorization: 'Bearer ' + token!.token
        }
      });
  }, {
    onError: (err: ErrorResponse) => {
      const errorMsg = err.response.data;

      setOnMutateAlert(<Alert
        className='mt-3 rounded-pill text-center'
        variant='danger'>{typeof errorMsg !== 'string' ? 'Error occurred' : errorMsg}</Alert>);
    },
    onSuccess: (data) => {
      onSuccessFn && onSuccessFn();

      // Post request successfull

      setOnMutateAlert(<Alert
        className='mt-3 rounded-pill text-center'
        variant='success'>
        {data.data.msg}
        {redirectOnSuccess && <Spinner animation='border' size='sm' className='ms-2' />}
      </Alert>);
      if (redirectOnSuccess) {
        setTimeout(() => {
          if (data.data.token !== undefined) {
            token!.setToken(data.data.token);
            localStorage.setItem('cart', data.data.cartID);
            navigate('/');
          }
        }, 500);
      }
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const localStorageCart = localStorage.getItem('cart');
    let cartID: String | null = null;

    if (localStorageCart !== null) {
      cartID = localStorageCart;
    }

    event.preventDefault();
    if (form.checkValidity()) {
      mutation.mutate({ ...data, cartID } as any);
    }
    setFormValidated(true);
  };

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = (e.target as HTMLInputElement);
    setData({
      ...data,
      [target.name]: target.value
    });
  };

  // Depending on passed inputs assign data
  useEffect(() => {
    setData(getFormInputs(formRef));
  }, []);

  return (
    <Form
      ref={formRef}
      className={className}
      noValidate
      validated={formValidated}
      onChange={(e) => handleChange(e)}
      onSubmit={(e) => handleSubmit(e)}>

      <>{inputs}</>

      <Button variant="outline-primary" className='w-100 mt-3' type="submit">
        Submit
      </Button>

      {(mutation.isError || mutation.isSuccess) && <>{onMutateAlert}</>
      }
    </Form>
  );
};

export default FormTemplate;
