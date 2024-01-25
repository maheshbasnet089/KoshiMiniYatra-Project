import Vue from "vue";
import VueRouter from "vue-router";

/* Public pages */
import UserLayout from "./components/user/User-Layout.vue";
import UserHome from "../src/components/user/User-Home.vue";
import NotFound from "../src/NotFound.vue";
import Login from "./components/user/User-Login.vue";
import ForgotPassword from "./components/user/ForgotPassword.vue";
import ResetPassword from "./components/user/ResetPassword.vue";

import Register from "./components/user/User-Register.vue";
import jobDetail from "./components/user/Job-Detail.vue";
import PostJob from "./components/user/Post-Job.vue";
import UserProfile from "./components/user/User-Profile.vue";
import UpdateUserProfile from "./components/user/Update-User-Profile.vue";
import AllJob from "./components/user/All-job.vue";
import UserBlogs from "./components/user/User-Blog.vue";
import SingleBlog from "./components/user/Blog-Single.vue";
import ApplyJob from "./components/user/Apply-job.vue";
import Hi from "./components/user/User-hi.vue";
import AddressJobDetail from "./components/user/Address-Job-Card.vue";
import CategoryJobDetail from "./components/user/Category-Job-Card.vue"
import HomeViewVue from "./components/user/Home-View.vue";
import AboutViewVue from "./components/user/About-View.vue";
import ContactViewVue from "./components/user/Contact-View.vue";

//Admin Component
import AdminDashboard from "./components/admin/Admin-Dashboard.vue";
import AdminHome from "./components/admin/Admin-Home.vue";
import AdminNotification from "./components/admin/Admin-Notification.vue";
import AdminProfile from "./components/admin/Admin-Profile.vue";
import AdminBlog from "./components/admin/Admin-Blog.vue";
import AdminBlogEdit from "./components/admin/Admin-BlogEdit.vue";
import AdminBlogList from "./components/admin/Admin-bloglist.vue";

import UserList from "./components/admin/Admin-Userlist.vue";
import JobList from "./components/admin/Admin-Joblist.vue";
import CityList from "./components/admin/Admin-City.vue";
import AdminCity from "./components/admin/Admin-Citylist.vue";
import AdminJob from "./components/admin/Admin-Job.vue";
import AdminCategoryVue from "./components/admin/Admin-CategoryList.vue";
import AdminCategory from "./components/admin/Admin-Category.vue";
import AdminWaitingList from "./components/admin/Admin-WaitingList.vue";
import AdminSalaryList from "./components/admin/Admin-Salarylist.vue";
import AdminSalaryVue from "./components/admin/Admin-Salary.vue";
import AdminContact from "./components/admin/Admin-Contact.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeViewVue,
  },
  {
    path: "/about",
    name: "about",
    component: AboutViewVue,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactViewVue,
  },
  {
    path: "/user/register",
    name: "register",
    component: Register,
  },
  {
    path: "/user/login",
    name: "register",
    component: Login,
  },
  {
    path: "/user/forgot-password",
    name: "forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/user/reset-password",
    name: "reset-password",
    component: ResetPassword,
  },
  //Public Routes
  {
    path: "/",
    name: "home",
    component: UserLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: UserHome,
      },
      {
        path: "/hi",
        name: "hi",
        component: Hi,
      },

      {
        path: "/job-detail/:id",
        name: "jobDetail",
        component: jobDetail,
      },
      {
        path: "/post-job",
        name: "postJob",
        component: PostJob,
      },
      {
        path: "/jobs",
        name: "allJob",
        component: AllJob,
      },
      {
        path: "/addressJobDetail/:id",
        name: "AddressJobDetail",
        component: AddressJobDetail,
      },
      {
        path:"categoryJobDetail/:id",
        name:"CategoryJobDetail",
        component: CategoryJobDetail,
      },
      {
        path: "/profile",
        name: "userProfile",
        component: UserProfile,
      },
      {
        path: "/update-profile",
        name: "update-userProfile",
        component: UpdateUserProfile,
      },
      {
        path: "/blogs",
        name: "userBlog",
        component: UserBlogs,
      },
      {
        path: "/single-blog/:id",
        name: "singleBlog",
        component: SingleBlog,
      },
      {
        path: "/apply-job/:id",
        name: "applyJob",
        component: ApplyJob,
      },
    ],
  },
  {
    path: "/admin",
    component: AdminDashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/admin",
        component: AdminHome,
      },
      {
        path: "/admin-notification",
        component: AdminNotification,
      },
      {
        path: "/admin-city",
        component: CityList,
      },
      {
        path: "/admin-waitinglist",
        component: AdminWaitingList,
      },
      {
        path: "/admin-cityList",
        component: AdminCity,
      },
      {
        path: "/admin-profile",
        component: AdminProfile,
      },
      {
        path: "/admin-blog-add",
        component: AdminBlog,
      },
      {
        path: "/admin-blog",
        component: AdminBlogList,
      },
      {
        path: "/blog-edit/:id",
        component: AdminBlogEdit,
      },
      {
        path: "/admin-userlist",
        component: UserList,
      },
      {
        path: "/admin-joblist",
        component: JobList,
      },
      {
        path: "/admin-job",
        component: AdminJob,
      },
      {
        path: "/admin-categorylist",
        component: AdminCategoryVue,
      },
      {
        path: "/admin-category",
        component: AdminCategory,
      },
      {
        path: "/admin-salarylist",
        component: AdminSalaryList,
      },
      {
        path: "/admin-salary",
        component: AdminSalaryVue,
      },
      {
        path: "/admin-contact",
        component: AdminContact,
      },
    ],
  },
  {
    path: "/:NotFound(.*)*",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
