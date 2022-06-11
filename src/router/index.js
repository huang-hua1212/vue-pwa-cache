import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/session-login-test',
    name: 'sessionLoginTest',
    component: () => import(/* webpackChunkName: "about" */ '../views/test/sessionLoginTest.vue'),
  },
  {
    path: '/',
    name: 'Page1',
    component: () => import(/* webpackChunkName: "about" */ '../views/Page1.vue'),
    children: [
      {
        path: 'create-post',
        name: 'CreatePost',
        component: () => import('@/components/CreatePost.vue'),
      },
      {
        path: 'posts',
        name: 'Posts',
        component: () => import('@/components/Posts.vue'),
      },
      {
        path: 'posts-with-comments',
        name: 'PostsWithComments',
        component: () => import('@/components/PostsWithComments.vue'),
      },
      {
        path: 'followers-list',
        name: 'FollowersList',
        component: () => import('@/components/FollowersList.vue'),
      },
      {
        path: 'modify-personal-profile',
        name: 'ModifyPersonalProfile',
        component: () => import('@/components/ModifyPersonalProfile.vue'),
      },
      {
        path: 'likes-list',
        name: 'LikesList',
        component: () => import('@/components/LikesList.vue'),
      },
      {
        path: 'personal-wall/:id',
        name: 'personalWall',
        component: () => import('@/components/MyPersonalWall.vue'),
      },
      {
        path: 'post/:id',
        name: 'SinglePost',
        component: () => import('@/components/Post.vue'),
      },
    ],
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
