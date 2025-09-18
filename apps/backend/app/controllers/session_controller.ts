import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async store({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    const bearer = await auth.use('api').createToken(user)

    return { fullName: user.fullName, bearer, email }
  }

  async destroy({ request, auth, response }: HttpContext) {
    await auth.use('api').invalidateToken()
  }
  async test({ request, auth, response }: HttpContext) {
    await auth.use('api').invalidateToken()
    console.log()
  }

  async register({ request, auth, response }: HttpContext) {
    const { fullName, email, password } = request.only(['fullName', 'email', 'password'])
    const user = await User.create({ fullName, email, password })
    await user.save()

    const token = await auth.use('api').createToken(user)

    return { fullName, token, email }
  }
}
