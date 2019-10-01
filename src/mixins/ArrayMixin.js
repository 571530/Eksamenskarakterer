export default {
    methods: {
        take: function (arr, n) {
            return arr.slice(0, n);
        },
        skip: function (arr, n) {
            return arr.slice(n, arr.length);
        },
        groupBy: function (xs, key) {
            return xs.reduce(function (rv, x) {
                let v = key instanceof Function ? key(x) : x[key];
                let el = rv.find((r) => r && r.key === v); if (el) { el.values.push(x); } else { rv.push({ key: v, values: [x] }); } return rv;
            }, []);
        }
    }
}