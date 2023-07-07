import Link from 'next/link';

export default function MenuItem({ className, item }) {
  return (
    <li key={item.id} className={className}>
      {!item.path.includes('http') && !item.target && (
        <Link href={item.path} title={item.title}>
          {item.label}
        </Link>
      )}
      {item.path.includes('http') && (
        <a href={item.path} title={item.title} target={item.target}>
          {item.label}
        </a>
      )}
    </li>
  );
};
