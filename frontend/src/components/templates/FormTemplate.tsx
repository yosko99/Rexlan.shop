import React, { useState, FC, useContext, useRef, useEffect } from 'react';

import axios from 'axios';
import { Form, Alert, Spinner, Button } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { TokenContext } from '../../context/TokenContext';
import convertFormInputToObject from '../../functions/convertFormInputToObject';
import Loading from '../loading/Loading';

interface Props {
  className?: string;
  mutateURL: string;
  onSuccessFn?: () => void;
  redirectOnSuccessURL?: string;
  inputs: React.ReactChild;
  updateRequest?: boolean;
  sendTokenBack?: boolean;
}

interface ErrorResponse {
  response: {
    data: string;
  }
}

const FormTemplate: FC<Props> = ({ className, mutateURL, inputs, redirectOnSuccessURL, onSuccessFn, updateRequest, sendTokenBack }) => {
  const queryClient = useQueryClient();
  const data = useRef({});
  const formRef = useRef<HTMLFormElement>(null);
  const [formValidated, setFormValidated] = useState<boolean>(false);
  const [onMutateAlert, setOnMutateAlert] = useState<React.ReactNode>();
  const token = useContext(TokenContext);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const navigate = useNavigate();

  const { lang } = useContext(CurrentLanguageContext);

  const requestHeaders = {
    authorization: 'Bearer ' + token!.token,
    sendTokenBack: sendTokenBack === undefined ? false : sendTokenBack
  };

  const mutation = useMutation(data => {
    return !updateRequest
      ? axios.post(mutateURL, data, {
        headers: requestHeaders
      })
      : axios.put(mutateURL, data, {
        headers: requestHeaders
      });
  }, {
    onError: (err: ErrorResponse) => {
      const errorMsg = err.response.data;

      setOnMutateAlert(<Alert
        className='mt-3 rounded-pill text-center'
        variant='danger'>{typeof errorMsg !== 'string' ? 'Error occurred' : errorMsg}</Alert>);
      setIsFetchingData(false);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      onSuccessFn && onSuccessFn();

      setOnMutateAlert(
        <Alert
          className='mt-3 rounded-pill text-center'
          variant='success'>
          {data.data.msg}
          {redirectOnSuccessURL !== undefined && <Spinner animation='border' size='sm' className='ms-2' />}
        </Alert>);
      setIsFetchingData(false);
      if (redirectOnSuccessURL !== undefined) {
        setTimeout(() => {
          if (data.data.token !== undefined) {
            token!.setToken(data.data.token);
            localStorage.setItem('cart', data.data.cartID);
            navigate(redirectOnSuccessURL);
          }
        }, 500);
      }
    },
    onMutate: (): void => {
      setIsFetchingData(true);
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    data.current = convertFormInputToObject(formRef);
    const form = event.currentTarget;
    const localStorageCart = localStorage.getItem('cart');
    let cartID: String | null = null;

    if (localStorageCart !== null) {
      cartID = localStorageCart;
    }

    event.preventDefault();

    if (form.checkValidity()) {
      mutation.mutate({ ...data.current, cartID } as any);
    }

    setFormValidated(true);
  };

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    data.current = convertFormInputToObject(formRef);
  };

  // Depending on passed inputs assign data
  useEffect(() => {
    data.current = convertFormInputToObject(formRef);
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
        {isFetchingData
          ? <Loading height='10' />
          : <>{lang.global.submit}</>
        }
      </Button>

      {(mutation.isError || mutation.isSuccess) && <>{onMutateAlert}</>
      }
    </Form>
  );
};

export default FormTemplate;
