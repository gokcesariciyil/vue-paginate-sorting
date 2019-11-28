<template>
  <div class="container-fluid mt-5">
    <div class="row">
      <div class="col-md-4">
        <div class="logo">
<!--          <img src="../../assets/logo.png"/>-->
        </div>
      </div>
      <div class="col-md-4 offset-md-4">
        <div class="text"><strong>Link</strong>VOTE Challenge</div> </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style lang="scss" scoped>
  .container-fluid{
    border-bottom: 1px solid #000;
    padding-left:150px;
    padding-right:150px;

    .logo{
      img{
        width: 250px;
      }
    }
    .text{
      text-align: right;
    }
  }

</style>
