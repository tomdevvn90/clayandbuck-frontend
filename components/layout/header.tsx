import Link from 'next/link'
import Image from 'next/image'
import logo_img from '../../public/images/clay-and-buck-logo.png'
import white_mini_logo from '../../public/images/white-mini-logo.png'
import MenuItem from '../menu-item'
import SocialChannels from '../social-channels';

import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header( { headerMenu } ) {
  const [menuStatus, setMenuStatus] = useState(true)
  const menuList = headerMenu?.edges
  if ( menuList ) menuList.sort( (a, b) => a.node.order - b.node.order )

  const pacificDatetimeStr = new Date().toLocaleString("en-US", { timeZone: "US/Pacific" })
  const pacificHour = new Date(pacificDatetimeStr).getHours() 
  const showOnAirBtn = ( pacificHour >= 9 && pacificHour <= 11 ) ? true : false

  // const useWidth = () => {
  //   const [width, setWidth] = useState(0)
  //   const handleResize = () => setWidth(window.innerWidth)
  //   useEffect(() => {
  //       handleResize()
  //       window.addEventListener('resize', handleResize)
  //       return () => window.removeEventListener('resize', handleResize)
  //   }, [])
  //   return width
  // }
  // const hideMenu = (!menuStatus || window.innerWidth < 1025) ? 'hide' : ''

  const hideMenu = (!menuStatus) ? 'hide' : ''

  const toggleMenuHeader = () => {
    setMenuStatus(!menuStatus)
  }

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
                { showOnAirBtn && (
                    <Link href="/videos/24-7-full-show-audio/" className="on-air-btn">On Air</Link>
                ) }
            </div>
            <SocialChannels lessItems={true}></SocialChannels>
          </div>
          <div className={`menu-list ${hideMenu}`}>
            <ul>
              { menuList && menuList.map( ( { node }, index ) => (
                  <MenuItem key={index} item={node}></MenuItem>
              )) }
              <li>
                <span className='search-btn'>
                  <FontAwesomeIcon icon={faSearch} style={{}} />
                </span>
              </li>
            </ul>
          </div>
	      </div>

        <div className='secs-menu'>
            <button className="login-btn">
              <Image src={white_mini_logo} width={28} height={28} alt=''></Image>
              <span>Login</span>
            </button>
            <span className='toggle-menu' onClick={toggleMenuHeader}>
              <FontAwesomeIcon icon={faBars} style={{}} />
            </span>
        </div>

      </div>
    </header>
  )
}