import { createPremiumPaymentIntent } from '@/pages/api/checkout/premium';
import stripeUtil from '@/service/stripe';
import { validateReq } from '@/util/api';

jest.mock('@/service/stripe');
jest.mock('@/util/api');

describe('createPremiumPaymentIntent', () => {
    afterEach(() => {
    jest.restoreAllMocks();
    });

  it('should return payment intent on success', async () => {
    const mockReq = {}; // update with actual data if required
    const mockPaymentIntent = {
      client_secret: 'pi_123456789'
    };
    (stripeUtil.createPaymentIntent as jest.Mock).mockResolvedValue(
      mockPaymentIntent
    );

    const result = await createPremiumPaymentIntent(mockReq);

    expect(result).toEqual({
      clientSecret: mockPaymentIntent.client_secret
    });
  });

  it('should throw an error on invalid input', async () => {
    const mockReq = {}; // update with actual data if required
    (validateReq as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid request');
    });

    await expect(createPremiumPaymentIntent(mockReq)).rejects.toThrow(
      'Invalid request'
    );
  });

  it('should throw an error on stripe error', async () => {
    const mockReq = {}; // update with actual data if required
    (stripeUtil.createPaymentIntent as jest.Mock).mockRejectedValue(
      new Error('Stripe error')
    );
  
    await expect(createPremiumPaymentIntent(mockReq)).rejects.toThrow(
      'Stripe error'
    );
  });
  
});
