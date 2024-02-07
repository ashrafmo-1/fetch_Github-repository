// show all my repos https://api.github.com/users/ashrafmo-1/repos <=====

const btnSearch = document.querySelector('.search')
const inputSearch = document.querySelector('input')
const repositorycontent = document.querySelector('.boxes-repos')

btnSearch.addEventListener('click', (ele) => {
    ele.preventDefault()
    showResposResult()
})

const showResposResult = () => {
    if(inputSearch.value === '') {
        repositorycontent.innerHTML = 'undefined any repository'; // on not found any reository
    } else {
        fetch(`https://api.github.com/users/${inputSearch.value}/repos`).then((result) => result.json())
        .then((repository) => {
            console.log(repository.length); // <===== print repository in console
            repositorycontent.innerHTML = ``; // <===== impty repository content to run new repository
            // add all repositories to boxes-repos <=====
            repository.forEach((repos) => {
                document.querySelector('.repo_length').innerHTML = `you hava ${repository.length} repositories`;
                // master div <=====
                const box = document.createElement('div');
                box.className = 'box';
                document.querySelector('.boxes-repos').appendChild(box);
                // repository name <=====
                const nameRepository = document.createElement('h1');
                nameRepository.className = 'repo-name';
                const nameRepositoryText = document.createTextNode(repos.name);
                nameRepository.appendChild(nameRepositoryText);
                // make box control repositories <=====
                const controlsRepository = document.createElement('div');
                controlsRepository.className = 'control';
                //  link to the repository <=====
                const visetRepo = document.createElement('a');
                visetRepo.className = 'view-repo';
                const textLink = document.createTextNode('viset repository');
                visetRepo.appendChild(textLink)
                visetRepo.href = `https://github.com/${inputSearch.value}/${repos.name}`; // repository link
                visetRepo.setAttribute('target', '_blank');
                controlsRepository.appendChild(visetRepo);
                // get starts length<=====
                const starsSpan = document.createElement('span');
                starsSpan.className = 'stars-lenght';
                const textStars = document.createTextNode(`starts ${repos.stargazers_count}`);
                starsSpan.appendChild(textStars);
                controlsRepository.appendChild(starsSpan);
                // append all to master div<=====
                box.appendChild(nameRepository);
                box.appendChild(controlsRepository);
            })
        });
    }
}