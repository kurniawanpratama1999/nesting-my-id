function Header({ children, className = '', ...props }) {
  return (
    <header className={`w-full h-full ${className}`.trim()} {...props}>
      {children}
    </header>
  );
}

export default Header;
