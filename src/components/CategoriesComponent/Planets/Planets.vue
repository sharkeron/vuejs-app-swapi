<template>
  <div class="page__item" :class="{'show': isShow, 'select': isSelect}">
    <div class="page__item-title" @click="openCard()">
      {{item.name}}
    </div>
    <!-- /.page__item-title -->

    <div class="page__item-info">
      <div class="page__item-row">
        <div class="left">
          climate:
        </div>
        <!-- /.left -->

        <div class="right">
          {{item.climate}}
        </div>
        <!-- /.right -->
      </div>
      <!-- /.page__item-row -->

      <div class="page__item-row">
        <div class="left">
          population:
        </div>
        <!-- /.left -->

        <div class="right">
          {{item.population}}
        </div>
        <!-- /.right -->
      </div>
      <!-- /.page__item-row -->

      <div class="page__item-row">
        <div class="left">
          diameter:
        </div>
        <!-- /.left -->

        <div class="right">
          {{item.diameter}}
        </div>
        <!-- /.right -->
      </div>
      <!-- /.page__item-row -->

      <div class="page__item-row">
        <div class="left">
          orbital period
        </div>
        <!-- /.left -->

        <div class="right">
          {{item.orbital_period}}
        </div>
        <!-- /.right -->
      </div>
      <!-- /.page__item-row -->

      <div class="page__item-row">
        <div class="left">
          day period:
        </div>
        <!-- /.left -->

        <div class="right">
          {{item.rotation_period}}
        </div>
        <!-- /.right -->
      </div>
      <!-- /.page__item-row -->

      <div class="page__buttons">
        <button class="page__add-item" @click="favoriteActions()">
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
  name: 'planets',
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
          category: 'planets',
          itemId: this.thisID,
          itemName: this.name,
        });
      } else {
        this.$store.dispatch('REMOVE_ITEM_FROM_FAVORITE', {
          category: 'planets',
          itemId: this.thisID,
        });
      }
      this.isSelect = !this.isSelect;
    },
    isFavoriteItem() {
      const items = this.$store.state.favorites.planets.items;

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
@import "Planets";
</style>
