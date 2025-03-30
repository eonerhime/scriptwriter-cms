function Button({ btnstyle, children }) {
  return (
    <button className={`${btnstyle}`} type="submit">
      {children}
    </button>
  );
}

export default Button;
