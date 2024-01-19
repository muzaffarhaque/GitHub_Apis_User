// Fetch data from GitHub API
let searchbth = document.getElementById("searchbth")
let searchval = document.getElementById("serchValue")
const userDropdown = document.getElementById('userDropdown');

function fetchAllReposOfUser(user) {
  fetch(`https://api.github.com/users/${user}/repos?per_page=10&page=2`)
  .then(response => response.json())
  .then(userRepos => {
    console.log(userRepos);
    
    if (userRepos.message === 'Not Found') {
      userInfo.innerHTML = `<h1>User is Not Found</h1>`;
    } else {
        const userInfo = document.getElementById('reposBox');
        userInfo.innerHTML = userRepos.map(repo => `
          <div class="repo-box">
              <h4 class="blue-103 fw-bold fs-5">${repo.name} &nbsp;</h4>
              <p>${repo.description || 'No description available'}</p>
              <div class="topic-frame">
                  ${repo.topics.length>0 ? repo.topics.map(topic => `<div class="primary-btn">${topic}</div>`).join(''):`<p>Topic is not added in this repo...</p>`}
              </div>
          </div>
        `).join('');
      }
    })
    .catch(error => console.error('Error fetching user details:', error));
}




function getRepDetailsApi(selectedUser) {

  fetch(`https://api.github.com/users/${selectedUser}`)
    .then(response => response.json())
    .then(userDetails => {
      // Display user information
      console.log(userDetails)
      
      const userInfo = document.getElementById('userInfo');
      if(userDetails.message==='Not Found'){
        userInfo.innerHTML = `
        <h1>User is Not Found</h1>
        `;
      }else{
        userInfo.innerHTML = `
        <div class="user-details-bpx">
        <div class="profile-box">
            <img src="${userDetails.avatar_url || "Na"}" alt="profile Image" class="profile-Image">
        </div>
        <div class="user-info">
            <h2> <b>${userDetails.name || "Na"}</b></h2>
            <div className="user-folower">
             <span><b>Followers:</b> ${userDetails.followers}</span>&nbsp;&nbsp;
             <span><b>Following:</b> ${userDetails.following}</span>
            </div>
            <p>${userDetails.bio || "NA"}</p>
            <p>Public Repositories: ${userDetails.public_repos || "Na"}</p>
            <p><img src="./images/location-dot-solid.svg" class="icon" alt="icon">&nbsp;&nbsp; ${userDetails?.location || "Na"}</p>
            <p>Twitter Username : ${userDetails.twitter_username || "Na"}</p>
        </div>
      </div>
      <p class="user-profile-linke my-4"><img src="./images/link-solid.svg" class="icon" alt=""> &nbsp;&nbsp;&nbsp;<a href=${userDetails.html_url} target="_blank">${userDetails.html_url || "Na"}</a></p>
          
      `;
      fetchAllReposOfUser(selectedUser)
      }
 
    })

    .catch(error => console.error('Error fetching user details:', error));
}

searchbth.addEventListener('click', () => {
  getRepDetailsApi(searchval)
  userDropdown.value=""
})


const loader = document.getElementById('loader');
fetch('https://api.github.com/users?per_page=100000')
  .then(response => response.json())
  .then(users => {
   
    // Populate dropdown options
    getRepDetailsApi("muzaffarhaque")
    users.forEach(user => {
      const option = document.createElement('option');
      option.value = user.login;
      option.textContent = user.login;
      userDropdown.appendChild(option);
    });

    // Add event listener for dropdown change




    userDropdown.addEventListener('change', () => {
      const selectedUser = userDropdown.value || "muzaffarhaque";
      searchval.value=""
      // Fetch user details based on the selected username
      getRepDetailsApi(selectedUser)
    });
  })
  .catch(error => {
    console.error('Error fetching users:', error);

  });
