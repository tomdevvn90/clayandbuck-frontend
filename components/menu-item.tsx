import Link from 'next/link';
import Image from 'next/image';
import yac_icon from '../public/images/YAC-Icon.png'
import { useRouter } from 'next/router';

export default function MenuItem({ item }) {
  const router = useRouter()
  const currentPath = (router.asPath != '/') ? `${router.asPath}/` : '/'
  return (
    <li key={item.id} className={ currentPath == item.path ? "active menu-item" : "menu-item"}>
      {!item.path.includes('http') && !item.target && (
        <Link href={item.path} title={item.title}>
          {item.label}
          {item.label == 'AdChoices' && (
             <Image src={yac_icon} width={20} height={20} alt='' />
          )}
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
