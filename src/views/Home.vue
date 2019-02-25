<template>
  <v-layout>
    <v-container fluid>
      <v-card class="backup my-3 mx-3">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">
              <v-icon>info</v-icon>&nbsp;Backup application data
            </h3>
          </div>
        </v-card-title>
        <v-card-text>
          <p>
            <strong>
              This backup utility is designed to accompany the
              <em>OCLM Assignment</em> application.
            </strong>
          </p>
          <p>To backup successfully, OCLM Assignment must be closed. This utility will attempt to close it if you have not done so already.</p>
          <v-divider class="my-3" light></v-divider>
          <div>
            <h3>How to backup</h3>
            <ul class="howto">
              <li>Copy out the application data location from OLCM Assignment</li>
              <li>Paste in the application data location</li>
              <li>Select a location you want to backup to</li>
              <li>Click the START BACKUP button</li>
              <li>Once backup is complete, a green checkmark would indicate</li>
            </ul>
          </div>
          <v-divider class="mt-4 mb-3" light></v-divider>
          <div>
            <h3>How to restore backup</h3>
            <ul class="howto">
              <li>Copy out the application data location from OLCM Assignment</li>
              <li>Select a location you want to restore from</li>
              <li>Paste in the application data location</li>
              <li>Click the START RESTORE button</li>
              <li>Once restore is complete, a green checkmark would indicate</li>
            </ul>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </v-layout>
</template>

<style scoped>
.howto {
  padding-left: 18px;
  margin-top: 0.5em;
}
.howto li {
  margin: 0.4em 0;
}
</style>
