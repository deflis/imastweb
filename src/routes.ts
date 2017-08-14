import { RouteConfig } from 'vue-router'

import Login from "./components/login.vue";

import LoginCallBack from "./components/login.callback.vue";
import HomeTimeline from "./components/home_timeline.vue";
import LocalTimeline from "./components/local_timeline.vue";
import DummyTimeline from "./components/dummy_timeline.vue";

const routes: RouteConfig[] = [
  { path: '/login', component: Login },
  { path: '/login/callback', component: LoginCallBack },
  { path: '/home', component: HomeTimeline},
  { path: '/local', component: LocalTimeline},
  { path: '/dummy', component: DummyTimeline},
]

export default routes