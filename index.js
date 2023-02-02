const listElement = document.querySelector(".posts")
const fetchButton = document.querySelector("#available-posts button")
const postTemplate = document.querySelector("template")
const postButton = document.querySelector("#new-post button")


async function sendHttpRequest(method, url){
    //with XHR
    // const promise = new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest()
    //     xhr.open(method, url)
    //     xhr.onload = function(){
    //         if(xhr.status >= 200 && xhr.status < 300){
    //             //return the data back
    //             resolve(xhr.response)
    //         }else{
    //             reject("Something went wrong..... :<")
    //         }
    //     }
    //     xhr.send();
    // })

    // return promise

    //with fetch() function
    // const response = await fetch(url, {method})
    // const result = await response.json()
    // return result

    // return await fetch(url, {method}).then(r => r.json())

    //with axios
    const { data } = await axios(url, { method })
    return data
    // return axios.get(url)
}

async function fetchPosts() {
    const responseData = await sendHttpRequest("GET", "https://jsonplaceholder.typicode.com/posts")

    console.log(responseData)
    if(responseData.length > 0){
        for(const post of responseData){
            const postElClone = document.importNode(postTemplate.content, true)
            postElClone.querySelector("h2").textContent = post.title
            postElClone.querySelector("p").textContent = post.body
            postElClone.querySelector("li").id = post.id
            listElement.appendChild(postElClone)
        }
    }
}

async function postPosts(e) {
    e.preventDefault();

    let title = document.querySelector('#title').value;
    let body = document.querySelector('#content').value;

    //Method 1
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "title": title, "body": body })
    });

    response.json().then(data => {
        console.log(data);
        const postElClone = document.importNode(postTemplate.content, true)
        postElClone.querySelector("h2").textContent = "Method 1 Title: " + data.title
        postElClone.querySelector("p").textContent = "Content: " + data.body + " ID: " + data.id
        postElClone.querySelector("li").id = data.id
        listElement.appendChild(postElClone)
    });

    //Method 2
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://jsonplaceholder.typicode.com/posts");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.response);
            let responseObj = JSON.parse(xhr.response);
            const postElClone = document.importNode(postTemplate.content, true)
            postElClone.querySelector("h2").textContent = "Method 2 Title: " + responseObj.title
            postElClone.querySelector("p").textContent = "Content: " + responseObj.body + " ID: " + responseObj.id
            postElClone.querySelector("li").id = responseObj.id
            listElement.appendChild(postElClone)
    }};

    let data = JSON.stringify({ "title": title, "body": body })
    xhr.send(data);

    //Method 3
    let post = {
        title: title,
        body: body
    };

    const responseData = await axios.post("https://jsonplaceholder.typicode.com/posts", post);
    console.log(responseData.data);

    const postElClone = document.importNode(postTemplate.content, true)
    postElClone.querySelector("h2").textContent = "Method 3 Title: " + responseData.data.title
    postElClone.querySelector("p").textContent = "Content: " + responseData.data.body + " ID: " + responseData.data.id
    postElClone.querySelector("li").id = responseData.data.id
    listElement.appendChild(postElClone)
}

// READ/GET
fetchButton.addEventListener("click", fetchPosts)

// POST
postButton.addEventListener("click", postPosts)