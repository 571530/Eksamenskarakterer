<template>
  <v-container>
    <v-row>
      <v-col lg="6" class="mx-auto">
        <v-card class="mx-auto">
          <v-card-text>
            <p class="display-1 text--primary">Eksamenskarakterer</p>
            <div>Her kan du finne statistikk for eksamensresultater</div>
            <br>
            <div>Data er hentet fra <a href="https://dbh.nsd.uib.no/">https://dbh.nsd.uib.no/</a></div>
          </v-card-text>
        </v-card>
      </v-col>
      
    </v-row>
    <v-row>
      <v-col lg="6" class="mx-auto">
        <v-card class="mx-auto">
          <v-card-text>
            <p class="display-1 text--primary">Anonyme data</p>
            <div>
              Data er anonymisert så 0-3 er rundet ned til 0. Dette fører til at antall kvinner + antall menn ikke alltid er likt som antall totalt
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "index",
  title: 'Eksamenskarakterer',
  components: {},
};
</script>

<style>
</style>
