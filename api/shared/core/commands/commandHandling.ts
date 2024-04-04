import { type Event } from "@/api/shared/common/events";
import { publishEvent } from "@/api/shared/infra/services/pubSubService";

/**
 * Given fetchState, deriveEvent and updateState functions, creates a standardised command handler
 * which abstracts the plumbing required to call/chain these functions and publish the event to
 * be picked up by other parts of the system.
 *
 * Additionally, provides strict TS guard rails which ensure each function conforms to the
 * currently accepted standard, e.g. deriveEvent cannot be async.
 */
export const createCommandHandler =
  <
    TData extends Record<string, unknown>,
    TState extends Record<string, unknown>,
    TEvent extends Event
  >(handlerFns: {
    fetchState: (data: TData) => Promise<TState>;
    deriveEvent: (data: TData, state: TState) => TEvent;
    updateState: (state: TState, event: TEvent) => Promise<void>;
  }) =>
  async (data: TData): Promise<TEvent> => {
    const { fetchState, deriveEvent, updateState } = handlerFns;

    const state = await fetchState(data);
    const event = deriveEvent(data, state);
    await updateState(state, event);
    publishEvent(event);

    return event;
  };
