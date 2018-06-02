import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';
import router from '../router/';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    route: '',
    page: 1,
    count: '',
    categoryItems: [],
    loadingPage: false,
    errorMessage: '',
    userAuthorize: false,
    authorizedUserEmail: '',
    authorizedUserId: '',
    loadedData: false,
    favorites: {
      people: {
        title: 'People',
        items: [],
      },
      planets: {
        title: 'Planets',
        items: [],
      },
      vehicles: {
        title: 'Vehicles',
        items: [],
      },
      starships: {
        title: 'Starships',
        items: [],
      },
    },
  },
  mutations: {
    SET_ROUTE: (state, route) => {
      state.route = route;
    },
    SET_LIST_PAGE: (state, { categoryItems, count }) => {
      state.categoryItems = categoryItems;
      state.count = count;
    },
    SET_LOADING_PAGE: (state, value) => {
      state.loadingPage = value;
    },
    PREV_PAGE: (state) => {
      state.page -= 1;
    },
    NEXT_PAGE: (state) => {
      state.page += 1;
    },
    THIS_PAGE_NEXT: (state, page) => {
      state.page = page;
    },
    RESET_PAGE: (state) => {
      state.page = 1;
    },
    AUTO_LOGIN: (state, { user, userId }) => {
      state.userAuthorize = true;

      state.authorizedUserEmail = user;
      state.authorizedUserId = userId;
      router.push('/categories');
      store.dispatch('LOAD_FROM_SERVER');
    },
    SIGN_UP: (state, payload) => {
      store.state.authorizedUserId = payload.userId;
      store.state.favorites = payload.favorites;

      store.dispatch('SAVE_ON_SERVER');
    },
    SIGN_IN: (state, payload) => {
      store.state.authorizedUserId = payload.userId;
      store.state.favorites = payload.favorites;
    },
    SIGN_OUT: (state) => {
      firebase.auth().signOut().then(() => {
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log('error-code', errorCode);
        console.log('error-message', errorMessage);

        state.errorMessage = `Error: ${errorMessage}`;
      });

      state.userAuthorize = false;
      state.favorites = {
        people: {
          title: 'People',
          items: [],
        },
        planets: {
          title: 'Planets',
          items: [],
        },
        vehicles: {
          title: 'Vehicles',
          items: [],
        },
        starships: {
          title: 'Starships',
          items: [],
        },
      };
      state.loadingPage = false;
      state.authorizedUserEmail = '';
      state.authorizedUserId = '';
      router.push('/authorization');
    },
    ADD_ITEM_TO_FAVORITE: (state, { category, itemId, itemName }) => {
      if (state.favorites[category].items !== undefined) {
        state.favorites[category].items.push({ id: itemId, name: itemName });
      } else {
        state.favorites[category].items = [];

        state.favorites[category].items.push({ id: itemId, name: itemName });
      }

      store.dispatch('SAVE_ON_SERVER');
    },
    REMOVE_ITEM_FROM_FAVORITE: (state, { category, itemId }) => {
      const categoryState = state.favorites[category].items;

      for (let i = 0; categoryState.length > i; i += 1) {
        if (categoryState[i].id === itemId) {
          categoryState.splice(i, 1);
        }
      }

      store.dispatch('SAVE_ON_SERVER');
    },
    LOAD_FROM_SERVER: (state, loadedData) => {
      state.loadedData = false;
      state.favorites = loadedData;
      state.loadedData = true;
    },
    SET_ERROR: (state, errorMessage) => {
      state.errorMessage = errorMessage;
    },
    CLEAR_ERROR: (state) => {
      state.errorMessage = '';
    },
  },
  actions: {
    SET_ROUTE: (context, route) => {
      context.commit('SET_ROUTE', route);
    },
    LOAD_LIST: ({ commit }) => {
      Vue.http.get(`${store.getters.getRoute}/?page=${store.getters.getPage}`).then((response) => {
        commit('SET_LIST_PAGE', {
          categoryItems: response.data.results,
          count: response.data.count,
        });

        store.dispatch('SET_LOADING_PAGE', false);
      }, (error) => {
        console.log(error);
      });
    },
    SET_LOADING_PAGE: (context, value) => {
      context.commit('SET_LOADING_PAGE', value);
    },
    PREV_PAGE: (context) => {
      context.commit('PREV_PAGE');
    },
    NEXT_PAGE: (context) => {
      context.commit('NEXT_PAGE');
    },
    THIS_PAGE_NEXT: (context, clickPage) => {
      context.commit('THIS_PAGE_NEXT', clickPage);
    },
    RESET_PAGE: (context) => {
      context.commit('RESET_PAGE');
    },
    AUTO_LOGIN: (context, { user, userId }) => {
      context.commit('AUTO_LOGIN', { user, userId });
    },
    SIGN_UP: (context, { userEmail, userPass }) => {
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
        .then((user) => {
          const newUser = {
            userId: user.uid,
            favorites: {
              people: {
                title: 'People',
                items: [],
              },
              planets: {
                title: 'Planets',
                items: [],
              },
              vehicles: {
                title: 'Vehicles',
                items: [],
              },
              starships: {
                title: 'Starships',
                items: [],
              },
            },
          };

          store.commit('SIGN_UP', newUser);
          store.dispatch('CLEAR_ERROR');
        }, (error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          store.dispatch('SET_ERROR', errorMessage);
          console.log('error-code', errorCode);
          console.log('error-message', errorMessage);
        });
    },
    SIGN_IN: (context, { userEmail, userPass }) => {
      firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
        .then(
          (user) => {
            const newUser = {
              userId: user.uid,
              favorites: {
                people: {
                  title: 'People',
                  items: [],
                },
                planets: {
                  title: 'Planets',
                  items: [],
                },
                vehicles: {
                  title: 'Vehicles',
                  items: [],
                },
                starships: {
                  title: 'Starships',
                  items: [],
                },
              },
            };

            store.commit('SIGN_IN', newUser);
            store.dispatch('CLEAR_ERROR');
          },
        )
        .catch(
          (error) => {
            console.log(error);

            store.dispatch('SET_ERROR', error.message);
          },
        );
    },
    SIGN_OUT: (context) => {
      context.commit('SIGN_OUT');
    },
    ADD_ITEM_TO_FAVORITE: (context, { category, itemId, itemName }) => {
      context.commit('ADD_ITEM_TO_FAVORITE', { category, itemId, itemName });
    },
    REMOVE_ITEM_FROM_FAVORITE: (context, { category, itemId }) => {
      context.commit('REMOVE_ITEM_FROM_FAVORITE', { category, itemId });
    },
    SAVE_ON_SERVER: () => {
      firebase.database().ref(`users/${store.state.authorizedUserId}`).update(store.state.favorites);
    },
    LOAD_FROM_SERVER: () => {
      firebase.database().ref(`users/${store.state.authorizedUserId}`).on('value', (data) => {
        const loadedData = data.val();

        store.commit('LOAD_FROM_SERVER', loadedData);
      });
    },
    SET_ERROR: (context, errorMessage) => {
      store.commit('SET_ERROR', errorMessage);
    },
    CLEAR_ERROR: () => {
      store.commit('CLEAR_ERROR');
    },
  },
  getters: {
    getRoute: state => state.route,
    getCount: state => state.count,
    getPage: state => state.page,
    getItems: state => state.categoryItems,
    getFavoriteCategories: state => state.favorites,
  },
});

export default store;
