const refApp = {
    data() {
        return {
            games:[],
            infoForm: {},
            referees:[],
            infoFormReferees: {},
            assignments:[],
            infoFormAssignments: {}
        }
    },
    computed: {},
    methods: {


        // Game Script
        fetchGameData() {
            fetch('/api/games/index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
        },

        postNewGame(evt) {   
            
            console.log("Posting!", this.infoForm);
    
            fetch('api/games/create.php', {
                method:'POST',
                body: JSON.stringify(this.infoForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.games = json;
                
                // reset the form
                this.resetinfoForm();
              });
        },
        resetinfoForm() {

            this.infoForm = {};
        },

        // Ref Script
        fetchRefData() {
            fetch('/api/referees/index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referees = responseJson;
            })
        },

        postNewRef(evt) {   
            
            console.log("Posting!", this.infoFormReferees);
    
            fetch('api/referees/create.php', {
                method:'POST',
                body: JSON.stringify(this.infoFormReferees),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.referees = json;
                
                // reset the form
                this.resetinfoFormRef();
              });
        },
        resetinfoFormRef() {

            this.infoFormReferees = {};
        },
        
        // Assignment Script
        fetchAssignmentData() {
            fetch('/api/assignments/index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.assignments = responseJson;
            })
        },

        postNewAssignment(evt) {   
            
            console.log("Posting!", this.infoFormAssignments);
    
            fetch('api/assignments/create.php', {
                method:'POST',
                body: JSON.stringify(this.infoFormAssignments),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.assignments = json;
                
                // reset the form
                this.resetinfoFormAssignment();
              });
        },
        resetinfoFormAssignment() {

            this.infoFormAssignments = {};
        },

        // Ref Update & Delete 
        postEditReferee(evt) {
            this.infoFormReferees.rid = this.selectedStudent.id;
            // DONT KNOW WHAT TO DO HERE --> this.infoFormReferees = this.selectedOffer.id;       
            
            console.log("Updating!", this.infoFormReferees);
    
            fetch('api/referees/update.php', {
                method:'POST',
                body: JSON.stringify(this.infoFormReferees),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.referees = json;
                
                this.infoFormReferees();
              });
          },
          postDeleteReferee(o) {
            if (!confirm("Are you sure you want to delete this referee from "+o.companyName+"?")) { // confused here as well
                return;
            }
            
            fetch('api/referees/delete.php', {
                method:'POST',
                body: JSON.stringify(o),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.offers = json;
                
                this.resetinfoFormReferees();
              });
          },
          selectOffer(o) { // confused here as well 
            this.selectedOffer = o;
            this.offerForm = Object.assign({}, this.selectedOffer);
          },
          resetinfoFormReferees() { // think I understand this
            this.selectedOffer = null;
            this.offerForm = {};
          }
        
    },
    created(){
        this.fetchGameData();
        this.fetchRefData();
        this.fetchAssignmentData();
    }

}

Vue.createApp(refApp).mount('#refApp');