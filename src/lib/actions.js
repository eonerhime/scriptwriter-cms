import { signIn } from "./useAuth";

export function useLogin({ email, password }) {
  signIn({ email, password });
}
