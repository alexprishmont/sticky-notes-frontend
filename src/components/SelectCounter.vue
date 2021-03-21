<template>
    <v-row v-if="selected.length">
        <v-col class="help-text" cols="6" md="12">
            <v-icon>
                mdi-check-bold
            </v-icon>
            Selected: {{ selected.length }}
        </v-col>
    </v-row>
</template>

<script>
export default {
  props: ['selected'],
};
</script>
