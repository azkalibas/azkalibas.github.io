function searchProducts() {
    const input = document.getElementById('searchInput').value.toLowerCase().trim();
    const products = document.getElementsByClassName('product-card');
    
    // Membatalkan timeout sebelumnya untuk menghindari multiple searches
    clearTimeout(window.searchTimeout);
    
    // Jika input kosong, tampilkan semua produk
    if (input === '') {
        Array.from(products).forEach(product => {
            product.style.display = '';
        });
        return;
    }
    
    // Debounce search untuk performa lebih baik
    window.searchTimeout = setTimeout(() => {
        // Convert ke Array dan cache DOM queries
        Array.from(products).forEach(product => {
            const title = product.querySelector('.card-title')?.innerText.toLowerCase() || '';
            const description = product.querySelector('.card-description')?.innerText.toLowerCase() || '';
            
            // Menggunakan includes untuk pencarian partial
            const isMatch = title.includes(input) || description.includes(input);
            product.style.display = isMatch ? '' : 'none';
        });
    }, 300);
}

document.getElementById('searchInput').addEventListener('input', searchProducts);

document.addEventListener('DOMContentLoaded', function () {
    // Menangani pengiriman form Sign Up
    document.getElementById('signupForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Mencegah form untuk reload halaman

        // Mengambil nilai input dari form
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;

        // Validasi Password dan Konfirmasi Password
        if (password !== confirmPassword) {
            alert("Password dan Konfirmasi Password tidak sama!");
            return;
        }

        // Menyimpan data pengguna di LocalStorage (untuk demonstrasi saja)
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);

        // Menampilkan informasi yang dimasukkan
        document.getElementById('signupMessage').style.display = 'block';  // Menampilkan div signupMessage
        document.getElementById('displayName').innerText = name;  // Menampilkan nama
        document.getElementById('displayEmail').innerText = email;  // Menampilkan email
        document.getElementById('displayPassword').innerText = password;  // Menampilkan password (hati-hati di aplikasi nyata)

        // Menutup modal setelah form dikirim
        var modal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
        modal.hide(); // Menutup modal

        // Clear form setelah submit
        document.getElementById('signupForm').reset();
    });
});