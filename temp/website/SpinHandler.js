// import { DataHandler } from "./scripts/DataHandler.js";
//temp

const canvas = document.getElementById('myCanvas');
let canvasW = canvas.width;
let canvasH = canvas.height;
const ctx = canvas.getContext("2d");
let isClosePopUp = false;
let isInfoPopUp = false;
const onMobile = window.matchMedia('(max-width:1024px)');
var PhoneData = JSON.parse(sessionStorage.getItem("Phone"));
var RewardCode = JSON.parse(sessionStorage.getItem("RWC"));
var Rewards = JSON.parse(sessionStorage.getItem("Name"));
var DateData = JSON.parse(sessionStorage.getItem("Date"));
var ItemsData = JSON.parse(sessionStorage.getItem("Item"));

// Define the number of segments and their labels
const numSegments = 12;
const segmentLabels = [
    ["Nước ĐTHT", "Lon Nice"],// 0->20 20%
    ["Stronger", "Stronger"],// 20->40 20%
    ["Yến Lon", "Yến Lon"],// 40->60 20%
    ["Canh ĐTHT", "Canh Rau"],//60->70 10%
    ["Cháo ĐTHT", "Cháo"],//70->80 10%
    ["Hũ Kid", "Hũ Yến Kid"],//80->85 5%
    ["Hũ Yến", "Yến"],//85->90 5%
    ["Hũ Kiêng", "Hũ Yến Kiêng"],//90->95 5%
    ["Bánh ĐTHT", "Bánh"],//95->97 2%
    ["Bột ĐTHT", "Bột"],//97->99 2%
    ["Hộp Yến", "Hộp Yến"],//99->99.5 0.5%
    ["Khô 10g", "Khô"]//99.5->100 0.5%
];
const fullLabels = [
    "01 Nước Đông Trùng Hạ Thảo Nice",
    "01 Nước Đông Trùng Hạ Thảo Vị Chanh Stronger",
    "01 Nước Đông Trùng Hạ Thảo Yến HT+",
    "01 Canh Rau Dược Liệu Đông Trùng Hạ Thảo",
    "01 Cháo Dược Liệu Đông Trùng Hạ Thảo",
    "01 Hũ Đông Trùng Hạ Thảo Yến Kid",
    "01 Hũ Đông Trùng Hạ Thảo Yến HT+",
    "01 Hũ Đông Trùng Hạ Thảo Yến Kiêng",
    "01 Bánh Đông Trùng Hạ Thảo",
    "01 Bột Dinh Dưỡng Đông Trùng Hạ Thảo",
    "01 Hộp Đông Trùng Hạ Thảo Yến",
    "01 Đông Trùng Hạ Thảo Sấy Thăng Hoa 10g"
];
//initialize
function encodePhone(phone) {
    return phone.slice(0, 3) + "****" + phone.slice(7, 10);
}
function encodeRWC(RWC){
    return RWC[0]+"**"+RWC[3];
}

if (ItemsData) {
    (function InitList() {
        let ItemsList = document.querySelectorAll('#Top10Rewards #RewardsContainer #Items li');
        let PhoneList = document.querySelectorAll('#Top10Rewards #RewardsContainer #Name li');
        let DateList = document.querySelectorAll('#Top10Rewards #RewardsContainer #Date li');

        let count = 0;
        for (let i = ItemsData.length - 1; ItemsData.length > 10 ? i > (ItemsData.length - 10) : i > 0; i--) {
            console.log(ItemsData[i]);
            ItemsList[count].innerHTML = ItemsData[i];
            PhoneList[count].innerHTML = encodePhone(Rewards[i]);
            DateList[count].innerHTML = DateData[i];
            count++;
        }
    })();
}

let i = 0;
const img = new Image();

img.src = "Images/Wheel.png";
img.onload = () => {
    ctx.drawImage(img, 0, 0, canvasW, canvasH);
    function onScreenResize() {
        let Wheelwidth = 0;
        if (onMobile.matches) {
            Wheelwidth = window.innerWidth * 70 / 100;
        }
        else Wheelwidth = window.innerWidth * 30 / 100;
        canvas.height = Wheelwidth;
        canvas.width = Wheelwidth;
        canvasW = canvas.width;
        canvasH = canvas.height;
        ctx.drawImage(img, 0, 0, canvasW, canvasH);

        document.getElementById('wheel-arrow').style.borderWidth = document.getElementById('wheel-center').clientWidth * 40 / 100 + "px";
    };
    function showInfoPopUp() {
        const info_pop_up = document.getElementById('info-pop-up');

        info_pop_up.classList.remove('d-none');
        isInfoPopUp = true;
        setTimeout(() => {
            document.querySelector('#info-pop-up input').focus();
        }, 1);
    }
    function getRandomFloat(min, max, decimals) {
        const str = (Math.random() * (max - min) + min).toFixed(decimals);

        return parseFloat(str);
    }
    function chances(i) {
        if (i >= 0 && 20 > i) return 0;
        else if (i >= 20 && 40 > i) return 1;
        else if (i >= 40 && 60 > i) return 2;
        else if (i >= 60 && 70 > i) return 3;
        else if (i >= 70 && 80 > i) return 4;
        else if (i >= 80 && 85 > i) return 5;
        else if (i >= 85 && 90 > i) return 6;
        else if (i >= 90 && 95 > i) return 7;
        else if (i >= 95 && 97 > i) return 8;
        else if (i >= 97 && 99 > i) return 9;
        else if (i >= 99 && 99.5 > i) return 10;
        else if (i >= 99.5 && 100 > i) return 11;
    }
    function removeStartSpace(str) {
        for (let i = 0; i < str.length; i++) {
            if (str[i] != ' ') return str.slice(i);
        }
        return '';
    }

    let isAnimating = false;
    let totalRotation = 0;
    let animationId = null;
    let today, date, time, CustomerInfo;

    function rotateCanvas() {
        today = new Date();
        date = String(today.getDate()).padStart(2, '0') + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + today.getFullYear();
        time = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0') + ":" + String(today.getSeconds()).padStart(2, '0');

        window.addEventListener('keypress', checkKeyPress);
        document.querySelector('#wheel-container #wheel').addEventListener('click', checkState);
        canvas.addEventListener('click', checkState);

        if (!isAnimating) {
            isAnimating = true;
            const start = performance.now();
            let targetSegment = chances(getRandomFloat(0, 99.9, 1));
            // console.log(targetSegment);
            function animate(currentTime) {
                let elapsedTime = currentTime - start;
                let rotationAngle = elapsedTime / 1500 * 360; // calculate rotation angle in degrees
                totalRotation = rotationAngle;
                ctx.save();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(totalRotation * Math.PI / 180);
                ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvasW, canvasH);
                ctx.restore();
                console.log(totalRotation);
                if (totalRotation >= 720 + 30 * (11 - targetSegment + 1)) {
                    setTimeout(() => {
                        cancelAnimationFrame(animationId);
                        isAnimating = false;
                        console.log(`you have won the ${segmentLabels[targetSegment][0]}`)
                        addItemToRewardList(fullLabels[targetSegment]);
                        showPopUp(fullLabels[targetSegment], segmentLabels[targetSegment][1]);
                        window.addEventListener('keypress', checkKeyPress);
                        document.querySelector('#wheel-container #wheel').addEventListener('click', checkState);
                        canvas.addEventListener('click', checkState);

                        return;
                    }, 3000);
                }
                else {
                    animationId = requestAnimationFrame(function (currentTime) {
                        animate(currentTime);
                    });
                }
            }
            animationId = requestAnimationFrame(function (currentTime) {
                animate(currentTime);
            });
        }
    }

    function addItemToRewardList(list) {
        let ItemsList = document.querySelectorAll('#Top10Rewards #RewardsContainer #Items li');
        let PhoneList = document.querySelectorAll('#Top10Rewards #RewardsContainer #Name li');
        let DateList = document.querySelectorAll('#Top10Rewards #RewardsContainer #Date li');
        for (let i = 9; i > 0; i--) {
            ItemsList[i].innerHTML = ItemsList[i - 1].innerHTML;
            PhoneList[i].innerHTML = PhoneList[i - 1].innerHTML;
            DateList[i].innerHTML = DateList[i - 1].innerHTML;
        }

        let currentTime = date + ' ' + time;
        ItemsList[0].innerHTML = list;
        PhoneList[0].innerHTML = encodePhone(CustomerInfo);
        DateList[0].innerHTML = currentTime;

        
        if (ItemsData == null) {
            ItemsData = new Array;
            PhoneData = new Array;
            DateData = new Array;
            RewardCode = new Array;
            Rewards = new Array;
            
        }
        
        ItemsData.push(list);
        DateData.push(currentTime);

        ('0'.charCodeAt(0) <= CustomerInfo[0].charCodeAt(0) && CustomerInfo[0].charCodeAt(0) <= '9'.charCodeAt(0) ? PhoneData.push(CustomerInfo) : RewardCode.push(CustomerInfo));
        Rewards.push(CustomerInfo);
        
        sessionStorage.setItem("Item", JSON.stringify(ItemsData));
        sessionStorage.setItem("Name", JSON.stringify(Rewards));
        sessionStorage.setItem("Phone", JSON.stringify(PhoneData));
        sessionStorage.setItem("RWC", JSON.stringify(RewardCode));
        sessionStorage.setItem("Date", JSON.stringify(DateData));

        // DataHandler(list,CustomerInfo,currentTime);
    }
    function showPopUp(items, imgLink) {
        isClosePopUp = true;

        const close_pop_up = document.getElementById('close-pop-up');
        const item = document.querySelector('#close-pop-up #ItemsAlert');
        let items_img = document.querySelector('#close-pop-up img');


        items_img.src = `Images/HinhSanPham/${imgLink}.png`;
        item.innerHTML = `Bạn đã nhận được ${items}! `;
        close_pop_up.classList.remove('d-none');
    }
    function hidePopUp() {
        isClosePopUp = false;
        isInfoPopUp = false;

        const close_pop_up = document.getElementById('close-pop-up');
        const info_pop_up = document.getElementById('info-pop-up');

        close_pop_up.classList.add('d-none');
        info_pop_up.classList.add('d-none');
    }

    function checkState() {
        const input = document.querySelector('#info-pop-up input');
        if (isInfoPopUp && !isClosePopUp) {

            if (removeStartSpace(input.value) == '') return;
            else {
                //Save Data Here
                input.value = removeStartSpace(input.value);
                CustomerInfo = input.value;

                hidePopUp();
                rotateCanvas();
            }
        }
        else if (isClosePopUp && !isInfoPopUp) {
            input.value = '';

            hidePopUp();
            showInfoPopUp();
        }
    }

    function checkKeyPress(e) {
        if (e.keyCode == 13) {
            checkState();
        }
    }
    onScreenResize();
    window.addEventListener('resize', onScreenResize);

    window.addEventListener('keypress', checkKeyPress);
    document.querySelector('#wheel-container #wheel').addEventListener('click', checkState);
    canvas.addEventListener('click', checkState);
    document.querySelector('#info-pop-up>div').addEventListener('click', checkState);
    document.querySelector('#close-pop-up>div').addEventListener('click', checkState);
    showInfoPopUp();
}