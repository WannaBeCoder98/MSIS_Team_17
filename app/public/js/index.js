const refApp = {
    data() {
        return {
            games:[],
            infoForm: {},
            referees:[],
            infoFormReferees: {},
            selectedRef: null,
            assignments:[],
            infoFormAssignments: {},
            selectedAssignment: null,
            selectedGame: null
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
          postDeleteReferee(r) {
            if (!confirm("Are you sure you want to delete this referee from "+r.name+"?")) { // confused here as well
                return;
            }
            
            fetch('api/referees/delete.php', {
                method:'POST',
                body: JSON.stringify(r),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.referees = json;
                
                this.resetinfoFormReferees();
              });
          },
          selectRef(r) { // confused here as well 
            this.selectedRef = r;
            this.infoFormReferees = Object.assign({}, this.selectedRef);
          },
          resetinfoFormReferees() { // think I understand this
            this.selectedRef = null;
            this.infoFormReferees = {};
          },

          // Assignment update & delete
          postEditAssignment(evt) {
                
            console.log("Updating!", this.infoFormAssignments);
    
            fetch('api/assignments/update.php', {
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
                
                this.infoFormAssignments;
              });
          },
          postDeleteAssignment(a) {
            if (!confirm("Are you sure you want to delete this  "+a.aid+"?")) { // confused here as well
                return;
            }
            
            fetch('api/assignments/delete.php', {
                method:'POST',
                body: JSON.stringify(a),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.assignments = json;
                
                this.resetinfoFormAssignments();
              });
          },
          selectAssignment(a) { // confused here as well 
            this.selectedAssignment = a;
            this.infoFormAssignments = Object.assign({}, this.selectedAssignment);
          },
          resetinfoFormAssignments() { // think I understand this
            this.selectedAssignment = null;
            this.infoFormAssignments = {};
          },



          postRef(evt) {
            if (this.selectedRef === null) {
                this.postNewRef(evt);
            } else {
                this.postEditReferee(evt);
            }
          },
          postAssignment(evt) {
            if (this.selectedAssignment === null) {
                this.postNewAssignment(evt);
            } else {
                this.postEditAssignment(evt);
            }
          },
          postGame(evt) {
            if (this.selectedGame === null) {
                this.postNewGame(evt);
            } else {
                this.postEditGame(evt);
            }
          },
        
    },
    created(){
        this.fetchGameData();
        this.fetchRefData();
        this.fetchAssignmentData();
    }

}

Vue.createApp(refApp).mount('#refApp');