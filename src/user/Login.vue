<template>
  <div class="container">
    <mu-card>
      <mu-card-header>
        <h1>Login</h1>
        <!-- <hr> -->
      </mu-card-header>

      <div layout="row" flex>
        <div class="col-md-4">

          <form>

            <div class="form-group">
              <!-- <label for="userName">User Name:</label> -->
              <!-- <input type="text" id="userName" class="form-control" 
                v-model.lazy.trim="loginData.userName"
                v-validate="'min:3|regex:^[A-Za-z]*$'"
                name="userName" placeholder="User Name..." /> -->
              
              <mu-text-field label="User name..." labelFloat
                v-model.lazy.trim="loginData.userName"
                v-validate="'min:3|regex:^[A-Za-z]*$'"
              />  
              
              <em v-show="errors.has('userName')">{{ errors.first('userName') }}</em>
            </div>

            <div class="form-group">
              <!-- <label for="password">Password:</label> -->
              <!-- <input type="password" id="password" class="form-control" 
                v-model.lazy.trim="loginData.password"
                name="password" placeholder="Password..." /> -->
              <mu-text-field label="Password..." labelFloat
                type="password"
                v-model.lazy.trim="loginData.password"
              />  
            </div>
            <br/>

            <span @mouseenter="mouseoverLogin=true" @mouseleave="mouseoverLogin=false">
              <button type="submit" class="btn btn-primary" :disabled="!userIsValid" @click.prevent="login">Login</button>
            </span>
            <button type="button" class="btn btn-default" @click.prevent="cancel">Cancel</button>
            <br/>
            <br/>
            
            <h6>Hint:</h6>
            <ul>
              <li class="user" v-for="user in users" :key="user.lastName" @click="selectUser(user)">
                <div>{{user.lastName}}</div>
              </li>
            </ul>

          </form>
        </div>
        <div class="col-md-6">
        </div>
      </div>
    </mu-card>
  </div>
</template>

<script>
import AuthService from './auth.service'

export default {
  data () {
    return {
      loginData: {
        userName: '',
        password: ''
      },
      mouseoverLogin: false,
      returnUrl: '',
      prompt: ''
    }
  },
  computed: {
    users() {
      return this.$store.state.user.users
    },
    userIsValid() {
      const userIndex = this.users.map(user => user.userName).indexOf(this.loginData.userName);
      return userIndex > -1
    },
  },
  created() {
    this.returnUrl = this.$route.query.returnUrl
    this.prompt = this.$route.query.prompt
    AuthService.checkUsers()
  },
  mounted() {
    if (this.returnUrl) {
      const msg = 'Please login to access ' + (this.prompt ? this.prompt : '')
      this.$toasted.show(msg, {type: 'success'}).goAway(3000)
    }
  },
  methods: {
    selectUser(user) {
      this.loginData.userName = user.lastName
    },
    login() {
      AuthService.loginUser(this.loginData.userName, this.loginData.password);
      if (this.returnUrl) {
        this.$router.push(this.returnUrl);
      }
    },
    cancel() {
      this.$router.push('/');
    },
    select(formValues, user) {
      formValues.userName = user.userName;
    },
  },
}
</script>

<style scoped>
  .mu-card {
    height: 40em;
    padding: 10px 70px;
    margin-bottom: 10px;
  }
  li.user {
    width: 30px;
    cursor: pointer;
  }
</style>
