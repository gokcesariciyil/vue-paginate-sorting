<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="list">
          <div class="card mb-3" style="max-width: 540px;">
            <div class="row no-gutters">
              <div class="col-md-3">
                <router-link
                  to="/update"
                  tag="a"
                  class="icon"
                >+
                </router-link>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <a class="card-title">SUBMIT A LINK</a>
                </div>
              </div>
            </div>
          </div>
          <div class="divider"></div>
        </div>
        <div class="select-box mt-3 mb-3">
          <div class="row">
            <div class="col-md-6">
              <select @change="onChange($event)" v-model="selected">
                <option disabled value="">Order by</option>
                <option value="1">Most Voted (A -> Z)</option>
                <option value="-1">Less Voted (Z -> A)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="list-items" style="z-index: 1;" v-for="(item, productKey) in sortedProducts">

          <div class="card" style="max-width: 540px;position:relative;">
            <i class="fa fa-minus-circle"></i>
            <i class="fas fa-minus-circle"></i>
            <font-awesome-icon
              style="right: -9px;top: -9px;z-index: 9999;display:none;position: absolute;background: #ffffff;border-radius: 50%;font-size: 24px; color: red"
              icon="minus-circle"></font-awesome-icon>
            <div class="row no-gutters">
              <div class="col-md-3">
                <a class="icon">
                  <span class="count">{{item.count}}</span>
                  <span>Points</span>
                </a>
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <div class="title"> {{item.title}}</div>
                  <div class="link mb-3">{{item.link}}</div>

                  <a class="vote" @click="upVote(pageSize * currentPage - pageSize + productKey)">
                    <font-awesome-icon id="vote-up" style="color: #cccccc;font-size:20px;margin-right: 5px"
                                       icon="arrow-up"/>
                    Up Vote</a>

                  <a class="vote ml-5" @click="downVote(pageSize * currentPage - pageSize + productKey)">
                    <font-awesome-icon style="color: #cccccc;font-size:20px;margin-right: 5px;"
                                       icon="arrow-down"/>
                    Down Vote</a>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--     Loop through the pages array to display each page number       -->
    <div class="clearfix btn-group col-md-2 offset-md-5">
      <button type="button" class="btn btn-sm btn-outline-secondary" v-if="currentPage != 1" @click="currentPage--">
        <<
      </button>

      <button type="button" class="btn btn-sm btn-outline-secondary"
              v-for="pageNumber in pageNumbers"
              @click="currentPage = pageNumber">
        {{pageNumber}}
      </button>

      <button type="button" @click="currentPage++" v-if="currentPage < pageNumbers.length"
              class="btn btn-sm btn-outline-secondary"> >>
      </button>
    </div>
  </div>

</template>

<script>
    export default {
        data() {
            return {
                selected: '',
                rate: [],
                products: [],
                sortDirection: 1,
                currentPage: 1,
                pageSize: 5,
                pageNumbers: []
            }
        },
        mounted() {
            if (localStorage.getItem('products') !== null)
                this.products = JSON.parse(localStorage.getItem('products'))

            this.generatePageNumbers();
        },
        computed: {
            paginatedProducts() {
                /*
                const start = this.currentPage * this.pageSize,
                        end = start + this.pageSize;
                * */
                const start = (this.currentPage * this.pageSize) - this.pageSize,
                    end = this.currentPage * this.pageSize;
                return this.products.slice(start, end);
            },
            sortedProducts: function () {
                function compare(a, b) {
                    if (a.count < b.count)
                        return 1;
                    if (a.count > b.count)
                        return -1;
                    return 0;
                }

                this.products.sort(compare)

                if (this.sortDirection !== 1) {
                    this.products.reverse()
                }

                const start = (this.currentPage * this.pageSize) - this.pageSize,
                    end = this.currentPage * this.pageSize;
                return this.products.slice(start, end);
            }
        },
        methods: {
            onChange(event) {
                console.log(event.target.value)
                this.sortDirection = parseInt(event.target.value)
            },
            upVote(productKey) {
                this.products[productKey].count += 1
                localStorage.setItem('products', JSON.stringify(this.products))
            },
            downVote(productKey) {
                this.products[productKey].count -= 1
                localStorage.setItem('products', JSON.stringify(this.products))
            },
            generatePageNumbers() {
                let numberOfPages = Math.ceil(this.products.length / this.pageSize);
                for (let index = 1; index <= numberOfPages; index++) {
                    this.pageNumbers.push(index);
                    //console.log(this.products.length, index)
                }
            }
        }
    }

</script>

<style lang="scss" scoped>

  .list {
    .card {
      .no-gutters {
        background-color: #f1f1f18c;

        .card-title {
          font-size: 30px;

        }

        .icon {
          font-size: 65px;
          font-weight: bolder;
          line-height: 75px;
          border: 2px solid #c8c8c8;
          display: flex;
          justify-content: center;
          border-radius: 5px;
          width: 100px;
          height: 100px;
          margin: 7px;
          color: #515151;
          text-align: center;
          cursor: pointer;
          background-color: #f1f0f0;

          &:hover {
            text-decoration: none;
            color: #000000;
          }
        }
      }

    }

    .divider {
      height: 5px;
      max-width: 540px;
      background-color: #efefef;
    }
  }

  .select-box {
    select {
      border: 1px solid #ddd;
      border-radius: 5px;
      width: 100%;
      height: 37px;
    }
  }

  .list-items {
    .card {
      border: 1px solid #ffffff;

      &:hover {
        border: 1px solid #e9e5e5;
        background: #f2f2f2;
      }

      .icon {
        font-weight: bolder;
        line-height: 75px;
        border: 2px solid #c8c8c8;
        display: inline-block;
        justify-content: center;
        border-radius: 5px;
        width: 100px;
        height: 100px;
        margin: 7px 0 0 7px;
        text-align: center;
        background-color: #f1f0f0;

        .count {
          font-size: 40px;
          display: block;
          height: 31px;
        }
      }

      .card-body {
        padding-top: 5px;

        .title {
          font-size: 20px;
          font-weight: bolder;
        }

        span {
          font-size: 15px;
          font-weight: bolder;
          cursor: pointer;
        }

        .vote {
          cursor: pointer;

          .faArrowUp {
            &:hover {
              color: #000000;
            }
          }
        }
      }
    }
  }


</style>
