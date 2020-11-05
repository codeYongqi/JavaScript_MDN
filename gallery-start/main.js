const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 添加图片循环 */
for(let i=1;i<=5;i++){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/pic'+i+'.jpg');
    let src=newImage.getAttribute('src');
    newImage.addEventListener('click',function () {
        chageSrc(src);
    })
    thumbBar.appendChild(newImage);
}

function chageSrc(src) {
    displayedImage.setAttribute('src',src);
}

function changeLight() {
    let value = btn.getAttribute('class');
    if(value === 'dark'){
        btn.setAttribute('class','light');
        btn.textContent = '变亮';
        overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    }else {
        btn.setAttribute('class','dark');
        btn.textContent = '变暗';
        overlay.style.backgroundColor = "rgba(0,0,0,0)";
    }
}

btn.addEventListener('click',changeLight);


/* 编写 变暗/变量 按钮功能 */
