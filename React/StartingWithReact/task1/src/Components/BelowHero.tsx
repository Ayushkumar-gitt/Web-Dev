import React from 'react'

const BelowHero = () => {
    return (
        <div className='belowhero'>
            
            <div className="text">
                <button id='abtneha'>About Neha</button>
                <p id='njthing'>Neha Jethwani is an Indian content creator and social media influencer. She is known for making short videos, dance clips, and lifestyle content on platforms like Instagram and YouTube. Over time, she has built a strong online following thanks to her engaging and expressive style.</p>
            </div>
            <div className="cards">
                <div className="card1 card">
                    <i className="ri-bluesky-fill"></i> <br /> <br />
                    <p>Neha Jethwani is an Indian content creator and social media influencer. She has built a strong online following thanks to her engaging and expressive style.</p>
                </div>
                <div className="card2 card">
                    {/* <i className="ri-bluesky-fill"></i> */}
                    <div className="glass">Neha Jethwani</div>
                </div>
                <div className="card3 card">
                    {/* <i className="ri-bluesky-fill"></i> */}
                    <div className="text2">
                        <h1>200+</h1>
                        <h3>Posts</h3>
                        <p>Certified Professinal Ready to boost your content from the very first upload.</p>
                    </div>
                </div>

            </div>
            <h3 id='facth3'>A few more facts about us in numbers</h3>
            <div className="numbers">
                <div className='insidenum'>
                    <h1>100+</h1>
                    <p> Hours of content </p>
                </div>
                <div className='insidenum'>
                    <h1>80%</h1>
                    <p> Audience Retention Rate </p>
                </div>
                <div className='insidenum'>
                    <h1>2M+</h1>
                    <p> Active Members </p>
                </div>
                <div className='insidenum'>
                    <h1>7+ </h1>
                    <p> Years Of Experience </p>
                </div>
            </div>
        </div>
    )
}

export default BelowHero
