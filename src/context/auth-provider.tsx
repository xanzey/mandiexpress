
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  User,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile as firebaseUpdateProfile,
  type UserInfo
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import type { Address } from "@/types";
import { getUserData, updateUserData } from "@/services/user-data";

interface UserData {
    address: Address | null;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  sendOtp: (phone: string) => Promise<ConfirmationResult>;
  verifyOtp: (confirmationResult: ConfirmationResult, otp: string) => Promise<any>;
  signUpWithEmail: (email: string, password: string) => Promise<any>;
  signInWithEmail: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  updateProfile: (data: Partial<UserInfo>) => Promise<void>;
  updateUserAddress: (address: Address) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const data = await getUserData(user.uid);
        setUserData(data as UserData);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const setupRecaptcha = () => {
    if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }
  };

  const sendOtp = (phone: string) => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    return signInWithPhoneNumber(auth, phone, appVerifier);
  };

  const verifyOtp = (confirmationResult: ConfirmationResult, otp: string) => {
    return confirmationResult.confirm(otp);
  };

  const signUpWithEmail = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmail = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth).then(() => {
        router.push('/');
    });
  };

  const updateProfile = async (data: Partial<UserInfo>) => {
    if (auth.currentUser) {
        await firebaseUpdateProfile(auth.currentUser, data);
        setUser(prevUser => prevUser ? Object.assign(Object.create(Object.getPrototypeOf(prevUser)), prevUser) : null);
    }
  };

  const updateUserAddress = async (address: Address) => {
    if (auth.currentUser) {
        await updateUserData(auth.currentUser.uid, { address });
        setUserData(prevData => ({ ...prevData, address }));
    }
  };

  const value = {
    user,
    userData,
    loading,
    sendOtp,
    verifyOtp,
    signUpWithEmail,
    signInWithEmail,
    logout,
    updateProfile,
    updateUserAddress
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function withPublic(Component: React.ComponentType<any>) {
  return function WithPublic(props: any) {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (user) {
      router.replace("/profile");
      return null;
    }

    return <Component {...props} />;
  };
}

export function withProtected(Component: React.ComponentType<any>) {
  return function WithProtected(props: any) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace("/login");
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return <div>Loading...</div>; // Or a proper loading spinner
    }

    return <Component {...props} />;
  };
}

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}
