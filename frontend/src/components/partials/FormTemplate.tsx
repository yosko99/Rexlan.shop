import React, { useState, FC, useContext } from 'react';

import axios from 'axios';
import { Form, Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { TokenContext } from '../../context/TokenContext';

interface Props {
	className?: string;
	data: object,
	setData: React.Dispatch<any>;
	mutateURL: string;
	inputs: React.ReactChild;
  login?: boolean;
}

interface ErrorResponse {
  response: {
    data: {
      msg: string;
    }
  }
}

const FormTemplate: FC<Props> = ({ className, data, setData, mutateURL, inputs }) => {
  const [alert, setAlert] = useState<React.ReactNode>();
  const [validated, setValidated] = useState(false);
  const token = useContext(TokenContext);
  const navigate = useNavigate();

  const mutation = useMutation(data => {
    return axios.post(mutateURL, data);
  }, {
    onError: (err: ErrorResponse) => {
      const errorMsg = err.response.data.msg;

      setAlert(<Alert
        className='mt-3 rounded-pill text-center'
        variant='danger'>{errorMsg}</Alert>);
    },
    onSuccess: (data) => {
      token!.setToken(data.data.token);
      setAlert(<Alert
        className='mt-3 rounded-pill text-center'
        variant='success'>{data.data.msg}</Alert>);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity()) {
      mutation.mutate(data as any);
    }
    setValidated(true);
  };

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = (e.target as HTMLInputElement);
    setData({
      ...data,
      [target.name]: target.value
    });
  };

  return (
		<Form
      className={className}
      noValidate
      validated={validated}
      onChange={(e) => handleChange(e)}
      onSubmit={(e) => handleSubmit(e)}>

			<>
				{inputs}
			</>

      {(mutation.isError || mutation.isSuccess) && <>{ alert }</>
      }
		</Form>
  );
};

export default FormTemplate;
