// =====================
//  LIGHTBOX (ZOOM)
// =====================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

function openLightbox(src) {
  lightbox.style.display = "flex";
  lightboxImg.src = src;
}

closeLightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Tutup lightbox jika klik area luar
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// ESC untuk menutup
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.style.display = "none";
  }
});


// =====================
//  GALERI & LOCALSTORAGE
// =====================

const gallery = document.querySelector(".masonry-gallery");
const uploadInput = document.getElementById("uploadInput");
const uploadBtn = document.getElementById("uploadBtn");

// Ambil data dari localStorage
let storedImages = JSON.parse(localStorage.getItem("galleryImages")) || [];

// Tampilkan foto dari localStorage saat halaman dibuka
storedImages.forEach(addImageToGallery);


// =====================
//  UPLOAD FOTO
// =====================

uploadBtn.addEventListener("click", () => {
  const file = uploadInput.files[0];
  if (!file) {
    alert("Pilih foto terlebih dahulu!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageData = e.target.result;

    // Simpan ke awal list
    storedImages.unshift(imageData);
    localStorage.setItem("galleryImages", JSON.stringify(storedImages));

    // Tampilkan ke galeri
    addImageToGallery(imageData);

    uploadInput.value = ""; // reset input
  };

  reader.readAsDataURL(file);
});


// =====================
//  TAMBAH GAMBAR KE GALERI
// =====================

function addImageToGallery(imgSrc) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("img-wrapper");

  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = "Uploaded Photo";

  // Klik gambar => lightbox
  img.addEventListener("click", () => openLightbox(imgSrc));

  // Tombol download
  const downloadBtn = document.createElement("div");
  downloadBtn.classList.add("download-btn");
  downloadBtn.innerText = "Download";

  downloadBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    downloadImage(imgSrc);
  });

  // Tombol hapus
  const deleteBtn = document.createElement("div");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerText = "Delete";

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Jangan buka lightbox

    // Hapus dari DOM
    wrapper.remove();

    // Hapus dari localStorage
    storedImages = storedImages.filter((img) => img !== imgSrc);
    localStorage.setItem("galleryImages", JSON.stringify(storedImages));
  });

  wrapper.appendChild(img);
  wrapper.appendChild(downloadBtn);
  wrapper.appendChild(deleteBtn);

  // Tampilkan di bagian teratas
  gallery.prepend(wrapper);
}

// =====================
//  DOWNLOAD GAMBAR
// =====================

function downloadImage(dataUrl) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = "foto-memory.png";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function randomMeter(){
const val = 100;
document.getElementById('fillBar').style.width = val + '%';
document.getElementById('persentase').innerText = '100% Sama kaya pertama kali kita dating!';
}

function randomMeterShut(){
const val = 0;
document.getElementById('fillBar').style.width = val + '%';
}

let timeLeft = 0.02; // 1 minute
const countdownTimer = setInterval(() => {
  // Decrement the time
  timeLeft--;

  if (timeLeft < 0) {
    // Clear the interval to stop the timer
    clearInterval(countdownTimer);
    randomMeterShut();
  }
}, 1000); // Update every second


function randomMeterShut(){
const val = 0;
document.getElementById('fillBar').style.width = val + '%';
}


