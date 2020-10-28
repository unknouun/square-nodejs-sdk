import { ApiResponse } from '../apiResponse';
import { RequestOptions } from '../http/requestBuilder';
import {
  CancelPaymentByIdempotencyKeyRequest,
  cancelPaymentByIdempotencyKeyRequestSchema,
} from '../models/cancelPaymentByIdempotencyKeyRequest';
import {
  CancelPaymentByIdempotencyKeyResponse,
  cancelPaymentByIdempotencyKeyResponseSchema,
} from '../models/cancelPaymentByIdempotencyKeyResponse';
import {
  CancelPaymentResponse,
  cancelPaymentResponseSchema,
} from '../models/cancelPaymentResponse';
import {
  CompletePaymentResponse,
  completePaymentResponseSchema,
} from '../models/completePaymentResponse';
import {
  CreatePaymentRequest,
  createPaymentRequestSchema,
} from '../models/createPaymentRequest';
import {
  CreatePaymentResponse,
  createPaymentResponseSchema,
} from '../models/createPaymentResponse';
import {
  GetPaymentResponse,
  getPaymentResponseSchema,
} from '../models/getPaymentResponse';
import {
  ListPaymentsResponse,
  listPaymentsResponseSchema,
} from '../models/listPaymentsResponse';
import { number, optional, string } from '../schema';
import { BaseApi } from './baseApi';

export class PaymentsApi extends BaseApi {
  /**
   * Retrieves a list of payments taken by the account making the request.
   *
   * Max results per page: 100
   *
   * @param beginTime   Timestamp for the beginning of the reporting period, in RFC 3339 format. Inclusive.
   *                              Default: The current time minus one year.
   * @param endTime     Timestamp for the end of the requested reporting period, in RFC 3339 format.
   *                              Default: The current time.
   * @param sortOrder   The order in which results are listed. - `ASC` - oldest to newest - `DESC` - newest
   *                              to oldest (default).
   * @param cursor      A pagination cursor returned by a previous call to this endpoint. Provide this to
   *                              retrieve the next set of results for the original query.  See [Pagination](https:
   *                              //developer.squareup.com/docs/basics/api101/pagination) for more information.
   * @param locationId  Limit results to the location supplied. By default, results are returned for all
   *                              locations associated with the merchant.
   * @param total       The exact amount in the total_money for a `Payment`.
   * @param last4       The last 4 digits of `Payment` card.
   * @param cardBrand   The brand of `Payment` card. For example, `VISA`
   * @return Response from the API call
   */
  async listPayments(
    beginTime?: string,
    endTime?: string,
    sortOrder?: string,
    cursor?: string,
    locationId?: string,
    total?: number,
    last4?: string,
    cardBrand?: string,
    requestOptions?: RequestOptions
  ): Promise<ApiResponse<ListPaymentsResponse>> {
    const req = this.createRequest('GET', '/v2/payments');
    const mapped = req.prepareArgs({
      beginTime: [beginTime, optional(string())],
      endTime: [endTime, optional(string())],
      sortOrder: [sortOrder, optional(string())],
      cursor: [cursor, optional(string())],
      locationId: [locationId, optional(string())],
      total: [total, optional(number())],
      last4: [last4, optional(string())],
      cardBrand: [cardBrand, optional(string())],
    });
    req.query('begin_time', mapped.beginTime);
    req.query('end_time', mapped.endTime);
    req.query('sort_order', mapped.sortOrder);
    req.query('cursor', mapped.cursor);
    req.query('location_id', mapped.locationId);
    req.query('total', mapped.total);
    req.query('last_4', mapped.last4);
    req.query('card_brand', mapped.cardBrand);
    return req.callAsJson(listPaymentsResponseSchema, requestOptions);
  }

  /**
   * Charges a payment source, for example, a card
   * represented by customer's card on file or a card nonce. In addition
   * to the payment source, the request must also include the
   * amount to accept for the payment.
   *
   * There are several optional parameters that you can include in the request.
   * For example, tip money, whether to autocomplete the payment, or a reference ID
   * to correlate this payment with another system.
   * For more information about these
   * payment options, see [Take Payments](https://developer.squareup.com/docs/payments-api/take-payments).
   *
   * The `PAYMENTS_WRITE_ADDITIONAL_RECIPIENTS` OAuth permission is required
   * to enable application fees.
   *
   * @param body An object containing the fields to POST for the request.  See the
   *                                            corresponding object definition for field details.
   * @return Response from the API call
   */
  async createPayment(
    body: CreatePaymentRequest,
    requestOptions?: RequestOptions
  ): Promise<ApiResponse<CreatePaymentResponse>> {
    const req = this.createRequest('POST', '/v2/payments');
    const mapped = req.prepareArgs({
      body: [body, createPaymentRequestSchema],
    });
    req.json(mapped.body);
    return req.callAsJson(createPaymentResponseSchema, requestOptions);
  }

  /**
   * Cancels (voids) a payment identified by the idempotency key that is specified in the
   * request.
   *
   * Use this method when status of a CreatePayment request is unknown. For example, after you send a
   * CreatePayment request a network error occurs and you don't get a response. In this case, you can
   * direct Square to cancel the payment using this endpoint. In the request, you provide the same
   * idempotency key that you provided in your CreatePayment request you want  to cancel. After
   * cancelling the payment, you can submit your CreatePayment request again.
   *
   * Note that if no payment with the specified idempotency key is found, no action is taken, the end
   * point returns successfully.
   *
   * @param body An object containing the fields to POST for the
   *                                                            request.  See the corresponding object definition for
   *                                                            field details.
   * @return Response from the API call
   */
  async cancelPaymentByIdempotencyKey(
    body: CancelPaymentByIdempotencyKeyRequest,
    requestOptions?: RequestOptions
  ): Promise<ApiResponse<CancelPaymentByIdempotencyKeyResponse>> {
    const req = this.createRequest('POST', '/v2/payments/cancel');
    const mapped = req.prepareArgs({
      body: [body, cancelPaymentByIdempotencyKeyRequestSchema],
    });
    req.json(mapped.body);
    return req.callAsJson(
      cancelPaymentByIdempotencyKeyResponseSchema,
      requestOptions
    );
  }

  /**
   * Retrieves details for a specific Payment.
   *
   * @param paymentId  Unique ID for the desired `Payment`.
   * @return Response from the API call
   */
  async getPayment(
    paymentId: string,
    requestOptions?: RequestOptions
  ): Promise<ApiResponse<GetPaymentResponse>> {
    const req = this.createRequest('GET');
    const mapped = req.prepareArgs({ paymentId: [paymentId, string()] });
    req.appendTemplatePath`/v2/payments/${mapped.paymentId}`;
    return req.callAsJson(getPaymentResponseSchema, requestOptions);
  }

  /**
   * Cancels (voids) a payment. If you set `autocomplete` to false when creating a payment,
   * you can cancel the payment using this endpoint. For more information, see
   * [Delayed Payments](https://developer.squareup.com/docs/payments-api/take-payments#delayed-payments).
   *
   * @param paymentId  `payment_id` identifying the payment to be canceled.
   * @return Response from the API call
   */
  async cancelPayment(
    paymentId: string,
    requestOptions?: RequestOptions
  ): Promise<ApiResponse<CancelPaymentResponse>> {
    const req = this.createRequest('POST');
    const mapped = req.prepareArgs({ paymentId: [paymentId, string()] });
    req.appendTemplatePath`/v2/payments/${mapped.paymentId}/cancel`;
    return req.callAsJson(cancelPaymentResponseSchema, requestOptions);
  }

  /**
   * Completes (captures) a payment.
   *
   * By default, payments are set to complete immediately after they are created.
   * If you set autocomplete to false when creating a payment, you can complete (capture)
   * the payment using this endpoint. For more information, see
   * [Delayed Payments](https://developer.squareup.com/docs/payments-api/take-payments#delayed-payments).
   *
   * @param paymentId  Unique ID identifying the payment to be completed.
   * @return Response from the API call
   */
  async completePayment(
    paymentId: string,
    requestOptions?: RequestOptions
  ): Promise<ApiResponse<CompletePaymentResponse>> {
    const req = this.createRequest('POST');
    const mapped = req.prepareArgs({ paymentId: [paymentId, string()] });
    req.appendTemplatePath`/v2/payments/${mapped.paymentId}/complete`;
    return req.callAsJson(completePaymentResponseSchema, requestOptions);
  }
}