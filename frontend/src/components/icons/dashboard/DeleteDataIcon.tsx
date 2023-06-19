import React, { FC, useState } from 'react';

import { faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useQueryClient, useMutation } from 'react-query';

interface Props {
  apiRoute: string;
  queryKey: string;
}

const DeleteDataIcon: FC<Props> = ({ apiRoute, queryKey }) => {
  const queryClient = useQueryClient();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const mutation = useMutation(data => {
    return axios.delete(apiRoute);
  }, {
    onSuccess: () => {
      queryClient.removeQueries(queryKey);
      queryClient.invalidateQueries();
      localStorage.removeItem('liked');
      window.dispatchEvent(new Event('storage'));
      setDeleteLoading(false);
    },
    onMutate: () => {
      setDeleteLoading(true);
    }
  });

  const handleClick = () => {
    if (confirm('Are you sure you want to delete this?')) {
      mutation.mutate();
    }
  };

  return (
    <Button onClick={handleClick} variant='danger'>
      {
        deleteLoading
          ? <FontAwesomeIcon icon={faSpinner} spin />
          : <FontAwesomeIcon icon={faTrash} />
      }
    </Button>
  );
};

export default DeleteDataIcon;
