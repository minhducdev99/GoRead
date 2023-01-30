import { IBlog } from "@/types/Blog";
import { ICategory } from "@/types/Category";
import { createStore } from "vuex";

export const UPDATE_BLOGS_ACTION = 'updateBlogs';
export const UPDATE_CATEGORIES_ACTION = 'updateCategories';

export default createStore({
  state: {
    blogs: [] as IBlog[],
    categories: [] as ICategory[]
  },
  getters: {
    getBlogs(state) {
      return state.blogs
    },
    getCategories(state) {
      return state.categories
    }
  },
  mutations: {
    updateBlogs(state, payload: IBlog[]) {
      return state.blogs = payload;
    },
    updateCategories(state, payload: ICategory[]) {
      return state.categories = payload;
    }
  },
  actions: {
    updateBlogs(context, payload: IBlog[]) {
      context.commit('updateBlogs', payload);
    },
    updateCategories(context, payload: ICategory[]) {
      context.commit('updateCategories', payload);
    }
  },
  // modules: {},
});
