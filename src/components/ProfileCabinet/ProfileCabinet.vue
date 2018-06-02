<template>
  <div class="container">
    <div class="cabinet__email">
      <span>User Email: {{$store.state.authorizedUserEmail.email}}</span>
    </div>
    <!-- /.cabinet__email -->

    <div class="cabinet__count">
      You choose: {{countOfChoosen}} {{favoritesWord}}
    </div>
    <!-- /.cabinet__count -->

    <div class="cabinet__title">
      {{checkSelectedItems}}
    </div>
    <!-- /.cabinet__title -->

    <div class="cabinet__list"
         v-if="this.$store.state.loadedData === true">
      <div class="cabinet__category-item"
           v-for="category in categoryList"
           :key="category.title"
           v-if="category.items !== undefined && category.items.length > 0">
           <!--:key="index"-->
        <div class="cabinet__category-title">
          {{category.title}}
        </div>
        <!-- /.cabinet__category-title -->

        <div class="cabinet__category-list">
          <div class="cabinet__item" v-for="item in category.items" :key="item.id">
            <!--<div class="id">-->
            <!--{{item.id}}-->
            <!--</div>-->

            <div class="name">
              {{item.name}}
            </div>

            <button class="remove"
                    @click.prevent="removeItem(category, item.id)">
              <font-awesome-icon :icon="trashIcon"/>
            </button>
          </div>
          <!-- /.cabinet__item -->
        </div>
        <!-- /.cabinet__category-list -->
      </div>
      <!-- /.cabinet__category-item -->
    </div>
    <!-- /.cabinet__list -->
  </div>
  <!-- /.container -->
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faTrash from '@fortawesome/fontawesome-free-regular/faTrashAlt';

export default {
  name: 'profile-cabinet',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
    };
  },
  computed: {
    categoryList() {
      return this.$store.getters.getFavoriteCategories;
    },
    countOfChoosen() {
      let count = 0;
      let item;

      for (item in this.categoryList) {
        if (this.categoryList[item].items !== undefined) {
          count += this.categoryList[item].items.length;
        }
      }

      return count;
    },
    favoritesWord() {
      if (this.countOfChoosen > 1) {
        return 'items';
      }
      return 'item';
    },
    trashIcon() {
      return faTrash;
    },
    checkSelectedItems() {
      if (
        (this.categoryList.people.items !== undefined &&
            this.categoryList.people.items.length > 0) ||
          (this.categoryList.planets.items !== undefined &&
            this.categoryList.planets.items.length > 0) ||
          (this.categoryList.vehicles.items !== undefined &&
            this.categoryList.vehicles.items.length > 0) ||
          (this.categoryList.starships.items !== undefined &&
            this.categoryList.starships.items.length > 0)
      ) {
        return 'Your favorites';
      }
      return 'Choose favorites items in categories';
    },
  },
  methods: {
    removeItem(categoryItem, itemId) {
      const category = categoryItem.title.toLowerCase();

      this.$store.dispatch('REMOVE_ITEM_FROM_FAVORITE', {
        category,
        itemId,
      });
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
@import "ProfileCabinet";
</style>
