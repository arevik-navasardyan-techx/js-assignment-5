const withHeader = document.getElementById("header");
const noHeader = document.getElementById("noHeader");

function treatRequest(request) {
  request
    .then(function positive(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No user in");
      }
    })
    .then((data) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(data), 1000);
      });
    })
    .then((data) => {
      let item = data.data;
      console.log(item);
      for (let i = 0; i < item.length; i++) {
        let fullName = getFullName(item[i]);
        console.log(fullName);
        let nameHtml = document.createElement("p");
        nameHtml.innerText = fullName;
        document.body.append(nameHtml);
      }
      console.log("Done");
       deleteLoading()
    })
    .catch(() => {
        deleteLoading();
      let noUserHtml = document.createElement("p");
      noUserHtml.innerText = "No user";
      document.body.append(noUserHtml);

      console.log("No user");
    });
}

function getFullName(item) {
  return [item.first_name, item.last_name].join(" ");
}

function loading() {
  let text = document.createElement("p");
  text.innerText = "Loading...";
  text.id = `text`;
  document.body.appendChild(text);
}

function deleteLoading(){
    document.getElementById("text").remove()
}

//////////////////WithHeaderButton

withHeader.addEventListener("click", () => {
  loading();

  let request = fetch("https://reqres.in/api/users?delay=1", {
    method: "GET",
    headers: { "x-api-key": "reqres-free-v1" },
  });

  console.log("Fetching users...");

  treatRequest(request);
  console.log(request);
  
});

//////////////////NoHeaderButton
noHeader.addEventListener("click", () => {
  loading();

  let request = fetch("https://reqres.in/api/users?delay=1", {});

  console.log("Fetching users...");

  treatRequest(request);
});
