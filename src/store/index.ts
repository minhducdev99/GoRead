import { IBlog } from "@/types/Blog";
import { createStore } from "vuex";

export const UPDATE_BLOGS_ACTION = 'updateBlogs';

export default createStore({
  state: {
    blogs: [] as IBlog[]
  },
  getters: {
    getBlogs(state) {
      return state.blogs
    }
  },
  mutations: {
    updateBlogs(state, payload: IBlog[]) {
      return state.blogs = payload;
    }
  },
  actions: {
    updateBlogs(context, payload: IBlog[]) {
      context.commit(UPDATE_BLOGS_ACTION, payload);
    }
  },
  // modules: {},
});
