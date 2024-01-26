<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <a class="navbar-brand logo" style="color:#32922F !important" href="#"
        @click.prevent="$router.push({ name: 'home' })">KHETALA</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav  mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" style="color:#32922F !important" href="#home">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" style="color:#32922F !important" href="#about">About</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" style="color:#32922F !important" href="#contact">Contact</a>
          </li>
        </ul>
        <div class="d-flex" role="search" style="margin-left: 40rem;" >
          <button v-if="!token" class="btn btn-outline-success"  @click="$router.push('/user/login')" style="color:#3f51b5 !important ">Login</button>
          <button v-if="!token" class="btn btn-outline-success mx-2" @click="$router.push('/user/register')" style="color:#3f51b5 !important">Register</button>
          <button class="btn btn-outline-success loginBtn"  @click="$router.push('/user/login')" style="color:#32922F !important; " >Login</button>
          <button class="btn btn-outline-success loginBtn mx-2" @click="$router.push('/user/register')" style="color:#32922F !important;  ">Register</button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      token: localStorage.getItem('token'), // Assuming token is initially null
      // Other data properties
    };
  },}

</script>
