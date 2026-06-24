export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink extends NavLink {
  icon: 'github' | 'linkedin' | 'mail';
}

export const navLinks: NavLink[] = [
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Legal', href: '/legal' },
];

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/0xDevCult', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/devcult', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:info@devcult.io', icon: 'mail' },
];
