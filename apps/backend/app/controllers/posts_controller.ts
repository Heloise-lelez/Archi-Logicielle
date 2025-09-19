import { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async user({ auth }: HttpContext) {
    await auth.authenticate()
    const user = auth.getUserOrFail()
    console.log(user)
  }
}
