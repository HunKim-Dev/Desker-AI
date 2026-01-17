"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { signUpSchema } from "@/lib/validators/auth";
import { USER_SETTINGS } from "@/config/ui-text";
import { ERROR_MESSAGE } from "@/config/constants";

const updatePhoneNumberSchema = signUpSchema.pick({ phoneNumber: true });
const updatePasswordSchema = signUpSchema.pick({ password: true });

type User = {
  id: string;
  email: string;
  phoneNumber: string;
  emailVerified: Date | null;
  createdAt: Date;
};

export const useUserSettings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // 전화번호 상태
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  // 비밀번호 상태
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setIsInitialLoading(true);
      try {
        const response = await fetch("/api/dashboard/user");

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setPhoneNumber(data.phoneNumber);
        } else {
          console.error(
            ERROR_MESSAGE.USER_FETCH_FAILURE,
            await response.json()
          );
        }
      } catch (error) {
        console.error(ERROR_MESSAGE.USER_INIT_FAILURE, error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handlePhoneSave = async () => {
    if (!user) return;

    const validation = updatePhoneNumberSchema.safeParse({ phoneNumber });
    if (!validation.success) {
      alert(validation.error.errors[0].message);
      return;
    }

    try {
      const response = await fetch("/api/dashboard/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUser(updatedData);
        setIsEditingPhone(false);
        alert(USER_SETTINGS.UPDATE_SUCCESS);
      } else {
        const errorData = await response.json();
        alert(errorData.error?.message || USER_SETTINGS.PHONE_UPDATE_FAILURE);
      }
    } catch (error) {
      console.error(ERROR_MESSAGE.PHONE_UPDATE_ERROR, error);
      alert(USER_SETTINGS.PHONE_UPDATE_ERROR);
    }
  };

  const handlePasswordSave = async () => {
    if (newPassword !== confirmPassword) {
      alert(USER_SETTINGS.PASSWORD_MISMATCH);
      return;
    }

    const validation = updatePasswordSchema.safeParse({
      password: newPassword,
    });
    if (!validation.success) {
      alert(validation.error.errors[0].message);
      return;
    }

    try {
      const response = await fetch("/api/dashboard/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        alert(USER_SETTINGS.PASSWORD_CHANGE_SUCCESS);
      } else {
        const errorData = await response.json();
        alert(
          errorData.error?.message || USER_SETTINGS.PASSWORD_CHANGE_FAILURE
        );
      }
    } catch (error) {
      console.error(ERROR_MESSAGE.PASSWORD_CHANGE_ERROR, error);
      alert(USER_SETTINGS.PASSWORD_CHANGE_ERROR);
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  const handlePhoneCancel = () => {
    if (user) {
      setPhoneNumber(user.phoneNumber);
    }
    setIsEditingPhone(false);
  };

  return {
    // 상태
    user,
    isInitialLoading,
    isEditingPhone,
    phoneNumber,
    currentPassword,
    newPassword,
    confirmPassword,

    // 상태 변경
    setIsEditingPhone,
    setPhoneNumber,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,

    // 핸들러
    handlePhoneSave,
    handlePhoneCancel,
    handlePasswordSave,
    handleLogout,
  };
};
