import { useEffect, useState } from "react";

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  role: string | null;
  accessToken: string | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

export function useAuth(): AuthState {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userId: null,
    role: null,
    accessToken: null,
    status: "loading",
  });

  useEffect(() => {
    // 서버에서 설정한 헤더 확인
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        setAuthState({
          isAuthenticated: data.isAuthenticated,
          userId: data.userId,
          role: data.role,
          accessToken: data.accessToken,
          status: data.isAuthenticated ? "authenticated" : "unauthenticated",
        });
      } catch (error) {
        console.error("Auth check failed:", error);
        setAuthState({
          isAuthenticated: false,
          userId: null,
          role: null,
          accessToken: null,
          status: "unauthenticated",
        });
      }
    };

    checkAuth();
  }, []);

  return authState;
}
