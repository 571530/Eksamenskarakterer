const request = require('request-promise');
const institusjoner_request = require('./data/institusjoner_request.json');
const studieprogram_request = require('./data/studieprogram_request.json');
const emner_request = require('./data/emner_request.json');

const fs = require('fs');

const url = "https://api.nsd.no/dbhapitjener/Tabeller/hentJSONTabellData";

async function gather_institusjoner() {
    const emner = await gather_emner();
    console.log("Finished with emner");
    const options = {
        method: 'POST',
        uri: url,
        json: true,
        body: institusjoner_request

    }

    try {
        const res = await request(options);
        const insts = await Promise.all(res.map(async inst => ({
            kode: inst['Institusjonskode'],
            navn: inst['Institusjonsnavn'],
            studieprogram: await gather_studieprogram(inst['Institusjonskode'], emner)
        })));
        return insts;
    }
    catch (e) {
        console.log(e);
    }
    return [];
}
async function gather_studieprogram(institusjon, emner) {
    const request_json_text = JSON.stringify(studieprogram_request).replace('###INSTITUSJONSKODE###', institusjon);
    const request_json = JSON.parse(request_json_text);

    const options = {
        method: 'POST',
        uri: url,
        json: true,
        body: request_json
    }

    try {
        const res = await request(options);
        const sps = await Promise.all(res.map(async sp => ({
            kode: sp['Studieprogramkode'],
            navn: sp['Studieprogramnavn'],
            emner: emner
                .filter(emne => emne.inst == institusjon && emne.studiekode == sp['Studieprogramkode'])
                .map(emne => ({
                    kode: emne.kode,
                    navn: emne.navn
                }))
        })));

        return sps.filter(sp => sp.navn && sp.kode);
    }
    catch (e) {
        console.log(e);
    }

    return [];
}

async function gather_emner() {
    const request_json_text = JSON.stringify(emner_request);

    const result = [];

    let last_emne = '';

    for (; ;) {
        request_json = JSON.parse(request_json_text.replace('###EMNEKODE###', last_emne));

        const options = {
            method: 'POST',
            uri: url,
            json: true,
            body: request_json
        }
        try {
            const res = await request(options);
            if (JSON.stringify(res).includes('NOT_FOUND')) {
                break;
            }
            result.push(...res.map(emne => ({
                kode: emne['Emnekode'],
                navn: emne['Emnenavn'],
                studiekode: emne['Studieprogramkode'],
                inst: emne['Institusjonskode']
            })));

            last_emne = result[result.length - 1]['kode'];
            console.log(`Gathered up to ${last_emne}`);
        }
        catch (e) {
            console.log(e);
            break;
        }
    }
    return [...new Set(result.map(r => JSON.stringify(r)))].map(r => JSON.parse(r));
}

async function gather_data() {
    const data = await gather_institusjoner();

    fs.writeFileSync('data/data.json', JSON.stringify(data, null, 2));
}

gather_data();
