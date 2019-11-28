import Vue from 'vue';
import VueRouter from "vue-router";
import List from "./components/productList/List";
import Update from "./components/productList/Update";

Vue.use(VueRouter);

const routes = [
  {path:'', component: List},
  {path:'/update', component: Update},
  {path:'*', redirect:"/"},
]


export const router = new VueRouter({
  mode: 'history',
  routes
});
