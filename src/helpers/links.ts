import { facebookIcon, instagramIcon, twitterIcon, websiteLinkIcon } from 'public/icons';
import { instagramBaseUrl, twitterBaseUrl } from './constants';
import { LinksType } from './types';

export const getOrganiserLinks = (links: Partial<LinksType>) => {
  const Links = [
    {
      href: links.facebookUrl,
      icon: facebookIcon,
      alt: 'facebook',
    },
    {
      href: `${twitterBaseUrl}${links.twitterHandle}`,
      icon: twitterIcon,
      alt: 'twitter',
    },
    {
      href: `${instagramBaseUrl}${links.instagramHandle}`,
      icon: instagramIcon,
      alt: 'instagram',
    },
    {
      href: links.website,
      icon: websiteLinkIcon,
      alt: 'website',
    },
  ];

  return Links.filter(({ href }) => href);
};
