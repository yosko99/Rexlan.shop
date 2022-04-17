import React, { useState, FC } from 'react';

import axios from 'axios';
import { Form, Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

interface Props {
	className?: string;
	data: object,
	setData: React.Dispatch<any>;
	mutateURL: string;
	onErrorMsg: string;
	onSuccessMsg: string;
	inputs: React.ReactChild;
}

const FormTemplate: FC<Props> = ({ className, data, setData, mutateURL, onErrorMsg, onSuccessMsg, inputs }) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [alert, setAlert] = useState<React.ReactNode>();

  const mutation = useMutation(data => {
    return axios.post(mutateURL, data);
  }, {
    onError: () => {
      setAlert(<Alert
        className='mt-3 rounded-pill text-center'
        variant='danger'>{onErrorMsg}</Alert>);
    },
    onSuccess: () => {
      setAlert(<Alert
        className='mt-3 rounded-pill text-center'
        variant='success'>{onSuccessMsg}</Alert>);
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
