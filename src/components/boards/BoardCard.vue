<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-card
          :id="divId"
          class="mx-auto"
          :color="color"
          dark
          max-width="400"
          @click="selectBoard"
          v-bind="attrs"
          v-on="on"
        >
          <v-card-title>
            <v-icon
              large
              left
            >
              mdi-developer-board
            </v-icon>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
              {{ title }}
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-row
                align="center"
                justify="space-between"
              >
                <v-col md="8" cols="12">
                  <router-link class="boardLink" :to="boardUrl">
                      <v-icon class="mr-1">
                          mdi-location-enter
                      </v-icon>
                      Open board
                  </router-link>
                </v-col>

                <v-col md="4" cols="12" class="pa-8" v-if="isSelected">
                  <v-icon>
                    mdi-check-bold
                  </v-icon>
                </v-col>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </template>

      <span>
        Created at: <b>{{ createdAt }}</b><br/>
        Updated at: <b>{{ updatedAt }}</b><br/>
      </span>

    </v-tooltip>

  </div>
</template>

<style lang="less">
    a.boardLink {
        text-decoration: none;
        color: #fff !important;
        &:hover {
            font-weight: 500;
        }
    }
</style>

<script>
export default {
  props: ['board'],
  setup() {

  },
  data: () => ({
    colors: [
      '#e33371',
      '#f57c00',
      '#f44336',
      '#115293',
      '#388e3c',
    ],
  }),
  computed: {
    id() {
      // eslint-disable-next-line
      return this.board._id;
    },
    title() {
      return this.board.title;
    },
    createdAt() {
      return this.board.createdAt;
    },
    updatedAt() {
      return this.board.updatedAt;
    },
    color() {
      return this.colors[0 + Math.floor(5 * Math.random())];
    },
    boardUrl() {
      return `/board/${this.id}`;
    },
    divId() {
      return `board-${this.id}`;
    },
    isSelected() {
      return this.$store.getters.selectedBoards.indexOf(this.id) !== -1;
    },
  },
  methods: {
    selectBoard() {
      const { selectedBoards } = this.$store.getters;

      if (selectedBoards.indexOf(this.id) !== -1) {
        this.$store.commit('unselectBoard', this.id);
        return;
      }

      this.$store.commit('selectBoard', this.id);
    },
  },
};
</script>
