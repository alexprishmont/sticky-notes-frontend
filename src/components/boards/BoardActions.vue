<template>
    <div>
      <v-speed-dial
        v-model="fab"
        bottom
        right
        absolute
        direction="left"
        transition="slide-x-transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="blue darken-2" dark fab>
            <v-icon v-if="fab">
              mdi-close
            </v-icon>
            <v-icon v-else>
              mdi-clipboard-edit
            </v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="indigo" @click="creationDialog = true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn v-if="selectedBoards.length" @click="editBoard" fab dark small color="green">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          v-if="selectedBoards.length"
          fab
          dark
          small
          color="red"
          @click="deletionDialog = true"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-speed-dial>

        <v-dialog
        v-model="deletionDialog"
        transition="dialog-bottom-transition"
        scrollable
        max-width="600px"
        persistent
        >
        <v-card>
            <v-card-title>
            <span class="headline">Delete selected boards</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="deletionDialog = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-card-title>
            <v-card-text>
            <v-container>
                <v-row>
                <v-col cols="12" md="12">
                    <p>
                    Are you sure you want to delete selected boards?
                    </p>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="6" md="3">
                    <v-btn outlined color="error" @click="deleteBoards">Delete</v-btn>
                </v-col>
                <v-col cols="6" md="3">
                    <v-btn outlined color="warning" @click="deletionDialog = false">Cancel</v-btn>
                </v-col>
                </v-row>
            </v-container>
            </v-card-text>
        </v-card>
        </v-dialog>

        <v-dialog
        v-model="creationDialog"
        transition="dialog-bottom-transition"
        scrollable
        max-width="600px"
        persistent
        >
        <v-card>
            <v-card-title>
            <span class="headline">Create board</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="creationDialog = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-card-title>
            <v-card-text>
            <v-container>
                <v-form v-model="boardDetails.valid">
                <v-row>
                    <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        v-model="boardDetails.title"
                        label="Board title"
                        :rules="boardTitleRules"
                        required
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                    <v-btn
                        large
                        outlined
                        color="success"
                        @click="createBoard"
                        :disabled="!boardDetails.valid"
                    >
                        Create
                    </v-btn>
                    </v-col>
                </v-row>
                </v-form>
            </v-container>
            </v-card-text>
        </v-card>
        </v-dialog>

        <v-dialog
        v-model="editionDialog"
        transition="dialog-bottom-transition"
        scrollable
        max-width="600px"
        persistent
        >
        <v-card>
            <v-card-title>
            <span class="headline">Edit board ({{ selectedBoards[0] }})</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="editionDialog = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            </v-card-title>
            <v-card-text>
            <v-container>
                <v-form v-model="boardDetails.valid">
                <v-row>
                    <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        v-model="boardDetails.title"
                        label="Board title"
                        :rules="boardTitleRules"
                        required
                    ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                    <v-btn
                        large
                        outlined
                        color="success"
                        @click="saveBoardChanges"
                        :disabled="!boardDetails.valid"
                    >
                        Update
                    </v-btn>
                    </v-col>
                </v-row>
                </v-form>
            </v-container>
            </v-card-text>
        </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      fab: false,
      creationDialog: false,
      deletionDialog: false,
      editionDialog: false,
      boardDetails: {
        valid: false,
        title: '',
      },
      boardTitleRules: [
        (v) => !!v || 'Title is required',
      ],
    };
  },
  computed: {
    selectedBoards() {
      return this.$store.getters.selectedBoards;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    saveBoardChanges() {
      this.$store.dispatch('updateBoard', {
        id: this.selectedBoards[0],
        title: this.boardDetails.title,
      });

      this.$store.commit('loadingStatus', true);
      setTimeout(() => {
        this.$store.dispatch('loadBoards');
        this.creationDialog = false;
        this.boardDetails.title = '';
        this.boardDetails.valid = false;
        this.$store.commit('loadingStatus', false);
      }, 500);
    },
    editBoard() {
      if (this.selectedBoards.length > 1 || this.selectedBoards.length < 1) {
        this.$store.dispatch('setError', 'You cannot edit multiple boards at once.');
        return;
      }

      let title = '';

      this.$store.getters.boards.forEach((board) => {
        // eslint-disable-next-line
        if (board._id === this.selectedBoards[0]) {
          title = board.title;
        }
      });

      this.editionDialog = true;
      this.boardDetails.title = title;
    },
    createBoard() {
      this.$store.dispatch('createBoard', {
        title: this.boardDetails.title,
        // eslint-disable-next-line
        userId: this.user._id,
      });

      this.$store.commit('loadingStatus', true);
      setTimeout(() => {
        this.$store.dispatch('loadBoards');
        this.creationDialog = false;
        this.boardDetails.title = '';
        this.boardDetails.valid = false;
        this.$store.commit('loadingStatus', false);
      }, 500);
    },
    deleteBoards() {
      this.$store.getters.selectedBoards.forEach((board) => {
        this.$store.dispatch('deleteBoard', board);
      });

      this.$store.commit('loadingStatus', true);
      setTimeout(() => {
        this.$store.dispatch('loadBoards');
        this.$store.commit('resetSelectedBoards');
        this.deletionDialog = false;
        this.$store.commit('loadingStatus', false);
      }, 500);
    },
  },
};
</script>
