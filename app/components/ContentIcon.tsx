import type { ContentItem } from '@/lib/content';

export function ContentIcon({
  item,
  className,
  fallback,
}: {
  item: Pick<ContentItem, 'icon' | 'title'>;
  className: string;
  fallback: React.ReactNode;
}) {
  const imageClass = item.icon ? ' content-icon--image' : '';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  const iconSource = item.icon?.startsWith('/') ? `${basePath}${item.icon}` : item.icon;

  return (
    <span className={`${className}${imageClass}`} aria-hidden="true">
      {item.icon ? (
        // User-supplied project marks are displayed directly at their native proportions.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={iconSource} alt="" />
      ) : fallback}
    </span>
  );
}
