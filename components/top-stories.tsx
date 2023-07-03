import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function TopStories() {
    return (
        <div className="top-stories">																	
            <div className="post-item">
                <Link href="/shannon-bream-breaks-down-the-scotus-rulings">
                    <div className="post-wrap">
                        <div className="post-img">
                            <img src="https://www.clayandbuck.com/wp-content/uploads/2023/03/FT-860-x-380-033023-Bream.jpg" alt="Shannon Bream Breaks Down the SCOTUS Rulings" />
                        </div>
                        <div className="post-content">
                            <h6>30 June, 2023</h6>
                            <h4 title="Shannon Bream Breaks Down the SCOTUS Rulings">Shannon Bream Breaks Down the SCOTUS Rulings</h4>
                            <p>Fox's Supreme Court expert Shannon Bream analyzes this week's rulings and looks ahead.</p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="post-item">
                <Link href="/vip-video-nyc-mayor-adams-compares-holocaust-survivor-to-plantation-owner-at-town-hall">
                    <div className="post-wrap">
                        <div className="post-img">
                            <img src="https://www.clayandbuck.com/wp-content/uploads/2023/06/FT-860-x-380-247-Video-Exclusive-063023.jpg" alt="Shannon Bream Breaks Down the SCOTUS Rulings" />
                        </div>
                        <div className="post-content">
                            <h6>30 June, 2023</h6>
                            <h4 title="Shannon Bream Breaks Down the SCOTUS Rulings">Shannon Bream Breaks Down the SCOTUS Rulings</h4>
                            <p>Fox's Supreme Court expert Shannon Bream analyzes this week's rulings and looks ahead.</p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="post-item">
                <Link href="/check-out-clays-interview-with-the-daily-mail">
                    <div className="post-wrap">
                        <div className="post-img">
                            <img src="https://www.clayandbuck.com/wp-content/uploads/2023/06/ClayDMFT.jpg" alt="Shannon Bream Breaks Down the SCOTUS Rulings" />
                        </div>
                        <div className="post-content">
                            <h6>30 June, 2023</h6>
                            <h4 title="Shannon Bream Breaks Down the SCOTUS Rulings">Check Out Clay's Interview with the Daily Mail</h4>
                            <p>Clay sat down with the Daily Mail for an interview on how woke sports are alienating the American people.</p>
                        </div>
                    </div>
                </Link>
            </div>

		    {/* Slider here */}
            {/* <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                <SwiperSlide>
                    <div>
                        <p>"Independence Day weekend: Hanging out, hopefully having a lot of fun as we celebrate the best country in all the history of the world."<br/>- Clay Travis</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <p>"It's a great week for freedom. It's a great week for America."<br/>- Buck Sexton</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <p>"I think over time Americans get things right. Sometimes, it takes much too long."<br/>- Clay Travis</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <p>"Sometimes Clay and I almost get lost in the matrix fighting the commies for you guys."<br/>- Buck Sexton</p>
                    </div>
                </SwiperSlide>
            </Swiper> */}

            <div className="post-item">
                <Link href="/shannon-bream-breaks-down-the-scotus-rulings">
                    <div className="post-wrap">
                        <div className="post-img">
                            <img src="https://www.clayandbuck.com/wp-content/uploads/2023/06/FT-860-x-380-247-Video-Exclusive-062923.jpg" alt="Shannon Bream Breaks Down the SCOTUS Rulings" />
                        </div>
                        <div className="post-content">
                            <h6>29 June, 2023</h6>
                            <h4 title="Shannon Bream Breaks Down the SCOTUS Rulings">VIP Video: SCOTUS Strikes Down Affirmative Action in College Admissions</h4>
                            <p>Fox's Supreme Court expert Shannon Bream analyzes this week's rulings and looks ahead.</p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="post-item">
                <Link href="/shannon-bream-breaks-down-the-scotus-rulings">
                    <div className="post-wrap">
                        <div className="post-img">
                            <img src="https://www.clayandbuck.com/wp-content/uploads/2023/05/FT-860-x-380-053023-Tim-Scott.jpg" alt="Shannon Bream Breaks Down the SCOTUS Rulings" />
                        </div>
                        <div className="post-content">
                            <h6>29 June, 2023</h6>
                            <h4 title="Shannon Bream Breaks Down the SCOTUS Rulings">Sen. Tim Scott Reacts to SCOTUS Decision on Affirmative Action: "Progress in America Is Palpable</h4>
                            <p>Presidential candidate, Senator Tim Scott, reacts to the SCOTUS decision on affirmative action.</p>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="post-item">
                <Link href="/shannon-bream-breaks-down-the-scotus-rulings">
                    <div className="post-wrap">
                        <div className="post-img">
                            <img src="https://www.clayandbuck.com/wp-content/uploads/2023/03/FT-860-x-380-033023-Bream.jpg" alt="Shannon Bream Breaks Down the SCOTUS Rulings" />
                        </div>
                        <div className="post-content">
                            <h6>30 June, 2023</h6>
                            <h4 title="Shannon Bream Breaks Down the SCOTUS Rulings">Shannon Bream Breaks Down the SCOTUS Rulings</h4>
                            <p>Fox's Supreme Court expert Shannon Bream analyzes this week's rulings and looks ahead.</p>
                        </div>
                    </div>
                </Link>
            </div>

        </div>
    )
}