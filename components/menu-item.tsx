import Link from 'next/link';
import Image from 'next/image';
import yac_icon from '../public/images/YAC-Icon.png'
import { useRouter } from 'next/router';
import { isExternalLink } from '../utils/global-functions';

export default function MenuItem({ item }) {
  const router = useRouter()
  const currentPath = (router.asPath != '/') ? `${router.asPath}/` : '/'

  let cnbLink;
  if ( !isExternalLink(item.path) && !item.target ) {
    cnbLink = <Link href={item.path} title={item.title}>
                {item.label}
                {item.label == 'AdChoices' && (
                  <Image src={yac_icon} width={20} height={20} alt='' />
                )}
              </Link>
  } else {
    cnbLink = <a href={item.path} title={item.title} target='_blank'>
                {item.label}
              </a>
  }
  return (
    <li className={ currentPath == item.path ? "active menu-item" : "menu-item"}>
       {cnbLink}
    </li>
  );
};
