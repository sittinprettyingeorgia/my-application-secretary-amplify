import stripeUtil from '@/service/stripe';
import { validateReq } from '@/util/api';
import { createPaymentIntent } from '@/util/stripe';

jest.mock('@/service/stripe');
jest.mock('@/util/api');
const basic = 'basic';
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

    const result = await createPaymentIntent(mockReq, basic);

    expect(result).toEqual({
      clientSecret: mockPaymentIntent.client_secret
    });
  });

  it('should throw an error on invalid input', async () => {
    const mockReq = {}; // update with actual data if required
    (validateReq as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid request2');
    });

    await expect(createPaymentIntent(mockReq,basic)).rejects.toThrow(
      'Invalid request'
    );
  });

it('should throw an error on stripe error', async () => {
  const mockReq = {}; // update with actual data if required
  const mockError = new Error('Stripe error');
  (stripeUtil.createPaymentIntent as jest.Mock).mockRejectedValue(mockError);

  await expect(createPaymentIntent(mockReq,basic)).rejects.toThrow(mockError);

});
});
