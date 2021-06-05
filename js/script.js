const container = document.querySelector('.card_container')
const getRequest = (url , cb) => {
    fetch(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/${url}`)
    .then(res => {
        return res.json()
    })
    .then(el => {
        cb(el)
    })
    .catch(() => {
        alert("Что-то пошло не так")
    })
}

window.addEventListener('load' , () => {
    if(!localStorage.getItem('counter')){
        localStorage.setItem('counter' , '1')
        localStorage.setItem('offset' , '0')
    }else{
        return
    }
})

    // const TOTAL = arr.length;

// if(offset >= 0 && offset <= (TOTAL - offset)){

// }

getRequest('all.json' , res => {
    const LIMIT = 20;
    let offset = JSON.parse(localStorage.getItem('offset'))
    let counter = JSON.parse(localStorage.getItem('counter'))
    let OFFSET_LIMIT = offset + LIMIT;
    const newArr = res.slice(offset, OFFSET_LIMIT);
    console.log(newArr);
    const temp = newArr.map(item => cardTemplate(item)).join('')
    container.innerHTML = temp
    container.insertAdjacentHTML('afterend' , `
    <div class='pagination'>
        <span id='prev' onclick='prevBtn()'>prev</span>
        ${counter}
        <span id='next' onclick='nextBtn()'>next</span>
    </div>`)
})

function nextBtn(){
    getRequest('all.json' , res => {
        let offset = JSON.parse(localStorage.getItem('offset'))
        let counter = JSON.parse(localStorage.getItem('counter'))
        const TOTAL = res.length
        if(offset >= 0 && offset <= (TOTAL - offset)){
            offset = +offset + 20
            counter++
            localStorage.setItem('counter' , JSON.stringify(counter))
            localStorage.setItem('offset' , JSON.stringify(offset))
        }
        window.location.reload()
    })
}

function prevBtn(){
    getRequest('all.json' , res => {
        let offset = JSON.parse(localStorage.getItem('offset'))
        let counter = JSON.parse(localStorage.getItem('counter'))
        const TOTAL = res.length
        if(offset > 0 && offset <= (TOTAL - offset)){
            offset = offset - 20
            counter--
            localStorage.setItem('counter' , JSON.stringify(counter))
            localStorage.setItem('offset' , JSON.stringify(offset))
        }else if(offset === 0){
            const prevBtn = document.querySelector('#prev')
            prevBtn.classList.add('opacity')
        }
        window.location.reload()
    })
}

function cardTemplate({id, images: {lg}}){
    return `
    <div onclick='singleCard(${id})' class="card">
        <img src="${lg}" alt="">
    </div>
    `
}

function singleCard(id){
    const pagination = document.querySelector('.pagination')
    pagination.classList.toggle('active')
    getRequest(`id/${id}.json` , res => {
        let newArr = []
        for(let i = 0; i < 1; i++){
            newArr.push(res)
        }
        const template = newArr.reduce((prev , item) => {
            return prev += singleCardTemplate(item)
        }, '')
        container.innerHTML = template
    })  
}

function singleCardTemplate({name , biography: {fullName , alterEgos , placeOfBirth , firstAppearance , publisher , alignment} , powerstats: {intelligence , strength , speed , power , combat , durability} , images: {lg} , appearance: {gender , race , height , weight , eyeColor , hairColor}}){
    return `
        <div class="hero">
        <div class="back">
            <span onclick="reLoad()">Back</span>
        </div>
        <div class="hero_child">
            <div class="hero_picture">
                <img src="${lg}" alt="">
            </div>
        </div>
        <div class="hero_child hero_child_alt">
            <div class="hero_title">
                <h2>${name}</h2>
            </div>
            <div class="hero_body">
                <ul>
                    <li>
                        <span>Gender:</span>
                        <span>${gender}</span>
                    </li>
                    <li>
                        <span>Race:</span>
                        <span>${race}</span>
                    </li>
                    <li>
                        <span>Height:</span>
                        <span>${height}</span>
                    </li>
                    <li>
                        <span>Weight:</span>
                        <span>${weight}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="hero_stats">
            <div class="hero_statsTitle">
                <h2>PowerStats</h2>
            </div>
            <div class="hero_statsBody">
                <div class="hero_inner">
                    <div class="hero_name">
                        <h3>Intelligence</h3>
                    </div>
                    <div class="hero_content">
                        <div class='showProcent'>${intelligence}%</div>
                        <div style='height: ${intelligence}%' class="hero_fill"></div>
                    </div>
                </div>
                <div class="hero_inner">
                    <div class="hero_name">
                        <h3>Strength</h3>
                    </div>
                    <div class="hero_content">
                        <div class='showProcent'>${strength}%</div>
                        <div style='height: ${strength}%' class="hero_fill"></div>
                    </div>
                </div>
                <div class="hero_inner">
                    <div class="hero_name">
                        <h3>Speed</h3>
                    </div>
                    <div class="hero_content">
                        <div class='showProcent'>${speed}%</div>
                        <div style='height: ${speed}%' class="hero_fill"></div>
                    </div>
                </div>
                <div class="hero_inner">
                    <div class="hero_name">
                        <h3>Durability</h3>
                    </div>
                    <div class="hero_content">
                    <div class='showProcent'>${durability}%</div>
                        <div style='height: ${durability}%' class="hero_fill"></div>
                    </div>
                </div>
                <div class="hero_inner">
                    <div class="hero_name">
                        <h3>Power</h3>
                    </div>
                    <div class="hero_content">
                    <div class='showProcent'>${power}%</div>
                        <div style='height: ${power}%' class="hero_fill"></div>
                    </div>
                </div>
                <div class="hero_inner">
                    <div class="hero_name">
                        <h3>Combat</h3>
                    </div>
                    <div class="hero_content">
                        <div class='showProcent'>${combat}%</div>
                        <div style='height: ${combat}%' class="hero_fill"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hero_info">
            <div class="hero_statsTitle">
                <h2>More Info</h2>
            </div>
            <div class="hero_wrapper">
                <div class="hero_item">
                    <ul>
                        <li>
                            <span>EyeColor:</span>
                            <span>${eyeColor}</span>
                        </li>
                        <li>
                            <span>HairColor:</span>
                            <span>${hairColor}</span>
                        </li>
                        <li>
                            <span>FullName:</span>
                            <span>${fullName}</span>
                        </li>
                        <li>
                            <span>Alignment:</span>
                            <span>${alignment}</span>
                        </li>
                    </ul>
                </div>
                <div class="hero_item">
                    <ul>
                        <li>
                            <span>AlterEgos:</span>
                            <span>${alterEgos}</span>
                        </li>
                        <li>
                            <span>Publisher:</span>
                            <span>${publisher}</span>
                        </li>
                        <li>
                            <span>PlaceOfBirth:</span>
                            <span>${placeOfBirth}</span>
                        </li>
                        <li>
                            <span>FirstAppearance:</span>
                            <span>${firstAppearance}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `
}

// SearchInput

const searchInput = document.querySelector('.searchInput')
searchInput.addEventListener('input' , e => {
    const value = e.target.value.toUpperCase()

    if(value === ''){
        window.location.reload()
    }else{
        getRequest('all.json' , res => {
            const search = res.filter(item => item.name.toUpperCase().includes(value))
    
            const searchTemplate = search.map(item => cardTemplate(item)).join('')
            container.innerHTML = searchTemplate
        })
    }
})

function reLoad(){
    window.location.reload()
}



