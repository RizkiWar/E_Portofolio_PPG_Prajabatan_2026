/* ============================================
   E-PORTFOLIO - ARTEFAK & MODAL JS
   Portfolio modal popup for artifact analysis
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalContent = document.getElementById('modalContent');
  const modalTriggers = document.querySelectorAll('.btn-modal');

  const artifactData = {
    'modal-rpp1': {
      title: 'RPP Siklus 1 - Deep Learning Assembly Tool Post',
      type: 'Rencana Pelaksanaan Pembelajaran (RPP)',
      fileUrl: 'https://drive.google.com/file/d/13HtahKdlZsOCvZQitf-nsfdewEUgTeHT/view?usp=sharing',
      context: 'RPP untuk mata pelajaran Gambar Teknik Manufaktur kelas XI SMK Negeri 2 Depok Sleman, topik perancangan gambar rakitan Tool Post menggunakan Autodesk Inventor selama 3 pertemuan (24 JP).',
      purpose: 'Memandu guru melaksanakan pembelajaran mendalam (deep learning) agar siswa mampu membuat assembly, menerapkan constraint, membuat drawing IDW, dan mengekspor PDF gambar kerja Tool Post sesuai standar industri.',
      pros: [
        'Mengintegrasikan tiga pendekatan pedagogis: Understanding by Design (UbD), Deep Learning (Berkesadaran-Bermakna-Menggembirakan), dan Sistem Among Tamansiswa secara koheren.',
        'Rubrik sumatif 9 aspek berbobot 100 sangat terstruktur dan transparan untuk penilaian objektif.',
        'Diferensiasi pembelajaran jelas: scaffolding untuk siswa lambat dan pengayaan (exploded view, isometric) untuk siswa cepat.'
      ],
      cons: [
        'Alokasi waktu 8 JP per pertemuan sangat padat, terutama Pertemuan 3 yang menuntut pembuatan 3 lembar drawing sekaligus.',
        'Tidak menyediakan alternatif asesmen bagi siswa yang mengalami kendala teknis berat di luar kontrol mereka.'
      ],
      theory: 'Menerapkan Understanding by Design (Wiggins & McTighe, 2005) dengan backward design 3 tahap, dikombinasikan dengan pendekatan Deep Learning Kemdikbud dan filosofi Among Ki Hadjar Dewantara (Ing Ngarsa Sung Tuladha, Ing Madya Mangun Karsa, Tut Wuri Handayani).'
    },
    'modal-materi1': {
      title: 'Handbook Siswa Siklus 1 - Assembly Tool Post Autodesk Inventor',
      type: 'Bahan Ajar / Handbook Siswa',
      fileUrl: 'https://drive.google.com/file/d/17Dta9nZyABe3j9t8P9DnovuKzn75m45l/view?usp=sharing',
      context: 'Bahan ajar pendukung LKM untuk siswa kelas XI Teknik Pemesinan SMK Negeri 2 Depok, berisi panduan lengkap alur kerja assembly Tool Post hingga ekspor PDF gambar kerja menggunakan Autodesk Inventor.',
      purpose: 'Memberikan referensi prosedural dan konseptual bagi siswa agar dapat secara mandiri menyelesaikan assembly Tool Post, menerapkan constraint, membuat drawing IDW 3 lembar, dan mengekspor PDF sesuai kriteria penilaian.',
      pros: [
        'Struktur sistematis dari pengenalan komponen hingga ekspor PDF, dilengkapi tabel kesalahan umum beserta solusinya.',
        'Menyediakan lembar praktik cek mandiri per pertemuan dan glosarium istilah teknis CAD.',
        'Visualisasi screenshot langkah kerja mempermudah siswa visual-kinestetik mengikuti prosedur.'
      ],
      cons: [
        'Konten sangat padat (9 bagian) untuk satu handbook; siswa mungkin kesulitan menavigasi bagian yang relevan.',
        'Belum menyertakan contoh gambar kerja PDF yang sudah jadi sebagai benchmark visual.'
      ],
      theory: 'Menerapkan prinsip scaffolding Vygotsky melalui panduan bertahap dalam Zone of Proximal Development, serta Project-Based Learning dengan produk autentik berupa PDF gambar kerja.'
    },
    'modal-asesmen1': {
      title: 'Instrumen Asesmen Siklus 1 - Tool Post',
      type: 'Instrumen Asesmen (Awal, Formatif, Sumatif)',
      fileUrl: 'https://drive.google.com/file/d/1SJhusFCTSfJd1659mWUAMIJrQBfO3nmM/view?usp=sharing',
      context: 'Dokumen instrumen asesmen lengkap untuk Siklus 1, mencakup asesmen awal, lembar observasi formatif, checklist mandiri, rubrik sumatif 9 aspek, pedoman penskoran, dan lembar rekap nilai.',
      purpose: 'Menyediakan alat ukur komprehensif untuk memetakan kesiapan awal siswa, memantau proses praktik secara formatif, dan menilai produk akhir PDF gambar kerja Tool Post secara objektif.',
      pros: [
        'Alur asesmen bertahap (awal-formatif-sumatif) sangat jelas dengan pemisahan tegas antara asesmen non-nilai dan sumatif.',
        'Rubrik rinci per aspek dengan deskriptor 5 level (0-4) dan rumus konversi bobot memungkinkan penilaian konsisten.',
        'Menyertakan instrumen refleksi murid dan catatan guru yang mendukung assessment as learning.'
      ],
      cons: [
        'Rubrik 9 aspek x 5 level menghasilkan beban penilaian yang berat bagi guru jika menilai banyak siswa.',
        'Asesmen awal hanya berupa 5 pertanyaan terbuka tanpa rubrik penskoran kuantitatif.'
      ],
      theory: 'Mengacu pada Assessment for Learning, Assessment as Learning, dan Assessment of Learning (Earl, 2013), dengan rubrik analitik berbobot sejalan dengan authentic assessment (Mueller, 2005).'
    },
    'modal-lkm1': {
      title: 'LKM Siklus 1 Pertemuan 1 - Assembly Tool Post',
      type: 'Lembar Kerja Murid (LKM)',
      fileUrl: 'https://drive.google.com/file/d/1mcGkRJtcLVytwnXn7z2mykJoX9hgZZ9R/view?usp=sharing',
      context: 'Lembar kerja siswa untuk Pertemuan 1 Siklus 1, memandu siswa membuat file assembly .iam dan menempatkan 8 komponen Tool Post di Autodesk Inventor.',
      purpose: 'Memandu siswa secara prosedural untuk membuat file assembly, menempatkan seluruh komponen sesuai BOM, dan menetapkan Tool Holder sebagai Grounded Component.',
      pros: [
        'Format checklist dengan kolom "Sudah/Perlu bimbingan" memungkinkan self-assessment dan identifikasi kebutuhan bimbingan.',
        'Tabel komponen lengkap dengan jumlah dan fungsi singkat membantu verifikasi kelengkapan assembly.'
      ],
      cons: [
        'Tidak menyertakan ilustrasi/screenshot langkah kerja sehingga siswa bergantung pada demonstrasi guru.',
        'Kolom catatan kendala terlalu sempit untuk dokumentasi permasalahan teknis kompleks.'
      ],
      theory: 'Menerapkan guided practice dari Cognitive Apprenticeship (Collins, Brown & Newman, 1989) di mana siswa mengikuti prosedur eksplisit dengan monitoring bertahap.'
    },
    'modal-lkm1-p2': {
      title: 'LKM Siklus 1 Pertemuan 2 - Constraint dan Cek DOF',
      type: 'Lembar Kerja Murid (LKM)',
      fileUrl: 'https://drive.google.com/file/d/1Z3_glCt5CahLNMVduJ6XUMTLAjnhsl6d/view?usp=sharing',
      context: 'Lembar kerja siswa untuk Pertemuan 2 Siklus 1, memandu penerapan constraint Mate, Flush, Insert, dan Angle pada assembly Tool Post hingga DOF = 0.',
      purpose: 'Memandu siswa menerapkan empat jenis constraint secara berurutan agar hubungan antar komponen stabil dan rakitan siap untuk drawing IDW.',
      pros: [
        'Tabel constraint dilengkapi fungsi dan contoh spesifik pada Tool Post.',
        'Target DOF = 0 sebagai indikator keberhasilan memberikan ukuran objektif yang dapat dicek mandiri.'
      ],
      cons: [
        'Urutan constraint bersifat linear, padahal praktik mungkin perlu pendekatan iteratif.',
        'Tidak ada panduan troubleshooting jika terjadi over-constraint atau konflik.'
      ],
      theory: 'Berbasis scaffolded practice (Bruner, 1966) dengan pengurangan bantuan bertahap: demonstrasi, imitasi dengan checklist, lalu pengecekan mandiri melalui indikator DOF.'
    },
    'modal-lkm3': {
      title: 'LKM Siklus 1 Pertemuan 3 - Drawing IDW dan Export PDF',
      type: 'Lembar Kerja Murid (LKM)',
      fileUrl: 'https://drive.google.com/file/d/1YuJtd6sDCAwnYJ2eVZJI71GClZ6ep8et/view?usp=sharing',
      context: 'Lembar kerja siswa untuk Pertemuan 3 Siklus 1, memandu pembuatan drawing .idw 3 lembar beserta BOM, balloon, title block, dan ekspor PDF sebagai produk akhir sumatif.',
      purpose: 'Memandu siswa menghasilkan PDF gambar kerja Tool Post 3 lembar yang lengkap dan memenuhi rubrik 9 aspek penilaian sumatif.',
      pros: [
        'Checklist akhir 10 item sebelum upload PDF berfungsi sebagai quality control mandiri.',
        'Menyertakan rubrik penilaian ringkas langsung di LKM sehingga siswa memahami ekspektasi saat mengerjakan.',
        'Kolom refleksi tiga bagian (dikuasai/sulit/bantuan) mendorong metakognisi siswa.'
      ],
      cons: [
        'Beban kerja Pertemuan 3 sangat tinggi (3 lembar drawing + semua elemen + refleksi) dalam satu sesi 8 JP.',
        'Tidak ada contoh visual hasil drawing yang benar sebagai acuan perbandingan.'
      ],
      theory: 'Menerapkan Project-Based Learning (Larmer & Mergendoller, 2015) dengan produk autentik dan self-regulation melalui checklist metakognitif, sejalan dengan Assessment as Learning.'
    },
    'modal-media1': {
      title: 'Media Pembelajaran Pertemuan 1 - Assembly Tool Post',
      type: 'Media Pembelajaran (Slide Presentasi)',
      fileUrl: 'https://drive.google.com/file/d/1EUubB5nRb-d2RGyJCrDbUVBlOO3ZwAxq/view?usp=sharing',
      context: 'Slide presentasi 11 halaman untuk Pertemuan 1 Siklus 1, digunakan guru saat demonstrasi di lab CAD untuk memandu Assembly Environment, Place Component, dan Grounded Component.',
      purpose: 'Menyajikan visualisasi langkah kerja assembly Tool Post secara bertahap agar siswa memahami konsep file .ipt/.iam/.idw, Place Component, serta Grounded Component.',
      pros: [
        'Pertanyaan pemantik kontekstual efektif menghubungkan praktik digital dengan realitas industri.',
        'Slide referensi 8 komponen lengkap dengan nama file .ipt berfungsi sebagai quick reference.',
        'Struktur slide mengikuti alur Among (Ing Ngarsa-Ing Madya-Tut Wuri) dengan exit ticket di akhir.'
      ],
      cons: [
        'Konten bergantung pada narasi guru; siswa yang absen sulit mempelajari ulang tanpa rekaman.',
        'Tidak menyertakan animasi atau video pendek proses Place Component.'
      ],
      theory: 'Mengacu pada Dual Coding Theory (Paivio, 1986) dan prinsip Multimedia Learning Mayer (2009) yang menekankan segmentasi informasi dalam chunk kecil per slide.'
    },
    'modal-media2': {
      title: 'Media Pembelajaran Pertemuan 2 - Constraint Assembly Tool Post',
      type: 'Media Pembelajaran (Slide Presentasi)',
      fileUrl: 'https://drive.google.com/file/d/1Ps_bbj5JMdrlZeTidPEPYYfbqokWq390/view?usp=sharing',
      context: 'Slide presentasi 11 halaman untuk Pertemuan 2 Siklus 1, memandu demonstrasi dan praktik penerapan constraint Mate, Flush, Insert, dan Angle pada assembly Tool Post.',
      purpose: 'Memvisualisasikan konsep dan prosedur empat jenis constraint agar siswa memahami fungsi, cara memilih permukaan yang tepat, serta cara mengecek DOF.',
      pros: [
        'Setiap jenis constraint disajikan dengan slide terpisah berisi definisi, langkah, dan kesalahan umum.',
        'Slide troubleshooting constraint memberikan panduan langsung yang dapat dirujuk saat praktik.',
        'Urutan kerja praktik P2 disajikan dalam format numbered steps yang jelas.'
      ],
      cons: [
        'Penjelasan perbedaan Mate vs Flush masih kurang kontrastif untuk siswa pemula.',
        'Tidak ada slide perbandingan before-after assembly sebelum dan sesudah constraint.'
      ],
      theory: 'Menerapkan Worked Example Effect (Sweller, 2006) dari Cognitive Load Theory, di mana demonstrasi langkah per langkah mengurangi beban kognitif ekstrinsik siswa.'
    },
    'modal-media3': {
      title: 'Media Pembelajaran Pertemuan 3 - Drawing Tool Post',
      type: 'Media Pembelajaran (Slide Presentasi)',
      fileUrl: 'https://drive.google.com/file/d/1J66nK1Tj4dIgvm9A9u0brBtIuvxo_gRz/view?usp=sharing',
      context: 'Slide presentasi 11 halaman untuk Pertemuan 3 Siklus 1, memandu pembuatan drawing .idw 3 lembar, BOM, balloon, title block, dan ekspor PDF gambar kerja Tool Post.',
      purpose: 'Memvisualisasikan prosedur pembuatan gambar kerja 2D dari model 3D assembly, termasuk komponen wajib drawing dan standar ekspor PDF.',
      pros: [
        'Slide "Komponen Drawing Wajib Ada" menyajikan 8 elemen esensial sebagai mental checklist.',
        'Checklist sumatif 9 aspek dengan bobot ditampilkan langsung sehingga siswa memahami prioritas penilaian.',
        'Slide troubleshooting akhir sangat praktis untuk penyelesaian masalah saat ekspor.'
      ],
      cons: [
        'Tidak menyertakan contoh PDF gambar kerja yang sudah memenuhi semua 9 aspek rubrik.',
        'Materi drawing environment yang kompleks dipadatkan dalam 11 slide, berpotensi terlalu cepat.'
      ],
      theory: 'Mengacu pada Goal-Free Effect (Sweller, 1988) dengan target produk di awal, serta Signaling Principle (Mayer, 2009) melalui highlight bobot terbesar pada rubrik.'
    },
    'modal-toolpost': {
      title: 'Job Sheet Tool Post',
      type: 'Gambar Teknik',
      fileUrl: 'https://drive.google.com/file/d/1HGyN7VOBQYgdXj3-IszSVntb4yltAMt_/view?usp=sharing',
      context: 'File gambar rakitan Tool Post hasil revisi, digunakan sebagai referensi objek praktik Assembly di Siklus 1.',
      purpose: 'Siswa menggunakan dimensi dan bentuk pada file ini sebagai acuan perakitan komponen.',
      pros: ['Detail presisi sangat jelas sebagai referensi utama untuk objek rakitan.'],
      cons: ['Bukan modul ajar, murni hanya gambar teknik tanpa instruksi urutan pasang.'],
      theory: 'Berfungsi sebagai authentic material yang merepresentasikan dokumen kerja nyata di industri manufaktur, mendukung prinsip Contextual Teaching and Learning (CTL).'
    },
    'modal-rpp2': {
      title: 'RPP Siklus 2 - Inovasi Pembelajaran',
      type: 'Rencana Pelaksanaan Pembelajaran (RPP)',
      fileUrl: 'https://drive.google.com/file/d/1ZA9QdvQr6je_JHCprcPOy62WWKSISAaF/view?usp=sharing',
      context: 'RPP ini disusun untuk pelaksanaan Siklus 2 dengan penyesuaian berdasarkan refleksi hasil belajar pada Siklus 1.',
      purpose: 'Mengarahkan proses pembelajaran Siklus 2 agar strategi, aktivitas, dan asesmen lebih tepat sasaran terhadap kebutuhan siswa.',
      pros: [
        'Memuat perbaikan langkah pembelajaran berdasarkan evaluasi siklus sebelumnya.',
        'Memberikan arah yang lebih fokus untuk penguatan kompetensi pada Siklus 2.'
      ],
      cons: [
        'Masih membutuhkan validasi lanjutan setelah implementasi penuh di kelas.',
        'Beberapa aktivitas mungkin perlu diferensiasi lebih rinci sesuai profil siswa.'
      ],
      theory: 'Mengacu pada prinsip reflective practice dalam Penelitian Tindakan Kelas, yaitu perbaikan pembelajaran berkelanjutan antar siklus.'
    },
    'modal-asesmen2': {
      title: 'Perangkat Asesmen Siklus 2',
      type: 'Instrumen Asesmen Siklus 2',
      fileUrl: 'https://drive.google.com/file/d/1JfYVk4iEimTrBkIMsdm8se5tzNjzwpzz/view?usp=sharing',
      context: 'Perangkat asesmen untuk Siklus 2 disiapkan untuk memotret perkembangan pemahaman dan keterampilan siswa setelah tindak lanjut dari Siklus 1.',
      purpose: 'Menilai proses dan hasil belajar pada Siklus 2 secara lebih terarah agar data evaluasi dapat digunakan untuk refleksi pembelajaran berikutnya.',
      pros: [
        'Instrumen dirancang untuk memantau kemajuan belajar siswa pada tahap lanjutan.',
        'Dapat menjadi dasar refleksi guru dalam menentukan strategi penguatan.'
      ],
      cons: [
        'Perlu uji konsistensi skor jika digunakan oleh lebih dari satu penilai.',
        'Masih memerlukan penyempurnaan indikator untuk konteks kelas yang berbeda.'
      ],
      theory: 'Bersandar pada konsep assessment for learning, di mana hasil asesmen digunakan sebagai umpan balik perbaikan pembelajaran.'
    },
    'modal-materi2': {
      title: 'Bahan Ajar Siklus 2',
      type: 'Bahan Ajar',
      fileUrl: 'https://drive.google.com/file/d/1iERRUFToo_4ckzTqBm1CKgQ7eixDdtsF/view?usp=sharing',
      context: 'Bahan ajar Siklus 2 ini menjadi pendamping kegiatan belajar untuk memperdalam materi setelah evaluasi Siklus 1.',
      purpose: 'Membantu siswa memahami kembali konsep inti dan menerapkannya dalam tugas pembelajaran Siklus 2.',
      pros: [
        'Materi difokuskan pada penguatan konsep yang masih perlu ditingkatkan.',
        'Dapat digunakan siswa sebagai referensi belajar mandiri.'
      ],
      cons: [
        'Konten masih bersifat umum dan bisa diperdalam dengan contoh kontekstual tambahan.',
        'Perlu integrasi lebih lanjut dengan aktivitas diferensiasi.'
      ],
      theory: 'Sejalan dengan teori scaffolding, materi pendukung diberikan untuk membantu siswa mencapai kompetensi target secara bertahap.'
    },
    'modal-lkm2': {
      title: 'LKM Siklus 2',
      type: 'Lembar Kerja Murid (LKM)',
      fileUrl: 'https://drive.google.com/file/d/1u8pM1xoKZZcD-_1AL0LoqnMQY0W-JC1d/view?usp=sharing',
      context: 'LKM Siklus 2 digunakan untuk memandu aktivitas belajar siswa secara bertahap sesuai fokus perbaikan siklus.',
      purpose: 'Memberikan panduan kerja terstruktur agar siswa aktif, terarah, dan mampu menyelesaikan tugas pembelajaran Siklus 2.',
      pros: [
        'Langkah kerja membantu siswa mengikuti proses belajar secara sistematis.',
        'Mendukung keterlibatan aktif siswa selama pelaksanaan Siklus 2.'
      ],
      cons: [
        'Instruksi perlu disesuaikan lebih spesifik untuk variasi kemampuan siswa.',
        'Membutuhkan ruang refleksi yang lebih luas untuk umpan balik individual.'
      ],
      theory: 'Menggunakan pendekatan guided practice yang menekankan pendampingan bertahap hingga siswa lebih mandiri.'
    },
    'modal-media-s2': {
      title: 'Media Presentasi (PPT) Siklus 2',
      type: 'Media Pembelajaran (Slide Presentasi)',
      fileUrl: 'https://drive.google.com/file/d/1Vp0AWdM7qEqq1TC_zvRLVwuGaeqSxNyo/view?usp=sharing',
      context: 'Media presentasi Siklus 2 disiapkan untuk memperjelas alur pembelajaran dan menekankan poin perbaikan dari siklus sebelumnya.',
      purpose: 'Membantu guru menyajikan materi secara visual dan membantu siswa memahami konsep secara lebih terstruktur pada Siklus 2.',
      pros: [
        'Visual presentasi memudahkan penyampaian inti materi secara ringkas.',
        'Dapat meningkatkan fokus siswa saat pembelajaran berlangsung.'
      ],
      cons: [
        'Efektivitas media sangat bergantung pada strategi penyajian guru.',
        'Perlu pengayaan contoh praktik agar tidak hanya bersifat informatif.'
      ],
      theory: 'Selaras dengan prinsip multimedia learning, yaitu kombinasi teks dan visual untuk meningkatkan pemahaman siswa.'
    },
    'modal-bench-vise2': {
      title: 'Job Sheet Bench Vise Siklus 2',
      type: 'Jobsheet / Gambar Kerja',
      fileUrl: 'https://drive.google.com/file/d/1UBkwO2ZI1SxuAzPomElc8yiNGclT3lv_/view?usp=sharing',
      context: 'Jobsheet Bench Vise digunakan sebagai referensi praktik pada Siklus 2 untuk membantu siswa memahami bentuk, komponen, dan tuntutan pengerjaan objek kerja.',
      purpose: 'Memberikan acuan teknis dan visual agar siswa dapat mengerjakan tugas praktik Bench Vise secara lebih terarah dan sesuai standar gambar kerja.',
      pros: [
        'Objek Bench Vise relevan untuk latihan membaca gambar teknik dan memahami komponen mekanik.',
        'Dapat menjadi panduan praktik yang konkret bagi siswa selama pengerjaan Siklus 2.'
      ],
      cons: [
        'Perlu pendampingan guru jika siswa belum familiar dengan detail komponen Bench Vise.',
        'Instruksi praktik mungkin perlu dilengkapi dengan langkah kerja bertahap sesuai kemampuan siswa.'
      ],
      theory: 'Mendukung contextual teaching and learning melalui penggunaan dokumen kerja autentik sebagai sumber belajar praktik.'
    }
  };

  function getEmbedUrl(url) {
    if (!url) return '';
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (driveMatch) {
      return 'https://drive.google.com/file/d/' + driveMatch[1] + '/preview';
    }
    return url;
  }

  function highlightText(text) {
    if (!text) return '';
    // **bold** -> <strong> with color
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#FF6B6B;">$1</strong>');
    // numbers/percentages auto-bold
    text = text.replace(/\b(\d+[\d,.]*\s?(?:%|JP|jam|aspek|level|halaman|item|komponen|lembar|menit|detik))/g, '<strong style="color:#0F5EA8;">$1</strong>');
    return text;
  }

  function openModal(modalId, viewMode) {
    const data = artifactData[modalId] || artifactData['modal-rpp1'];
    const fileUrl = data.fileUrl || '';
    const embedUrl = getEmbedUrl(fileUrl);
    const isDrive = /drive\.google\.com/i.test(fileUrl);
    const canPreview = Boolean(fileUrl && (isDrive || /\.pdf(?:$|[?#])/i.test(fileUrl)));

    if (viewMode === 'pdf' && canPreview) {
      modalContent.innerHTML = '<div class="modal-header" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; border-bottom: none; padding-bottom: 0; gap: 15px; padding-right: 30px;"><div style="flex: 1; min-width: 250px;"><h3 style="margin-bottom: 4px; font-size: 1.3rem;">' + data.title + '</h3><p style="margin-bottom: 0;">Preview Dokumen</p></div><a href="' + fileUrl + '" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 6px; padding: 10px 18px; background: #2EC4B6; color: #FFFFFF; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 0.9rem; box-shadow: 0 4px 12px rgba(46,196,182,0.3); z-index: 5;">Buka di Tab Baru &nearr;</a></div><div class="modal-body" style="height: 75vh; padding-top: 20px;"><iframe src="' + embedUrl + '" style="width: 100%; height: 100%; border: 1px solid #DEE2E8; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);" title="PDF Preview"></iframe></div>';
    } else {
      var prosHtml = data.pros.map(function(p) { return '<li style="margin-bottom: 8px; padding: 6px 0;"><span style="color:#2EC4B6;font-weight:700;margin-right:8px;font-size:1.1em;">&#10003;</span>' + highlightText(p) + '</li>'; }).join('');
      var consHtml = data.cons.map(function(c) { return '<li style="margin-bottom: 8px; padding: 6px 0;"><span style="color:#FF6B6B;font-weight:700;margin-right:8px;font-size:1.1em;">&#9888;</span>' + highlightText(c) + '</li>'; }).join('');

      var filePreviewHtml = '';
      if (canPreview) {
        filePreviewHtml = '<div class="pdf-preview" style="margin-top: 30px; border-top: 2px dashed #DEE2E8; padding-top: 20px;"><div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; margin-bottom: 16px; gap: 10px;"><h4 style="margin: 0;">Preview Dokumen Full</h4><a href="' + fileUrl + '" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 6px 14px; background: #EEF0F4; color: #2EC4B6; border-radius: 6px; font-weight: 600; text-decoration: none; font-size: 0.85rem;">Buka di Tab Baru &nearr;</a></div><iframe src="' + embedUrl + '" style="width: 100%; height: 60vh; border: 1px solid #DEE2E8; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);" title="PDF Preview"></iframe></div>';
      } else if (fileUrl) {
        filePreviewHtml = '<div class="modal-files" style="margin-top: 20px;"><h4>File Artefak</h4><a href="' + fileUrl + '" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; background: #FF6B6B; color: #FFFFFF; border-radius: 8px; font-weight: 600; text-decoration: none;">Buka File</a></div>';
      }

      modalContent.innerHTML = '<div class="modal-header"><h3 style="font-size: 1.5rem; color: #0F5EA8;">' + data.title + '</h3><p style="color: #666; font-style: italic;">' + data.type + '</p></div><div class="modal-body"><h4 style="color: #0F5EA8; border-left: 3px solid #2EC4B6; padding-left: 10px;">Konteks Pembuatan</h4><p>' + highlightText(data.context) + '</p><h4 style="color: #0F5EA8; border-left: 3px solid #F7C05B; padding-left: 10px;">Tujuan</h4><p>' + highlightText(data.purpose) + '</p><h4 style="color: #0F5EA8; border-left: 3px solid #2EC4B6; padding-left: 10px;">Kelebihan & Kekurangan</h4><ul style="list-style: none; padding-left: 0;">' + prosHtml + consHtml + '</ul><h4 style="color: #0F5EA8; border-left: 3px solid #9B72CF; padding-left: 10px;">Kajian Teori</h4><p style="font-style: italic; border-left: 2px solid #ddd; padding-left: 12px; color: #555;">' + highlightText(data.theory) + '</p>' + filePreviewHtml + '</div>';
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      openModal(btn.getAttribute('data-modal'), btn.getAttribute('data-view'));
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

});
