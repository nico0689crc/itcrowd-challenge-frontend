import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./Modal";
import { QueryClientProvider } from "./QueryClient";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <QueryClientProvider>
        <ModalProvider>{children}</ModalProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default Providers;
