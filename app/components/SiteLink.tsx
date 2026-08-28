import type { ComponentPropsWithoutRef } from 'react';

const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function withSiteBasePath(path: string) {
  if (!path.startsWith('/') || !siteBasePath) return path;
  return `${siteBasePath}${path}`;
}

export function withoutSiteBasePath(path: string) {
  if (!siteBasePath || !path.startsWith(siteBasePath)) return path;
  return path.slice(siteBasePath.length) || '/';
}

export function SiteLink({
  href,
  ...props
}: Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { href: string }) {
  return <a href={withSiteBasePath(href)} {...props} />;
}
