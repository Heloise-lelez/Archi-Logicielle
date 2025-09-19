// import type { HttpContext } from '@adonisjs/core/http'

import {HttpContext} from "@adonisjs/core/http";
import MailsServices from "#services/mails_service";

export default class MailsController {
  async sendWelcomeEmail({request, response}: HttpContext) {
    const { user, lang } = request.body()

    await MailsServices.sendWelcomeMail(
      {full_name: user.full_name, email: user.email},
      lang
    )

    return response.ok({ success: true })
  }

  async sendPasswordEmail({request, response}: HttpContext) {
    const { user, lang } = request.body()

    console.log("user is:", user)
    await MailsServices.sendForgotPasswordMail({
      full_name: user.full_name,
      email: user.email
    }, lang)

    return response.ok({ success: true })
  }

  async sendPaymentEmail({request, response}: HttpContext) {
    const { user, lang } = request.body()

    await MailsServices.sendPaymentConfirmationMail(
      {
        full_name: user.full_name,
        email: user.email,
        amount: user.amount,
        method: user.method,
        orderId: user.orderId,
        date: "today",
        items: user.items,
      }, lang
    )

    return response.ok({ success: true })
  }

  async sendVerificationEmail({request, response}: HttpContext) {
    const { user, lang } = request.body()

    await MailsServices.sendVerificationMail({
      full_name: user.full_name,
      email: user.email
    }, lang)

    return response.ok({ success: true })
  }
}
