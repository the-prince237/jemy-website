import { eventType } from '@/app/(products)/events/organisers/_types';
import { EventCartItemPropsType } from '@/components/types';
import { OrderSummaryPropsType } from '@/containers/types';

export type LinksType = {
  facebookUrl: string;
  instagramHandle: string;
  twitterHandle: string;
  website: string;
};

export type EventPreviewProps = Pick<
  eventType,
  | 'name'
  | 'price'
  | 'currency'
  | 'country'
  | 'image'
  | 'imageHash'
  | 'startDateTime'
  | 'location'
  | 'gid'
  | 'id'
  | 'urlSlug'
  | 'liked'
> & { refetch: any };

export type TicketPreviewProps = {
  eventName: string;
  name: string;
  price: string;
  image: string;
  imageHash: string;
  description: string;
};

export type PropsType<T, P> = {
  props: T;
} & P;

export type EventCartItemType = PropsType<EventCartItemPropsType, any>;
export type OrderSummaryType = PropsType<OrderSummaryPropsType, any>;
