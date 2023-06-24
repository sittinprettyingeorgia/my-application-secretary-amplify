import { createBasicPaymentIntent } from '@/pages/api/checkout/basic';
import stripeUtil from '@/service/stripe';
import { handleResponse, validateReq } from '@/util/api';

jest.mock('@/service/stripe');
jest.mock('@/util/api');

describe('createBasicPaymentIntent', () => {
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

    const result = await createBasicPaymentIntent(mockReq);

    expect(result).toEqual({
      clientSecret: mockPaymentIntent.client_secret
    });
  });

  it('should throw an error on invalid input', async () => {
    const mockReq = {}; // update with actual data if required
    (validateReq as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid request2');
    });

    await expect(createBasicPaymentIntent(mockReq)).rejects.toThrow(
      'Invalid request'
    );
  });

it('should throw an error on stripe error', async () => {
  const mockReq = {}; // update with actual data if required
  const mockError = new Error('Stripe error');
  (stripeUtil.createPaymentIntent as jest.Mock).mockRejectedValue(mockError);

  await expect(createBasicPaymentIntent(mockReq)).rejects.toThrow(mockError);

});
});
