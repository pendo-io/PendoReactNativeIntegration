const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const isStringsEquals = (str1, str2) => {
  if (str1.localeCompare(str2) === 0) {
    return true;
  }
  return false;
};
export {capitalize, isStringsEquals};
