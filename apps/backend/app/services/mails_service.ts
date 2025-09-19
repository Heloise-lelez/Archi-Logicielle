import mail from "@adonisjs/mail/services/main";
import {
  ForgotPasswordEmail,
  PaymentConfirmationEmail,
  VerificationEmail,
  WelcomeEmail
} from "../../resources/emails/index.js";
import {render} from "@react-email/render";

export default class MailsServices {
  static async sendWelcomeMail(user: {full_name: string, email: string}, lang: string) {
    const html = await render(WelcomeEmail({
      username: user.full_name,
      lang
    }))

    await mail.use("smtp").send((message) => {
      message
        .from("support@test.com")
        .to(user.email)
        .subject("test")
        .html(html)
    })
  }

  static async sendForgotPasswordMail(user: {full_name: string, email: string}, lang: string) {
    const html = await render(ForgotPasswordEmail({
      username: user.full_name,
      resetLink: "/",
      lang
    }))

    await mail.use("smtp").send((message) => {
      message
        .from("support@test.com")
        .to(user.email)
        .subject("test")
        .html(html)
    })
  }

  static async sendPaymentConfirmationMail(user: {full_name: string, amount: string, method: string, email: string, orderId: string, date: string, items: { name: string; price: string; quantity: number }[]}, lang: string) {
    const html = await render(PaymentConfirmationEmail({
      username: user.full_name,
      amount: user.amount,
      paymentMethod: user.method,
      orderId: user.orderId,
      orderDate: user.date,
      items: user.items,
      lang
    }))

    await mail.use("smtp").send((message) => {
      message
        .from("support@test.com")
        .to(user.email)
        .subject("test")
        .html(html)
    })
  }

  static async sendVerificationMail(user: {full_name: string, email: string}, lang: string) {
    const html = await render(VerificationEmail({
      username: user.full_name,
      validationCode: "TEST",
      lang
    }))

    await mail.use("smtp").send((message) => {
      message
        .from("support@test.com")
        .to(user.email)
        .subject("test")
        .html(html)
    })
  }
}

