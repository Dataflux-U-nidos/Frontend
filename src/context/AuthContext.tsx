import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  login as loginService,
  logout as logoutService,
  getSession,
} from "@/services/authService";
import { useCreateUser } from "@/hooks/user/useCreateUserHook";
import { useRegisterUser } from "@/hooks/user/useRegisterUserHook";
import {User } from "@/types/userType";
import { useGetMyUser } from "@/hooks/user/useGetMyUserHook";

interface IAuthContext {
  user: User | null;
  userType: string | null;
  isAuthLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  createAccount: (userData: unknown) => Promise<void>;
  registryAccount: (userData: unknown) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userType, setUserType] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { mutateAsync: fetchUser } = useGetMyUser();
  


  const checkSession = async () => {
    setIsAuthLoading(true);           // marcamos loading al inicio
    try {
      // 1) verificamos sesión
      const session = await getSession();
      setUserType(session.userType);

      // 2) esperamos a que llegue el user con testCompleted
      const me = await fetchUser();
      setUser(me);
    } catch {
      setUserType(null);
      setUser(null);
    } finally {
      setIsAuthLoading(false);        // sólo aquí, **tras** fetchUser
    }
  };

  useEffect(() => {
    checkSession();
  }, []);


  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginService({ email, password }),
    onSuccess: (data) => {
      setUserType(data.userType);
    },
  });

  const createUserMutation = useCreateUser();
  const registerMutation = useRegisterUser();

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
    await checkSession();
  };

  const logout = async () => {
    await logoutService();
    setUserType(null);
    setUser(null);
  };

  const createAccount = async (userData: any) => {
    await createUserMutation.mutateAsync({ ...userData });
  };

  const registryAccount = async (userData: any) => {
    // Si tu endpoint registry necesita el campo `type`, lo agregamos aquí:

    await registerMutation.mutateAsync({ ...userData });
  };

   const refreshUser = async () => {
    try {
      const u = await fetchUser();
      setUser(u);
    } catch (err) {
      console.error("Error al refrescar user:", err);
    }
  };

  const value: IAuthContext = {
    user,
    userType,
    isAuthLoading,
    login,
    logout,
    createAccount,
    registryAccount,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};