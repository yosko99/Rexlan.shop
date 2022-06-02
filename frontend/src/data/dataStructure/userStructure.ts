export interface UserStructure {
    _id: string;
    email: string;
    password: string;
    name: string;
    address: string;
    phone: string;
    zipcode: string;
    isAdmin: boolean;
}

export const userStructure: UserStructure = {
  _id: '',
  email: '',
  password: '',
  name: '',
  address: '',
  phone: '',
  zipcode: '',
  isAdmin: false
};
