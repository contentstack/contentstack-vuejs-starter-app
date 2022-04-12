import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Blog from './views/Blog.vue';
import BlogPost from './views/BlogPost.vue';
import NotFound from './views/404.vue';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/:page',
    component: Home
  },
  {
    path: '/blog',
    component: Blog
  },
  {
    path: '/blog/:slug',
    component: BlogPost
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
