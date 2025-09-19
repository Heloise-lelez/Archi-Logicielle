/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import Route from '@adonisjs/core/services/router'
import WebhooksController from "#controllers/webhooks_controller";

Route.get('/', async () => {
  return { message: 'Hello world' }
})

Route.post('/webhook', [WebhooksController, "handle"])
