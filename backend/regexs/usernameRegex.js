export const usernameRegex = (string) => {
  // Hanya memperbolehkan huruf, angka, titik, dan garis bawah
  const regex = /^[a-zA-Z0-9._]+$/;
  return regex.test(string);
};
