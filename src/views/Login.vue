<template>
  <div class="wrapper d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xs-10 col-sm-8 col-md-5">
          <div class="login-wrapper">
            <h1 class="login-wrapper__title">Login</h1>
            <form @submit.prevent="submit">
              <div class="form-group">
                <label for="mail" :class="{ 'text-danger': $v.mail.$error }">Email</label>
                <input type="mail" :class="{'form-control': true, 'is-invalid': $v.mail.$error }" v-model.trim="$v.mail.$model" id="mail" />
                <div class="invalid-feedback" v-if="!$v.mail.required && $v.mail.$dirty">
                  This field is required.
                </div>
                <div class="invalid-feedback" v-if="!$v.mail.email && $v.mail.$dirty">
                  Enter a valid email address.
                </div>
              </div>
              <div class="form-group">
                <label for="password" :class="{ 'text-danger': $v.password.$error }">Password</label>
                <input type="password" :class="{'form-control': true, 'is-invalid': $v.password.$error }" v-model="$v.password.$model" id="password" />
                <div class="invalid-feedback" v-if="!$v.password.required && $v.password.$dirty">
                  This field is required.
                </div>
              </div>
              <BaseButton btnType="submit" btnClass="btn btn-primary btn-block" :isLoading="getAuthStatus === 'loading'">Login</BaseButton>
              <div class="login-wrapper__regtext">Don't have an account? <router-link to="/register" exact>Register Now</router-link></div>
            </form>
            <Toast type="error" :isShow="hasError" @close="hasError= false">
              <b>Login Failed!</b> User name and/or Password is invalid
            </Toast>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import Toast from "../components/Toast";
import BaseButton from '../components/BaseButton';
import { mapGetters } from 'vuex';

export default {
  metaInfo: {
    title: 'Login'
  },
  data() {
    return {
      mail: null,
      password: null,
      isInvalid: true,
      hasError: false,
      errorMsg: null
    };
  },
  methods: {
    submit() {
      this.$v.$touch();
      if(!this.$v.$invalid) {
        this.$store.dispatch('login/AUTH', {
          "email": this.mail,
          "password": this.password
        })
        .then(() => {
          this.$router.push('/articles');
        })
        .catch((err) => {
          this.hasError = true;
          this.errorMsg = err;
        })
      }
    }
  },
  computed: {
    ...mapGetters({
      getAuthStatus: 'login/getAuthStatus',
      getAuthError: 'login/getAuthError'
    })
  },
  validations: {
    mail: {
      required,
      email
    },
    password: {
      required
    }
  },
  components: {
    Toast,
    BaseButton
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100vh;
}

.login-wrapper {
  background-color: #eceeef;
  padding: 20px;
  border-radius: 4px;

  &__title {
    text-transform: uppercase;
    text-align: center;
    color: #707070;
    font-weight: normal;
    margin: 40px;
  }

  &__regtext {
    margin-top: 10px;

    a {
      color: black;
      font-weight: bold;
    }
  }
}
</style>
