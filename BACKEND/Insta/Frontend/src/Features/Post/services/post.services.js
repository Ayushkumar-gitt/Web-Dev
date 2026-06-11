import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/posts",
    withCredentials: true
})

export async function getFeed() {
    try {
        const response = await api.get("/feed")
        return response.data
    } catch (error) {
        console.log(error);

    }
}
export async function likePost(postId) {
    try {
        const response = await api.post(`/like/${postId}`)
        return response.data
    } catch (error) {
        console.log(error.response?.data?.message || error.message);
        throw error;
    }
}

export async function createPost(postImg, caption) {
    try {
        const formData = new FormData()

        formData.append('image', postImg)
        formData.append('caption', caption)

        const response = await api.post('/', formData)

        return response

    } catch (error) {
        console.log(error);

    }
}


// http://localhost:3000/posts/like/6a1c171703c2cfce3587069e