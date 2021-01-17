let x = 0;
let xNew = 0;
let xOffset = 0;

const autumnBanner = document.getElementById('autumn_banner');

autumnBanner.innerHTML = `
    <div class="image"><img width="3000" height="250" src="dist/autumn/bg.png"> </div>
    <div class="image"><img width="1800" height="165" src="dist/autumn/girl1.png"> </div>
    <div class="image"><img width="3000" height="250" src="dist/autumn/grassland.png"> </div>
    <div class="image"><img width="1800" height="160" src="dist/autumn/mushroom.png"> </div>
    <div class="image"><img width="1800" height="165" src="dist/autumn/spirit.png"> </div>
    <div class="image"><img width="1950" height="178" src="dist/autumn/leaf.png"> </div>
`;

const blink0 = autumnBanner.children[1];
const blink1 = document.createElement('div');
blink1.className = 'image';
blink1.innerHTML = `<img width="1800" height="165" src="dist/autumn/girl2.png">`
const blink2 = document.createElement('div');
blink2.className = 'image';
blink2.innerHTML = `<img width="1800" height="165" src="dist/autumn/girl3.png">`
const blink3 = document.createElement('div');
blink3.className = 'image';
blink3.innerHTML = `<img width="1800" height="165" src="dist/autumn/girl4.png">`

const blinkNodes = [blink0, blink1, blink2, blink3];

const images = autumnBanner.children;

const width = document.documentElement.clientWidth;
const step = width / 2 / 5;

const dataImages = [
    { x: 0, b: 4 },
    { x: 0, b: 0 },
    { x: 0, b: 1 },
    { x: 0, b: 4 },
    { x: 0, b: 5 },
    { x: 0, b: 6 },
]

function init() {
    for (let i = 0; i < 6; i++) {
        if (images.hasOwnProperty(i)) {
            const element = images[i];
            const elementData = dataImages[i];
            element.children[0].style = 'transition: .2s linear; transform: translate(' + elementData.x + 'px); filter: blur(' + elementData.b + 'px);';
        }
    }
}

autumnBanner.addEventListener('mouseover', (e) => {
    x = e.clientX;
});

autumnBanner.addEventListener("mousemove", (e) => {
    xNew = e.clientX;
    xOffset = x - xNew;
    for (const i in images) {
        if (images.hasOwnProperty(i)) {
            const level = (6 - parseInt(i)) * 10;
            const element = images[i];
            const elementData = dataImages[i];
            const bNew = Math.abs(elementData.b + (xOffset / step));
            const lNew = 0 - (xOffset / level);
            element.children[0].style = 'transform: translate(' + lNew + 'px); filter: blur(' + bNew + 'px);';
        }
    }

});


autumnBanner.addEventListener("mouseout", (e) => {
    init();
});

let blinkIndex = 0;
let timeout = 4000;

const blink = () => {
    if (blinkIndex === 4) {
        console.log(blinkIndex);
        blinkIndex = 1;
        timeout = 4000;
    } else {
        blinkIndex += 1;
        timeout = 30;
    }

    console.log(blinkIndex);
    images[1].children[0] = blinkNodes[blinkIndex - 1].children;
    // autumnBanner.children[1] = blinkNodes[blinkIndex]
    // images[1].children[0].src = 'dist/autumn/girl' + blinkIndex + '.png';
    setTimeout(() => {
        blink();
    }, timeout);
}

window.onload = () => {
    init();
    blink();
}