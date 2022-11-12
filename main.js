// tạo biến canvas
var canvas = document.getElementById("gamezone");
var context = canvas.getContext('2d');
var scoreshow = document.getElementById("score");
//khởi tạo 4 đối tượng
var hinhnenchinh = new Image();
var birdimg = new Image();
var ongtren = new Image();
var ongduoi = new Image();
// nạp các ảnh vào
hinhnenchinh.src = "images/hds.jpg";
birdimg.src = "images/bird.png";
ongtren.src = "images/ongtren.png";
ongduoi.src = "images/ongduoi.png";
//khoang cách hai ong
var score = 0;
var khoangcachhaiong = 200;
var khoangcachdenongduoi
// thiết lập vị trí của vật
var bird = {
    x: hinhnenchinh.width / 5,
    y: hinhnenchinh.height / 2
}
//tạo mảng chứa các ống
var ong = [];
ong[0] = {
    x: canvas.width,
    y: 0 // khởi tạo ống đầu tiên nằm bên phải ngoài cùng và y=0;
}

//tạo function để chạy trò chơi
function run() {
    // vẽ hinh nền và vật(bird)
    context.drawImage(hinhnenchinh, 0, 0);
    context.drawImage(birdimg, bird.x, bird.y);

    // vẽ hai ống
    for (var i = 0; i < ong.length; i++) {
        khoangcachdenongduoi = ongtren.height + khoangcachhaiong;
        context.drawImage(ongtren, ong[i].x, ong[i].y);
        // vẽ ống trên theo tọa độ của ống đó
        //  ống dưới phụ thuộc ống trên
        context.drawImage(ongduoi, ong[i].x, ong[i].y + khoangcachdenongduoi);

        ong[i].x -= 5; //để ống di chuyển

        // khi ống đến giữa màn hình
        if (ong[i].x == canvas.width / 2) {
            ong.push({
                x: canvas.width,
                y: Math.floor(Math.random() * ongtren.height) - ongtren.height // làm cho ống xuất hiện ngẫu nhiên
            })
        }
        if (ong[i].x == 0) ong.splice(0, 1); // nếu ống đụng lề trái thì xóa nó đi để tránh mảng ống

        if (ong[i].x == 180) {
            score++;

        }
        // điều kiện khi thua
        if (bird.y < 0 || bird.y > 500 || //khi chiều cao của vật chạm vào canvas sẽ thua
            bird.x + birdimg.width >= ong[i].x && bird.x <= ong[i].x + ongtren.width //
            && (bird.y <= ong[i].y + ongtren.height ||
                bird.y + birdimg.height >= ong[i].y + khoangcachdenongduoi)
        ) {
            alert('lose');
            location.reload();
            return;
        }
    }
    scoreshow.innerHTML = "score: " + score;

    // cho cho vật rơi xuống
    bird.y += 3;
    requestAnimationFrame(run);
}
//thêm function để nó bay lên khi nhấn
document.addEventListener("keydown", function () {
    bird.y -= 60;
})

run();







