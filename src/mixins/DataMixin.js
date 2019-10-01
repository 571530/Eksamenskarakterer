import Data from  '../../data/data.json'

export default { 
    methods: {
        getEmner: function(inst, studie) {
            const studier = this.getStudieprogram(inst);

            if (studie) {
                const sp =  studier.find(sp => sp.kode == studie);
                if (!sp) {
                    return [];
                }
                return sp.emner.map(emne => {
                    const obj = {...emne};
                    obj['studie'] = sp.navn;
                    obj['studiekode'] = sp.kode;
                    obj['institusjon'] = sp.institusjon;
                    obj['institusjonskode'] = sp.institusjonskode;
                    return obj;
                });
            }
            else {
                return studier.reduce((acc, studie) => {
                    return acc.concat(studie.emner.map((emne => {
                        const obj = {...emne};
                        
                        obj['studie'] = studie.navn;
                        obj['studiekode'] = studie.kode;
                        obj['institusjon'] = studie.institusjon;
                        obj['institusjonskode'] = studie.institusjonskode;
                        return obj;
                    })));
                }, []);
            }
        },
        getInstitusjoner: function () {
            return Data.map(inst => ({
                navn: inst['navn'],
                kode: inst['kode']
            }));
        },
        getStudieprogram: function (instkode) {
            if (instkode) {
                const kode = '' + instkode;
                const inst =  Data.find(inst => inst.kode == kode);
                return inst.studieprogram.map(sp => {
                    const obj = {...sp};
                    obj['institusjon'] = inst.navn;
                    obj['institusjonskode'] = inst.kode;
                    return obj;
                });
            }
            else {
                return Data.reduce((acc, inst) => {
                    return acc.concat(inst.studieprogram.map((sp => {
                        const obj = {...sp};
                        obj['institusjon'] = inst.navn;
                        obj['institusjonskode'] = inst.kode;
                        return obj;
                    })));
                }, []);
            }
        }
    }
}