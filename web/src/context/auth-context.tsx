import keycloak from "@/services/keycloak";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import { type KeycloakProfile } from "keycloak-js";

interface AuthContextProps {
  token: string;
  userInfo: KeycloakProfile | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string>("");
  const [userInfo, setUserInfo] = useState<KeycloakProfile | null>(null);

  console.log(userInfo);

  useEffect(() => {
    keycloak
      .init({ onLoad: "login-required" })
      .then(async (authenticated) => {
        if (authenticated) {
          setToken(keycloak.token || "");
          const profile = await keycloak.loadUserProfile();
          setUserInfo(profile);
        } else {
          keycloak.login();
        }
      })
      .catch(console.error);
  }, []);

  const login = () => keycloak.login();
  const logout = () => keycloak.logout();

  return (
    <AuthContext.Provider value={{ token, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
