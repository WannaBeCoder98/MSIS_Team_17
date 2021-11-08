
const gameApp = {
    data() {
      return {
        games: []
      }
    },
    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        fetchOfferData() {
            fetch('/api/report/all_games_index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
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
  
  Vue.createApp(gameApp).mount('#reportAppGame_All');
  