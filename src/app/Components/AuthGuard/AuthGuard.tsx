"use client";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { authState } from "@/app/helpers/authState";
import { ReactNode, useEffect, useState } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useRecoilValue(authState);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(false);
    } else {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthGuard;
