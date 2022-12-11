<template>
    <div class="p-2">
        <div class="d-flex align-items-center">
            <router-link v-if="route.name == 'Home'" :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
                <img class="img-fluid rounded-circle profile-picture" :src="post.creator.picture"
                    :alt="post.creator.name">
            </router-link>

            <h6>{{ post.creator.name }}</h6>
        </div>
        <h5>
            created at {{ post.creator.createdAt.slice(0, 10) }}
        </h5>
        <div class="d-flex justify-content-center">
            <img class="img-card text-center" :src="post.imgUrl" alt="">
        </div>
        <h1 class="d-flex justify-content-center">{{ post.body }}</h1>
        <button @click.prevent="createLikes" class="d-flex justify-content-center btn btn-danger">
            <i class="mdi mdi-heart"></i> {{ post.likes?.length }}
        </button>
        <button v-if="(post.creatorId == account.id)" @click="deletePost()"
            class="btn btn-danger delete-btn rounded-pill"><i class="  px-2 mdi mdi-delete-forever"></i></button>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Post } from '../models/Post.js';
import { useRoute } from 'vue-router';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';
export default {
    props: {
        post: {
            type: Post,
            required: true
        }
    },
    setup(props) {
        const route = useRoute()
        return {
            account: computed(() => AppState.account),
            route,
            coverImg: computed(() => `url(${props.post.coverImg})`),

            async deletePost() {
                try {
                    await postsService.deletePost(props.post.id)
                } catch (error) {
                    Pop.error(error)
                    logger.error(error)
                }
            },

            async createLikes() {
                try {
                    await postsService.createLikes(props.post.id)
                } catch (error) {
                    Pop.error(error)
                }
            },

            setActivePost() {
                postsService.setActivePost(props.post)
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.img-card {
    height: 50vh;
    width: 80vh;
    background-size: cover;
    background-position: center;
}

.profile-picture {
    height: 6vh;
    width: 6vh;
    object-fit: cover;
}
</style>