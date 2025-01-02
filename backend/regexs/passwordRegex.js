export const passwordRegex = (string) => {
  // Aturan:
  // - Minimal 8 karakter
  // - Harus ada huruf kecil
  // - Harus ada huruf besar
  // - Harus ada angka
  // - Harus ada simbol
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  return regex.test(string);
};
