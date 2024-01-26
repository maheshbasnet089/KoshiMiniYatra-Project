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
          <!-- <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> -->
        </ul>
        <div class="d-flex" role="search" style="margin-left: 40rem;" >
          <button class="btn btn-outline-success"  @click="$router.push('/user/login')" style="color:#32922F !important ">Login</button>
          <button class="btn btn-outline-success mx-2" @click="$router.push('/user/register')" style="color:#32922F !important">Register</button>
        </div>
      </div>
    </div>
  </nav>
</template>
