// --- FUNGSI TOMBOL BACK TO TOP ---
const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

backToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// --- MENU TOGGLE (HAMBURGER MENU) UNTUK MOBILE ---
const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.getElementById("nav-menu");

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener("click", function() {
        navMenu.classList.toggle("active");
        // Ubah ikon antara bar dan silang (X) jika diinginkan
        const icon = mobileMenu.querySelector("i");
        if (navMenu.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });
}

// --- LOGIKA MENAMPILKAN HALAMAN BERDASARKAN KLIK NAVIGASI ---
const navLinks = document.querySelectorAll("#nav-menu a");
const sections = document.querySelectorAll("section[id]");

// Fungsi sinkronisasi warna menu aktif sesuai section yang ber-class "active"
function syncActiveMenu() {
    const activeSection = document.querySelector("section.active");
    if (activeSection) {
        const id = activeSection.getAttribute("id");
        navLinks.forEach(item => {
            if (item.getAttribute("href") === `#${id}`) {
                item.style.color = "var(--warna-utama)";
                item.style.fontWeight = "bold";
            } else {
                item.style.color = "var(--warna-gelap)";
                item.style.fontWeight = "500";
            }
        });
    }
}

// Jalankan sinkronisasi awal saat web dimuat pertama kali
syncActiveMenu();

navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault(); // Mencegah lompatan scroll default
        
        // Sembunyikan menu dropdown kembali di tampilan mobile setelah menu di-klik
        if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            const icon = mobileMenu.querySelector("i");
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

        // Ambil ID target section dari atribut href
        const targetId = this.getAttribute("href").substring(1);

        // Sembunyikan semua section dan hanya tampilkan yang sesuai targetId
        sections.forEach(section => {
            if (section.getAttribute("id") === targetId) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });

        // Update warna menu aktif secara dinamis
        syncActiveMenu();

        // Scroll otomatis ke atas agar halaman baru mulai dari atas
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

// --- INTEGRASI FORM KONTAK LANGSUNG KE WHATSAPP ---
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah halaman me-refresh otomatis
        
        // Mengambil data dari form input
        const subject = document.getElementById('subject').value;
        const namaDepan = document.getElementById('nama-depan').value;
        const namaBelakang = document.getElementById('nama-belakang').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Menyusun teks template pesan WhatsApp secara rapi
        const teksWA = `Halo Djaya Interior,%0A%0ASaya ingin mengajukan pertanyaan via Form Website:%0A` +
                       `• *Nama Lengkap:* ${namaDepan} ${namaBelakang}%0A` +
                       `• *Kebutuhan Project:* ${subject}%0A` +
                       `• *Email:* ${email}%0A` +
                       `• *No. HP/WA:* ${phone}%0A` +
                       `• *Detail Pesan:* ${message}`;
        
        // Nomor WhatsApp tujuan Djaya Interior Pasuruan
        const nomorWA = "6285749041999"; 
        
        // Membuka tautan WhatsApp di tab baru
        window.open(`https://wa.me/${nomorWA}?text=${teksWA}`, '_blank');
    });
}