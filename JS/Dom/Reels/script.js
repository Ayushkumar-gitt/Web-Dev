const reels = [
  {
    username: "aarav_sharma",
    likeCount: 1240,
    isLiked: false,
    commentCount: 86,
    video: "./1.mp4",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    shareCount: 34,
    isFollowed: true
  },
  {
    username: "priya_verma",
    likeCount: 980,
    isLiked: true,
    commentCount: 65,
    video: "./2.mp4",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    shareCount: 21,
    isFollowed: false
  },
  {
    username: "rohan_mehta",
    likeCount: 1560,
    isLiked: false,
    commentCount: 120,
    video: "./3.mp4",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    shareCount: 48,
    isFollowed: true
  },
  {
    username: "ananya_gupta",
    likeCount: 870,
    isLiked: true,
    commentCount: 54,
    video: "./4.mp4",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
    shareCount: 19,
    isFollowed: false
  },
  {
    username: "karan_patel",
    likeCount: 1125,
    isLiked: false,
    commentCount: 73,
    video: "./5.mp4",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    shareCount: 27,
    isFollowed: true
  },
  {
    username: "neha_kapoor",
    likeCount: 1345,
    isLiked: true,
    commentCount: 92,
    video: "",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    shareCount: 40,
    isFollowed: false
  },
  {
    username: "rahul_malhotra",
    likeCount: 765,
    isLiked: false,
    commentCount: 38,
    video: "",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    shareCount: 15,
    isFollowed: false
  },
  {
    username: "simran_kaur",
    likeCount: 1420,
    isLiked: true,
    commentCount: 101,
    video: "",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c",
    shareCount: 52,
    isFollowed: true
  },
  {
    username: "vikram_singh",
    likeCount: 690,
    isLiked: false,
    commentCount: 29,
    video: "",
    image: "https://images.unsplash.com/photo-1521119989659-a83eee488004",
    shareCount: 12,
    isFollowed: false
  },
  {
    username: "isha_jain",
    likeCount: 1580,
    isLiked: true,
    commentCount: 134,
    video: "",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    shareCount: 61,
    isFollowed: true
  }
];

var htmlforreel = ""
reels.forEach(function(val){
    htmlforreel+= `
            <div class="reels">
                <video autoplay loop muted src="${val.video}"></video>
                <div class="bottom">
                    <div class="right">
                        <img id="profilepic" src="${val.image}" alt="">
                        <h4>Saddie sink</h4>
                    </div>
                    <button id="followbtn">${val.isFollowed?'Unfollow':'Follow'}</button>
                </div>
                <div class="actionbtn">
                    <div class="like">
                        ${val.isLiked?'<i class="ri-heart-3-fill"></i>':'<i class="ri-heart-3-line"></i>'}
                        ${val.likeCount}
                    </div>
                    <div class="comment">
                        <i class="ri-chat-1-line"></i>
                        ${val.commentCount}
                    </div>
                    <div class="share">
                        <i class="ri-share-forward-line"></i>
                        ${val.shareCount}
                    </div>
                    <div class="menu">
                        <i class="ri-more-2-line"></i>
                    </div>
                </div>
            `
});

var allreels = document.querySelector('.all-reels')
allreels.innerHTML = htmlforreel