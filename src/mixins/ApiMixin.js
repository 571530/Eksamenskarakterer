import KaraktererRequest from '../data/karakterer_request.json'
import DataMixin from './DataMixin'

const API_URL = "https://api.nsd.no/dbhapitjener/Tabeller/hentJSONTabellData";

export default {
    mixins: [DataMixin],
    methods: {
        async getGrades(inst, studie, emne) {
            let strReq = JSON.stringify(KaraktererRequest);
            strReq = strReq
                .replace('###INSTITUSJONSKODE###', inst)
                .replace("###STUDIEPROGRAMKODE###", studie)
                .replace("###EMNEKODE###", emne);
            const req = JSON.parse(strReq);

            try {
                const res = await this.$http.post(API_URL, req);
                if (res.body.some(r => r.status && r.status.antall == 0)) {
                    return [];
                }
                return res.body; 
            }
            catch (e) {
                console.error(e);
                return [];
            }
        },
        async getAllGradesForStudy(inst, studie) {
            const emner = this.getEmner(inst, studie);
            const res = await Promise.all(emner.map(emne => this.getGrades(inst, studie, emne.kode)));
            return res.flat(1);
            
        }
    }
}