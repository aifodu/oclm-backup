<template>
  <v-layout>
    <v-container fluid>
      <v-card class="backup my-3 mx-3">
        <v-fab-transition>
          <v-btn
            v-show="doneBackingUp"
            color="success"
            class="mt-5 mr-2"
            @click="reset"
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
              <v-icon>cloud_upload</v-icon>&nbsp;Backup application data
            </h3>
          </div>
        </v-card-title>
        <v-card-text>
          <form @submit.prevent="backup">
            <v-text-field
              solo
              v-model="source"
              label="Application data location"
              :disabled="doneBackingUp"
              :append-icon="sourceExist ? 'check' : 'error_outline'"
              placeholder="Paste application data location here"
            ></v-text-field>
            <div>
              <label @click="clickInput" for="source">
                <v-btn :disabled="doneBackingUp" class="mx-0">
                  <v-icon>folder_open</v-icon>&nbsp;
                  Select backup location
                </v-btn>
              </label>
              <input
                type="file"
                name="target"
                id="target"
                hidden
                v-on:change="selectFolder"
                webkitdirectory
                mozdirectory
                msdirectory
                odirectory
                directory
              >
            </div>
            <div class="mt-4 caption" v-if="target">
              <h4 class="text-uppercase">Selected backup location</h4>
              <h3 class="mt-2 grey--text">Folder: {{targetFolder}}</h3>
              <em class="grey--text">{{target}}</em>
            </div>
            <v-progress-linear
              :indeterminate="true"
              background-color="blue-grey"
              color="blue lighten-2"
              value="30"
              height="5"
              v-if="backingUp"
            ></v-progress-linear>
            <v-btn
              large
              color="blue lighten-2"
              :disabled="!target || !sourceExist || doneBackingUp"
              @click="backup"
              class="mx-0 mt-4"
            >Start backup</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
const fs = window.require("fs-extra");
// const utils = window.require("./utilities/olcm");

export default {
  data() {
    return {
      source: "",
      target: "",
      targetFolder: "",
      sourceExist: false,
      backingUp: false,
      doneBackingUp: false
    };
  },
  watch: {
    source: function(value) {
      const self = this;
      fs.pathExists(value, self).then(exists => {
        self.sourceExist = exists;
      });
    }
  },
  methods: {
    backup() {
      this.$electron.remote
        .require("./utilities")
        .EnsureAppClosed()
        .then(() => {
          this.backingUp = true;
          fs.copy(this.source, this.target)
            .then(() => {
              this.backingUp = false;
              this.doneBackingUp = true;
            })
            .catch(error => {
              console.error(error);
            });
        });
    },
    clickInput() {
      document.getElementById("target").click();
    },
    selectFolder(event) {
      this.target = event.target.files[0].path;
      this.targetFolder = event.target.files[0].webkitRelativePath
        .split("/")
        .slice(-1)[0];
    },
    reset() {
      this.source = "";
      this.target = "";
      this.targetFolder = "";
      this.sourceExist = false;
      this.backingUp = false;
      this.doneBackingUp = false;
    }
  }
};
</script>
