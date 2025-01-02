export const displayNameRegex = (name) => {
  const regex = /^(?! )[a-zA-Z0-9 _-]{3,30}(?<! )$/;
  return regex.test(name);
}
