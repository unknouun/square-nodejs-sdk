
# Loyalty Event

Provides information about a loyalty event.
For more information, see [Loyalty events](https://developer.squareup.com/docs/loyalty-api/overview/#loyalty-events).

## Structure

`LoyaltyEvent`

## Fields

| Name | Type | Tags | Description |
|  --- | --- | --- | --- |
| `id` | `string` |  | The Square-assigned ID of the loyalty event. |
| `type` | [`string`](/doc/models/loyalty-event-type.md) |  | The type of the loyalty event. |
| `createdAt` | `string` |  | The timestamp when the event was created, in RFC 3339 format. |
| `accumulatePoints` | [`LoyaltyEventAccumulatePoints`](/doc/models/loyalty-event-accumulate-points.md) | Optional | Provides metadata when the event `type` is `ACCUMULATE_POINTS`. |
| `createReward` | [`LoyaltyEventCreateReward`](/doc/models/loyalty-event-create-reward.md) | Optional | Provides metadata when the event `type` is `CREATE_REWARD`. |
| `redeemReward` | [`LoyaltyEventRedeemReward`](/doc/models/loyalty-event-redeem-reward.md) | Optional | Provides metadata when the event `type` is `REDEEM_REWARD`. |
| `deleteReward` | [`LoyaltyEventDeleteReward`](/doc/models/loyalty-event-delete-reward.md) | Optional | Provides metadata when the event `type` is `DELETE_REWARD`. |
| `adjustPoints` | [`LoyaltyEventAdjustPoints`](/doc/models/loyalty-event-adjust-points.md) | Optional | Provides metadata when the event `type` is `ADJUST_POINTS`. |
| `loyaltyAccountId` | `string` |  | The ID of the [loyalty account](#type-LoyaltyAccount) in which the event occurred. |
| `locationId` | `string` | Optional | The ID of the [location](#type-Location) where the event occurred. |
| `source` | [`string`](/doc/models/loyalty-event-source.md) |  | Defines whether the event was generated by the Square Point of Sale. |
| `expirePoints` | [`LoyaltyEventExpirePoints`](/doc/models/loyalty-event-expire-points.md) | Optional | Provides metadata when the event `type` is `EXPIRE_POINTS`. |
| `otherEvent` | [`LoyaltyEventOther`](/doc/models/loyalty-event-other.md) | Optional | Provides metadata when the event `type` is `OTHER`. |

## Example (as JSON)

```json
{
  "id": "id0",
  "type": "EXPIRE_POINTS",
  "created_at": "created_at2",
  "accumulate_points": {
    "loyalty_program_id": "loyalty_program_id8",
    "points": 118,
    "order_id": "order_id8"
  },
  "create_reward": {
    "loyalty_program_id": "loyalty_program_id2",
    "reward_id": "reward_id6",
    "points": 90
  },
  "redeem_reward": {
    "loyalty_program_id": "loyalty_program_id8",
    "reward_id": "reward_id2",
    "order_id": "order_id8"
  },
  "delete_reward": {
    "loyalty_program_id": "loyalty_program_id4",
    "reward_id": "reward_id8",
    "points": 104
  },
  "adjust_points": {
    "loyalty_program_id": "loyalty_program_id2",
    "points": 96,
    "reason": "reason2"
  },
  "loyalty_account_id": "loyalty_account_id0",
  "source": "SQUARE"
}
```

