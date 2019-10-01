export default {
    methods: {
        getSemesters(karakterer) {
            return this.grades.reduce((acc, el) => {
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
        }
    }
}