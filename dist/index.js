"use strict";
const getUserName = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const main_container = document.querySelector(".main-container");
async function myCustomerFetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Network error ${response.status}`);
    }
    const data = await response.json();
    return data;
}
const showResultUI = (singleUser) => {
    const { avatar_url, login, url } = singleUser;
    main_container.insertAdjacentHTML("beforeend", `<div class='card'>
        <img src =${avatar_url} alt=${login}/>
        <hr />
        <div class='card-footer'>
        <img src =${avatar_url} alt=${login}/>
        <a href="${url}>Github </a>
        </div>
        </div>
        `);
};
function fetchUserData(url) {
    myCustomerFetcher(url, {}).then((userInfo) => {
        for (const singleUser of userInfo) {
            showResultUI(singleUser);
        }
    });
}
fetchUserData("https://api.github.com/users");
formSubmit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = getUserName.value.toLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allUserData = await myCustomerFetcher(url, {});
        const matchingUsers = allUserData.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        main_container.innerHTML = "";
        if (matchingUsers.length === 0) {
            main_container?.insertAdjacentHTML("beforeend", `<p class ="empty-msg"> No user found</p>`);
        }
        else {
            for (const singleUser of matchingUsers) {
                showResultUI(singleUser);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
