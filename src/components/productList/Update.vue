<template>
  <div class="container">
    <div class="add-item row">
      <div class="col-md-5">
        <div class="mt-5">
          <router-link to="/"
                       class="return">
            <font-awesome-icon icon="arrow-left"/> &nbsp; Return to List
          </router-link>
          <h1><strong>Add New Link</strong></h1>
          <form>
            <div class="form-group">
              <label for="linkName">Link Name</label>
              <input type="text" class="form-control" id="linkName" v-model="title" aria-describedby="emailHelp"
                     placeholder="Link Name">
            </div>
            <div class="form-group">
              <label for="linkUrl">Link URL</label>
              <input type="text" class="form-control" id="linkUrl" v-model="link" placeholder="Link URL">
            </div>
            <button @click="saveProduct" type="submit" class="btn btn-primary float-right">ADD
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Update",
        data() {
            return {
                title: "",
                link: "",
                products: []
            }
        },
        mounted() {
            if(localStorage.getItem('products') !== null)
                this.products = JSON.parse(localStorage.getItem('products'))
        },
        methods: {
            saveProduct() {
                this.products.push({title: this.title, link: this.link, count: 0})
            }
        },
        watch: {
            products: {
                handler() {
                    localStorage.setItem('products', JSON.stringify(this.products))
                },
                deep: true,
            },
        }
    }
</script>

<style lang="scss" scoped>

  .add-item {
    display: flex;
    justify-content: center;
  }

  .return {
    color: #000000;
  }

  form {
    button {
      background-color: #000000;
      padding: 5px 40px;
      border-radius: 37px;
      font-size: 25px;
      font-weight: bold;

    }
  }

</style>
