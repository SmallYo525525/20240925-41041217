// 定義卡片數量和組數
const totalCardsPerSet = 8;
const numberOfSets = 2;  // 兩組卡片
const totalCards = totalCardsPerSet * numberOfSets; // 總共16張卡片

// 預設圖片路徑
let currentImageType = '動物';
let frontImagePath = `./image/${currentImageType}/front.png`;
let backImageBasePath = `./image/${currentImageType}/`;

// 生成背面圖片路徑的陣列
let backImages = [];
for (let i = 1; i <= totalCardsPerSet; i++) {
  const imagePath = `${backImageBasePath}${String(i).padStart(2, '0')}.png`;
  backImages.push(imagePath); // 將每個背面圖片加入陣列
}

// 將兩組背面圖片合併（使陣列有16個元素）
backImages = backImages.concat(backImages);

// 隨機打亂陣列，避免卡片成對排列
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// 選取卡片容器
const cardsContainer = document.getElementById('cards-container');

// 開始遊戲函數
function startGame() {
  // 清空卡片容器
  cardsContainer.innerHTML = '';

  // 隨機打亂背面圖片
  const shuffledBackImages = shuffleArray([...backImages]);

  // 動態生成隨機排列的卡片
  for (let i = 0; i < totalCards; i++) {
    // 創建卡片元素
    const card = document.createElement('div');
    card.classList.add('card');
    
    // 創建卡片背面
    const backFace = document.createElement('div');
    backFace.classList.add('card-face', 'back');
    const backImage = document.createElement('img');
    backImage.src = shuffledBackImages[i]; // 隨機排列的背面圖片
    backFace.appendChild(backImage);

    // 創建卡片正面
    const frontFace = document.createElement('div');
    frontFace.classList.add('card-face', 'front');
    const frontImage = document.createElement('img');
    frontImage.src = frontImagePath;
    frontFace.appendChild(frontImage);

    // 將背面和正面加到卡片中
    card.appendChild(backFace);
    card.appendChild(frontFace);

    // 為卡片添加點擊事件以實現翻轉效果
    card.addEventListener('click', () => {
      card.classList.toggle('flip');
    });

    // 將卡片添加到容器中
    cardsContainer.appendChild(card);
  }

  // 將卡片翻為背面
  flipAllToBack();

  // 禁用卡片點擊事件
  disableCardClick();

  // 倒數10秒後翻回正面
  setTimeout(() => {
    flipAllToFront();
    // 啟用卡片點擊事件
    enableCardClick();
  }, 10000); // 10000毫秒 = 10秒
}

// 禁用卡片點擊事件
function disableCardClick() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.pointerEvents = 'none'; // 禁用所有卡片的點擊事件
  });
}

// 啟用卡片點擊事件
function enableCardClick() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.pointerEvents = 'auto'; // 啟用所有卡片的點擊事件
  });
}

// 切換圖片類型
function changeImageType() {
  const selectElement = document.getElementById('imageType');
  currentImageType = selectElement.value;
  frontImagePath = `/記憶大考驗/image/${currentImageType}/front.png`;
  backImageBasePath = `/記憶大考驗/image/${currentImageType}/`;

  // 更新背面圖片
  backImages = [];
  for (let i = 1; i <= totalCardsPerSet; i++) {
    const imagePath = `${backImageBasePath}${String(i).padStart(2, '0')}.png`;
    backImages.push(imagePath); // 將每個背面圖片加入陣列
  }

  // 將兩組背面圖片合併
  backImages = backImages.concat(backImages);
}

// 將所有卡片翻到正面
function flipAllToFront() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.remove('flip');
  });
}

// 將所有卡片翻到背面
function flipAllToBack() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('flip');
    }, index * 200); // 每張卡片翻面間隔200毫秒
  });
}
