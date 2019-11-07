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
                <label for="password">Password</label>
                <input type="password" class="form-control" v-model="password" id="password" />
              </div>
              <button type="submit" class="btn btn-primary btn-block">Login</button>
              <div class="login-wrapper__regtext">Don't have an account? <a href="#">Register Now</a></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      mail: null,
      password: null,
      isInvalid: true
    };
  },
  methods: {
    submit() {
      this.$v.$touch();
    }
  },
  validations: {
    mail: {
      required,
      email
    }
  },
  components: {
    
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
