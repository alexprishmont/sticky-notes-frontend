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
        <v-btn v-if="selectedNotes.length" fab dark small color="green" @click="editNote">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          v-if="selectedNotes.length"
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
      v-model="creationDialog"
      transition="dialog-bottom-transition"
      scrollable
      max-width="600px"
      persistent
    >
      <v-card>
        <v-card-title>
          <span class="headline">Create note</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="creationDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="notesDetails.valid">
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="notesDetails.title"
                    label="Note title"
                    :rules="noteTitleRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    v-model="notesDetails.body"
                    label="Note body"
                    :rules="noteBodyRules"
                    required
                    auto-grow
                    no-resize
                    counter="80"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-checkbox
                    v-model="notesDetails.isFeatured"
                    label="Is featured?"
                    color="orange"
                    value="true"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-btn
                    large
                    outlined
                    color="success"
                    @click="createNote"
                    :disabled="!notesDetails.valid"
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
          <span class="headline">Edit note ({{ selectedNotes[0] }})</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="editionDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-model="notesDetails.valid">
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="notesDetails.title"
                    label="Note title"
                    :rules="noteTitleRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    v-model="notesDetails.body"
                    label="Note body"
                    :rules="noteBodyRules"
                    required
                    auto-grow
                    no-resize
                    counter="80"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-checkbox
                    v-model="notesDetails.isFeatured"
                    label="Is featured?"
                    color="orange"
                    value="true"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-btn
                    large
                    outlined
                    color="success"
                    @click="saveNoteChanges"
                    :disabled="!notesDetails.valid"
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
    <v-dialog
      v-model="deletionDialog"
      transition="dialog-bottom-transition"
      scrollable
      max-width="600px"
      persistent
    >
      <v-card>
        <v-card-title>
          <span class="headline">Delete selected notes</span>
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
                  Are you sure you want to delete selected notes?
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" md="3">
                <v-btn outlined color="error" @click="deleteNotes">Delete</v-btn>
              </v-col>
              <v-col cols="6" md="3">
                <v-btn outlined color="warning" @click="deletionDialog = false">Cancel</v-btn>
              </v-col>
            </v-row>
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
      noteTitleRules: [
        (v) => !!v || 'Title is required',
        (v) => v.length < 25 || 'Title should be less than 25 symbols',
      ],
      noteBodyRules: [
        (v) => !!v || 'Body is required',
        (v) => v.length < 80 || 'Body should be less than 80 symbols',
      ],
      notesDetails: {
        valid: false,
        title: '',
        body: '',
        isFeatured: false,
      },
    };
  },
  computed: {
    selectedNotes() {
      return this.$store.getters.selectedNotes;
    },
  },
  methods: {
    deleteNotes() {
      this.$store.commit('loadingStatus', true);
      this.$store.getters.selectedNotes.forEach((note) => {
        this.$store.dispatch('deleteNote', note);
      });

      setTimeout(() => {
        this.$store.dispatch('loadNotes', this.$route.params.id);
        this.$store.commit('resetSelectedNotes');
        this.notesDetails = {
          valid: false,
          title: '',
          body: '',
        };
        this.$store.commit('loadingStatus', false);
      }, 500);
    },
    saveNoteChanges() {
      this.$store.commit('loadingStatus', true);
      this.$store.dispatch('updateNote', {
        id: this.selectedNotes[0],
        title: this.notesDetails.title,
        body: this.notesDetails.body,
        isFeatured: this.notesDetails.isFeatured === 'true',
      });

      setTimeout(() => {
        this.$store.dispatch('loadNotes', this.$route.params.id);
        this.notesDetails = {
          valid: false,
          title: '',
          body: '',
        };
        this.$store.commit('resetSelectedNotes');
        this.$store.commit('loadingStatus', false);
      }, 500);
    },
    editNote() {
      if (this.selectedNotes.length > 1 || this.selectedNotes.length < 1) {
        this.$store.dispatch('setError', 'You cannot edit multiple notes at once.');
        return;
      }

      let title;
      let body;

      this.$store.getters.notes.forEach((note) => {
        // eslint-disable-next-line
        if (note._id === this.selectedNotes[0]) {
          title = note.title;
          body = note.body;
        }
      });

      this.editionDialog = true;
      this.notesDetails.title = title;
      this.notesDetails.body = body;
    },
    createNote() {
      this.$store.commit('loadingStatus', true);
      this.$store.dispatch('createNote', {
        title: this.notesDetails.title,
        body: this.notesDetails.body,
        // eslint-disable-next-line
        userId: this.$store.getters.user._id,
        boardId: this.$route.params.id,
        isFeatured: this.notesDetails.isFeatured === 'true',
      });

      setTimeout(() => {
        this.$store.dispatch('loadNotes', this.$route.params.id);
        this.notesDetails = {
          valid: false,
          title: '',
          body: '',
        };
        this.$store.commit('resetSelectedNotes');
        this.$store.commit('loadingStatus', false);
      }, 500);
    },
  },
};
</script>
