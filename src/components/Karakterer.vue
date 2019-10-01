<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col sm="6">
        <v-card>
          <v-card-actions>
            <v-select v-if="valid"
              v-model="chosenSemestere"
              :items="semestere"
              :item-text="itemText"
              :item-value="item => item"
              :menu-props="{ maxHeight: '400' }"
              label="Semestere"
              multiple
              hint="Velg semestere"
              persistent-hint
            ></v-select>
            <div class="title text-center">Fant ingen karakterer for emnet</div>
          </v-card-actions> 
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" v-if="valid">
      <v-col>
        <KaraktererGraph
          v-if="chosenSemestere.length > 0"
          :karakterer="getKaraktererForSemestere(chosenSemestere)"
        ></KaraktererGraph>
        <div v-else class="title text-center">Velg noen semestere for å se statistikk</div>
      </v-col>
    </v-row>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>
<script>
import ApiMixin from "../mixins/ApiMixin"

export default {
  data: () => {
    return {
      loading: true,
      karakterer: [],
      semestere: [],
      chosenSemestere: []
    };
  },
  mounted: async function() {
    const inst = this.$route.params.iid;
    const studie = this.$route.params.sid;
    const emne = this.$route.params.eid;
    if (inst && studie && emne) {
      this.karakterer = await this.getKarakterer(inst, studie, emne);
      this.semestere = this.getSemestere(this.karakterer);
      this.loading = false;
    }
  },
  components: {
    KaraktererGraph
  },
  computed: {
    valid() {
      return this.semestere.some(s => s.aarstall && s.semesternavn);
    }
  },
  methods: {
    getSemestere(karakterer) {
      return this.karakterer.reduce((acc, el) => {
        if (
          !acc.find(
            e => e.semester == el["Semester"] && e.aarstall == el["Årstall"]
          )
        ) {
          return acc.concat([
            {
              aarstall: el["Årstall"],
              semester: el["Semester"],
              semesternavn: el["Semesternavn"]
            }
          ]);
        }
        return acc;
      }, []);
    },
    getKaraktererForSemestere(semestere) {
      return this.karakterer.filter(karakter => {
        return semestere.some(semester => {
          return (
            semester.aarstall == karakter["Årstall"] &&
            semester.semester == karakter["Semester"]
          );
        });
      });
    },
    itemText: item => item.semesternavn + " " + item.aarstall
  },
  mixins: [ApiMixin]
};
</script>
<style scoped>
.semester {
  padding: 5px;
  border: 1px solid black;
  margin: 3px;
}
</style>
