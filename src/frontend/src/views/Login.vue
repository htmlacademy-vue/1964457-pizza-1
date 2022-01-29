<template>
  <div class="sign-form">
    <a href="#" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="onSubmit" action="test.html" method="post">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="password"
            type="password"
            name="pass"
            placeholder="***********"
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState("Auth", ["isAuthenticated"]),
  },
  methods: {
    isEmailValid() {
      return String(this.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
    async onSubmit() {
      if (!this.isEmailValid()) {
        window.alert(`${this.email} is not a valid email`);
      } else if (!this.password) {
        window.alert("password cannot be empty");
      } else {
        await this.$store.dispatch("Auth/login", {
          email: this.email,
          password: this.password,
        });
        if (this.isAuthenticated) {
          await this.$router.push("/");
        } else {
          window.alert("Authentication failure");
        }
      }
    },
  },
};
</script>

<style scoped></style>
