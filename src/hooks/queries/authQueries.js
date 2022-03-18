import { useMutation } from "react-query";
import { AuthService } from "../../lib/AuthService";

export const useLoginMutation = () => {
  return useMutation(input => AuthService.login(input));
};
