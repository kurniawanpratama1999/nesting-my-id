const randomLinkGenerator = () => {
  const characters =
    'abcdefghjikmnpqrtuwxyz123456789ABCDEFGHJKLMNPQRSTVWXYZ';

  const generate = characters
    .split('')
    .sort(() => Math.random() - 0.5)
    .sort(() => Math.random() - 0.5)
    .sort(() => Math.random() - 0.5)
    .sort(() => Math.random() - 0.5)
    .filter((val, index) => index < Math.floor(Math.random() * 4) + 6)
    .join('');

  return generate;
};

export default randomLinkGenerator;
