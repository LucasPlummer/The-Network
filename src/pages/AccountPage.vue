<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-8">
        <form @submit.prevent="editAccount()">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input v-model="editable.name" type="text" required class="form-control" id="name">
          </div>
          <div class="mb-3">
            <label for="coverImg" class="form-label">coverImg</label>
            <input v-model="editable.coverImg" type="text" required class="form-control" id="coverImg">
          </div>
          <div class="mb-3">
            <label for="picture" class="form-label">picture</label>
            <input v-model="editable.picture" type="text" required class="form-control" id="picture">
          </div>
          <div class="mb-3">
            <label for="bio" class="form-label">Bio</label>
            <textarea v-model="editable.bio" required class="form-control" id="bio" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label for="linkedin" class="form-label">Linked-In</label>
            <textarea v-model="editable.linkedin" class="form-control" id="linkedin" rows="1"></textarea>
          </div>

          <div class="mb-3">
            <label for="github" class="form-label">github</label>
            <textarea v-model="editable.github" class="form-control" id="github" rows="1"></textarea>
          </div>

          <div class="mb-3">
            <label for="resume" class="form-label">resume</label>
            <textarea v-model="editable.resume" class="form-control" id="resume" rows="3"></textarea>
          </div>

          <div class="mb-3">
            <label for="class" class="form-label">class</label>
            <textarea v-model="editable.class" class="form-control" id="class" rows="1"></textarea>
          </div>

          <div class="mb-3">
            <label for="graduated">
              <input type="checkbox" name="graduated" v-model="editable.graduated"> graduated?
            </label>
          </div>

          <button class="btn btn-success" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      if (AppState.account.id)
        editable.value = { ...AppState.account }
    })
    return {
      editable,
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          await accountService.editAccount(editable.value)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
