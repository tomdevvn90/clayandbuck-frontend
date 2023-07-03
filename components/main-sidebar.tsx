import Link from 'next/link'

export default function MainSideBar() {
    return (
        <div className='main-sidebar'>
            <div className='sidebar-wrap'>
                <section className="widget_media_image">
                    <Link href="/email-the-show/">
                        <img width="360" height="281" src="https://www.clayandbuck.com/wp-content/uploads/2023/03/VIP-Exclusive-EMAIL-Right-Rail-B-VIP-2023.jpg" alt="Clay and Buck" />
                    </Link>
                </section>
                <section className="widget_media_image">
                    <Link href="/parodies">
                        <img width="100%" height="248" src="https://www.clayandbuck.com/wp-content/uploads/2022/06/CB-Parodies-Right-Rail-2022-A1-300x234.jpg" alt="Clay and Buck" />
                    </Link>
                </section>
            </div>
        </div>
    )
}