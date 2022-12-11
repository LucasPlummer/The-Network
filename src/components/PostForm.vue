<template>
    <form @submit.prevent="createPost()" class="row justify-content-end">
        <div class="mb-3">
            <label for="" class="form-label">body</label>
            <input type="text" name="form-control" v-model="editable.body" id="helpId" aria-describedby="helpId">
            <small id="helpId" class="form-text text-muted">{{ editable.body }}</small>
        </div>
        <div class="mb-3">
            <label for="" class="form-label">ImgUrl</label>
            <input type="url" name="form-control" v-model="editable.imgUrl" id="helpId" aria-describedby="helpId">
            <img :src="editable.imgUrl" class="image-fluid" alt="">
        </div>
        <div class="mb-3 col-4">
            <button class="btn btn-success">
                create
            </button>
        </div>
    </form>


</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
export default {

    setup() {
        const editable = ref({})
        async function createPost() {
            try {
                await postsService.createPost(editable.value)
                editable.value = {}
                Pop.toast('post uploaded', "success")
            } catch (error) {
                Pop.error(error)
            }
        }


        return {
            editable,
            createPost
        }
    }
};
</script>


<style lang="scss" scoped>

</style>