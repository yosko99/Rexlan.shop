import InputStructure from './inputStructure';

export interface UserStructure {
  id: string;
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
  zipcode: string;
  isAdmin: boolean;
  inputs: {
    [key: string]: InputStructure[];
  };
}

export const passwordInputForUserStructure: { [key: string]: InputStructure } =
  {
    en: {
      title: 'Password',
      name: 'password',
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$'
    },
    bg: {
      title: 'Парола',
      name: 'password',
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$'
    },
    es: {
      title: 'Contraseña',
      name: 'password',
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$'
    }
  };

export const userStructure: UserStructure = {
  id: '',
  email: '',
  password: '',
  name: '',
  address: '',
  phone: '',
  zipcode: '',
  isAdmin: false,
  inputs: {
    en: [
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
        title: 'Address',
        name: 'address'
      },
      {
        title: 'Phone',
        name: 'phone',
        pattern: '\\+\\d{12}'
      },
      {
        title: 'Admin',
        name: 'isAdmin',
        isRadio: true
      }
    ],
    bg: [
      {
        title: 'Имейл',
        name: 'email',
        pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
      },
      {
        title: 'Име',
        name: 'name'
      },
      {
        title: 'Адрес',
        name: 'address'
      },
      {
        title: 'Телефон',
        name: 'phone',
        pattern: '\\+\\d{12}'
      },
      {
        title: 'Админ',
        name: 'isAdmin',
        isRadio: true
      }
    ],
    es: [
      {
        title: 'Correo electrónico',
        name: 'email',
        pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
      },
      {
        title: 'Nombre',
        name: 'name'
      },
      {
        title: 'Direccion',
        name: 'address'
      },
      {
        title: 'Teléfono',
        name: 'phone',
        pattern: '\\+\\d{12}'
      },
      {
        title: 'Administrador',
        name: 'isAdmin',
        isRadio: true
      }
    ]
  }
};
