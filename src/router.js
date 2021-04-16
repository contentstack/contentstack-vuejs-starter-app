import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Contact from './views/Contact.vue';
import Blog from './views/Blog.vue';
import BlogPost from './views/BlogPost.vue';
import NotFound from './views/404.vue';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about-us',
    component: About
  },
  {
    path: '/contact-us',
    component: Contact
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
