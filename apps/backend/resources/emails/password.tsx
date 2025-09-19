import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Link,
  Heading,
} from '@react-email/components';
import {EmailFooter} from "./components/footer.js";
import {EmailHeader} from "./components/header.js";
import { container } from "./style.js"
import i18n_service from "#services/i18n_service";
import React from 'react';

interface ForgotPasswordEmailProps {
  username: string;
  resetLink?: string;
  lang: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

const companyName = process.env.COMPANY_NAME;

export const ForgotPasswordEmail = (
  {
    username,
    resetLink = `${baseUrl}/reset-password?token=123456`,
    lang
  }: ForgotPasswordEmailProps) => {
  const i18n = i18n_service.get(lang)
  const previewText = `Reset your ${companyName} account password`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <EmailHeader
            headingText={`Forgot your password, ${username}?`}
            descriptionText={`No worries! Let's get you back into your ${companyName} account.`}
          />

          {/* Reset Section */}
          <Section style={resetSection}>
            <Heading style={resetHeading}>{i18n.t('forgotPassword.title')}</Heading>
            <Text style={resetText}>{i18n.t('forgotPassword.body')}</Text>
            <Link href={resetLink} style={resetButton}>
              {i18n.t('forgotPassword.button')}
            </Link>
            <Text style={resetSubtext}>
              {i18n.t('forgotPassword.subtext')}
            </Text>
          </Section>

          {/* Security Notice */}
          <Section style={securitySection}>
            <Text style={securityText}>
              {i18n.t('forgotPassword.security')}
            </Text>
          </Section>

          {/* Footer */}
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
};

ForgotPasswordEmail.PreviewProps = {
  username: "Alan Turing",
  resetLink: "https://cactoo.com/reset-password?token=abcdef",
} as ForgotPasswordEmailProps;

export default ForgotPasswordEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

// Reset Section Styles
const resetSection = {
  backgroundColor: "#ffffff",
  padding: "40px 32px",
  textAlign: "center" as const,
};

const resetHeading = {
  fontFamily: "HelveticaNeue-Medium,Helvetica,Arial,sans-serif",
  color: "#5D7B6F",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0 0 16px 0",
};

const resetText = {
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  color: "#333333",
  fontSize: "16px",
  margin: "0 0 24px 0",
  lineHeight: "1.5",
};

const resetButton = {
  display: "inline-block",
  backgroundColor: "#ff6b6b",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "6px",
  fontWeight: "700",
  textDecoration: "none",
  fontSize: "16px",
};

const resetSubtext = {
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  color: "#666666",
  fontSize: "14px",
  margin: "20px 0 0 0",
  lineHeight: "1.4",
};

// Security Section
const securitySection = {
  backgroundColor: "#f8f9fa",
  padding: "24px 32px",
  marginTop: "20px",
  borderRadius: "6px",
};

const securityText = {
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif"
}
