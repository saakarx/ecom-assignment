function Header({ heading }) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '3rem'
      }}
    >
      <h1>{heading}</h1>
    </header>
  );
}

export default Header;
