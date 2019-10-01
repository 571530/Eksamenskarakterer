export default {
    data: () => ({
        chartsLib: null
    }),
    computed: {
        chartOptions: function () {
            if (!this.chartsLib) return null;
            return this.chartsLib.charts.Bar.convertOptions({
                chart: {},
                backgroundColor: this.$vuetify.theme.dark ? this.$vuetify.theme.themes.dark.secondary : "white",
                legend: {
                    textStyle: {
                        color: this.$vuetify.theme.dark ? "white" : this.$vuetify.theme.themes.dark.secondary
                    }
                },
                pieSliceBorderColor: this.$vuetify.theme.dark ? this.$vuetify.theme.themes.dark.secondary : "white"
            });
    }
},
methods: {
    onChartReady(chart, google) {
        this.chartsLib = google;
    }
}
}