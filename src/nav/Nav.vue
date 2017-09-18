<template>
  <nav class="navbar navbar-default navbar-inverse">
    <div class="container-fluid">

      <div class="navbar-header">
        <button type="button" class="navbar-toggle"
            data-toggle="collapse" data-target="#myNavbar"
            @click="isCollapsed = !isCollapsed"
            aria-controls="myNavbar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Migration Workbench</a>
      </div>

      <div class="collapse navbar-collapse" id="myNavbar" :class="{in: !isCollapsed}">

        <!-- Page navigaion -->
        <ul class="nav navbar-nav">
          <router-link to="/dashboard" tag="li" active-class="active"><a>Dashboard</a></router-link>
          <router-link to="/validations" tag="li" active-class="active"><a>Validations</a></router-link>
          <router-link to="/referentials" tag="li" active-class="active"><a>Referential Integrity</a></router-link>
          <router-link to="/clinics" tag="li" active-class="active"><a>Clinics</a></router-link>
          <router-link to="/tasks" tag="li" active-class="active"><a>Team Tasks</a></router-link>
        </ul>

        <!-- User functions -->
        <ul class="nav navbar-nav navbar-right">
          <router-link v-if="!isAuthenticated" to="/login" tag="li" active-class="active">
            <a><span class="fa fa-lg fa-sign-in"></span> Login</a>
          </router-link>
          <router-link v-if="isAuthenticated" to="/profile" tag="li" active-class="active">
            <a><span class="fa fa-lg fa-user"></span> <i>{{ currentUser.firstName }}</i> <b>{{ currentUser.lastName }}</b> </a>
          </router-link>
        </ul>

      </div>

    </div>
  </nav>
</template>

<script>
export default {
  data: function () {
    return {
      isCollapsed: true
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.user.currentUser
    },
    isAuthenticated() {
      return this.currentUser
    }
  },
  components: {
  }
}
</script>

<style scoped>
  /* a, a.navbar-brand {
    color: #9d9d9d;
  } */
  li.active a { 
    color: #F97924 !important; 
    cursor: pointer; 
  }
</style>
