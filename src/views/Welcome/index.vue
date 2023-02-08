<template>
  <div class="welcome">
    <p class="welcome-text">Welcome administrator</p>
    <img class="welcome-img" src="@/assets/images/welcome.png" />
  </div>
</template>
<script>
export default {
  name: 'WelcomePage',
}
</script>
<style lang="scss" scoped>
@font-face {
  font-family: 'magicFont';
  src: url('@/assets/fonts/MagicOwl-PersonalUse.otf');
}
.welcome {
  text-align: center;
  .welcome-text {
    font-family: 'magicFont';
    font-size: 50px;
  }

  .welcome-img {
    width: 450px;
  }
}
</style>
