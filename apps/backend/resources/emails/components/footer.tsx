import {Link, Text, Section} from "@react-email/components";
import React from "react";

export const EmailFooter = () => (
  <Section style={footerSection}>
    <Text style={footerText}>
      <Link href={"https://yourapp.com"} style={footerLink}>Cactoo</Link>
      <br />
      Making your life easier, one click at a time.
    </Text>

    <Text style={footerLinks}>
      <Link href="https://yourapp.com/help" style={footerLink}>Help Center</Link>
      {' • '}
      <Link href="https://yourapp.com/privacy" style={footerLink}>Privacy Policy</Link>
      {' • '}
      <Link href="https://yourapp.com/unsubscribe" style={footerLink}>Unsubscribe</Link>
    </Text>

    <Text style={footerAddress}>
      123 Main Street, Suite 100<br />
      Your City, State 12345
    </Text>
  </Section>
);

const footerSection = {
  backgroundColor: '#5D7B6F',
  padding: '32px',
  textAlign: 'center' as const
}

const footerText = {
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  color: '#FFFFFF',
  fontSize: '14px',
  lineHeight: '1.5',
  textAlign: 'center' as const,
  margin: '0 0 16px 0',
}

const footerLink = {
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  color: '#FFFFFF',
  fontSize: '14px',
  textAlign: 'center' as const,
  margin: '0 0 16px 0',
}

const footerLinks = {
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  color: '#FFFFFF',
  fontSize: '14px',
  textAlign: 'center' as const,
  margin: '16px 0',
}

const footerAddress= {
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  color: '#FFFFFF',
  fontSize: '12px',
  lineHeight: '1.4',
  textAlign: 'center' as const,
  margin: '0',
}
