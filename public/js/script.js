

const bars = document.querySelector('.bars');
const responsiveMenu = document.querySelector('.responsiveMenu');
const vse = document.querySelector('.vse');
const closeBtn = document.querySelector('.close');
const link = document.querySelectorAll('.respLink')

function clickbars() {
    bars.classList.toggle('fa-times');
    responsiveMenu.classList.toggle('active');
}

bars.addEventListener('click', clickbars);


function removeActiv() {
    bars.classList.remove('fa-times');
    responsiveMenu.classList.remove('active');
}

vse.addEventListener('click', removeActiv);
closeBtn.addEventListener('click', removeActiv);

link.forEach((val) => {
    val.addEventListener('click', removeActiv)
})

const bottomHeader = document.querySelector('.bottomHeader');

window.addEventListener('scroll', () => {
    const backTop = document.querySelector('.backTop');

    bottomHeader.classList.toggle('active', window.scrollY > 80);
    backTop.classList.toggle('active', window.scrollY > 600);
})

// filter function 

const filterBtn = document.querySelectorAll('[data-fileterBtn]');
const filterItem = document.querySelectorAll('[data-filterItem]');


let lastFilterBtn = filterBtn[0];

const filterFunc = function () {
    lastFilterBtn.classList.remove('active');
    this.classList.add('active');
    lastFilterBtn = this;

    const target = this.getAttribute('data-fileterBtn');

    filterItem.forEach((item) => {
        item.style.display = 'none';
        if(target === item.getAttribute('data-filterItem')) {
            item.style.display = 'block';
        };

        if (target === 'all') {
            item.style.display = 'block';
        }
    })
}

filterBtn.forEach((val) => {
    val.addEventListener('click', filterFunc);
})


let arr = [];
fetch('/addProductData').then(result => result.json()).then(result => {
    arr = result[0];
    drow(arr.reverse());
    // drowStar();
    starsClick();
})

const file = document.querySelector('#file');
file.addEventListener('change', () => {
	document.querySelector('.fileChangeImg').src = URL.createObjectURL(file.files[0]);
})

document.querySelector('.adddProd').addEventListener('click', () => {
    const inputs = document.querySelectorAll('.addProduct input'); 
    let newPrObj = {};
    inputs.forEach(input => {
        if(input.getAttribute('type').search('file') === -1) {
            newPrObj[input.getAttribute('name')] = input.value;
        } else {
            let img = input.files[0];
            newPrObj[input.getAttribute('name')] = URL.createObjectURL(img);
            document.querySelector('.fileChangeImg').src = URL.createObjectURL(img);
        }
    });
    console.log(newPrObj);
    fetch('/addProductData', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newPrObj)
    }).then(() => {
        fetch('/addProductData').then(result => result.json()).then(result => {
            arr = result[0];
            drow(arr.reverse());
            // drowStar();
            starsClick();
        })
    }).then(() => {
        addProductCont.classList.remove('active');
        document.body.style.overflowY = 'auto';
        deleteValues();
    });
})



let cont = document.querySelector('.colection .colectionCont');

function drow(arr) {
    cont.innerHTML = '';

    for(let i = 0; i < arr.length; i++) {
        cont.innerHTML += `
            <div class="card popularProd">
                <div class="img">
                    <img src="${arr[i].img}">
                    <div class="icons">
                        <ion-icon name="eye-outline" aria-hidden="true"></ion-icon>
                        <ion-icon name="heart-outline" aria-hidden="true"></ion-icon>
                        <ion-icon name="repeat-outline" aria-hidden="true"></ion-icon>
                        <ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>
                    </div>
                </div>

                <div class="content">
                    <h3>${arr[i].name}</h3>
                    <span>$${arr[i].price.toFixed(2)}</span>
                    <div class="star">

                    </div>
                </div>
            </div>`
    }
}

// function drowStar() {
//     document.querySelectorAll('.popularProd').forEach(val => {
//         let sum = 3;
//         const starBox = val.querySelector('.star');
//         for(let i = 0; i < 5; i++) {
//             if(i < sum) {
//                 let p = document.createElement('i');
//                 p.setAttribute('class', 'fa-solid fa-star');
//                 starBox.appendChild(p);
//             } else {
//                 let p = document.createElement('i');
//                 p.setAttribute('class', 'fa-regular fa-star');
//                 starBox.appendChild(p);
//             }
//         }
//     })
// }

function starsClick() {
    document.querySelectorAll('.popularProd').forEach(val => {
        let stars = [];
         val.querySelectorAll('.star i').forEach((val, i) => {
            stars.push(val);
        })
    
        stars.forEach((val, i) => {
            val.addEventListener('click', () => {
    
                stars.forEach(val => {
                    val.classList.remove('fa-solid');
                })
                for(let j = 0; j <= i; j++) {
                    stars[j].classList.add('fa-solid');
                }
            })
        }) 
    })
}

let form = document.querySelector('.colection .form'); 
const realForm = form.querySelector('form');
console.log(realForm);
const openFilter = document.querySelector('.openFilter');
const theAll = form.querySelector('.vse');
let input = form.querySelector('input');

openFilter.addEventListener('click', () => {
    form.classList.add('active');
    document.body.style.overflowY = 'hidden';
 })

 theAll.addEventListener('click', () => {
    form.classList.remove('active');
    document.body.style.overflowY = 'auto';
 })


 realForm.addEventListener('submit', (env) => {
    env.preventDefault();
    form.classList.remove('active');
    document.body.style.overflowY = 'auto';
    drow(chang(input.value.toLowerCase()));
    input.value = '';
    starsClick();
 })

function chang(name) {
    return arr.filter((val) => {
            if(val.name.toLowerCase().indexOf(name) !== -1) {
                 return val;
            } 
    })
}


const addProductCont = document.querySelector('.addProduct');
const addProductContBtn = document.querySelector('.addProductContBtn');
const deleteAllValuesBtn = addProductCont.querySelector('.clearAllValues')
const vseProduct = addProductCont.querySelector('.vse');

const addProductForm = addProductCont.querySelector('form');

addProductContBtn.addEventListener('click', () => {
    addProductCont.classList.add('active');
    console.log(arr)
    document.body.style.overflowY = 'hidden';
 })

 addProductForm.addEventListener('submit', (evn) => {
    evn.preventDefault();

    // arr.push({
    //     name: addProductCont.getElementsByName('name'),
    //     img: addProductCont.getElementsByName('img').value,
    //     price: addProductCont.getElementsByName('price').value
    // });
    // console.log(arr);
 })

 vseProduct.addEventListener('click', () => {
    addProductCont.classList.remove('active');
    document.body.style.overflowY = 'auto';
 })

 function deleteValues() {
    addProductCont.querySelectorAll('input').forEach(input => input.value = '');
    document.querySelector('.fileChangeImg').src = 'img/imglogo.webp';
 }

 deleteAllValuesBtn.addEventListener('click', deleteValues)
