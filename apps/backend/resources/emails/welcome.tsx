import {
  Body, Column,
  Container,
  Head,
  Heading,
  Html,
  Preview, Row, Section,
  Text,
} from '@react-email/components';

import {
  main,
  container,
  offerBadge,
  offerBadgeText
} from './style.js';

import { EmailHeader } from "./components/header.js"
import { EmailFooter } from "./components/footer.js"
import i18n_service from "#services/i18n_service";
import React from 'react';

interface WelcomeEmailProps {
  username: string;
  lang: string
}

const companyName = process.env.COMPANY_NAME || "";

export const WelcomeEmail = (
  {
    username,
    lang
  }: WelcomeEmailProps) => {
  const i18n = i18n_service.get(lang)

  return (
    <Html>
      <Head />
      <Preview>Welcome to {companyName} - Exclusive 25% Off!</Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader
            headingText={`Welcome ${username}!`}
            descriptionText={i18n.t("welcome.description")}
          />

          {/* Special Offer Section */}
          <Section style={offerSection}>
            <div style={offerBadge}>
              <Text style={offerBadgeText}>{i18n.t("welcome.badge")}</Text>
            </div>
            <Heading style={offerHeading}>{i18n.t("welcome.offerHeading")}</Heading>
            <Text style={offerText}>{i18n.t("welcome.offerText")}</Text>
            <Text style={offerSubtext}>Use code: <strong style={codeStyle}>WELCOME25</strong></Text>
            <Text style={offerExpiry}>{i18n.t("welcome.offerExpiry")}</Text>
          </Section>

          {/* Company Values Section */}
          <Section style={valuesSection}>
            <Heading style={valuesHeading}>Why Choose {companyName}?</Heading>
            <Row>
              <Column style={valueColumn}>
                <div style={valueIcon}>🌱</div>
                <Heading style={valueTitle}>{i18n.t("welcome.sustainableTitle")}</Heading>
                <Text style={valueDescription}>
                  {i18n.t("welcome.sustainableDesc")}
                </Text>
              </Column>
              <Column style={valueColumn}>
                <div style={valueIcon}>⚡</div>
                <Heading style={valueTitle}>{i18n.t("welcome.fastTitle")}</Heading>
                <Text style={valueDescription}>
                  {i18n.t("welcome.fastDesc")}
                </Text>
              </Column>
              <Column style={valueColumn}>
                <div style={valueIcon}>❤️</div>
                <Heading style={valueTitle}>{i18n.t("welcome.careTitle")}</Heading>
                <Text style={valueDescription}>
                  {i18n.t("welcome.careDesc")}
                </Text>
              </Column>
            </Row>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  )
};

WelcomeEmail.PreviewProps = {
  username: 'Ariel Lecomte',
  lang: "fr"
} as WelcomeEmailProps;

const offerSection = {
  backgroundColor: '#ffffff',
  margin: '0',
  padding: '40px 32px',
  textAlign: 'center' as const,
  borderRadius: '0',
  position: 'relative' as const,
}

const offerHeading = {
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  color: '#5D7B6F',
  fontSize: '48px',
  fontWeight: '700',
  margin: '0 0 8px 0',
  lineHeight: '1',
}

const offerText = {
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  color: '#333333',
  fontSize: '24px',
  fontWeight: '400',
  margin: '0 0 20px 0',
}

const offerSubtext = {
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  color: '#666666',
  fontSize: '16px',
  margin: '0 0 8px 0',
}

const codeStyle = {
  backgroundColor: '#f0f0f0',
  padding: '4px 8px',
  borderRadius: '4px',
  fontFamily: 'Monaco, Consolas, monospace',
  color: '#5D7B6F',
}

const offerExpiry = {
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  color: '#999999',
  fontSize: '14px',
  margin: '0',
  fontStyle: 'italic' as const,
}

// Company Values Section
const valuesSection = {
  backgroundColor: '#f8f9fa',
  padding: '40px 32px',
  margin: '0',
}

const valuesHeading = {
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  color: '#333333',
  fontSize: '24px',
  fontWeight: '700',
  textAlign: 'center' as const,
  margin: '0 0 32px 0',
}

const valueColumn = {
  textAlign: 'center' as const,
  padding: '0 16px',
  verticalAlign: 'top' as const,
}

const valueIcon = {
  fontSize: '40px',
  marginBottom: '16px',
  display: 'block',
}

const valueTitle = {
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  color: '#5D7B6F',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 8px 0',
}

const valueDescription = {
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  color: '#666666',
  fontSize: '14px',
  lineHeight: '1.4',
  margin: '0',
}
