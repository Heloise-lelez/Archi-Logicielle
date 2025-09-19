import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Heading,
  Row,
  Column,
} from "@react-email/components";
import { container } from "./style.js";
import { EmailHeader } from "./components/header.js";
import { EmailFooter } from "./components/footer.js";
import i18n_service from "#services/i18n_service";
import React from "react";

interface PaymentConfirmationEmailProps {
  username: string;
  amount?: string;
  paymentMethod?: string;
  orderId?: string;
  orderDate?: string;
  items?: { name: string; price: string; quantity: number }[];
  lang: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

const companyName = process.env.COMPANY_NAME;

export const PaymentConfirmationEmail = (
  {
    username = "User",
    amount = "$49.99",
    paymentMethod = "Visa •••• 1234",
    orderId = "CACT-2025-0001",
    orderDate = "17 Sept 2025",
    items = [
      { name: "Green Cactus XL", price: "$29.99", quantity: 1 },
      { name: "Mini Succulent", price: "$9.99", quantity: 2 },
    ],
    lang
  }: PaymentConfirmationEmailProps) => {
  const i18n = i18n_service.get(lang);
  const previewText = `Your payment of ${amount} to ${companyName} is confirmed`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <EmailHeader
            headingText={i18n.t("paymentConfirmation.heading")}
            descriptionText={`Thank you ${username}, your order is on the way!`}
          />

          {/* Payment Summary */}
          <Section style={summarySection}>
            <Heading style={summaryHeading}>Order Summary</Heading>
            <Text style={summaryText}>
              {i18n.t("paymentConfirmation.orderId")}: <strong>{orderId}</strong>
              <br />
              {i18n.t("paymentConfirmation.orderDate")}: <strong>{orderDate}</strong>
              <br />
              {i18n.t("paymentConfirmation.paymentMethod")}: <strong>{paymentMethod}</strong>
            </Text>
          </Section>

          {/* Items */}
          <Section style={itemsSection}>
            {items.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column>
                  <Text style={itemName}>
                    {item.name} × {item.quantity}
                  </Text>
                </Column>
                <Column align="right">
                  <Text style={itemPrice}>{item.price}</Text>
                </Column>
              </Row>
            ))}
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>{i18n.t("paymentConfirmation.totalPaid")}</Text>
              </Column>
              <Column align="right">
                <Text style={totalAmount}>{amount}</Text>
              </Column>
            </Row>
          </Section>

          {/* Info */}
          <Section style={infoSection}>
            <Text style={infoText}>
              {i18n.t("paymentConfirmation.infoText")}{" "}
              <a href={`${baseUrl}/account`} style={infoLink}>
                {i18n.t("paymentConfirmation.accountLink")}
              </a>
              .
            </Text>
          </Section>

          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
};

PaymentConfirmationEmail.PreviewProps = {
  username: "Alan Turing",
  amount: "$49.99",
  paymentMethod: "Visa •••• 1234",
  orderId: "CACT-2025-0001",
  orderDate: "17 Sept 2025",
  items: [
    { name: "Green Cactus XL", price: "$29.99", quantity: 1 },
    { name: "Mini Succulent", price: "$9.99", quantity: 2 },
  ],
  lang: "fr"
} as PaymentConfirmationEmailProps;

export default PaymentConfirmationEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

// Summary
const summarySection = {
  backgroundColor: "#f8f9fa",
  padding: "32px",
  textAlign: "center" as const,
  borderRadius: "6px",
  marginBottom: "24px",
};

const summaryHeading = {
  color: "#5D7B6F",
  fontSize: "20px",
  fontWeight: "700",
  margin: "0 0 12px 0",
};

const summaryText = {
  color: "#333333",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0",
};

// Items
const itemsSection = {
  backgroundColor: "#ffffff",
  padding: "24px 32px",
  border: "1px solid #eee",
  borderRadius: "6px",
  marginBottom: "24px",
};

const itemRow = {
  marginBottom: "12px",
};

const itemName = {
  fontSize: "14px",
  color: "#444444",
  margin: "0",
};

const itemPrice = {
  fontSize: "14px",
  color: "#333333",
  fontWeight: "600",
  margin: "0",
};

const totalRow = {
  borderTop: "1px solid #ddd",
  paddingTop: "12px",
  marginTop: "12px",
};

const totalLabel = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#333333",
};

const totalAmount = {
  fontSize: "16px",
  fontWeight: "700",
  color: "#5D7B6F",
};

// Info
const infoSection = {
  padding: "32px",
  textAlign: "center" as const,
};

const infoText = {
  fontSize: "14px",
  color: "#555555",
  lineHeight: "1.5",
  margin: "0",
};

const infoLink = {
  color: "#ff6b6b",
  textDecoration: "underline",
};
