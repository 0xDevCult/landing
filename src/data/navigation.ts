export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink extends NavLink {
  icon: 'x' | 'github' | 'linkedin' | 'mail';
}

export const navLinks: NavLink[] = [
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

export const footerLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const socialLinks: SocialLink[] = [
  { label: 'X (Twitter)', href: 'https://x.com/0xDevCult', icon: 'x' },
  { label: 'GitHub', href: 'https://github.com/0xDevCult', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/devcult', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:info@devcult.io', icon: 'mail' },
];
