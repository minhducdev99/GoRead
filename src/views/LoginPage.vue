<template>
  <div class="login-page">
    <div class="login-card" v-loading="loading">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="" />
      </div>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <el-input
            id="email"
            v-model="dataForm.email"
            placeholder="Enter email"
            type="email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <el-input
            id="password"
            v-model="dataForm.password"
            placeholder="Enter password"
            type="password"
            show-password
          />
        </div>
        <div class="submit-wrapper">
          <Button type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from '@vue/reactivity';
export default {
  name: 'login'
};
</script>

<script lang="ts" setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { toRaw } from 'vue';
import Button from '@/components/Button.vue';

const router = useRouter();

const dataForm = reactive({
  email: '',
  password: ''
});
const loading = ref<boolean>(false);

const handleLogin = () => {
  const { email, password } = dataForm;
  const auth = getAuth();
  loading.value = true;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('userInfo', JSON.stringify(user));
      loading.value = false;
      router.push({
        path: '/admin'
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorCode, errorMessage });
      loading.value = false;
    });
};
</script>

<style lang="scss" scoped>
@import '@/styles/_index';

.login {
  &-page {
    width: 100%;
    min-height: 100vh;
    background-color: #f2f2f2;
    @include mobile {
      background-color: $white;
    }
    padding: $space-xxl $space-md;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-card {
    width: 390px;
    background-color: $white;
    border-radius: 10px;
    text-align: center;
    padding: 60px $space-md;
    @include mobile {
      padding: 0 $space-md $space-xxl;
    }
    h1 {
      color: $text-primary;
      font-size: $very-large;
      font-weight: bold;
      margin: $space-xxl 0 $space-xl 0;
    }
    .logo {
      width: 100px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    form {
      padding: $space-xl 0;
      .form-group {
        text-align: left;
        margin-bottom: $space-lg;
        label {
          display: inline-block;
          margin-bottom: $space-xxs;
        }
      }
      .submit-wrapper {
        float: right;
        margin-top: $space-xxl;
      }
    }
  }
}
</style>
