
const assignApp = {
    data() {
      return {
        referees: []
      }
    },
    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        fetchOfferData() {
            fetch('/api/report/referees_index.php')
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
  
  Vue.createApp(assignApp).mount('#reportAppREF');
  