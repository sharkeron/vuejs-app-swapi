<template>
  <div class="page" v-if="this.$route.path !== '/categories'">
    <template v-if="this.$store.state.loadingPage">
      <div class="pre-loader">
        <div class="box1"></div>
        <div class="box2"></div>
        <div class="box3"></div>
        <div class="box4"></div>
        <div class="box5"></div>
      </div>
    </template>

    <template v-if="this.$store.state.route === 'people' && !this.$store.state.loadingPage">
      <div class="page__inner">
        <people v-for="(item, index) in list" :key="index" :item="item" :index="index"/>
      </div>
      <!-- /.page__inner -->
    </template>

    <template v-if="this.$store.state.route === 'planets' && !this.$store.state.loadingPage">
      <div class="page__inner">
        <planets v-for="(item, index) in list" :key="index" :item="item" :index="index"/>
      </div>
      <!-- /.page__inner -->
    </template>

    <template v-if="this.$store.state.route === 'vehicles' && !this.$store.state.loadingPage">
      <div class="page__inner">
        <vehicles v-for="(item, index) in list" :key="index" :item="item" :index="index"/>
      </div>
      <!-- /.page__inner -->
    </template>

    <template v-if="this.$store.state.route === 'starships' && !this.$store.state.loadingPage">
      <div class="page__inner">
        <starships v-for="(item, index) in list" :key="index" :item="item" :index="index"/>
      </div>
      <!-- /.page__inner -->
    </template>

    <pagination/>
  </div>
  <!-- /.page -->
</template>

<script>
import Pagination from '../Pagination/Pagination';
import Starships from '../CategoriesComponent/Starships/Starships';
import Vehicles from '../CategoriesComponent/Vehicles/Vehicles';
import Planets from '../CategoriesComponent/Planets/Planets';
import People from '../CategoriesComponent/People/People';

export default {
  data() {
    return {};
  },
  components: {
    Vehicles,
    pagination: Pagination,
    starships: Starships,
    planets: Planets,
    people: People,
  },
  name: 'page',
  methods: {},
  mounted() {
    this.$store.dispatch('SET_LOADING_PAGE', true);
    this.$store.dispatch('SET_ROUTE', this.$route.params.name);
    this.$store.dispatch('LOAD_LIST');
  },
  computed: {
    list() {
      return this.$store.getters.getItems;
    },
  },
  watch: {
    $route() {
      if (this.$route.params.name === 'people' ||
          this.$route.params.name === 'planets' ||
          this.$route.params.name === 'vehicles' ||
          this.$route.params.name === 'starships') {
        this.$store.dispatch('RESET_PAGE');
        this.$store.dispatch('SET_LOADING_PAGE', true);
        this.$store.dispatch('SET_ROUTE', this.$route.params.name);
        this.$store.dispatch('LOAD_LIST');
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "Page";
</style>
