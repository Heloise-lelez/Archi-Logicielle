import {
  Body,
  Container,
  Head,
  Html,
  Link, Preview,
  Section,
} from '@react-email/components';
import {EmailHeader} from "./components/header.js";

import {
  container,
  offerBadge, offerBadgeText
} from "./style.js";
import {EmailFooter} from "./components/footer.js";
import i18n_service from "#services/i18n_service";
import React from 'react';

interface VerifyIdentityEmailProps {
  username: string;
  validationCode: string;
  lang: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const VerificationEmail = (
  {
    validationCode,
    username,
    lang
  }: VerifyIdentityEmailProps) => {
  const i18n = i18n_service.get(lang)

  return (
    <Html>
      <Head />
      <Preview>{i18n.t('verifyEmail.preview')}</Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader
            headingText={i18n.t('verifyEmail.heading')}
            descriptionText={i18n.t('verifyEmail.description')}
          />

          <Section style={mainSection}>
            <p style={introText}>
              Hi {username}, to finish setting up your account, please confirm your email by clicking the button below.
            </p>

            <div style={offerBadge}>
              <Link href={"/"} style={offerBadgeText}>
                {i18n.t('verifyEmail.button')}
              </Link>
            </div>

            <p style={subText}>{i18n.t('verifyEmail.fallback')}</p>

            <p style={linkText}>
              <Link href={`${baseUrl}/verify?code=${validationCode}`} style={linkUrl}>
                {`${baseUrl}/verify?code=${validationCode}`}
              </Link>
            </p>

            <p style={expiryText}>{i18n.t('verifyEmail.expiry')}</p>
          </Section>

          <EmailFooter/>
        </Container>
      </Body>
    </Html>
  )
};

VerificationEmail.PreviewProps = {
  validationCode: '144833',
  username: 'Stalleo',
  lang: "fr"
} as VerifyIdentityEmailProps;

export default VerificationEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
};

const mainSection = {
  backgroundColor: '#ffffff',
  margin: '0',
  padding: '40px 32px',
  textAlign: 'center' as const,
  borderRadius: '0',
  position: 'relative' as const,

}

const introText = {
  fontSize: "16px",
  color: "#333333",
  margin: "0 0 16px 0",
  lineHeight: "1.5",
};

const subText = {
  fontSize: "14px",
  color: "#666666",
  margin: "24px 0 8px 0",
  lineHeight: "1.5",
};

const linkText = {
  fontSize: "14px",
  margin: "0 0 24px 0",
};

const linkUrl = {
  color: "#5D7B6F",
  textDecoration: "underline",
  wordBreak: "break-all" as const,
};

const expiryText = {
  fontSize: "12px",
  color: "#999999",
  fontStyle: "italic" as const,
  margin: "0",
};
