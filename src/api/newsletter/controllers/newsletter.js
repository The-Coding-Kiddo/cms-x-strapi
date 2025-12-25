'use strict';

module.exports = {
  async subscribe(ctx) {
    try {
      const { email, name, source } = ctx.request.body;

      // Validate
      if (!email) {
        return ctx.badRequest('Email is required');
      }

      // Check for existing subscriber
      const existing = await strapi.db
        .query('api::newsletter-subscriber.newsletter-subscriber')
        .findOne({
          where: { email },
        });

      // If already subscribed, return success silently
      if (existing) {
        return ctx.send({ success: true });
      }

      // Create new subscriber
      await strapi.entityService.create(
        'api::newsletter-subscriber.newsletter-subscriber',
        {
          data: {
            email,
            name,
            source: source || 'homepage',
          },
        }
      );

      return ctx.send({ success: true });
    } catch (error) {
      console.error('Newsletter subscribe error:', error);
      return ctx.internalServerError('Something went wrong');
    }
  },
};
