document.addEventListener("alpine:init", () => {
    Alpine.data("whichSlope", () => {
        return {
            version: "api-1.0",

            users_data: [],
            theemail: "",
            email: "",
            first_name: "",
            last_name: "",
            occupation: "",
            numbers: "",
            addresss: "",
            password_hash: "",
            brief: "",
            message: "",
            comment: "",
            depth: 0,
            strain: 0,
            moisture: 0,
            plastic: 0,
            liquid: 0,
            index: 0,
            output: 0,
            auth: false,

            saveAndSubmit() {
                axios
                    .post("http://127.0.0.1:5000/predict", {
                        data: [
                            [
                                parseFloat(this.depth),
                                parseFloat(this.strain),
                                parseInt(this.moisture),
                                parseInt(this.plastic),
                                parseInt(this.liquid),
                                parseInt(this.index),
                            ],
                        ],
                    })
                    .then((result) => {
                        this.output = result.data.output;
                        console.log(output);
                    })
                    .catch((error) => {
                        console.error("An error occurred:", error);
                    });
            },

            init() {
                const currentUser = localStorage.getItem('user');
                const user = JSON.parse(currentUser);
                if(user) { 
                    this.auth = true;
                } else {
                    console.log('Please login');
                    // window.location.href = "./results.html";
                   const userEmail = prompt('Email');
                   const userPassword = prompt('Password');
                   axios.post("/api/details/login",{
                    email: userEmail,
                    password_hash: userPassword,
                   }).then(res=>{
                    if (res.data.status === "Log-in-successful") {
                        this.first_name = res.data.loginResult.first_name;
                        this.first_name = res.data.loginResult.first_name;
                        
                        localStorage.setItem('user',JSON.stringify(
                            {
                                email: userEmail,
                                password_hash: userPassword,
                            }
                        ))
                    }
                   })
            

                }
                
                return axios.get("/api/details").then((result) => {
                    this.users_data = result.data.users_info;
                });
            },
      
            inside () {
        
                       
                axios 
                .get('/api/details')
                .then((result)=>{
                    this.users_data = result.data.users_info
                    console.log(this.users_data)
                })},
            // async login() {
            //     try {
            //         const response = await axios.post("/api/details/login", {
            //             email: this.email,
            //             password_hash: this.password_hash,
            //         }) 
            //         this.email = response.data.email;
            //     this.first_name = response.data.first_name; // Again, reconsider sending and displaying this.
            //     this.occupation = response.data.occupation;
            //     this.last_name = response.data.last_name;
            //         console.log (response.data)
            //         if (response.data.status === "Log-in-successful") {
            //             alert("Login successful");
            //             localStorage.setItem('user',JSON.stringify(
            //                 {
            //                     email: this.email,
            //                     password_hash: this.password_hash,
            //                 }
            //             ))
            //             window.location.href = "./home-page.html";
            //         } else if (response.data.status === "Login-failed") {
            //             alert("Login failed. Please check your credentials.");
            //         }
            //     } catch (error) {
            //         console.error("An error occurred:", error);
            //         // Handle errors here, e.g., display an error message to the user.
            //     }
            // },
            async login() {
                try {
                    const response = await axios.post("/api/details/login", {
                        email: this.email,
                        password_hash: this.password_hash,
                    })

                    const { status, loginResult } = response.data
                    const user = loginResult[0]
                    this.email = user["email"];
                    this.first_name = user["first_name"]; // Again, reconsider sending and displaying this.
                    this.occupation = user["occupation"];
                    this.last_name = user["last_name"];
                    console.log(this.email, this.first_name, this.last_name, this.occupation);
                  
                    if (status === "Log-in-successful") {
                        console.log(user)
                        alert("Login successful");
                        localStorage.setItem('user', JSON.stringify(
                            {
                                email: this.email,
                                password_hash: this.password_hash,
                            }
                        ))
                        window.location.href = "./home-page.html";
                    } else if (response.data.status === "Login-failed") {
                        alert("Login failed. Please check your credentials.");
                    }
                } catch (error) {
                    console.error("An error occurred:", error);
                    // Handle errors here, e.g., display an error message to the user.
                }
            },

            // login() {
            //     axios.post('/api/details/login', {
            //         email: this.email,
            //         password_hash: this.password_hash,
            //     })
            //         .then((result) => {
            //             // console.log(result.data); // Log the response data for debugging
            //             if (result.data.status === 'Log-in-successful') {
            //                 alert('Login successful');

            //                 window.location.href = './home-page.html';
            //             } else if (result.data.status === 'Login-failed') {
            //                 alert('Login failed. Please check your credentials.');
            //             }

            //         })
            //         .catch((error) => {
            //             console.error('An error occurred:', error);
            //         });
            // },
            
            

            addUser() {
                axios
                    .post("/api/details/create", {
                        email: this.email,
                        first_name: this.first_name,
                        last_name: this.last_name,
                        occupation: this.occupation,
                        numbers: this.numbers,
                        addresss: this.addresss,
                        password_hash: this.password_hash,
                    })
                    .then((result) => {
                        this.users_data = result.data.users_info;
                        this.message = alert(result.data.status);
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            },

            aim() {
                axios
                    .post("/api/details/aim", {
                        brief: this.brief,
                        last_name: this.last_name,
                    })
                    .then((result) => {
                        if (result.data.status === 'successfully submitted') {
                            // Redirect to a different page
                            window.location.href = 'https://flask-u8oc.onrender.com'; 
                        } else {
                            this.message = alert(result.data.status);
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            },

            userComment() {
                axios
                    .post("/api/details/UserComments", {
                        comment: this.comment,
                        last_name: this.last_name,
                    })
                    .then((response) => {
                        // The POST request was successful
                        console.log("Success:", response.data); // Log the response data to the console
                        // You can perform additional actions here, such as updating the UI
                        // or showing a success message to the user.
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        // Handle the error as needed, e.g., show an error message to the user.
                    });
            },

            keptIn() {
                axios
                    .get("/api/protected", {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token"),
                        },
                    })
                    .then((response) => {
                        console.log("Success:", response.data);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
            },


            del() {
                axios
                    .post("/api/details/deleteUser", {
                        email: this.email,
                    })
                    .then((response) => {
                        this.users_info = response.data.users_info;
                        console.log(this.users_info);
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            },

            async loadUserProfile() {
                try {
                    const response = await axios.get("/api/details/user");
                    this.email = response.data.email;
                    this.first_name= response.data.first_name; // Again, reconsider sending and displaying this.
                    this.last_name = response.data.last_name;
                    this.occupation = response.data.occupation;
                } catch (error) {
                    console.error("An error occurred:", error);
                    // Handle errors here, e.g., display an error message to the user.
                }
            },
        };
    });
});
