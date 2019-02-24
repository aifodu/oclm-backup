<template>
  <v-layout>
    <v-container fluid>
      <v-card class="backup my-3 mx-3">
        <v-fab-transition>
          <v-btn
            v-show="!doneRestoring"
            color="success"
            class="mt-5 mr-2"
            fab
            dark
            absolute
            top
            right
          >
            <v-icon>check</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">
              <v-icon>settings_backup_restore</v-icon>&nbsp;Restore data backup
            </h3>
          </div>
        </v-card-title>
        <v-card-text>
          <form @submit.prevent="restore">
            <div>
              <label @click="clickInput" for="source">
                <v-btn class="mx-0">
                  <v-icon>folder_open</v-icon>&nbsp;
                  Select backup source
                </v-btn>
              </label>
              <input
                type="file"
                name="source"
                id="source"
                hidden
                v-on:change="selectFolder"
                webkitdirectory
                mozdirectory
                msdirectory
                odirectory
                directory
              >
            </div>
            <div class="mt-4 caption" v-if="source">
              <h4 class="text-uppercase">Selected data source</h4>
              <h3 class="mt-2 grey--text">Folder: {{sourceFolder}}</h3>
              <em class="grey--text">{{source}}</em>
            </div>
            <v-text-field
              solo
              class="mt-4"
              label="Solo"
              v-model="target"
              :append-icon="targetExist ? 'check' : 'clear'"
              placeholder="Paste application data location here"
            ></v-text-field>
            <v-progress-linear
              :indeterminate="true"
              background-color="blue-grey"
              color="orange"
              value="30"
              v-if="restoring"
            ></v-progress-linear>
            <v-btn
              large
              color="orange"
              :disabled="!source || !targetExist"
              @click="restore"
              class="mx-0"
            >Start Restore</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
const fs = window.require("fs-extra");

export default {
  data() {
    return {
      source: "",
      target: "",
      sourceFolder: "",
      targetExist: false,
      restoring: false,
      doneRestoring: false
    };
  },
  watch: {
    target: function(value) {
      const self = this;
      fs.pathExists(value, self).then(exists => {
        self.targetExist = exists;
      });
    }
  },
  methods: {
    restore() {
      this.restoring = true;
      const self = this;
      setTimeout(function() {
        console.log("Done restoring");
        self.restoring = false;
      }, 2000);
    },
    clickInput() {
      document.getElementById("source").click();
    },
    selectFolder(event) {
      this.source = event.target.files[0].path;
      this.sourceFolder = event.target.files[0].webkitRelativePath
        .split("/")
        .slice(-1)[0];
    }
  }
};
</script>
