<template>
  <div class="page-signin">
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin">
            <div class="card-body">
              <h5 class="card-title text-center"><img src="~/assets/img/kpi-logo.png" style="max-width: 100%;"></h5>
              <form class="form-signin" @submit.prevent :class="{ 'dirty' : $v.$dirty }">
                <div class="form-label-group">
                  <label for="inputUser">Username</label>
                  <input type="text" id="inputUser" class="form-control" v-model="form.username" autofocus>
                  <div class="invalid-feedback" v-show="!$v.form.username.required">
                    {{ $t('c.err__required') }}
                  </div>
                </div>

                <div class="form-label-group">
                  <label for="inputPassword">Password</label>
                  <input type="password" id="inputPassword" class="form-control" v-model="form.password">
                  <div class="invalid-feedback" v-show="!$v.form.password.required">
                    {{ $t('c.err__required') }}
                  </div>
                </div>

                <hr class="my-4">

                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit" @click="login()">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import CommonMixin from '~/assets/js/CommonMixin'

export default {
  layout: 'blank',
  mixins: [CommonMixin],
  fetch () {
    if (process.server) {
      console.log('login.vue serverrrrrrrrrrrrrrrr')
    }
    else if (process.client) {
      console.log('login.vue clientttttttttttttttt')
    }
  },
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    async login () {
      // validate form
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.toast('warning', this.$t('c.err__form_validate'))
        return
      }

      // do login
      const ok = await this.$auth.login(this.form.username, this.form.password)
      console.log('login ok = ', ok)

      if (ok) {
        window.location.href = '/'
      }
    }
  },
  hello (txt) {
    console.log('hello '+txt)
  },
}
</script>

<style scoped>
.page-signin {
  height: 100vh;
  background: linear-gradient(150deg, #172b4d 10%, #19c5f3 90%);
}

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  margin-top: 15%;
}

.card-signin .card-title {
  margin-bottom: 1.8rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  /* font-size: 80%; */
  font-size: 18px;
  border-radius: 5rem;
  letter-spacing: .1rem;
  font-weight: bold;
  /* padding: 1rem; */
  padding: 0.5rem 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
  color: #777;
}

.form-label-group>input,
.form-label-group>label {
  padding: 0.75rem 1.5rem;
  font-size: 18px;
}

.form-label-group>label {
  /* position: absolute;
  top: 0;
  left: 0;
  display: block; */
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  /* color: #495057; */
  color: #555;
  /* border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out; */
  padding-left: 16px;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

/* .form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
} */

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

.form-control {
  background-color: #ffffff;
}

.btn-google {
  color: white;
  background-color: #ea4335;
}

.btn-facebook {
  color: white;
  background-color: #3b5998;
}

.invalid-feedback {
  font-size: 14px;
  padding-left: 16px;
}
/* Fallback for Edge
-------------------------------------------------- */

/* @supports (-ms-ime-align: auto) {
  .form-label-group>label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
} */

/* Fallback for IE
-------------------------------------------------- */

/* @media all and (-ms-high-contrast: none),
(-ms-high-contrast: active) {
  .form-label-group>label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
} */
</style>