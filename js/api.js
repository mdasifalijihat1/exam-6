// view more 

const getId = id=> document.getElementById(id);

function adoptYour(){
    window.location.href ='#adoptYour';
}


// button start
const categoryDiv = getId('pedCategories');

async function allCategory() {
    const allItems = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const convertData = await allItems.json();
    console.log(convertData)
    const data = convertData.categories;
    showCategories(data);    
}
// catch (error){
//     console.error('fetch categories error', error)
// }

function showCategories(data){
    data.forEach((v) => {
        const button = document.createElement('button');
        button.setAttribute('id', `btn${v.id}`);
        button.onclick = () => {
            categoryPed(`${v.category}`, `btn${v.id}`);
        };
        button.classList.add('normal-btn');
        button.innerHTML = `<img src='${v.category_icon}' alt='${v.category} icon'/>
        <p class = 'font-bond text-3xl'> ${v.category}</p> `;
        
        categoryDiv.append(button); 
    });
}



function removeDefaultBtn(){
    let allbtn = document.getElementsByClassName('active-btn');
    for (let btn of allbtn){
        btn.classList.remove('active-btn')
    }
}

 function categoryPed (category, id){
    removeDefaultBtn(); 
    let showCardDiv = document.getElementById('showCard');
    showCardDiv.innerHTML ='';
    document.getElementById(id).classList.add('active-btn');
    const div = document.createElement('div');
    div.classList = 'w-full h-full absolute z-20 flex justify-center items-center';
    div.innerHTML =` <div>  <img src= "/images/loading.gif" class='w-20' alt='loading' <div>`;
    showCardDiv.append(div);
    setTimeout(async () => {
        const res = await fetch(
            `https://openapi.programming-hero.com/api/peddy/category/${category}`);
            const showCardDiv = await res.json();
            const data = showCardDiv.data;
            showCard(data);  
        }, 500 );
 }
// all card 
 async function allCard() {
    const res = await fetch( 'https://openapi.programming-hero.com/api/peddy/pets' );
    const showCardData = await res.json();
    const data = showCardData.pets;
    showCard(data);
 }

//  images like icon 
 const showImg = getId('images-like');
 function clickLike(img){
    const div = document.createElement('div');
    div.classList = 'w-5/12';
    div.innerHTML = ` <img src='${img}' class= 'w-full h-[100px]  rounded-xl' alt=""> `;
    showImg.appendChild(div);
 }

//  time count and close 
 function clickAdopt(id){
    document.getElementById('timeCount').innerText = '3';
    getId('adopt-click').showModal();
    let num = 2;
    let timeShow = setInterval ( () => {
        document.getElementById('timeCount').innerText = num;
        if(num === 0){
            getId('adopt-click').close();
            clearInterval(timeShow);
        }
        num--;
    }, 1000 );

    getId(`${id}`).setAttribute('disabled', 'disabled');
    getId(`${id}`).classList = 'py-2 px-4 border rounded-xl bg-zinc-200 text-zinc-500 text-lg font-medium';
 }

//  Detailes 
 function clickDetails (id) {
    getId('modal-Details').showModal();
    let pedInfo = async () => {
        let res = await fetch ('https://openapi.programming-hero.com/api/peddy/pets');
        let data = await res.json();
        let pets = data.pets;
        pets.forEach((v) => {
            if(v.petId == id){
                getId('detailsImg').setAttribute('src', `${v.image}`);
                getId('detailsName').innerText = `${
                    v.pet_name ? v.pet_name: "You call any name"
                }`;
                getId('detailsBreed').innerText = `Breed: ${
                    v.breed ? v.breed : "Not available"
                }`;
                getId('detailsBirth').innerText = `Birth:${
                    v.data_of_birth ? v.data_of_birth: "Not available"
                }`;
                getId('detailsGender').innerText = `Gender:${
                    v.gender ? v.gender : "Not available"
                }`;
                getId('detailsPrice').innerText = `Price:${
                    v.price ? v.price : "Not available"
                }`;
                getId ('detailsVer').innerText =` vaccinated status: ${v.vaccinated_status}`;
                getId('detailsDiscription').innerText = `${v.pet_details ? v.pet_details: 'No additional details available'} `;
            }
        });
    };
    pedInfo();
 }

 
// show card
 const cardDiv = getId('showCard');
 function showCard(data){
    let showCardDiv = document.getElementById('showCard');
    showCardDiv.innerHTML= '';
    if (data.length == 0){
        showCardDiv.classList.remove('grid');
        showCardDiv.innerHTML = `
        <div class="p-4 bg-zinc-100 rounded-xl flex flex-col justify-center items-center h-[500px] text-center gap-4">
      <div> <img src="./images/error.webp" alt=""></div>
      <h2 class="font-bold text-3xl"> No Information Abailable </h2>
      <p class="w-8/12">Is a message commonly displayed when data or details are missing or inaccessible. It signifies that relevant information is either not present or cannot be retrieved at that moment. </p>
     </div> `;
     return;
    }
    showCardDiv.classList.add('grid');
    data.forEach((v) => {
        const img = v.image;
        const id = v.petId;
        const card = document.createElement('div');
        card.innerHTML = `
    <div class="p-3 space-y-5 shadow-lg rounded-xl">
      <div>
        <img class="rounded-xl h-[250px] w-full" src="${v.image}" alt="">
      </div>
      <div>
        <h3 class="font-bold text-xl mb-2"> ${ v.pet_name ? v.pet_name : 'You vall any name' }</h3>
        <p class="flex items-center gap-2"> <img src="./images/Frame.png" alt=""> Breed: ${ v.breed ? v.breed : 'Not abailable'}</p>
        <p class="flex items-center gap-2"> <img src="./images/Frame (1).png" alt=""> Birth: ${ v.data_of_birth ? v.data_of_birth: "Not available"} </p>
        <p class="flex items-center gap-2"> <img src="./images/Frame (2).png" alt=""> Gender: ${ v.gender ? v.gender: "Not available"} </p>
        <p class="flex items-center gap-2"> <img src="./images/Frame (3).png" alt=""> Price: ${ v.price ? v.price: "Not available"} </p>
      </div>

      <div class="flex justify-between">
        <button onclick="clickLike('${img}')" class="py-2 px-4 border rounded-lg active:border-[#0e7a81]">
          <i class="fa-regular fa-thumbs-up text-3xl"> </i> 
        </button>
        <button onclick="clickAdopt('adopt${id}')" id="adopt${id}" class="py-2 px-4 border rounded-lg text-[#0e7a81] text-lg font-medium active:border-[#0e7a81]">  
          Adopt
        </button>
        <button onclick="clickDetails('${id}')" class="py-2 px-4 border rounded-lg text-[#0e7a81] text-lg font-medium active:border-[#0e7a81]">  
          Details
        </button>
      </div>
    </div> `;
    cardDiv.appendChild(card);
    });
 }
 
// sort Price 
 async function sortByPrice() {
    const allCardInfo = await fetch (
        'https://openapi.programming-hero.com/api/peddy/pets'
    );
    const showCardData = await allCardInfo.json();
    const data = showCardData.pets;
    let newone = data.sort ((a, b) => parseFloat(b.price) - parseFloat(a.price));
    showCard(newone);
 };

 allCategory();
 allCard();