import inputStructure from './inputStructure';

export interface UserStructure {
    _id: string;
    email: string;
    password: string;
    name: string;
    address: string;
    phone: string;
    zipcode: string;
    isAdmin: boolean;
    inputs: inputStructure[];
}

export const userStructure: UserStructure = {
  _id: '',
  email: '',
  password: '',
  name: '',
  address: '',
  phone: '',
  zipcode: '',
  isAdmin: false,
  inputs: [
    {
      title: 'Email',
      name: 'email',
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
    },
    {
      title: 'Name',
      name: 'name'
    },
    {
      title: 'Password',
      name: 'password',
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$'
    },
    {
      title: 'Address',
      name: 'address'
    },
    {
      title: 'Phone',
      name: 'phone',
      pattern: '\\+\\d{12}'
    },
    {
      title: 'Zip Code',
      name: 'zipcode',
      pattern: '\\d{4,}'
    },
    {
      title: 'Is admin (true / false)',
      name: 'isAdmin',
      pattern: '(true|false)'
    }
  ]
};
