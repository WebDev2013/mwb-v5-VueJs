<<template>
  <div class="container">
    <mu-card>
      <div class="row header">
        <h1>Edit Your Profile </h1>
        <button type="button" class="btn btn-default pull-right logout" @click="logout">
          <i class="fa fa-sign-out" aria-hidden="true"></i> Logout</button>
      </div>
      <hr/>
      <br/>

      <div layout="row" flex>
        <div class="col-md-4">

          <form>
            <div class="form-group">
              <!-- <label for="firstName">First Name:</label> -->
              <!-- <input type="text"
                    id="firstName" placeholder="First Name..." 
                    name="firstName" 
                    class="form-control" 
                    v-model.lazy.trim="userData.firstName" 
                    v-validate="'required|regex:^[A-Za-z]*$'"
                    /> -->
              <mu-text-field label="First name..." labelFloat
                    v-model.lazy.trim="userData.firstName" 
                    v-validate="'required|regex:^[A-Za-z]*$'"
              />  
              <em v-show="errors.has('firstName')">{{ errors.first('firstName') }}</em>
            </div>

            <div class="form-group">
              <!-- <label for="lastName">Last Name:</label> -->
              <!-- <input type="text" 
                    id="lastName" placeholder="Last Name..."
                    name="lastName" 
                    class="form-control"
                    v-model.lazy.trim="userData.lastName" 
                    v-validate="'required|regex:^[A-Za-z]*$'"
                    /> -->
              <mu-text-field label="Last name..." labelFloat
                v-model.lazy.trim="userData.lastName" 
                v-validate="'required|regex:^[A-Za-z]*$'"
              />  
              <em v-show="errors.has('lastName')">{{ errors.first('lastName') }}</em>
            </div>

            <div class="form-group">
              <!-- <label for="password">Password:</label> -->
              <!-- <input type="text" 
                    id="password" placeholder="Password..."
                    name="password" 
                    class="form-control" 
                    v-model.lazy.trim="userData.password" 
                    v-validate="'required|min:3|regex:^[A-Za-z]*$'"
                    /> -->
              <mu-text-field label="Password..." labelFloat
                type="password"
                v-model.lazy.trim="userData.password" 
                v-validate="'required|min:3|regex:^[A-Za-z]*$'"
              />  
              <em v-show="errors.has('password')">{{ errors.first('password') }}</em>
            </div>
            <br/>
            
            <button type="submit" class="btn btn-primary" @click.prevent="saveProfile">Save</button>
            <button type="button" class="btn btn-default" @click="cancel">Cancel</button>

          </form>

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
        userData: {
          firstName: '',
          lastName: '',
          password: ''
        },
        mouseoverLogin: false,
      }
    },
    created() {
      if (!this.$store.state.user.currentUser) {
        this.$router.push('/login?returnUrl=/profile' )
      }
      this.userData = {...this.$store.state.user.currentUser}
    },
    methods: {
      saveProfile() {
        this.$store.commit('UPDATE_USER', this.userData)
      },
      cancel() {
        this.$router.push('/');
      },
      logout() {
        this.$store.state.user.currentUser = null
        this.$router.push('/' )
      },
    }
  }
</script>

<style scoped>
  div.header {
    display: flex; 
    margin-top: 2em;
  }
  h1 {
    margin: auto; 
    margin-left: 0.5em
  }
  button.logout {
    margin: auto; 
    margin-right: 1em;
  }
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
