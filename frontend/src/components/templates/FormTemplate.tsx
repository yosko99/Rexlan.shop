/* eslint-disable indent */
import React, { useState, FC, useContext, useRef, useEffect } from 'react';

import axios from 'axios';
import { Form, Alert, Spinner, Button } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { TokenContext } from '../../context/TokenContext';
import convertFormInputToObject from '../../functions/convertFormInputToObject';
import ErrorResponse from '../../interfaces/errorResponse';
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

const FormTemplate: FC<Props> = ({
  className,
  mutateURL,
  inputs,
  redirectOnSuccessURL,
  onSuccessFn,
  updateRequest,
  sendTokenBack
}) => {
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

  const mutation = useMutation(
    (data) => {
      return !updateRequest
        ? axios.post(mutateURL, data, {
            headers: requestHeaders
          })
        : axios.put(mutateURL, data, {
            headers: requestHeaders
          });
    },
    {
      onError: (err: ErrorResponse) => {
        const errorMsg = err.response.data.message;

        setOnMutateAlert(
          <Alert className="mt-3 rounded-pill text-center" variant="danger">
            {typeof errorMsg !== 'string' ? 'Error occurred' : errorMsg}
          </Alert>
        );
        setIsFetchingData(false);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries();
        onSuccessFn && onSuccessFn();

        if (data.data.status === 404 || data.data.status === 403) {
          setOnMutateAlert(
            <Alert className="mt-3 rounded-pill text-center" variant="danger">
              {typeof data.data.message !== 'string'
                ? 'Error occurred'
                : data.data.message}
            </Alert>
          );
        } else {
          setOnMutateAlert(
            <Alert className="mt-3 rounded-pill text-center" variant="success">
              {data.data.msg}
              {redirectOnSuccessURL !== undefined && (
                <Spinner animation="border" size="sm" className="ms-2" />
              )}
            </Alert>
          );
        }

        setIsFetchingData(false);

        if (redirectOnSuccessURL !== undefined) {
          setTimeout(() => {
            if (data.data.token !== undefined) {
              token!.setToken(data.data.token);
              localStorage.setItem('cart', data.data.cartId);
              navigate(redirectOnSuccessURL);
            }
          }, 500);
        }
      },
      onMutate: (): void => {
        setIsFetchingData(true);
      }
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    data.current = convertFormInputToObject(formRef);
    const form = event.currentTarget;
    const localStorageCart = localStorage.getItem('cart');
    let cartId: String | null = null;

    if (localStorageCart !== null) {
      cartId = localStorageCart;
    }

    event.preventDefault();

    if (form.checkValidity()) {
      mutation.mutate({ ...data.current, cartId } as any);
    }

    setFormValidated(true);
  };

  const handleChange = () => {
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
      onChange={handleChange}
      onSubmit={(e) => handleSubmit(e)}
    >
      <>{inputs}</>

      <Button variant="outline-primary" className="w-100 mt-3" type="submit">
        {isFetchingData ? <Loading height="10" /> : <>{lang.global.submit}</>}
      </Button>

      {(mutation.isError || mutation.isSuccess) && <>{onMutateAlert}</>}
    </Form>
  );
};

export default FormTemplate;
