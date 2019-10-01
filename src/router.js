import VueRouter from 'vue-router'
import Index from '@/components/Index'
import SearchEmner from '@/components/SearchEmner'
import SearchInstitusjoner from '@/components/SearchInstitusjoner'
import SearchStudieprogram from '@/components/SearchStudieprogram'
import SubjectStatistics from '@/components/SubjectStatistics'
import StudyStatistics from '@/components/StudyStatistics'

const routes = [
    { path: '/', component: Index },
    { path: '/emner/search', component: SearchEmner },
    { path: '/institusjoner/search', component: SearchInstitusjoner },
    { path: '/institusjon/:iid', component: SearchStudieprogram },
    { path: '/institusjon/:iid/emner', component: SearchEmner },
    { path: '/institusjon/:iid/:sid', component: SearchEmner },
    { path: '/institusjon/:iid/:sid/statistics', component: StudyStatistics },
    { path: '/institusjon/:iid/:sid/:eid', component: SubjectStatistics },
    { path: '/studieprogram/search', component: SearchStudieprogram },
    
    
]

export default new VueRouter({
    routes
})