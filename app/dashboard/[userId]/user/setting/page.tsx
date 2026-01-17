"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER_SETTINGS } from "@/config/ui-text";
import { useUserSettings } from "@/hooks/useUserSettings";

const UserSettingPage = () => {
  const {
    user,
    isInitialLoading,
    isEditingPhone,
    phoneNumber,
    currentPassword,
    newPassword,
    confirmPassword,
    setIsEditingPhone,
    setPhoneNumber,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    handlePhoneSave,
    handlePhoneCancel,
    handlePasswordSave,
    handleLogout,
  } = useUserSettings();

  if (isInitialLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        {USER_SETTINGS.LOADING}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        {USER_SETTINGS.FETCH_ERROR}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full p-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>{USER_SETTINGS.PROFILE_INFO}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 이메일 */}
          <div className="space-y-2">
            <Label htmlFor="email">{USER_SETTINGS.EMAIL_LABEL}</Label>
            <div className="flex items-center gap-2">
              <Input
                id="email"
                value={user.email}
                disabled
                className="bg-muted"
              />
              {user.emailVerified && (
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  ({USER_SETTINGS.EMAIL_VERIFIED})
                </span>
              )}
            </div>
          </div>

          {/* 전화번호 */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">{USER_SETTINGS.PHONE_LABEL}</Label>
            <div className="flex items-center gap-2">
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={!isEditingPhone}
                className={!isEditingPhone ? "bg-muted" : ""}
              />
              {!isEditingPhone ? (
                <Button
                  onClick={() => setIsEditingPhone(true)}
                  variant="outline"
                >
                  {USER_SETTINGS.EDIT}
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handlePhoneSave}>
                    {USER_SETTINGS.SAVE}
                  </Button>
                  <Button onClick={handlePhoneCancel} variant="outline">
                    {USER_SETTINGS.CANCEL}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* 가입일 */}
          <div className="space-y-2">
            <Label>{USER_SETTINGS.JOIN_DATE_LABEL}</Label>
            <Input
              value={new Date(user.createdAt).toLocaleDateString("ko-KR")}
              disabled
              className="bg-muted"
            />
          </div>

          {/* 비밀번호 변경 */}
          <div className="space-y-3 pt-4 border-t">
            <Label>{USER_SETTINGS.PASSWORD_CHANGE}</Label>
            <Input
              type="password"
              placeholder={USER_SETTINGS.CURRENT_PASSWORD}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder={USER_SETTINGS.NEW_PASSWORD}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder={USER_SETTINGS.CONFIRM_PASSWORD}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button onClick={handlePasswordSave} className="w-full">
              {USER_SETTINGS.PASSWORD_CHANGE}
            </Button>
          </div>

          {/* 로그아웃 */}
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleLogout} variant="outline">
              {USER_SETTINGS.LOGOUT}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSettingPage;
