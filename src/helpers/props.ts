import _, { map, range, sum } from 'lodash';
import { priceString, textCutter } from './texts';
import { EventTicketsPreviewProps } from '@/components/EventTicketsPreview/types';
import {
  EventCartItemType,
  EventPreviewProps,
  OrderSummaryType,
  PropsType,
  TicketPreviewProps,
} from './types';
import moment from 'moment';

export type EventPreviewType = PropsType<EventPreviewProps, any>;

export const getEventPreviewsProps = (nodes: any) => {
  return <Array<EventPreviewType>>nodes?.map((props: any) => {
    let formattedDate = moment(props.startDateTime).format('ddd, MMM Do. hA');
    let amounts = props.tickets?.map(({ amount }: { amount: number }) => amount);
    let minTicket = props.tickets?.find(
      ({ amount }: { amount: number }) => amount === _.min(amounts),
    );
    let price = minTicket?.amount || 'Free';
    let currency = minTicket?.currency;
    let location = `${props.venueName} ${props.venueAddress}`;

    return {
      props: {
        name: textCutter(props.name, 25, 'letters'),
        price,
        currency,
        country: props.country,
        image: props.image,
        imageHash: props.imageHash,
        startDateTime: formattedDate,
        location: textCutter(location, 5),
        liked: props.liked,
        urlSlug: props.urlSlug,
        gid: props.gid,
      },
      ...props,
    };
  });
};

export type TicketPreviewPropsType = PropsType<
  TicketPreviewProps,
  { urlSlug: string; purchaseLimit: number; gid: string }
>;
export const getTicketPreviewsProps = (nodes: any) => {
  return <Array<TicketPreviewPropsType>>nodes?.map((node: any) => {
    return {
      props: {
        eventName: node.eventName,
        name: node.name,
        price: node.amount == 0 ? null : `${node.currency} ${node.amount}`,
        image: node.image,
        imageHash: node.imageHash,
        description: textCutter(node.description),
      },
      ...node,
      purchaseLimit: node.purchaseLimit || 10,
    };
  });
};

export const getEventCartItemProps = (data: any, localCurrency: string) => {
  return <Array<EventCartItemType>>data.map(({ node, quantity }: any) => {
    const limit = node.purchaseLimit || 10;
    const options = range(1, limit + 1).map((i) => ({ label: `${i}`, value: i }));
    return {
      props: {
        eventName: node.event?.name,
        name: node.name,
        price: node.amount == 0 ? null : priceString(node.amount, node.currency),
        localPrice:
          node.currency === localCurrency
            ? null
            : `[${priceString(node.localAmount, localCurrency)}]`,
        image: node.image,
        imageHash: node.imageHash,
        quantity,
        options,
        gid: node.gid,
      },
      ...node,
    };
  });
};

export const getEventTicketsPreviewProps = (data: any) => {
  const { getEvent, getEventTicketsConnection } = data;
  const formattedDate = moment(getEvent.startDateTime).format('ddd, MMM Do. hA');
  return <PropsType<EventTicketsPreviewProps, { link: string }>>{
    props: {
      name: getEvent.name,
      image: getEvent.image,
      imageHash: getEvent.imageHash,
      date: formattedDate,
      tickets: getEventTicketsConnection.totalCount,
    },
    link: `/events/tickets/${getEvent.urlSlug}`,
    ...getEvent,
  };
};

export const getOrderSummaryProps = (data: any, currency: string) => {
  const total = sum(map(data, ({ node, quantity }) => node.localAmount * quantity));
  return <OrderSummaryType>{
    props: {
      items: data.map(({ node, quantity }: any) => ({
        eventName: node.event.name,
        ticketName: node.name,
        quantity,
        price: priceString(node.localAmount * quantity, currency),
      })),
      total: priceString(total, currency),
    },
    total,
  };
};
