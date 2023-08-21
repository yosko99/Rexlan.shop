const generateTemporaryPassword = (): string => {
  const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numericChars = '0123456789';
  const specialChars = '!@#$%^&*_=+-';

  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/;

  let generatedString = '';

  while (true) {
    generatedString = '';

    for (let i = 0; i < 8; i++) {
      const charSet = Math.floor(Math.random() * 4); // Randomly select character set

      switch (charSet) {
        case 0:
          generatedString +=
            lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
          break;
        case 1:
          generatedString +=
            upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
          break;
        case 2:
          generatedString +=
            numericChars[Math.floor(Math.random() * numericChars.length)];
          break;
        case 3:
          generatedString +=
            specialChars[Math.floor(Math.random() * specialChars.length)];
          break;
      }
    }

    if (pattern.test(generatedString)) {
      break;
    }
  }

  return generatedString;
};

export default generateTemporaryPassword;
