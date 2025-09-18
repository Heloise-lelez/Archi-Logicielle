/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router
  .get('/', async ({ auth }) => {
    if (auth.isAuthenticated) {
      // await auth.user!.getAllMetrics()
    }
    return {
      hello: 'world',
    }
  })
  .use(middleware.auth())

router
  .post('logout', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect('/login')
  })
  .use(middleware.auth())

const SessionController = () => import('#controllers/session_controller')
const PostsController = () => import('#controllers/posts_controller')

router.post('login', [SessionController, 'store'])
router.get('user', [PostsController, 'user'])
router.post('register', [SessionController, 'register'])
router.delete('session', [SessionController, 'destroy']).use(middleware.auth({ guards: ['api'] }))
