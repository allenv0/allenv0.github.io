import { SocialLink } from './types';
import { IconBook, IconBrandGithub, IconBrandX } from '@tabler/icons-react';

export const socialLinks: SocialLink[] = [
  {
    name: 'blog',
    href: '/blog',
    icon: IconBook,
    label: 'Blog'
  },
  {
    name: 'github',
    href: 'https://github.com/allenv0',
    icon: IconBrandGithub,
    label: 'Code'
  },
  {
    name: 'twitter',
    href: 'https://x.com/allenleexyz',
    icon: IconBrandX,
    label: 'DMs'
  }
];

export const siteConfig = {
  name: 'Allen Lee',
  description: 'Software Developer & Designer',
  centralImage: {
    src: '/images/projects/mac.png',
    alt: 'Allen Lee',
    width: 320,
    height: 320
  }
};