import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import MailsServices from "#services/mails_service";

export default class SessionController {
  async store({ request, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    const bearer = await auth.use('api').createToken(user)

    return { fullName: user.fullName, bearer, email }
  }

  async destroy({ auth }: HttpContext) {
    await auth.use('api').invalidateToken()
  }
  async test({ auth }: HttpContext) {
    await auth.use('api').invalidateToken()
    console.log()
  }

  async register({ request, auth }: HttpContext) {
    const { fullName, email, password } = request.only(['fullName', 'email', 'password'])
    const user = await User.create({ fullName, email, password })
    await user.save()

    const token = await auth.use('api').createToken(user)

    await MailsServices.sendVerificationMail({
      full_name: fullName,
      email
    }, "fr")

    return { fullName, token, email }
  }

  async editProfil({ request, auth }: HttpContext) {
    const { fullName, email } = request.only(['fullName', 'email'])
    const user = await auth.use('api').authenticate()
    user.fullName = fullName
    user.email = email
    await user.save()

    return { fullName: user.fullName, email: user.email }
  }
}
