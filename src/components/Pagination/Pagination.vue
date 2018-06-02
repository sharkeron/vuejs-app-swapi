<template>
  <div class="pagination" v-if="!this.$store.state.loadingPage">
    <button class="pagination__button prev"
            @click="prevPage"
            :disabled="this.minPage === this.$store.state.page">
      &#60;
    </button>
    <!-- /.pagination__button prev -->

    <div class="pagination__list">
      <button class="pagination__list-item"
              v-for="page in pages"
              :key="page"
              @click="thisPageNext(page)"
              :class="{ active:  active === page  }">
        {{page}}
      </button>
      <!-- /.pagination__list-item -->
    </div>
    <!-- /.pagination__list -->

    <button class="pagination__button next"
            @click="nextPage"
            :disabled="this.maxPage === this.$store.state.page">
      &#62;
    </button>
    <!-- /.pagination__button next -->
  </div>
  <!-- /.pagination -->
</template>

<script>
export default {
  name: 'pagination',
  data() {
    return {
      active: 1,
      minPage: 1,
      maxPage: '',
    };
  },
  methods: {
    thisPageNext(page) {
      this.$store.dispatch('THIS_PAGE_NEXT', page);
      this.active = this.$store.state.page;
      this.$store.dispatch('SET_LOADING_PAGE', true);
      this.$store.dispatch('LOAD_LIST');
    },
    prevPage() {
      if (this.$store.state.page !== this.minPage) {
        this.$store.dispatch('PREV_PAGE');
        this.active = this.$store.state.page;
        this.$store.dispatch('SET_LOADING_PAGE', true);
        this.$store.dispatch('LOAD_LIST');
      }
    },
    nextPage() {
      if (this.$store.state.page !== this.maxPage) {
        this.$store.dispatch('NEXT_PAGE');
        this.active = this.$store.state.page;
        this.$store.dispatch('SET_LOADING_PAGE', true);
        this.$store.dispatch('LOAD_LIST');
      }
    },
  },
  computed: {
    pages() {
      const pages = [];
      this.maxPage = Math.round(this.$store.state.count / 10);

      for (let i = 1; this.maxPage >= i; i += 1) {
        pages.push(i);
      }

      return pages;
    },
  },
  watch: {
    $route() {
      this.active = this.$store.state.page;
    },
  },
};
</script>

<style scoped lang="scss">
  @import "Pagination";
</style>
