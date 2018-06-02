<template>
  <div class="page__item" :class="{'show': isShow, 'select': isSelect}">
    <div class="page__item-title"
         @click="openCard()">
      {{item.name}}
    </div>
    <!-- /.page__item-title -->

    <div class="page__item-info">
      <div class="page__item-row">
        <div class="left">
          model:
        </div>
        <!-- /.left -->

        <div class="right">
          {{item.model}}
        </div>
        <!-- /.right -->
      </div>
      <!-- /.page__item-row -->

      <div class="page__item-row">
        <div class="left">
          vehicle class:
        </div>
        <!-- /.left -->

        <div class="right">
          {{item.vehicle_class}}
        </div>
        <!-- /.right -->
      </div>
      <!-- /.page__item-row -->

      <div class="page__item-row">
        <div class="left">
          crew:
        </div>
        <!-- /.left -->

        <div class="right">
          {{item.crew}}
        </div>
        <!-- /.right -->
      </div>
      <!-- /.page__item-row -->

      <div class="page__item-row">
        <div class="left">
          passengers:
        </div>
        <!-- /.left -->

        <div class="right">
          {{item.passengers}}
        </div>
        <!-- /.right -->
      </div>
      <!-- /.page__item-row -->

      <div class="page__item-row">
        <div class="left">
          length:
        </div>
        <!-- /.left -->

        <div class="right">
          {{item.length}}
        </div>
        <!-- /.right -->
      </div>
      <!-- /.page__item-row -->

      <div class="page__item-row">
        <div class="left">
          cargo capacity:
        </div>
        <!-- /.left -->

        <div class="right">
          {{item.cargo_capacity}}
        </div>
        <!-- /.right -->
      </div>
      <!-- /.page__item-row -->

      <div class="page__item-row">
        <div class="left">
          cost:
        </div>
        <!-- /.left -->

        <div class="right">
          {{item.cost_in_credits}}
        </div>
        <!-- /.right -->
      </div>
      <!-- /.page__item-row -->

      <div class="page__buttons">
        <button class="page__add-item"
                @click="favoriteActions()">
          <font-awesome-icon :icon="fullStarIcon" v-if="isSelect"/>
          <font-awesome-icon :icon="emptyStarIcon" v-else/>
        </button>
        <!-- /.page__add-item -->

        <button class="page__return"
                @click="closeCard()">
          Return
        </button>
        <!-- /.page__return -->
      </div>
      <!-- /.page__buttons -->
    </div>
    <!-- /.page__item-info -->
  </div>
  <!-- /.page__item -->
</template>

<script>
import { mapGetters } from 'vuex';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faStarFull from '@fortawesome/fontawesome-free-solid/faStar';
import faStarEmpty from '@fortawesome/fontawesome-free-regular/faStar';

export default {
  props: ['item', 'index'],
  name: 'vehicles',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      name: this.item.name,
      isShow: false,
      isSelect: false,
    };
  },
  computed: {
    ...mapGetters([
      'getPage',
    ]),
    thisID() {
      return ((this.getPage - 1) * 10) + (this.index + 1);
    },
    fullStarIcon() {
      return faStarFull;
    },
    emptyStarIcon() {
      return faStarEmpty;
    },
  },
  methods: {
    openCard() {
      this.isShow = true;
    },
    closeCard() {
      this.isShow = false;
    },
    favoriteActions() {
      if (!this.isSelect) {
        this.$store.dispatch('ADD_ITEM_TO_FAVORITE', {
          category: 'vehicles',
          itemId: this.thisID,
          itemName: this.name,
        });
      } else {
        this.$store.dispatch('REMOVE_ITEM_FROM_FAVORITE', {
          category: 'vehicles',
          itemId: this.thisID,
        });
      }
      this.isSelect = !this.isSelect;
    },
    isFavoriteItem() {
      const items = this.$store.state.favorites.vehicles.items;

      if (items !== undefined) {
        for (let i = 0; items.length > i; i += 1) {
          if (items[i].id === this.thisID) {
            this.isSelect = true;
          }
        }
      }
    },
  },
  mounted() {
    this.isFavoriteItem();
  },
};
</script>

<style scoped lang="scss">
  @import "Vehicles";
</style>
