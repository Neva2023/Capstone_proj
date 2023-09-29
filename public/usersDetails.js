document.addEventListener('alpine:init', () => {
    Alpine.data('whichSlope', () => {

        return {
            version: 'api-1.0',

            users_data: [],
            email: "",
            first_name: "",
            last_name: "",
            occupation: "",
            password_hash: "",
            message: "",
            depth: 0,
            strain: 0,
            moisture: 0,
            plastic: 0,
            liquid: 0,
            index: 0,
            output:'',

            saveAndSubmit() {
                axios.post('http://127.0.0.1:5000/predict', {
                   data: [[parseFloat(this.depth), parseFloat(this.strain), parseInt(this.moisture), parseInt(this.plastic), parseInt(this.liquid), parseInt(this.index)]]
                })
                    .then((result) => {
                        this.output= result.data.output
                        console.log(output)
                    })
                    .catch((error) => {
                        console.error('An error occurred:', error); 
                    });
            },


            init() {

                return axios
                    .get('/api/details')
                    .then((result) => {
                        this.users_data = result.data.users_info

                    })
            },
            

            login() {
                axios.post('/api/details/login', {
                    email: this.email,
                    password_hash: this.password_hash,
                })
                    .then((result) => {
                        console.log(result.data); // Log the response data for debugging
                        if (result.data.status === 'Log-in-successful') {
                            alert('Login successful');
                            // Use setTimeout to close the alert after 2 seconds (2000 milliseconds)
                            setTimeout(function () {
                                alert.close(); // This will close the alert
                            }, 2000);
                            window.location.href = './home-page.html';
                        } else if (result.data.status === 'Login-failed') {
                            alert('Login failed. Please check your credentials.');
                        }
                    })
                    .catch((error) => {
                        console.error('An error occurred:', error); // Log any errors for debugging
                    });
            },




                addUser() {
                    axios
                    .post('/api/details/create', {

                            email: this.email,
                            first_name: this.first_name,
                            last_name: this.last_name,
                            occupation: this.occupation,
                            password_hash: this.password_hash,
                        })
                            .then(response => {
                                this.users_data = response.data.users_info
                                this.message = alert(response.data.status)



                            })
                            .catch(function (error) {
                                console.error(error);

                            });
                    },

                        del() {
                        axios
                    .post('/api/details/deleteUser', {

                            email: this.email


                        })
                            .then(response => {
                                this.users_info = response.data.users_info
                                console.log(this.users_info)


                            })
                            .catch(function (error) {
                                console.error(error);


                            });
                    },



        }

        })

})