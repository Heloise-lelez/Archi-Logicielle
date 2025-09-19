export default class WebhooksController {
  public async handle(request: any, response: any): Promise<void> {
    const event = request.body;
    const context = event.context;
    if (!context) {
      console.error('Missing context in event');
      return response.status(400).send('Missing context');
    }

    console.log("context")
/*
    const apiKey = accountApiKeys[context];
    if (!apiKey) {
      console.error(`No API key found for context: ${context}`);
      return response.status(400).send('Unknown context');
    }

    const stripe = Stripe(apiKey);

    try {
      switch (event.type) {
        case 'customer.created': {
          const customer = event.data.object;
          const latestCustomer = await stripe.customers.retrieve(customer.id);
          handleCustomerCreated(latestCustomer, context);
          break;
        }
        case 'payment_method.attached': {
          const paymentMethod = event.data.object;
          const latestPaymentMethod = await stripe.paymentMethods.retrieve(paymentMethod.id);
          handlePaymentMethodAttached(latestPaymentMethod, context);
          break;
        }
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      response.json({ received: true });
    } catch (err) {
      console.error(`Error processing event: ${err.message}`);
      response.status(500).send('Internal error');
    }
*/

  }
}
