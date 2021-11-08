
const SomeApp = {
    data() {
      return {
        assignments: []
      }
    },
    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        fetchOfferData() {
            fetch('/api/report/assignment_index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.assignments = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        }
    },
    created() {
        this.fetchOfferData();
    }
  }
  
  Vue.createApp(SomeApp).mount('#reportApp');