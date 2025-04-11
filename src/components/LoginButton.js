import Button from "./Button";

export default function LoginButton({ loading }) {
  return (
    <Button loading={loading} pendingLabel="Loggin in...">
      Login
    </Button>
  );
}
