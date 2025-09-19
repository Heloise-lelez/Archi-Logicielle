import {Heading, Img, Section, Text} from "@react-email/components";
import React from "react";

interface HeaderProps {
  headingText: string;
  descriptionText: string;
}

export const EmailHeader = (
  {
    headingText,
    descriptionText
  }: HeaderProps) => (
  <Section>
    <Section style={logoSection}>
      <Img src={"../static/stripe-logo.png"} width="75" style={logo} />
    </Section>
    <Section style={section}>
      <Heading style={welcomeHeading}>
        {headingText}
      </Heading>
      <Text style={welcomeText}>
        {descriptionText}
      </Text>
    </Section>

  </Section>
);

const section = {
  backgroundColor: '#5D7B6F',
  padding: '32px',
  textAlign: 'center' as const
}

const logoSection = {
  padding: "12px"
}
const logo = {
  margin: '12px auto',
  display: 'block'
}

const welcomeHeading = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: '700',
  lineHeight: '1.2',
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
}

const welcomeText = {
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  color: '#ffffff',
  fontSize: '18px',
  lineHeight: '1.5',
  margin: '0',
  opacity: 0.9,
}
