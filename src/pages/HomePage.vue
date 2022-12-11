<template>
  <div class="container-fluid">

    <div class="row justify-content-center">
      <div class="col-8 bg-dark p-3 elevation-1 rounded">
        <PostForm />
      </div>
    </div>

    <div v-for="p in posts" class="row card m-3">
      <PostCard :post="p" />
    </div>
    <div class="d-flex justify-content-center">
      <button :disabled="!previousPage" @click="changePage(previousPage)" class="btn btn-primary">Previous</button>

      <button @click="changePage(nextPage)" class="btn btn-primary">Next</button>
    </div>
  </div>


</template>

<script>
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js'
import { computed, onMounted } from 'vue';
import PostCard from '../components/PostCard.vue'

export default {
  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts();
      } catch (error) {
        logger.error(error);
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getPosts();
    });
    return {
      posts: computed(() => AppState.posts),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),

      async changePage(url) {
        try {
          await postsService.changePage(url);
        } catch (error) {
          logger.error(error);
          Pop.error(error.message)
        }
      },
    }
  },
  components: { PostCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
