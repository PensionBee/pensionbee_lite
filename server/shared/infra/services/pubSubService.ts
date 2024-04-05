import EventEmitter from "node:events";

import { logAndReportError } from "@/server/shared/common/errors";
import { type Event } from "@/server/shared/common/events";

const eventEmitter = new EventEmitter();

/**
 * Publishes an event using Node's built-in EventEmitter
 *
 * @example
 * type OrderPlacedEvent = {
 *   type: "ORDER_PLACED";
 *   payload: {
 *     orderId: string;
 *     paymentDetails: {
 *       accountNumber: number;
 *       sortCode: string;
 *     };
 *   };
 * };
 *
 * publishEvent<OrderPlacedEvent>({
 *   type: "ORDER_PLACED",
 *   payload: {
 *     orderId: "order-1",
 *     paymentDetails: {
 *       accountNumber: 12345678,
 *       sortCode: "12-34-56",
 *     },
 *   },
 * });
 */
export const publishEvent = <TEvent extends Event>(event: TEvent) => {
  eventEmitter.emit(event.type, event.payload || {});

  console.log(
    `${event.type} published with payload ${JSON.stringify(
      event.payload ?? {}
    )}`
  );
};

/**
 * Subscribes to an event using Node's built-in EventEmitter.
 *
 * @example
 * type OrderPlacedEvent = {
 *   type: "ORDER_PLACED";
 *   payload: {
 *     orderId: string;
 *     paymentDetails: {
 *       accountNumber: number;
 *       sortCode: string;
 *     };
 *   };
 * };
 *
 * subscribeToEvent<OrderPlacedEvent>("ORDER_PLACED", {
 *   takePayment: async (payload) => {
 *     const { paymentDetails } = payload;
 *     // Take the payment somehow using paymentDetails
 *   },
 * });
 */
export const subscribeToEvent = <TEvent extends Event>(
  eventType: TEvent["type"],
  eventHandlers: {
    [key: string]: (eventPayload: TEvent["payload"]) => Promise<void>;
  }
) => {
  Object.entries(eventHandlers).forEach(([handlerName, handleEvent]) => {
    // Wrapper function which provides error handling and logging when calling the event handler
    const wrappedHandler = async (eventPayload: TEvent["payload"]) => {
      try {
        await handleEvent(eventPayload);

        console.log(
          `${handlerName} successfully handled ${eventType} with payload ${JSON.stringify(
            eventPayload ?? {}
          )}`
        );
      } catch (e) {
        logAndReportError(e);
        console.log(
          `${handlerName} failed to handle ${eventType} with payload ${JSON.stringify(
            eventPayload ?? {}
          )}`
        );
      }
    };

    eventEmitter.on(eventType, wrappedHandler);
  });
};
