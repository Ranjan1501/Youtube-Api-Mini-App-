// /API youtube API-3 AIzaSyA3zMmuLW9n9cqAsHAt4OS6Fk9ATj5cnHg

    //    AIzaSyDn3oRtrEGpUB-WIpvGyTE5WhI9o0zpj3I

    // https://youtube.googleapis.com/youtube/v3/search?q=csk&type=video&key=AIzaSyA3zMmuLW9n9cqAsHAt4OS6Fk9ATj5cnHg

    // reuest promise for data

    let videos = document.getElementById("videos"); // making parent div 
    async function searchVideos() {

        let query = document.getElementById("query").value; // make dynamic input search 
        // fetch data 
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${query}&type=video&key=AIzaSyDn3oRtrEGpUB-WIpvGyTE5WhI9o0zpj3I&maxResults=20`);
        // convert to json as it a strem data have to wait so await 

        let data = await res.json();
        console.log("data:", data);
        appendVideos(data.items);  // we are excecuting search data by videoID 
        // argument would be complete array of object 
    }

    searchVideos();

    // data promise done 
    //  got the videid
    // showcase on the web page
    //parameter- data.items where data is response in json format array of object mean complte array of data 

    function appendVideos(video_data) {
        videos.innerHTML = null;
        video_data.forEach(({ id: { videoId } }) => {

            // console.log("video:", video.id.videoID); // use destruturing  instead of this

            let div = document.createElement("div");
            // embed video
            div.innerHTML = `<iframe width="220" height="200" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> `
            // to make dynamic use template literal close  iframe tag becoz we are emding dynamic data 
            div.style.marginTop = "20px"
            videos.append(div);
        });

    }

   

    function Signup(e) {
        e.preventDefault();
        let form = document.getElementById("signup-form");

        let user_data = {                   // spelling should be same as per mocker like
            name: form.name.value,           // name, email, description etc. 
            email: form.email.value,
            mobile: form.mobile.value,
            password: form.password.value,
            username: form.username.value,
            description: form.description.value,
        };
        console.log("user_data", user_data);

        // object format to json format for server to red 

        user_data = JSON.stringify(user_data);

        // fetching data from masai api database

        fetch("https://masai-api-mocker.herokuapp.com/auth/register", { // first is url and 2nd is object with standard parameter like method, body, headers etc.  

            method: 'POST',  // sending user data like posting a letter for registeration
            body: user_data,  // user data details to deliver to address

            headers: {
                "Content-Type": 'application/json'
            },
        })
            .then((res) => {
                return res.json();

            })
            .then((res) => {
                console.log("res", res);

            })
            .catch((err) => {
                console.log("err", err);
            });
    }
    // after register you will get success/failure code 

    // description: "gokuldham"
    // email: "aryastark@gmail.com"
    // mobile: "7804040400"
    // name: "champak"
    // password: "12345"
    // username: "champak123"

    //login
    function Login(e) {
        e.preventDefault();
        let form = document.getElementById("login-form");

        let user_data = {

            password: form.pass.value,
            username: form.user.value,

        };

        let data_to_send = JSON.stringify(user_data);
        console.log("data_to_send", data_to_send);

        fetch("https://masai-api-mocker.herokuapp.com/auth/login", {

            method: 'POST',  // for the server to verify

            body: data_to_send,

            headers: {
                "Content-Type": "application/json",
            },

        })
            .then((res) => {
                return res.json();

            })
            .then((res) => {
                console.log("res", res);
                fetchmyData(user_data.username, res.token);

            })


            .catch((err) => {
                console.log("err", err);
            });
    }

    function fetchmyData(username, token) {
        fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`, {


            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

        })

            .then((res) => {
                return res.json();

            })
            .then((res) => {
                console.log("res", res);

            })


            .catch((err) => {
                console.log("err", err);
            });

    }