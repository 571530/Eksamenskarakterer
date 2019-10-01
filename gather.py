import requests
import json

url="https://api.nsd.no/dbhapitjener/Tabeller/hentJSONTabellData"
headers = {'content-type': 'application/json'}


def gather_institusjoner(emner = []):
    print("Gathering intitusjoner and studieprogram")
    with open("data/institusjoner_request.json", encoding='utf-8') as json_file:
        json_text = json_file.read()
        r1 = requests.post(url, json=json.loads(json_text))
        res_text = r1.content.decode('utf-8')


        res = json.loads(res_text)
        res = [json.loads('{"kode":"' + inst['Institusjonskode'] + '","navn":"' + inst['Institusjonsnavn'] + '","studieprogram":[]}') for inst in res]
        
        for inst in res:
            inst['studieprogram'] = gather_studieprogram(inst['kode'], emner)
            print("Gathered up to {}".format(inst['navn']))

        return res

def gather_studieprogram(institusjon, emner): 
    with open('data/studieprogram_request.json', encoding='utf-8') as json_file:
        json_text = json_file.read()
        data = json_text.replace('###INSTITUSJONSKODE###', institusjon)
        req = requests.post(url, json=json.loads(data))
        res_text = req.content.decode('utf-8')
        if ('NOT_FOUND' in res_text):
            return []
        
        res = json.loads(res_text)
        res = [json.loads('{"kode":"' + sp['Studieprogramkode'] + '","navn":"' + sp['Studieprogramnavn'] + '","emner":[]}') for sp in res]
        for sp in res:
            sp['emner'] = filter(lambda x: x['studiekode'] == sp['kode'] and x['inst'] == institusjon, emner)
            sp['emner'] = [{"kode": emne['kode'], "navn": emne['navn']} for emne  in sp['emner']]
        return res

def gather_emner():
    print("Gathering emner")
    with open('data/emner_request.json', encoding='utf-8') as json_file:
        json_text = json_file.read()

        res = []

        last_emne = ''
        while True:
            data = json_text.replace('###EMNEKODE###', last_emne)
            req = requests.post(url, json=json.loads(data))
            res_text = req.content.decode('utf-8')
            if 'NOT_FOUND' in res_text:
                break
            
            res.extend([{"kode": emne['Emnekode'], "navn": emne['Emnenavn'], "studiekode": emne['Studieprogramkode'], "inst": emne['Institusjonskode']} for emne in json.loads(res_text)])
            last_emne = res[len(res) - 1]['kode']
            print("Gathered up to {}".format(last_emne))  

        res = [json.loads(s) for s in list(set([json.dumps(d) for d in res]))] # removal of duplicates        
        return res


def gather_data():
    emner = gather_emner()
    institusjoner = gather_institusjoner(emner)

    with open('data/data.json', 'w', encoding='utf-8') as output:
        json.dump(institusjoner, output, indent=4)
    print("Results are stored in data/data.json")

if __name__ == '__main__':
    gather_data()