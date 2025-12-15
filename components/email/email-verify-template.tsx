import * as React from "react";
import { EMAIL_TEMPLATE } from "@/config/constants";

interface EmailTemplateProps {
  verifyUrl: string;
}

const EmailVerifyTemplate = ({ verifyUrl }: EmailTemplateProps) => {
  return (
    <div>
      <h1>{EMAIL_TEMPLATE.TITLE}</h1>
      <p>{EMAIL_TEMPLATE.DESCRIPTION}</p>
      <p>
        <a href={verifyUrl}>{EMAIL_TEMPLATE.LINK_TEXT}</a>
      </p>
      <p>{EMAIL_TEMPLATE.AGAIN_AUTH_TEXT}</p>
    </div>
  );
};

export default EmailVerifyTemplate;
