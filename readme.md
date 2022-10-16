## Asumsi-asumsi: 
    -   Sebenarnya saya ingin buat function, tapi karena ada syarat tambahan dari GCP terkait function jadi saya buat yg express app aja :D
    -   Saya pikir validasi lebih baik dilakukan di luar controller, sehingga controller langsung dapat request data yang valid dan code di controller tdk terlalu menumpuk
    -   Untuk menampilkan course masih menggunkan courseId, sebenarnya lebih baik pakai slug karena lebih SEO friendly itulah mengapa saya buat slug harus unik tetapi problemnya query pakai where returnnya array of object  jadi saya pakai courseId untuk menampilkan satu object
    -   Saya berasumsi frirestore dalam menampikan data lazy load, itulah mengapa agak dalam kalau mapping real data
    -   Saya tidak tau cara terbaik membuat relasi di firestore, setahu saya ada dua metode yaitu melakukan emmbeded document dan menyimpan key docment terkai (foreginkey), yg saya pilih AKA foreginkey 