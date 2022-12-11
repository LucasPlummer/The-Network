import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {
    async getPosts() {
        const res = await api.get('api/posts')
        logger.log('[get posts]', res.data.posts)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
    }

    async getPostsByCreatorId(creatorId) {
        const res = await api.get('api/posts', {
            params: {
                creatorId: creatorId
            }
        })
        logger.log('[get posts by creator]', res.data)
        AppState.posts = res.data.posts.map(p => new Post(p))
    }
    setActivePost(post) {
        AppState.activePost = post
    }

    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        AppState.posts.unshift(res.data)
    }

    async deletePost(id) {
        const res = await api.delete('api/posts/' + id)
        let index = AppState.posts.findIndex(p => p.id == id)
        AppState.posts.splice(index, 1)
    }

    async createLikes(id) {
        const res = await api.post(`/api/posts/${id}/like`)
        logger.log(res.data)
        AppState.posts.splice(AppState.posts.findIndex(l => l.id == id), 1, res.data)
    }

    async changePage(url) {
        const res = await api.get(url)
        logger.log("change page", res.data.newer)
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
        AppState.posts = res.data.posts
        logger.log(res.data.older)
    }

}

export const postsService = new PostsService()