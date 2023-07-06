import Link from 'next/link'
import Image from 'next/image'
import logo_img from '../public/images/clay-and-buck-logo.png'
import white_mini_logo from '../public/images/white-mini-logo.png'
import { useRouter } from "next/router";
import { getAllMenu } from '../lib/graphql-api';

export default function Header() {
  const router = useRouter();
  // console.log(headerMenu)
  return (
    <header id="masthead" className="site-header">
		  <div className="container">
        <div className="site-branding">
			    <Link href="/" className="custom-logo-link" rel="home" aria-current="page">
            <Image src={logo_img} width={150} height={80} alt='Clay and Buck'></Image>  
          </Link>
        </div>
        <div className="main-menu">
          <div className="notice-and-social">
            <div className="notice">
                <span>Listen Weekdays 12pm - 3pm EST</span>    
            </div>
            <div className="social-lst">
              <a href="https://mobile.twitter.com/clayandbuck" target="_blank" className="social-item twitter">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 2C15.4 2.3 14.8 2.4 14.1 2.5C14.8 2.1 15.3 1.5 15.5 0.7C14.9 1.1 14.2 1.3 13.4 1.5C12.8 0.9 11.9 0.5 11 0.5C8.9 0.5 7.3 2.5 7.8 4.5C5.1 4.4 2.7 3.1 1 1.1C0.1 2.6 0.6 4.5 2 5.5C1.5 5.5 1 5.3 0.5 5.1C0.5 6.6 1.6 8 3.1 8.4C2.6 8.5 2.1 8.6 1.6 8.5C2 9.8 3.2 10.8 4.7 10.8C3.5 11.7 1.7 12.2 0 12C1.5 12.9 3.2 13.5 5 13.5C11.1 13.5 14.5 8.4 14.3 3.7C15 3.3 15.6 2.7 16 2Z" fill="#FFFFFF"></path>
                </svg>
              </a>
              <a href="https://www.facebook.com/ClayandBuck/" target="_blank" className="social-item facebook">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.9998 10.0608C19.9998 4.50379 15.5233 0 9.9999 0C4.47652 0 0 4.50379 0 10.0608C0 15.0834 3.65621 19.2452 8.43741 19.9998V12.969H5.89838V10.0608H8.43741V7.84429C8.43741 5.32319 9.92959 3.93 12.2147 3.93C13.3085 3.93 14.453 4.1265 14.453 4.1265V6.60241H13.1913C11.9491 6.60241 11.5624 7.37858 11.5624 8.17441V10.0608H14.3358L13.8924 12.969H11.5624V19.9998C16.3436 19.2452 19.9998 15.0834 19.9998 10.0608Z" fill="#FFFFFF"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/clayandbuck/" target="_blank" className="social-item instagram">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.0008 0C7.285 0 6.94417 0.011875 5.8775 0.0604167C4.81292 0.109167 4.08625 0.277708 3.45042 0.525C2.79271 0.780417 2.23479 1.12208 1.67896 1.67813C1.12271 2.23396 0.781042 2.79187 0.524792 3.44937C0.276875 4.08542 0.108125 4.81229 0.0602083 5.87646C0.0125 6.94312 0 7.28417 0 10C0 12.7158 0.0120833 13.0556 0.0604167 14.1223C0.109375 15.1869 0.277917 15.9135 0.525 16.5494C0.780625 17.2071 1.12229 17.765 1.67833 18.3208C2.23396 18.8771 2.79188 19.2196 3.44917 19.475C4.08542 19.7223 4.81229 19.8908 5.87667 19.9396C6.94333 19.9881 7.28396 20 9.99958 20C12.7156 20 13.0554 19.9881 14.1221 19.9396C15.1867 19.8908 15.9142 19.7223 16.5504 19.475C17.2079 19.2196 17.765 18.8771 18.3206 18.3208C18.8769 17.765 19.2185 17.2071 19.4748 16.5496C19.7206 15.9135 19.8894 15.1867 19.9394 14.1225C19.9873 13.0558 19.9998 12.7158 19.9998 10C19.9998 7.28417 19.9873 6.94333 19.9394 5.87667C19.8894 4.81208 19.7206 4.08542 19.4748 3.44958C19.2185 2.79187 18.8769 2.23396 18.3206 1.67813C17.7644 1.12187 17.2081 0.780208 16.5498 0.525C15.9123 0.277708 15.1852 0.109167 14.1206 0.0604167C13.054 0.011875 12.7144 0 9.99771 0H10.0008ZM9.10382 1.80261C9.27801 1.80234 9.4654 1.80242 9.66761 1.80251L10.0009 1.80261C12.6709 1.80261 12.9874 1.8122 14.0417 1.86011C15.0167 1.9047 15.5459 2.06761 15.8984 2.20449C16.3651 2.38574 16.6978 2.6024 17.0476 2.9524C17.3976 3.3024 17.6142 3.63574 17.7959 4.1024C17.9328 4.45449 18.0959 4.98365 18.1403 5.95865C18.1882 7.01282 18.1986 7.32949 18.1986 9.99824C18.1986 12.667 18.1882 12.9837 18.1403 14.0378C18.0957 15.0128 17.9328 15.542 17.7959 15.8941C17.6147 16.3607 17.3976 16.693 17.0476 17.0428C16.6976 17.3928 16.3653 17.6095 15.8984 17.7907C15.5463 17.9282 15.0167 18.0907 14.0417 18.1353C12.9876 18.1832 12.6709 18.1937 10.0009 18.1937C7.3307 18.1937 7.01424 18.1832 5.96007 18.1353C4.98507 18.0903 4.4559 17.9274 4.1032 17.7905C3.63653 17.6093 3.3032 17.3926 2.9532 17.0426C2.6032 16.6926 2.38653 16.3601 2.20486 15.8932C2.06799 15.5412 1.90486 15.012 1.86049 14.037C1.81257 12.9828 1.80299 12.6662 1.80299 9.99574C1.80299 7.32532 1.81257 7.01032 1.86049 5.95615C1.90507 4.98115 2.06799 4.45199 2.20486 4.09949C2.38611 3.63282 2.6032 3.29949 2.9532 2.94949C3.3032 2.59949 3.63653 2.38282 4.1032 2.20115C4.4557 2.06365 4.98507 1.90115 5.96007 1.85636C6.88257 1.8147 7.24007 1.80219 9.10382 1.80011V1.80261ZM14.1389 4.66229C14.1389 3.99958 14.6764 3.4627 15.3389 3.4627V3.46229C16.0014 3.46229 16.5389 3.99979 16.5389 4.66229C16.5389 5.32479 16.0014 5.86229 15.3389 5.86229C14.6764 5.86229 14.1389 5.32479 14.1389 4.66229ZM10.0005 4.86445C7.16455 4.86456 4.86529 7.1639 4.86529 9.99987C4.86529 12.8359 7.16467 15.1342 10.0007 15.1342C12.8368 15.1342 15.1353 12.8359 15.1353 9.99987C15.1353 7.16383 12.8365 4.86445 10.0005 4.86445ZM13.3341 9.99993C13.3341 8.15889 11.8416 6.6666 10.0008 6.6666C8.15973 6.6666 6.66744 8.15889 6.66744 9.99993C6.66744 11.8408 8.15973 13.3333 10.0008 13.3333C11.8416 13.3333 13.3341 11.8408 13.3341 9.99993Z" fill="#FFFFFF"></path>
                </svg>
              </a>
              <a href="https://youtube.com/c/clayandbuck" target="_blank" className="social-item youtube">
                <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M26.7372 0.611765C28.0222 0.941176 29.0354 1.90588 29.3814 3.12941C30.0239 5.36471 29.9991 10.0235 29.9991 10.0235C29.9991 10.0235 29.9991 14.6588 29.3814 16.8941C29.0354 18.1176 28.0222 19.0824 26.7372 19.4118C24.3896 20 14.9992 20 14.9992 20C14.9992 20 5.63351 20 3.2612 19.3882C1.97619 19.0588 0.96302 18.0941 0.617057 16.8706C-0.000732422 14.6588 -0.000732422 10 -0.000732422 10C-0.000732422 10 -0.000732422 5.36471 0.617057 3.12941C0.96302 1.90588 2.00091 0.917647 3.2612 0.588235C5.6088 0 14.9992 0 14.9992 0C14.9992 0 24.3896 0 26.7372 0.611765ZM19.818 9.99997L12.0092 14.2823V5.71762L19.818 9.99997Z" fill="#FFFFFF"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className='menu-list'>
            <ul>
              <li className={router.pathname == "/" ? "active" : ""}>
                <Link href='/'>Home</Link>
              </li>
              <li className={router.pathname == "/stations" ? "active" : ""}>
                <Link href='/stations'>Where to Listen</Link>
              </li>
              <li className={router.pathname == "/cnb-sign-up" ? "active" : ""}>
                <Link href='/cnb-sign-up'>c&b VIP sign up</Link>
              </li>
              <li className={router.pathname == "/videos" ? "active" : ""}>
                <Link href='/videos'>Audio/Video</Link>
              </li>
              <li className={router.pathname == "/free-podcast" ? "active" : ""}>
                <Link href='/free-podcast'>Podcast</Link>
              </li>
              <li className={router.pathname == "/podcast" ? "active" : ""}>
                <Link href='/podcast'>VIP Podcast</Link>
              </li>
              <li className={router.pathname == "/clay-and-buck-in-a-hurry" ? "active" : ""}>
                <Link href='/clay-and-buck-in-a-hurry'>Newsletter</Link>
              </li>
              <li className={router.pathname == "/recommendations" ? "active" : ""}>
                <Link href='/recommendations'>Recs</Link>
              </li>
            </ul>
          </div>
	      </div>
        <div className='secs-menu'>
            <button className="login-btn">
              <Image src={white_mini_logo} width={28} height={28} alt=''></Image>
              <span>Login</span>
            </button>
        </div>
      </div>
    </header>
  )
}

// export async function getServerSideProps() {
//   const { headerMenu } = await getAllMenu();
//   return {
//      props: headerMenu
//   }
// }