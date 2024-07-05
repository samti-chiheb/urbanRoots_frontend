import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Définir l'interface pour auth
interface Auth {
  // Ajoutez les propriétés nécessaires ici
  user?: string;
  token?: string;
}

// Définir l'interface pour le contexte
interface AuthContextType {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
}

// Créer le contexte avec un type approprié
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<Auth>({}); // Utiliser le type défini pour auth

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
