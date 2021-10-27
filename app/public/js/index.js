const refApp = {
    data() {
        return {
            games:[],
            infoForm: {},
            selectedGame: null,
            referees:[],
            infoFormReferees: {},
            selectedRef: null,
            assignments:[],
            infoFormAssignments: {},
            selectedAssignment: null
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
          postRef(evt) {
            if (this.selectedRef === null) {
                this.postNewRef(evt);
            } else {
                this.postEditReferee(evt);
            }
          },

          // Assignment Update & Delete
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
              
              this.resetinfoFormAssignments();
            });
        },
        postDeleteAssignment(a) {
          if (!confirm("Are you sure you want to delete this referee from "+a.position+"?")) { // confused here as well
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
        postAssignment(evt) {
          if (this.selectedAssignment === null) {
              this.postNewAssignment(evt);
          } else {
              this.postEditAssignment(evt);
          }
        },
        // Games Update & Delete
        postEditGame(evt) {
                
          console.log("Updating!", this.infoForm);
  
          fetch('api/games/update.php', {
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
              
              this.resetinfoForm();
            });
        },
        postDeleteGame(g) {
          if (!confirm("Are you sure you want to delete this referee from "+g.location+"?")) { // confused here as well
              return;
          }
          
          fetch('api/games/delete.php', {
              method:'POST',
              body: JSON.stringify(g),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.games = json;
              
              this.resetinfoForm();
            });
        },
        selectGame(g) { // confused here as well 
          this.selectedGame = g;
          this.infoForm = Object.assign({}, this.selectedGame);
        },
        resetinfoForm() { // think I understand this
          this.selectedGame = null;
          this.infoForm = {};
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