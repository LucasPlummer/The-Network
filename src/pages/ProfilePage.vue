<template>
    <div class="container-fluid">
        <div v-if="profile" class="row cover-img" :style="`background-image: url(${profile.coverImg})`">
            <div class="col-12 d-flex align-items-center justify-content-around">
                <img :src="profile.picture" alt="" class="img-fluid profile-picture rounded-circle">
                <div class="bg-dark rounded p-5 elevation-1">
                    <h1>
                        {{ profile.name }}
                    </h1>
                    <h2>
                        {{ profile.bio }}
                    </h2>
                    <h3>
                        linkedin: {{ profile.linkedin }}
                    </h3>
                    <h3>
                        github: {{ profile.github }}
                    </h3>
                    <h3>
                        resume: {{ profile.resume }}
                    </h3>
                    <h3>
                        class: {{ profile.class }}
                    </h3>
                    <h3>
                        graduated: {{ profile.graduated }}
                    </h3>
                </div>
            </div>
        </div>
        <div class="row">
            <div v-for="post in posts" class="col-12 p-4">
                <PostCard :post="post" />
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import { profilesService } from '../services/ProfilesService.js';
import { postsService } from '../services/PostsService.js';
import PostCard from '../components/PostCard.vue';
export default {
    setup() {
        const route = useRoute();
        async function getProfileByProfileId() {
            try {
                await profilesService.getProfileByProfileId(route.params.profileId)
            } catch (error) {
                logger.error(error)
                Pop.error(error.message);
            }
        }
        async function getPostsByCreatorId() {
            try {
                await postsService.getPostsByCreatorId(route.params.profileId);
            } catch (error) {
                logger.error(error)
                Pop.error(error.message)
            }
        }
        onMounted(() => {
            getProfileByProfileId();
            getPostsByCreatorId();
        });
        return {
            profile: computed(() => AppState.activeProfile),
            posts: computed(() => AppState.posts)
        }
    },
    components: { PostCard }
};
</script>


<style lang="scss" scoped>
.cover-img {
    min-height: 50vh;
    background-size: cover;
    background-position: center;
}

.profile-picture {
    height: 30vh;
    width: 30vh;
}

.bg-transparent {
    background-color: rgba(222, 184, 135, 0.623);
    text-shadow: 1px 1px white;
}
</style>