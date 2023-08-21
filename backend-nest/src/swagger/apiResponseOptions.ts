export const invalidTokenResponse = {
  status: 498,
  description: 'Provided invalid token',
};

export const noTokenResponse = {
  status: 401,
  description: 'Token not provided',
};

export const noTokenAndNoAdminResponse = {
  status: 401,
  description: 'Token not provided / User does not have privileges',
};

export const missingFieldsResponse = {
  status: 400,
  description: 'Invalid/missing fields',
};

export const passwordMismatchResponse = {
  status: 401,
  description: 'Password mismatch',
};
