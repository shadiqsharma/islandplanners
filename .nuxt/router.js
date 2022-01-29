import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3edb9f22 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _05cd38cd = () => interopDefault(import('../pages/blog-post.vue' /* webpackChunkName: "pages/blog-post" */))
const _90f4fc14 = () => interopDefault(import('../pages/blog-posts.vue' /* webpackChunkName: "pages/blog-posts" */))
const _4caec024 = () => interopDefault(import('../pages/components.vue' /* webpackChunkName: "pages/components" */))
const _0744a502 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _62d0bca2 = () => interopDefault(import('../pages/ecommerce.vue' /* webpackChunkName: "pages/ecommerce" */))
const _4c88a1da = () => interopDefault(import('../pages/index-sample.vue' /* webpackChunkName: "pages/index-sample" */))
const _2277e779 = () => interopDefault(import('../pages/landing.vue' /* webpackChunkName: "pages/landing" */))
const _6c1ca36a = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _61b3dda8 = () => interopDefault(import('../pages/pricing.vue' /* webpackChunkName: "pages/pricing" */))
const _a827635e = () => interopDefault(import('../pages/product.vue' /* webpackChunkName: "pages/product" */))
const _0f6c1e0b = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _80d39688 = () => interopDefault(import('../pages/sections.vue' /* webpackChunkName: "pages/sections" */))
const _7ec3efb4 = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _97b21c1e = () => interopDefault(import('../pages/starter.vue' /* webpackChunkName: "pages/starter" */))
const _004a0b34 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _3edb9f22,
    name: "about"
  }, {
    path: "/blog-post",
    component: _05cd38cd,
    name: "blog-post"
  }, {
    path: "/blog-posts",
    component: _90f4fc14,
    name: "blog-posts"
  }, {
    path: "/components",
    component: _4caec024,
    name: "components"
  }, {
    path: "/contact",
    component: _0744a502,
    name: "contact"
  }, {
    path: "/ecommerce",
    component: _62d0bca2,
    name: "ecommerce"
  }, {
    path: "/index-sample",
    component: _4c88a1da,
    name: "index-sample"
  }, {
    path: "/landing",
    component: _2277e779,
    name: "landing"
  }, {
    path: "/login",
    component: _6c1ca36a,
    name: "login"
  }, {
    path: "/pricing",
    component: _61b3dda8,
    name: "pricing"
  }, {
    path: "/product",
    component: _a827635e,
    name: "product"
  }, {
    path: "/profile",
    component: _0f6c1e0b,
    name: "profile"
  }, {
    path: "/sections",
    component: _80d39688,
    name: "sections"
  }, {
    path: "/signup",
    component: _7ec3efb4,
    name: "signup"
  }, {
    path: "/starter",
    component: _97b21c1e,
    name: "starter"
  }, {
    path: "/",
    component: _004a0b34,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
