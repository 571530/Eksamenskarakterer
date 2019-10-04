import ArrayMixin from './ArrayMixin';

export default {
    mixins: [ArrayMixin],
    data: () => ({
        grades_values: ['F', 'E', 'D', 'C', 'B', 'A']
    }),
    methods: {
        getSemesters(grades) {
            return grades.reduce((acc, el) => {
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
        getGradesForSemesters(semesters) {
            return this.grades.filter(karakter => {
                return semesters.some(semester => {
                    return (
                        semester.aarstall == karakter["Årstall"] &&
                        semester.semester == karakter["Semester"]
                    );
                });
            });
        },
        getFailRatePercentage(grades) {
            const failed = grades
                .filter(grade => grade["Karakter"] == "F" || grade["Karakter"] == "H")
                .reduce((acc, k) => {
                    acc += Number(k["Antall kandidater totalt"]);
                    return acc;
                }, 0);
            const passed = grades
                .filter(grade => grade["Karakter"] != "F" && grade["Karakter"] != "H")
                .reduce((acc, k) => {
                    acc += Number(k["Antall kandidater totalt"]);
                    return acc;
                }, 0);
            if (passed + failed == 0) {
                return 0;
            } else {
                return (failed / (passed + failed)) * 100;
            }
        },
        getCandidates(grades) {
            return grades.reduce((acc, grade) => {
                acc.female += Number(grade["Antall kandidater kvinner"]);
                acc.male += Number(grade["Antall kandidater menn"]);
                acc.total += Number(grade["Antall kandidater totalt"]);
                return acc;
            }, {
                female: 0,
                male: 0,
                total: 0
            });
        },
        groupEmner(grades) {
            const groups = this.groupBy(grades, "Emnekode");
            return groups.map(group => {
                const res = {
                    'emnekode': group.key
                };

                const candidates = this.getCandidates(group.values);
                res['Kvinner'] = candidates.female;
                res['Menn'] = candidates.male;
                res['Total'] = candidates.total;

                const gradeSum = this.getGradeSum(group.values);
                res['Kvinner gjennonsmitt'] = this.grades_values[Math.round(gradeSum.female / candidates.female)] || 'ingen data';
                res['Menn gjennonsmitt'] = this.grades_values[Math.round(gradeSum.male / candidates.male)] || 'ingen data';
                res['Gjennonsmitt'] = this.grades_values[Math.round(gradeSum.total / candidates.total)] || 'ingen data';
            
                res['Strykprosent'] = this.getFailRatePercentage(group.values).toFixed(2);
                return res;
            });
        },
        getGradeSum(grades) {
            return grades.reduce((acc, grade) => {
                let val = this.grades_values.indexOf(grade['Karakter']);
                if (val == -1) {
                    if (grade['Karakter'] == 'H') {
                        val = 0;
                    }
                    else {
                        val = 3; // Pass counts as a C
                    }   
                }

                acc.female += val * Number(grade["Antall kandidater kvinner"]);
                acc.male += val * Number(grade["Antall kandidater menn"]);
                acc.total += val * Number(grade["Antall kandidater totalt"]);
                return acc;
            }, {
                female: 0,
                male: 0,
                total: 0
            });
        }


    }
}