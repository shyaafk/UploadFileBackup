// Menyimpan kredensial login (contoh hardcoded untuk demo)
const validCredentials = {
  username: "Shya",
  password: "12301",
};

// Menangani proses login
function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorElement = document.getElementById("login-error");

  // Validasi login
  if (
    username === validCredentials.username &&
    password === validCredentials.password
  ) {
    // Login berhasil
    alert("Login Successful!");
    window.location.href = "file_storage.html"; // Redirect ke halaman file explorer
  } else {
    // Login gagal
    errorElement.style.display = "block";
  }
}

// Menangani upload file
function handleFileUpload(event) {
  const files = event.target.files;
  const fileExplorer = document.getElementById("file-explorer");

  // Mengambil data file yang sudah ada di localStorage (jika ada)
  let storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];

  // Menambahkan file baru ke dalam array
  Array.from(files).forEach((file) => {
    storedFiles.push({
      name: file.name,
      size: file.size,
      type: file.type,
    });
  });

  // Menyimpan kembali ke localStorage
  localStorage.setItem("uploadedFiles", JSON.stringify(storedFiles));

  // Menampilkan file yang telah di-upload
  renderFiles();
}

// Menampilkan file yang telah di-upload dari localStorage
function renderFiles() {
  const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
  const fileExplorer = document.getElementById("file-explorer");

  fileExplorer.innerHTML = ""; // Bersihkan file explorer sebelum menampilkan file baru

  // Menambahkan file ke dalam tampilan
  storedFiles.forEach((file, index) => {
    const fileDiv = document.createElement("div");
    fileDiv.classList.add("file-item");
    fileDiv.innerHTML = `
            <span>${file.name}</span>
            <span>${(file.size / 1024).toFixed(2)} KB</span>
            <button onclick="deleteFile(${index})">Delete</button>
        `;
    fileExplorer.appendChild(fileDiv);
  });

  // Menampilkan jumlah file
  document.getElementById(
    "file-count"
  ).textContent = `${storedFiles.length} file(s) uploaded`;
}

// Menghapus file dari localStorage
function deleteFile(index) {
  let storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
  storedFiles.splice(index, 1); // Menghapus file yang dipilih
  localStorage.setItem("uploadedFiles", JSON.stringify(storedFiles)); // Simpan ulang

  renderFiles(); // Render ulang file explorer
}

// Fungsi untuk clear semua file
function clearFiles() {
  localStorage.removeItem("uploadedFiles"); // Menghapus semua file dari localStorage
  renderFiles(); // Render ulang file explorer
}

// Menambahkan event listener untuk file upload
document
  .getElementById("file-upload")
  .addEventListener("change", handleFileUpload);

// Render file yang ada saat halaman dimuat
document.addEventListener("DOMContentLoaded", renderFiles);
