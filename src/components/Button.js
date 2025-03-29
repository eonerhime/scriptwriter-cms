function Button({ btnStyle, children }) {
  return (
    <button className={`${btnStyle}`} type="submit">
      {children}
    </button>
  );
}

export default Button;
