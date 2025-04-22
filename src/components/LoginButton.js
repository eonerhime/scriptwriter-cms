import Button from "./Button";

export default function LoginButton({ type, btnStyle, loading }) {
  return (
    <Button
      type={type}
      btnStyle={btnStyle}
      loading={loading}
      pendingLabel="Loggin in..."
    >
      Login
    </Button>
  );
}
