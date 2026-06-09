import { useContext } from "react"
import { postContext } from "../post.context"
import { getFeed, likePost } from "../services/post.services"

export const usePost = () => {
    const context = useContext(postContext)
    const { feed, loading, post, setpost, setfeed, setloading } = context

    const handleGetFeed = async () => {
        setloading(true)
        const response = await getFeed();
        setfeed(response.posts)
        setloading(false)
    }
    const handlePostLike = async (postId) => {
        const response = await likePost(postId)
        return response
    }
    return {
        loading, handleGetFeed, post, feed,handlePostLike
    }
}