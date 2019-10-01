export default {
    data: () => ({
        chartsLib: null
    }),
    computed: {
        chartOptions: function () {
            if (!this.chartsLib) return null;
            return this.chartsLib.charts.Bar.convertOptions({
                chart: {},
                bars: "vertical", // Required for Material Bar Charts.
                hAxis: {
                    format: "decimal",
                    textStyle: {
                        color: this.$vuetify.theme.dark ? "white" : this.$vuetify.theme.themes.dark.secondary 
                    }
                },
                vAxis: {
                    textStyle: {
                        color: this.$vuetify.theme.dark ? "white" : this.$vuetify.theme.themes.dark.secondary 
                    }
                },
                backgroundColor: this.$vuetify.theme.dark ? this.$vuetify.theme.themes.dark.secondary : "white",
                legend: {
                    textStyle: {
                        color: this.$vuetify.theme.dark ? "white" : this.$vuetify.theme.themes.dark.secondary 
                    }
                }
            });
        }
    },
    methods: {
        onChartReady(chart, google) {
            this.chartsLib = google;
        }
    }
}