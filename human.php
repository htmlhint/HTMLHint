<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>RMS - feel the excellence</title>
  <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600&family=Nunito:wght@600;700;800&display=swap" rel="stylesheet">

  <!-- Icons -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">

  <!-- CSS Libraries -->
  <link href="lib/animate/animate.min.css" rel="stylesheet">
  <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
  <link href="lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />

  <!-- Bootstrap -->
  <link href="css/bootstrap.min.css" rel="stylesheet">

  <!-- Custom Styles -->
  <link href="css/style.css" rel="stylesheet">

  <style>
    /* Enhanced Navbar Styles */
    .custom-navbar {
      background: rgba(255, 255, 255, 0.1) !important;
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
      position: fixed !important;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10000 !important;
      padding: 0.5rem 0;
    }

    .custom-navbar.scrolled {
      background: rgba(255, 255, 255, 0.95) !important;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    .custom-navbar .navbar-brand img {
      max-height: 80px !important;
      transition: all 0.3s ease;
    }

    .custom-navbar.scrolled .navbar-brand img {
      max-height: 60px !important;
    }

    .custom-navbar .nav-link {
      color: white !important;
      font-weight: 500;
      margin: 0 0.5rem;
      padding: 0.75rem 1rem !important;
      border-radius: 25px;
      transition: all 0.3s ease;
    }

    .custom-navbar.scrolled .nav-link {
      color: #333 !important;
    }

    .custom-navbar .nav-link:hover,
.custom-navbar .nav-link.active {
  background: none !important;
  color: #0078C8 !important;
  border-bottom: 2px solid #00A651;
  box-shadow: none;
  transition: color 0.2s, border-bottom 0.2s;
}

    .custom-navbar .navbar-toggler {
      border: none;
      color: white;
      font-size: 1.2rem;
    }

    .custom-navbar.scrolled .navbar-toggler {
      color: #333;
    }

    /* Video Container Styles */
    .video-container {
      position: relative;
      overflow: hidden;
      height: 100vh;
    }

    .video-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }

  .video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Remove the background overlay */
  background: none !important;
  z-index: 2;
  pointer-events: none;
}

    .video-fallback {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      z-index: 1;
      display: none;
    }

    .hero-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      z-index: 3;
      max-width: 800px;
      width: 90%;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .hero-subtitle {
      font-size: 1.3rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn-primary-custom {
      background: #0A62FF;
      border: 2px solid #0A62FF;
      color: white;
      padding: 12px 30px;
      border-radius: 50px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .btn-primary-custom:hover {
      background: #0952CC;
      transform: translateY(-2px);
      box-shadow: 0 5px 20px rgba(10, 98, 255, 0.4);
      color: white;
      text-decoration: none;
    }

    .btn-outline-custom {
      background: transparent;
      border: 2px solid white;
      color: white;
      padding: 12px 30px;
      border-radius: 50px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-block;
    }

    .btn-outline-custom:hover {
      background: white;
      color: #333;
      transform: translateY(-2px);
      text-decoration: none;
    }

    /* Loading Spinner Improvements */
    #spinner.hide {
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    }

    #spinner.show {
      opacity: 1;
      visibility: visible;
    }

    .video-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      z-index: 4;
      display: none;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
      }

      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }

      .custom-navbar .navbar-brand img {
        max-height: 60px !important;
      }

      .custom-navbar.scrolled .navbar-brand img {
        max-height: 50px !important;
      }
    }

    @media (max-width: 576px) {
      .hero-title {
        font-size: 2rem;
      }

      .hero-content {
        width: 95%;
      }
    }
  </style>
</head>

<body>
  <!-- Spinner Start -->
  <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center" style="z-index: 10001;">
    <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <!-- Spinner End -->

  <!-- Fixed Navbar -->
<nav class="navbar navbar-expand-lg custom-navbar" id="navbar">
  <div class="container">
    <!-- Logo on the left -->
    <a href="index.php" class="navbar-brand p-0">
      <img src="img/logo.png" alt="RMS Logo" style="max-height: 80px;">
    </a>
    <!-- Hamburger for mobile -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
      <span class="fa fa-bars"></span>
    </button>
    <!-- Menu items on the right -->
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <div class="navbar-nav ms-auto">
        <a href="index.php" class="nav-item nav-link">Home</a>
        <a href="partners.php" class="nav-item nav-link">Partners</a>
        <a href="human.php" class="nav-item nav-link">Human Health</a>
        <a href="animal.php" class="nav-item nav-link">Animal Health</a>
        <a href="environement.php" class="nav-item nav-link">Environmental Health</a>
        <a href="about.php" class="nav-item nav-link">About Us</a>
        <a href="contact.php" class="nav-item nav-link">Contact</a>
      </div>
    </div>
  </div>
</nav>

   <!-- Hero Section with Video Background -->
  <div style="position: relative; overflow: hidden; height: 40vh; margin-bottom: 0; padding: 0;">
    <div class="video-container" style="height: 100%;">
      <!-- Video Loading Indicator -->
      <div class="video-loading" id="videoLoading">
        <div class="spinner-border text-light mb-3" role="status">
          <span class="sr-only">Loading video...</span>
        </div>
        <p>Loading video...</p>
      </div>
      <!-- Video Background -->
      <video id="heroVideo" class="video-background" autoplay muted loop playsinline preload="metadata" style="height: 100%;">
        <source src="VIDEOS/vd2.webm" type="video/webm">
        <source src="VIDEOS/vd2.mp4" type="video/mp4">
      </video>
      <!-- Fallback Background -->
      <div class="video-fallback" id="videoFallback"></div>
      <!-- Video Overlay -->
      <div class="video-overlay"></div>
      <!-- Scroll Indicator -->
      <div style="position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); color: white; animation: bounce 2s infinite;">
        <i class="fas fa-chevron-down" style="font-size: 1.5rem;"></i>
      </div>
    </div>
  </div>

  <!-- Section de Présentation (sous le logo) -->
<div id="w" class="container-xxl py-5" style="margin-top: 0 !important;">
  <div class="container">
    <div class="row g-3">
      <!-- Colonne gauche -->
      <div class="col-lg-6 col-md-6">
        <div style="color: #050505ff; font-size: 28px; padding-top: 20px; text-align: left; font-family: 'Times New Roman', Times, serif;">
          <span style="font-weight: bold;">
            A complete range of equipment dedicated to the
          </span>
          <span style="display: inline-block; width: 100%; text-align: center; font-weight: bold; font-size: 28px;">
            human sector
          </span>
          <div style="display: flex; align-items: center; justify-content: center; margin-top: 20px;">
            <div style="flex: 1; height: 2px; background-color: #1867bbff; max-width: 50px; margin-right: 15px;"></div>
            <span style="font-weight: normal; font-size: 20px;">
              Discover our full product portfolio
            </span>
            <div style="flex: 1; height: 2px; background-color: #1867bbff; max-width: 50px; margin-left: 15px;"></div>
          </div>
        </div>
      </div>
      <!-- Colonne droite -->
      <div class="col-lg-6 col-md-6">
        <div style="color: #050505ff; font-size: 18px; text-align: justify; font-family: 'Times New Roman', Times, serif; line-height: 1.6;">
          <p>We recognize the growing complexity and specific demands of human equipment and respond with precision by providing comprehensive systems that combine exceptional reliability with top-tier performance.</p>
          <p>Our state-of-the-art equipment represents the forefront of diagnostic innovation, seamlessly integrating into hospitals, clinics, private practices, and multidisciplinary centers.</p>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Products Section -->
<div id="products" class="container-xxl py-5" style="font-family: 'Times New Roman', Times, serif;">
  <div class="container">
    <div class="text-center">
      <h6 class="section-title bg-white text-center text-primary px-3" style="margin-bottom: 25px;">Products</h6>
      <h1 class="mb-5 mt-1">Our Products</h1>
    </div>

    <div class="p-4 rounded" style="border: 2px solid rgba(0, 99, 170, 0.2); background-color: rgba(0, 99, 170, 0.05);">
      <div class="row g-4 justify-content-center">

        <!-- Radiology -->
        <div class="col-md-6">
          <div class="d-flex align-items-center p-4 bg-white rounded shadow-sm h-100 border" style="border-color: rgba(0, 99, 170, 0.3);">
            <img src="img/icone1.jpg" alt="Radiology" style="max-height: 100px; margin-right: 20px;">
            <div>
              <h5 class="fw-bold mb-2">Radiology</h5>
              <p class="mb-2" style="font-size: 15px;">Advanced imaging solutions for diagnostics and medical visualization.</p>
              <button onclick="showRadiology()" class="btn btn-primary" style="background-color: #0063AA; border: none;">Learn more</button>
            </div>
          </div>
        </div>

        <!-- Cardiology -->
        <div class="col-md-6">
          <div class="d-flex align-items-center p-4 bg-white rounded shadow-sm h-100 border" style="border-color: rgba(0, 99, 170, 0.3);">
            <img src="img/icone2.jpg" alt="Cardiology" style="max-height: 140px; margin-right: 20px;">
            <div>
              <h5 class="fw-bold mb-2">Cardiology</h5>
              <p class="mb-2" style="font-size: 15px;">Advanced cardiac care and diagnostic solutions.</p>
               <button onclick="showCardiology()" class="btn btn-primary" style="background-color: #0063AA; border: none;">Learn more</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
<!-- Radiology Subcategories Section -->
<div id="radiologie" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif;">
  <div class="container">
    <div class="text-center">
      <h6 class="section-title bg-white text-center text-primary px-3" style="margin-bottom: 25px;">Radiology</h6> 
    </div>

    <div class="p-4 rounded" style="border: 2px solid rgba(0, 99, 170, 0.2); background-color: rgba(0, 99, 170, 0.05);">
      <div class="row g-4 justify-content-center">

        <!-- X-RAY -->
        <div class="col-md-3">
          <div onclick="showXraySection()" class="d-flex justify-content-center align-items-center text-center bg-white rounded shadow-sm h-100 border p-4" style="height: 150px; border-color: rgba(0, 99, 170, 0.3); cursor: pointer;">
            <h5 class="fw-bold mb-0">X-RAY</h5>
          </div>
        </div>

        <!-- Mammography -->
        <div class="col-md-3">
          <div onclick="showMammoSection()" class="d-flex justify-content-center align-items-center text-center bg-white rounded shadow-sm h-100 border p-4" style="height: 150px; border-color: rgba(0, 99, 170, 0.3); cursor: pointer;">
            <h5 class="fw-bold mb-0">Mammography</h5>
          </div>
        </div>

        <!-- Dental Imaging -->
        <div class="col-md-3">
          <div onclick="showDentalSection()" class="d-flex justify-content-center align-items-center text-center bg-white rounded shadow-sm h-100 border p-4" style="height: 150px; border-color: rgba(0, 99, 170, 0.3); cursor: pointer;">
            <h5 class="fw-bold mb-0">Dental Imaging</h5>
          </div>
        </div>

         <!-- Bone Densitometry -->
        <div class="col-md-3">
         <div onclick="showBoneDensitometrySection()" class="d-flex justify-content-center align-items-center text-center bg-white rounded shadow-sm h-100 border p-4" style="height: 150px; border-color: rgba(0, 99, 170, 0.3); cursor: pointer;">
          <h5 class="fw-bold mb-0">Bone Densitometry</h5>
        </div>
       </div>

        <!-- DR Consumables -->
        <div class="col-md-3">
          <div onclick="showConsumablesSection()" class="d-flex justify-content-center align-items-center text-center bg-white rounded shadow-sm h-100 border p-4" style="height: 150px; border-color: rgba(0, 99, 170, 0.3); cursor: pointer;">
            <h5 class="fw-bold mb-0">DR Consumables</h5>
          </div>
        </div>
        

      </div>

      <!-- Back button -->
      <div class="text-center mt-5">
        <button onclick="showProducts()" class="btn btn-outline-primary px-4">← Back to Products</button>
      </div>
    </div>
  </div>
</div>

<!-- Style personnalisé -->
<style>
  .nav-tabs .nav-link {
    color: #333;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    margin-right: 5px;
    border-radius: 8px 8px 0 0;
    font-weight: 500;
    padding: 10px 20px;
  }

  .nav-tabs .nav-link.active {
    background-color: #0870acff !important;
    color: #fff !important;
    border-color: #333333 #333333 #fff;
  }
</style>

<!-- MAMMOGRAPHY Equipment Tabs Section -->
<div id="mammo-section" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif;">
  <div class="container">
    <div class="text-center mb-4">
      <h6 class="section-title bg-white text-primary px-3">MAMMOGRAPHY</h6>
    </div>

    <!-- Tabs -->
    <ul class="nav nav-tabs justify-content-center mb-5" id="mammoTabs" role="tablist">
      <li class="nav-item">
        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#mammo1" type="button" role="tab">Digital Breast Tomosynthesis Mammography</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#mammo2" type="button" role="tab">Analog Mammography</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#mammo3" type="button" role="tab">Mammography Detector</button>
      </li>
    </ul>

    <!-- Tab content -->
    <div class="tab-content border rounded shadow-sm p-5" style="background-color: rgba(0, 99, 170, 0.05);">
      
      <!-- Tab 1 -->
      <div class="tab-pane fade show active" id="mammo1" role="tabpanel">
        <div class="row align-items-center">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/HESTIA.png" alt="Hestia" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
            <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
              Digital Breast Tomosynthesis Mammography <br>
              <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">HESTIA - GENORAY</span>
            </h3>
            <p>
              The Digital Breast Tomosynthesis Mammography System delivers high-resolution imaging that enhances cancer detection rates while prioritizing patient comfort. <br><br>
              Designed with user-friendly ergonomics, it incorporates advanced 3D imaging technology, gentle compression, and real-time patient guidance. The system is fully upgradeable and supports an efficient workflow with rapid image saving and transfer capabilities.
            </p>
            <a href="CATALOGUES/hestia.pdf" target="_blank" class="btn btn-primary mt-3">
              DOWNLOAD FULL BROCHURE
            </a>
          </div>
        </div>
      </div>

      <!-- Tab 2 -->
      <div class="tab-pane fade" id="mammo2" role="tabpanel">
        <div class="row align-items-center g-5 py-5">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/mx6002.png" alt="MX600" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
            <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
              Analog Mammography <br>
              <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">MX600 - GENORAY</span>
            </h3>
            <p>
              The GENORAY MX-600 offers reliable film-based breast imaging with clear image quality and user-friendly controls. <br><br>
              * High-frequency X-ray generator<br><br>
              * Manual & automatic exposure modes <br><br>
              * Comfortable patient positioning <br><br>
              * Excellent contrast and detail on film <br><br>
            </p>
            <a href="CATALOGUES/mx600.pdf" target="_blank" class="btn btn-primary mt-3">
              DOWNLOAD FULL BROCHURE
            </a>
          </div>
        </div>
      </div>

      <!-- Tab 3 -->
      <div class="tab-pane fade" id="mammo3" role="tabpanel">
        <div class="row align-items-center g-5 py-5">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/iray.png" alt="IRAY" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
            <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
              Mammography Detector <br>
              <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">Mammo 1012C - IRAY</span>
            </h3>
            <p>
              Compact and powerful, the Mammo1012C upgrades analog mammography to digital with high-resolution imaging, AED/AEC compatibility, and support for FFDM.
            </p>
            <a href="CATALOGUES/iray.pdf" target="_blank" class="btn btn-primary mt-3">
              DOWNLOAD FULL BROCHURE
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Back button -->
    <div class="text-center mt-5">
      <button onclick="showRadiology()" class="btn btn-outline-primary px-4">← Back to Radiology</button>
    </div>
  </div>
</div>

<!-- Style personnalisé pour transition et puces -->
<style>
.transition {
  display: flex;
}
.transition > div {
  flex: 0 0 100%;
}

.dot {
  height: 12px;
  width: 12px;
  margin: 0 5px;
  background-color: #ccc;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.active-dot {
  background-color: #0063AA;
}
</style>
<!-- X-RAY Equipment Tabs Section -->
<div id="xray-section" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif;">
  <div class="container">
    <div class="text-center mb-4">
      <h6 class="section-title bg-white text-primary px-3">X-RAY</h6>
    </div>

    <!-- Tabs -->
    <ul class="nav nav-tabs justify-content-center mb-5" id="xrayTabs" role="tablist">
      <li class="nav-item">
        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#xray1" type="button" role="tab">X-Ray System</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#xray2" type="button" role="tab">U Arm System</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#xray3" type="button" role="tab">DR Imaging System</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#xray4" type="button" role="tab">Imaging Software</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#xray5" type="button" role="tab">X-Ray Tube</button>
      </li>
    </ul>

    <!-- Tab content -->
    <div class="tab-content border rounded shadow-sm p-5" style="background-color: rgba(0, 99, 170, 0.05);">
      
      <!-- Tab 1 -->
      <div class="tab-pane fade show active" id="xray1" role="tabpanel">
        <div class="row align-items-center">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/drgemm.webp" alt="DRGEMM X-Ray System" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
            <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
              X-Ray System<br>
              <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">GXR S SERIES - DRGEM</span>
            </h3>
            <p>
              The GXR Diagnostic X-ray System integrates seamlessly into radiographic rooms and is easily upgradable to DR via built-in DR/PC interfaces and a flat panel-compatible Bucky.<br><br>
              From its high-frequency generator, it delivers consistent, high-quality imaging with minimal kV ripple and precise mA/mAs control, ensuring operator efficiency and patient comfort.
            </p>
            <a href="CATALOGUES/GXR.pdf" target="_blank" class="btn btn-primary mt-3">
              DOWNLOAD FULL BROCHURE
            </a>
          </div>
        </div>
      </div>

      <!-- Tab 2 -->
      <div class="tab-pane fade" id="xray2" role="tabpanel">
        <div class="row align-items-center g-5 py-5">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/DIAMOND.webp" alt="DIAMOND" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
            <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
              U ARM System<br>
              <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">DIAMOND - DRGEM</span>
            </h3>
            <p>
              The DIAMOND DR System is a fully automated digital radiography solution offering exceptional image quality, intelligent processing, and an intuitive interface.<br><br>
              It automatically adjusts exposure settings, stand positioning, collimation, and post-processing based on the selected anatomical study for fast, consistent results.
            </p>
            <a href="CATALOGUES/DIAMOND.pdf" target="_blank" class="btn btn-primary mt-3">
              DOWNLOAD FULL BROCHURE
            </a>
          </div>
        </div>
      </div>

      <!-- Tab 3 -->
      <div class="tab-pane fade" id="xray3" role="tabpanel">
        <div class="row align-items-center g-5 py-5">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/acquidr.webp" alt="ACQUIDR" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
            <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
              DR Imaging System<br>
              <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">ACQUIDR - DRGEM</span>
            </h3>
            <p>
              ACQUIDR is a digital imaging system combining a flat panel detector (FPD) with an advanced imaging workstation and software. <br><br>
              Featuring high-performance digital image processing, the system meets the diverse needs of modern diagnostic radiography.
            </p>
            <a href="CATALOGUES/ACQUIDR.pdf" target="_blank" class="btn btn-primary mt-3">
              DOWNLOAD FULL BROCHURE
            </a>
          </div>
        </div>
      </div>

      <!-- Tab 4 -->
      <div class="tab-pane fade" id="xray4" role="tabpanel">
        <div class="row align-items-center g-5 py-5">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/radmax.webp" alt="RADMAX" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
            <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
              Imaging Software<br>
              <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">RADMAX - DRGEM</span>
            </h3>
            <p>
              Streamlined Diagnostic Intelligence at Your Command<br><br>
              RADMAX offers high-resolution imaging with optimized dose efficiency, and is engineered for seamless retrofit compatibility with a broad range of existing X-ray systems.
            </p>
          </div>
        </div>
      </div>

      <!-- Tab 5 -->
      <div class="tab-pane fade" id="xray5" role="tabpanel">
        <div class="row align-items-center">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/xraytube.png" alt="Xraytube" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
            <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
              X-Ray Tube <br>
              <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">IAE </span>
            </h3>
            <p>
             IAE X-ray tubes provide excellent image resolution, stable performance, and durability for a wide range of diagnostic applications <br><br>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Back button -->
    <div class="text-center mt-5">
      <button onclick="showRadiology()" class="btn btn-outline-primary px-4">← Back to Radiology</button>
    </div>
  </div>
</div>
<!-- DENTAL IMAGING Equipment Tabs Section -->
<div id="dental-section" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif;">
  <div class="container">
    <div class="text-center mb-4">
      <h6 class="section-title bg-white text-primary px-3">DENTAL IMAGING</h6>
    </div>

    <!-- Tabs -->
    <ul class="nav nav-tabs justify-content-center mb-5" id="dentalTabs" role="tablist">
      <li class="nav-item">
        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#dental1" type="button" role="tab">CBCT 3D Imaging System</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#dental2" type="button" role="tab">Panoramic X-Ray System</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#dental3" type="button" role="tab">Digital Intraoral Sensor</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#dental4" type="button" role="tab">Dental Imaging Software</button>
      </li>
    </ul>

    <!-- Tab content -->
    <div class="tab-content border rounded shadow-sm p-5" style="background-color: rgba(0, 99, 170, 0.05);">

      <!-- Tab 1 - CBCT avec carousel pour 2 équipements -->
      <div class="tab-pane fade show active" id="dental1" role="tabpanel">
        <div id="dental1Carousel" class="carousel slide" data-bs-ride="carousel">
          <!-- Indicators/Dots -->
          <div class="carousel-indicators" style="bottom: -50px;">
            <button type="button" data-bs-target="#dental1Carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Dentri"></button>
            <button type="button" data-bs-target="#dental1Carousel" data-bs-slide-to="1" aria-label="Ecox"></button>
          </div>

          <!-- Carousel items -->
          <div class="carousel-inner">
            <!-- Equipment 1: Dentri -->
            <div class="carousel-item active">
              <div class="row align-items-center g-5 py-5">
                <div class="col-md-5 mb-4 mb-md-0">
                  <div class="position-relative overflow-hidden rounded shadow-sm">
                    <img id="dentriImage" src="img/dentri5.png" alt="CBCT Dentri" class="img-fluid" style="transition: opacity 0.8s ease-in-out;">
                    
                    <!-- Dots pour les images Dentri -->
                    <div class="position-absolute bottom-0 start-50 translate-middle-x mb-3">
                      <div class="d-flex gap-2">
                        <span id="dot1" class="bg-white rounded-circle" style="width: 8px; height: 8px; opacity: 1; transition: opacity 0.3s ease;"></span>
                        <span id="dot2" class="bg-white rounded-circle" style="width: 8px; height: 8px; opacity: 0.5; transition: opacity 0.3s ease;"></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-7">
                  <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
                    CBCT 3D Imaging System <br>
                    <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">Dentri Sα - HDXWILL</span>
                  </h3>
                  <p>
                    Max 16×14.5 cm FOV, perfect for capturing dentition, sinus, or TMJ<br><br>
                    Suitable for radiology centers or more professional and stable image acquisition<br><br>
                    2D panoramic feature with Autofocus for minimized distortion<br><br>
                    Various cephalometric imaging modes<br><br>
                  </p>
                  <a href="CATALOGUES/dentri.pdf" target="_blank" class="btn btn-primary mt-3">
                    DOWNLOAD FULL BROCHURE
                  </a>
                </div>
              </div>
            </div>

            <!-- Equipment 2: Ecox -->
            <div class="carousel-item">
              <div class="row align-items-center g-5 py-5">
                <div class="col-md-5 mb-4 mb-md-0">
                  <div class="position-relative overflow-hidden rounded shadow-sm">
                    <img 
                      id="ecoxImage" 
                      src="img/ecox5.png" 
                      alt="CBCT Ecox" 
                      class="img-fluid w-100"
                      style="transition: opacity 0.8s ease-in-out; min-height: 300px; object-fit: cover;"
                    >
                    
                    <!-- Dots pour les images Ecox -->
                    <div class="position-absolute bottom-0 start-50 translate-middle-x mb-3">
                      <div class="d-flex gap-2">
                        <span 
                          id="ecoxDot1"
                          class="bg-white rounded-circle" 
                          style="width: 8px; height: 8px; opacity: 1; transition: opacity 0.3s ease;"
                        ></span>
                        <span 
                          id="ecoxDot2"
                          class="bg-white rounded-circle" 
                          style="width: 8px; height: 8px; opacity: 0.5; transition: opacity 0.3s ease;"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-7">
                  <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
                    CBCT 3D Imaging System <br>
                    <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">
                      Ecox - HDXWILL 
                    </span>
                  </h3>
                  <p>
                    Max 16×9 cm FOV, perfect for capturing dentition, sinus, or TMJ<br><br>
                    2D panoramic feature with Autofocus for minimized distortion<br><br>
                    Extraoral bitewing images for better patient comfort<br><br>
                    Various cephalometric imaging modes<br><br>
                    Model CBCT Scan for STL extraction<br><br>
                  </p>
                  <a href="CATALOGUES/ecox.pdf" target="_blank" class="btn btn-primary mt-3">
                    DOWNLOAD FULL BROCHURE
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation arrows -->
          <button class="carousel-control-prev" type="button" data-bs-target="#dental1Carousel" data-bs-slide="prev" style="left: -60px; top: 50%; transform: translateY(-50%); width: 50px; height: 50px; background-color: #0063AA; border-radius: 50%; border: none;">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#dental1Carousel" data-bs-slide="next" style="right: -60px; top: 50%; transform: translateY(-50%); width: 50px; height: 50px; background-color: #0063AA; border-radius: 50%; border: none;">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <!-- Tab 2 -->
      <div class="tab-pane fade" id="dental2" role="tabpanel">
        <div class="row align-items-center g-5 py-5">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/dentio.png" alt="CBCT Scanner" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
            <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
              Panoramic X-Ray System<br>
              <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">DENTIO - HDXWILL</span>
            </h3>
            <p>
              Two in One System<br><br>
              A variety of capturing function<br><br>
              Perfect lightweight and stable, no wall mount or floor mount required<br><br>
            </p>
            <a href="CATALOGUES/dentio.pdf" target="_blank" class="btn btn-primary mt-3">
              DOWNLOAD FULL BROCHURE
            </a>
          </div>
        </div>
      </div>

      <!-- Tab 3 -->
      <div class="tab-pane fade" id="dental3" role="tabpanel">
        <div class="row align-items-center g-5 py-5">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/dentra3.webp" alt="Intraoral Camera" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
            <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
              Digital Intraoral Sensor<br>
              <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">Dentra - HDXWILL</span>
            </h3>
            <p>
              Technology you can count on <br><br>
              Affordable quality <br><br>
              Easy to install <br><br>
            </p>
            <a href="CATALOGUES/dentra.pdf" target="_blank" class="btn btn-primary mt-3">
              DOWNLOAD FULL BROCHURE
            </a>
          </div>
        </div>
      </div>

      <!-- Tab 4 -->
      <div class="tab-pane fade" id="dental4" role="tabpanel">
        <div class="py-5 text-center">
          <!-- Titre principal -->
          <h3 style="font-size: 32px; font-weight: bold; margin-bottom: 40px;">Dental Imaging Software</h3>

          <!-- Wrapper pour les 3 logiciels -->
          <div class="container">
            <div class="row justify-content-center">
              <!-- Carte 1 -->
              <div class="col-md-4 mb-4">
                <div class="software-card">
                  <h5 class="software-title">onDemand3D</h5>
                  <a href="https://youtu.be/cpiFGasy31Q?si=4FIXzpZykcY9quiI" target="_blank">
                    <img src="img/ondemand.png" alt="onDemand3D Video" class="software-img">
                  </a>
                </div>
              </div>

              <!-- Carte 2 -->
              <div class="col-md-4 mb-4">
                <div class="software-card">
                  <h5 class="software-title">Will Ceph</h5>
                  <a href="https://youtu.be/RFOkDfG8lQE?si=GsaqYWK4G49IdAN8" target="_blank">
                    <img src="img/willceph.png" alt="Will Ceph Video" class="software-img">
                  </a>
                </div>
              </div>

              <!-- Carte 3 -->
              <div class="col-md-4 mb-4">
                <div class="software-card">
                  <h5 class="software-title">Will Master</h5>
                  <a href="https://youtu.be/rH7EEHG6uNw?si=o-bL-ZgLUcvcoMVd" target="_blank">
                    <img src="img/willmaster.png" alt="Will Master Video" class="software-img">
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back button -->
    <div class="text-center mt-5">
      <button onclick="showRadiology()" class="btn btn-outline-primary px-4">← Back to Radiology</button>
    </div>
  </div>
</div>

<!-- Bone Densitometry Tabs Section -->
<div id="bonedensitometry-section" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif;">
  <div class="container">
    <div class="text-center mb-4">
      <h6 class="section-title bg-white text-primary px-3">Bone Donsitometry </h6>
    </div>

    <!-- Tabs -->
    <ul class="nav nav-tabs justify-content-center mb-5" id="bonedensitometryTabs" role="tablist">
      <li class="nav-item">
        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#bonedensitometry1" type="button" role="tab"> Bone Densitometry System </button>
      </li>
    </ul>

    <!-- Tab content -->
    <div class="tab-content border rounded shadow-sm p-5" style="background-color: rgba(0, 99, 170, 0.05);">
      
      <!-- Tab 1 -->
      <div class="tab-pane fade show active" id="consumables1" role="tabpanel">
        <div class="row align-items-center">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/osteosys2.png" alt="DR Detectors" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
            <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
              Bone Densitometry System <br>
              <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;"> Osteosys </span>
            </h3>
            <p>
             Advanced Bone Densitometer System delivering fast, precise bone density analysis to support early diagnosis and effective osteoporosis management <br><br>
              
            </p>
            <a href="CATALOGUES/osteosys.pdf" target="_blank" class="btn btn-primary mt-3">
              DOWNLOAD FULL BROCHURE
            </a>
          </div>
        </div>
      </div>
      </div>
       <!-- Back button -->
    <div class="text-center mt-5">
      <button onclick="showRadiology()" class="btn btn-outline-primary px-4">← Back to Radiology</button>
    </div>
  </div>
</div>

<!-- DR CONSUMABLES Equipment Tabs Section -->
<div id="consumables-section" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif;">
  <div class="container">
    <div class="text-center mb-4">
      <h6 class="section-title bg-white text-primary px-3">DR CONSUMABLES</h6>
    </div>

    <!-- Tabs -->
    <ul class="nav nav-tabs justify-content-center mb-5" id="consumablesTabs" role="tablist">
      <li class="nav-item">
        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#consumables1" type="button" role="tab">Protective Aprons and Accessories</button>
      </li>
    </ul>

    <!-- Tab content -->
    <div class="tab-content border rounded shadow-sm p-5" style="background-color: rgba(0, 99, 170, 0.05);">
      
      <!-- Tab 1 -->
      <div class="tab-pane fade show active" id="consumables1" role="tabpanel">
        <div class="row align-items-center">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/aktif3.png" alt="DR Detectors" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
            <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
              Protective Aprons and Accessories<br>
              <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">AKTIF X-RAY</span>
            </h3>
            <p>
              A complete range of protective aprons and accessories designed to provide reliable radiation protection for medical imaging professionals.<br><br>
              Manufactured from high‑quality, durable materials, they offer comfort, safety, and long‑lasting performance.<br><br>
              
            </p>
            <a href="CATALOGUES/aktif.pdf" target="_blank" class="btn btn-primary mt-3">
              DOWNLOAD FULL BROCHURE
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Back button -->
    <div class="text-center mt-5">
      <button onclick="showRadiology()" class="btn btn-outline-primary px-4">← Back to Radiology</button>
    </div>
  </div>
</div>
<!-- CSS Styles -->
<style>
  /* Style général des cartes logiciels */
  .software-card {
    background-color: #d2dde4ff;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    height: 100%;
    text-align: center;
  }

  /* Titre des logiciels */
  .software-title {
    margin-bottom: 15px;
    color: #0063AA;
    font-weight: 600;
    font-size: 18px;
  }

  /* Image des logiciels */
  .software-img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }

  /* Animation au survol */
  .software-img:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 20px rgba(0, 99, 170, 0.2);
  }

  /* Pour s'assurer que les colonnes s'alignent correctement sur petit écran */
  @media (max-width: 767.98px) {
    .software-card {
      margin-bottom: 30px;
    }
  }
</style>
<!-- Cardiology Subcategories Section -->
<div id="cardiologie" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif;">
  <div class="container mb-5">
    <div class="text-center mb-4">
      <h6 class="section-title bg-white text-center text-primary px-3">Cardiology</h6>
    </div>
    
    <div class="p-4 rounded" style="border: 2px solid rgba(0, 99, 170, 0.2); background-color: rgba(0, 99, 170, 0.05);">
      <div class="row g-4 justify-content-center">
        <!-- Patient Monitor -->
        <div class="col-md-3">
          <div onclick="showpatientmonitorSection()" class="d-flex justify-content-center align-items-center text-center bg-white rounded shadow-sm h-100 border p-4" style="height: 150px; border-color: rgba(0, 99, 170, 0.3); cursor: pointer;">
            <h5 class="fw-bold mb-0">Patient Monitor</h5>
          </div>
        </div>
        
        <!-- Electrocardiograph -->
        <div class="col-md-3">
          <div onclick="showpECGSection()" class="d-flex justify-content-center align-items-center text-center bg-white rounded shadow-sm h-100 border p-4" style="height: 150px; border-color: rgba(0, 99, 170, 0.3); cursor: pointer;">
            <h5 class="fw-bold mb-0">Electrocardiograph</h5>
          </div>
        </div>
        
        <!-- Cardiology Consumables -->
        <div class="col-md-3">
          <div onclick="showCardiologyConsumablesSection()" class="d-flex justify-content-center align-items-center text-center bg-white rounded shadow-sm h-100 border p-4" style="height: 150px; border-color: rgba(0, 99, 170, 0.3); cursor: pointer;">
            <h5 class="fw-bold mb-0">Cardiology Consumables</h5>
          </div>
        </div>
      </div>
    
      
      <!-- Back button -->
      <div class="text-center mt-5">
        <button onclick="showProducts()" class="btn btn-outline-primary px-4">← Back to Products</button>
      </div>
    </div>
  </div>
</div>

<!-- Patient Monitor Section -->
<div id="patientmonitor-section" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif; margin-bottom: 60px;">
  <div class="container">
    <div class="text-center mb-4">
      <h6 class="section-title bg-white text-primary px-3">Patient Monitor</h6>
    </div>
    
    <!-- Tabs -->
    <ul class="nav nav-tabs justify-content-center mb-5" id="patientmonitorTabs" role="tablist">
      <li class="nav-item">
        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#patientmonitor1" type="button" role="tab">Multiparameter Patient Monitor</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#patientmonitor2" type="button" role="tab">Modular Patient Monitor</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#patientmonitor3" type="button" role="tab">Vital Signs Patient Monitor</button>
      </li>
    </ul>
    
    <!-- Tabs Content -->
    <div class="tab-content border rounded shadow-sm p-5" style="background-color: rgba(0, 99, 170, 0.05);">
      <!-- Tab 1 -->
      <div class="tab-pane fade show active" id="patientmonitor1" role="tabpanel">
        <div id="patientMonitorCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <!-- Item 1 -->
            <div class="carousel-item active">
              <div class="row align-items-center g-5 py-5">
                <div class="col-md-5 mb-4 mb-md-0">
                  <img src="img/s90.png" alt="S90" class="img-fluid w-100 rounded shadow-sm">
                </div>
                <div class="col-md-7">
                  <h3 class="mb-4 fw-bold">Multiparameter Patient Monitor <br><span style="color: #0063AA;">S90 - SINOHERO</span></h3>
                  <p>
                    The S90 12.1″ Patient Monitor is a portable and economical multi-parameter monitor designed for critical care.<br><br>
                    It supports dual-channel IBP, AG/Multi-gas, and CO₂ monitoring, with a responsive HD touchscreen for real-time accuracy.<br><br>
                    Its durable, compact design ensures reliable performance in ICU and emergency settings.
                  </p>
                  <a href="CATALOGUES/s90.pdf" target="_blank" class="btn btn-primary mt-3">DOWNLOAD FULL BROCHURE</a>
                </div>
              </div>
            </div>
            
            <!-- Item 2 -->
            <div class="carousel-item">
              <div class="row align-items-center g-5 py-5">
                <div class="col-md-5 mb-4 mb-md-0">
                  <img src="img/S90express.png" alt="S90 Express" class="img-fluid w-100 rounded shadow-sm">
                </div>
                <div class="col-md-7">
                  <h3 class="mb-4 fw-bold">Multiparameter Patient Monitor <br><span style="color: #0063AA;">S90 Express - SINOHERO</span></h3>
                  <p>
                    15" TFT with 10 waveforms <br><br>
                    High-end parameters: EtCO2, Multi-gas/O2, SD memory card <br><br>
                    Software features: OxyCRG, large font, short trend, drug calculation <br><br>
                    Pitch tone for SpO2, 168-hour trends review
                  </p>
                  <a href="CATALOGUES/s90express.pdf" target="_blank" class="btn btn-primary mt-3">DOWNLOAD FULL BROCHURE</a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Controls -->
          <button class="carousel-control-prev" type="button" data-bs-target="#patientMonitorCarousel" data-bs-slide="prev" style="left: -60px; top: 50%; transform: translateY(-50%); background-color: #0063AA; border-radius: 50%; width: 50px; height: 50px;">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#patientMonitorCarousel" data-bs-slide="next" style="right: -60px; top: 50%; transform: translateY(-50%); background-color: #0063AA; border-radius: 50%; width: 50px; height: 50px;">
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
      
      <!-- Tab 2 -->
      <div class="tab-pane fade" id="patientmonitor2" role="tabpanel">
        <div class="row align-items-center g-5 py-5">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/acquitsign.png" alt="AcuitSign M5" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
            <h3 class="mb-4 fw-bold">Modular Patient Monitor <br><span style="color: #0063AA;">AcuitSign M5 - SINOHERO</span></h3>
            <p>
              15" Full Touch Display<br><br>
              Multi-measurement & Transport Module<br><br>
              Plug and Play Parameters<br><br>
              Up to 12 Channels of Waveform<br><br>
              Ultra Quiet Design for Night-time Use
            </p>
            <a href="CATALOGUES/acuitsign.pdf" target="_blank" class="btn btn-primary mt-3">DOWNLOAD FULL BROCHURE</a>
          </div>
        </div>
      </div>
      
      <!-- Tab 3 -->
      <div class="tab-pane fade" id="patientmonitor3" role="tabpanel">
        <div class="row align-items-center g-5 py-5">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/S60.png" alt="S60 Vista" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
            <h3 class="mb-4 fw-bold">Vital Signs Patient Monitor <br><span style="color: #0063AA;">S60 Vista - SINOHERO</span></h3>
            <p>
              7" TFT Color Display<br><br>
              Parameters: SpO2, NIBP, Temp, EtCO2<br><br>
              Lightweight & Compact<br><br>
              Built-in Battery up to 8h<br><br>
              Central Monitoring System Compatible
            </p>
            <a href="CATALOGUES/s60.pdf" target="_blank" class="btn btn-primary mt-3">DOWNLOAD FULL BROCHURE</a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Back button -->
    <div class="text-center mt-5">
      <button onclick="showCardiology()" class="btn btn-outline-primary px-4">← Back to Cardiology</button>
    </div>
  </div>
</div>

<!-- Electrocardiograph Section -->
<div id="ECG-section" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif; margin-bottom: 60px;">
  <div class="container">
    <div class="text-center mb-4">
      <h6 class="section-title bg-white text-primary px-3">Electrocardiograph</h6>
    </div>
    
    <!-- Tabs -->
    <ul class="nav nav-tabs justify-content-center mb-5" id="ECGTabs" role="tablist">
      <li class="nav-item">
        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#ecg1" type="button" role="tab">3-Channel ECG</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#ecg2" type="button" role="tab">6-Channel ECG</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#ecg3" type="button" role="tab">12-Channel ECG</button>
      </li>
    </ul>
    
    <!-- Tabs Content -->
    <div class="tab-content border rounded shadow-sm p-5" style="background-color: rgba(0, 99, 170, 0.05);">

      <!-- Tab 1: 3-Channel ECG -->
      <div class="tab-pane fade show active" id="ecg1" role="tabpanel">
        <div class="row align-items-center g-5 py-5">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/3ecg.png" alt="ECG-SE509" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
           <h3 class="mb-4 fw-bold" style="line-height: 1.6;">3-Channel ECG <br> 
           <span style="color: #0063AA;">SE509 - SINOHERO</span>
          </h3>
            <p>
              4.3" Vivid color Full Touch screen <br><br>
              12 leads ECG simultaneous acquisition and display <br><br>
              Built-in high resolution thermal printer with various report printing <br><br>
              Unique algorithm for automatic measurements and interpretation with more than 140 kinds of Diagnosis analyze category <br><br>
             Both SD and USB memory enlarge available <br><br>
            </p>
            <a href="CATALOGUES/SE509.pdf" target="_blank" class="btn btn-primary mt-3">DOWNLOAD FULL BROCHURE</a>
          </div>
        </div>
      </div>   
      
      <!-- Tab 2: 6-Channel ECG -->
      <div class="tab-pane fade" id="ecg2" role="tabpanel">
        <div id="ECGCarousel2" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <!-- Item 1 -->
            <div class="carousel-item active">
              <div class="row align-items-center g-5 py-5">
                <div class="col-md-5 mb-4 mb-md-0">
                  <img src="img/SE608.png" alt="ECG-1212G" class="img-fluid w-100 rounded shadow-sm">
                </div>
                <div class="col-md-7">
                  <h3 class="mb-4 fw-bold" style="line-height: 1.6;">6-Channel ECG <br> 
                  <span style="color: #0063AA;">SE608 - SINOHERO</span>
                  </h3>
                  <p>
                     Sharp 7 " color TFT with Alpha-numeric keyboard <br><br>
                    12 leads of ECG Simultaneous acquisition and presentation <br><br>
                   Simultaneous 6 leads of ECG printing with 110mm thermal paper <br><br>
                   Multiple USB port for connecting PC-ECG software and external printer <br><br>
                   Built-in rechargeable lithium battery (to print up to 1080 ECG reports) <br><br>
                   Built-in 4G SD memory card to store up to 10,000 ECG event reports in XML/PDF/BMP format, and convenient for Software upgrading automatically <br><br>
                   Excellent ECG auto-interpretation program and Pacemaker detection <br><br>
                   Reliable and fast Network connectivity and data transmission <br><br>
                  </p>
                  <a href="CATALOGUES/SE608.pdf" target="_blank" class="btn btn-primary mt-3">DOWNLOAD FULL BROCHURE</a>
                </div>
              </div>
            </div>
                <!-- Item 2 -->
            <div class="carousel-item">
              <div class="row align-items-center g-5 py-5">
                <div class="col-md-5 mb-4 mb-md-0">
                  <img src="img/SE600.png" alt="ECG-300G" class="img-fluid w-100 rounded shadow-sm">
                </div>
                <div class="col-md-7">
                  <h3 class="mb-4 fw-bold" style="line-height: 1.6;">6-Channel ECG <br> 
                  <span style="color: #0063AA;">SE600 - SINOHERO</span>
                  </h3>
                  <p>Color 7 inch Full touch screen, for your convenience operation by both touch and short-cut hot keys, enable 12-lead simultaneous sampling and displaying at the same time <br><br>
                    12 leads simultaneous acquisition, with advanced algorithm for automatic measurements and interpretation, ensure good reading and accurate during different situation <br><br>
                  </p>
                  <a href="CATALOGUES/SE600.pdf" target="_blank" class="btn btn-primary mt-3">DOWNLOAD FULL BROCHURE</a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Controls for 6-Channel ECG -->
          <button class="carousel-control-prev" type="button" data-bs-target="#ECGCarousel2" data-bs-slide="prev" style="left: -60px; top: 50%; transform: translateY(-50%); background-color: #0063AA; border-radius: 50%; width: 50px; height: 50px;">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#ECGCarousel2" data-bs-slide="next" style="right: -60px; top: 50%; transform: translateY(-50%); background-color: #0063AA; border-radius: 50%; width: 50px; height: 50px;">
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
      
      <!-- Tab 3: 12-Channel ECG -->
   <div class="tab-pane fade" id="ecg3" role="tabpanel">
        <div id="ECGCarousel3" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <!-- Item 1 -->
            <div class="carousel-item active">
              <div class="row align-items-center g-5 py-5">
                <div class="col-md-5 mb-4 mb-md-0">
                  <img src="img/SE1208.png" alt="SE1208" class="img-fluid w-100 rounded shadow-sm">
                </div>
                <div class="col-md-7">
                  <h3 class="mb-4 fw-bold" style="line-height: 1.6;">12-Channel ECG <br> 
                  <span style="color: #0063AA;">SE1208 - SINOHERO</span>
                  </h3>
                  <p>
                    Splendid 10" color TFT with Alpha-numeric keyboard <br><br>
                    Simultaneous 12 leads of ECG printing with 210mm/216mm thermal paper (Roll or Z-fold) <br><br>
                    Multiple USB port for connecting PC-ECG software and external printer <br><br>
                    Excellent ECG auto-interpretation program and Pacemaker detection <br><br>
                    Reliable and fast Network connectivity and data transmission <br><br>
                  </p>
                  <a href="CATALOGUES/SE1208.pdf" target="_blank" class="btn btn-primary mt-3">DOWNLOAD FULL BROCHURE</a>
                </div>
              </div>
            </div>
                <!-- Item 2 -->
            <div class="carousel-item">
              <div class="row align-items-center g-5 py-5">
                <div class="col-md-5 mb-4 mb-md-0">
                  <img src="img/SE1200.png" alt="ECG" class="img-fluid w-100 rounded shadow-sm">
                </div>
                <div class="col-md-7">
                  <h3 class="mb-4 fw-bold" style="line-height: 1.6;">12-Channel ECG <br> 
                  <span style="color: #0063AA;">SE1200 - SINOHERO</span>
                  </h3>
                  <p> 
                    SE1200 engineered to be a medical Electrocardiograph system, complying professional high level standards, using high quality measurement accessories<br><br>
                    Color 10 inch Full touch screen, for your convenience operation by both touch and short-cut hot keys, enable 12-lead simultaneous sampling and displaying at the same time<br><br>
                    Built-in case database management system can store 4000 cases, standard USB export also can review the records, analyse and print the reports by PC through standard PC station software<br><br>
                    12 leads simultaneous acquisition, with advanced algorithm for automatic measurements and interpretation, ensure good reading and accurate during different situation <br><br>
                  </p>
                  <a href="CATALOGUES/SE1200.pdf" target="_blank" class="btn btn-primary mt-3">DOWNLOAD FULL BROCHURE</a>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Controls for 12-Channel ECG -->
          <button class="carousel-control-prev" type="button" data-bs-target="#ECGCarousel3" data-bs-slide="prev" style="left: -60px; top: 50%; transform: translateY(-50%); background-color: #0063AA; border-radius: 50%; width: 50px; height: 50px;">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#ECGCarousel3" data-bs-slide="next" style="right: -60px; top: 50%; transform: translateY(-50%); background-color: #0063AA; border-radius: 50%; width: 50px; height: 50px;">
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Back button -->
    <div class="text-center mt-5">
      <button onclick="showCardiology()" class="btn btn-outline-primary px-4">← Back to Cardiology</button>
    </div>
  </div>
</div>

<!-- Cardiology Consumables Section -->
<div id="cardiology-consumables-section" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif; margin-bottom: 60px;">
  <div class="container">
    <div class="text-center mb-4">
      <h6 class="section-title bg-white text-primary px-3">Cardiology Consumables</h6>
    </div>

    <!-- Tabs Content -->
    <div class="tab-content border rounded shadow-sm p-5" style="background-color: rgba(0, 99, 170, 0.05);">
      <!-- Cardiology Consumables -->
      <div class="tab-pane fade show active" id="cardiology-consumables" role="tabpanel">
        <div class="py-5 text-center">
          <!-- Titre principal -->
          <h3 style="font-size: 32px; font-weight: bold; margin-bottom: 40px;">Cardiology Consumables</h3>

          <!-- Wrapper pour les 4 consumables -->
          <div class="container">
            <div class="row justify-content-center">
              <!-- Carte 1: Tourniquet -->
              <div class="col-md-3 col-6 mb-4">
                <div class="consumable-card">
                  <img src="img/tourniquet.png" alt="Tourniquet" class="consumable-img" style="width: 100%; height: 230px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
                </div>
              </div>

              <!-- Carte 2: Hemostasis Valve Set -->
              <div class="col-md-3 col-6 mb-4">
                <div class="consumable-card">
                  <img src="img/hemostasis.png" alt="Hemostasis Valve Set" class="consumable-img" style="width: 100%; height: 230px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
                </div>
              </div>

              <!-- Carte 3: Manifolds Hemostasis Valve Set -->
              <div class="col-md-3 col-6 mb-4">
                <div class="consumable-card">
                  <img src="img/manifold.png" alt="Manifolds Hemostasis Valve Set" class="consumable-img" style="width: 100%; height: 230px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
                </div>
              </div>

              <!-- Carte 4: Inflation Device -->
              <div class="col-md-3 col-6 mb-4">
                <div class="consumable-card">
                  <img src="img/inflation.png" alt="Inflation Device" class="consumable-img" style="width: 100%; height: 230px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
                </div>
              </div>
            </div>
          </div>

          <!-- Download Brochure Button -->
            <a href="CATALOGUES/map.pdf" target="_blank" class="btn btn-primary mt-3">DOWNLOAD FULL BROCHURE</a>
        </div>
      </div>
    </div>

    <!-- Back button -->
    <div class="text-center mt-5">
      <button onclick="showCardiology()" class="btn btn-outline-primary px-4">← Back to Cardiology</button>
    </div>
  </div>
</div>

<style>
.consumable-img:hover {
  transform: scale(1.05);
}

.consumable-card {
  cursor: pointer;
}
</style>

<script>
function downloadBrochure() {
  // Simulate brochure download
  const link = document.createElement('a');
  link.href = '#';
  link.download = 'cardiology-consumables-brochure.pdf';
  link.click();
  
  // You can replace the above with actual download logic
  alert('Brochure download started!');
}
</script>

<!-- Style personnalisé -->
<style>
  .nav-tabs .nav-link {
    color: #333;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    margin-right: 5px;
    border-radius: 8px 8px 0 0;
    font-weight: 500;
    padding: 10px 20px;
    transition: all 0.3s ease;
  }
  
  .nav-tabs .nav-link:hover {
    background-color: #e0e0e0;
    border-color: #999;
  }
  
  .nav-tabs .nav-link.active {
    background-color: #0870acff !important;
    color: #fff !important;
    border-color: #333333 #333333 #fff;
  }

  .carousel-control-prev:hover,
  .carousel-control-next:hover {
    opacity: 0.8;
    transform: translateY(-50%) scale(1.05);
  }

  .btn-primary:hover {
    background-color: #0051AA;
    border-color: #0051AA;
  }

  .btn-outline-primary:hover {
    background-color: #0063AA;
    border-color: #0063AA;
    color: white;
  }
</style>

<!-- Footer Start -->
<div class="container-fluid text-light footer pt-5 mt-5 wow fadeIn" style="float:left;background:linear-gradient(150deg,#13415fff,#6897b8ff);color:white;border:none;" data-wow-delay="0.1s">
    <div class="container py-5">
        <div class="row g-5">
            <div class="col-lg-3 col-md-3">
                <h4 class="text-white mb-3">Company</h4>
                <a class="btn btn-link" href="about.php">Who we are</a>
                <a class="btn btn-link" href="partners.php">Our Partners</a>
                <a class="btn btn-link" href="#c">Contact us</a>
            </div>
            <div class="col-lg-6 col-md-3">
                <h4 class="text-white mb-3">Contact</h4>
                <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>Imm Les Jardins,jardin d'el menzah 2 ,Ariana, Tunisia, 2094</p>
                <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>+216 36 283 716 </p>
                <p class="mb-2"><i class="fa fa-envelope me-3"></i>info@royalmedicalservice.tn</p>
                <div class="d-flex pt-2">
                    <a class="btn btn-outline-light btn-social" href="https://www.facebook.com/profile.php?id=100040746590077"><i class="fab fa-facebook-f"></i></a>
                </div>
            </div>

            <div class="col-lg-3 col-md-3">
                <h4 class="text-white mb-3">Newsletter</h4>
                <div class="position-relative mx-auto" style="max-width:400px;">
                    <form action="https://formsubmit.co/info@royalmedicalservice.tn" method="POST">
                        <input class="form-control border-primary w-100 py-3 ps-4 pe-5" type="email" name="newsletter_email" placeholder="Your email" required>
                        <input type="hidden" name="_captcha" value="false">
                        <input type="hidden" name="_autoresponse" value="Thank you for subscribing to Royal Medical Services newsletter.">
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="copyright">
            <div class="row">
                <div class="col-md-6 text-center text-md-start mb-3 mb-md-0">
                    &copy; <a class="border-bottom" href="">RMS</a>, All Right Reserved.
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <div class="footer-menu">
                        <a href="index.php">Home</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Footer End -->

    <!-- Back to Top -->
    <a href="#" class="btn btn-lg btn-lg-square back-to-top" style="background-color: #0063AA; color:#FFFFFF;"><i style="background-color: #0063AA;" class="bi bi-arrow-up"></i></a>


<!-- JavaScript to toggle views -->
<script>
  // Helper function to hide all sections
  function hideAllSections() {
    const sections = [
      'products', 
      'radiologie', 
      'xray-section', 
      'mammo-section', 
      'dental-section', 
      'bonedensitometry-section',
      'consumables-section', 
      'cardiologie',
      'patientmonitor-section',
      'ECG-section',
      'cardiology-consumables-section'  // ADDED: New cardiology consumables section
    ];
    
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.style.display = 'none';
      }
    });
  }

  // NOUVELLE FONCTION: Scroll intelligente vers l'en-tête de section
  function scrollToSectionHeader(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Ajustez cette valeur selon vos besoins
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  }

  function showProducts() {
    hideAllSections();
    document.getElementById('products').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // MODIFIÉ: Scroll vers l'en-tête au lieu du haut de la page
  function showRadiology() {
    hideAllSections();
    document.getElementById('radiologie').style.display = 'block';
    scrollToSectionHeader('radiologie');
  }

  // MODIFIÉ: Scroll vers l'en-tête au lieu du haut de la page
  function showXraySection() {
    hideAllSections();
    document.getElementById('xray-section').style.display = 'block';
    scrollToSectionHeader('xray-section');
  }
 
  // MODIFIÉ: Scroll vers l'en-tête au lieu du haut de la page
  function showMammoSection() {
    hideAllSections();
    document.getElementById('mammo-section').style.display = 'block';
    
    // Initialize Bootstrap tabs if available
    setTimeout(() => {
      var triggerEl = document.querySelector('#mammoTabs .nav-link.active');
      if (triggerEl && typeof bootstrap !== 'undefined') {
        var tab = new bootstrap.Tab(triggerEl);
        tab.show();
      }
    }, 100);
    
    scrollToSectionHeader('mammo-section');
  }

  // MODIFIÉ: Scroll vers l'en-tête au lieu du haut de la page
  function showDentalSection() {
    hideAllSections();
    document.getElementById('dental-section').style.display = 'block';
    
    // Initialize Bootstrap tabs if available
    setTimeout(() => {
      var triggerEl = document.querySelector('#dentalTabs .nav-link.active');
      if (triggerEl && typeof bootstrap !== 'undefined') {
        var tab = new bootstrap.Tab(triggerEl);
        tab.show();
      }
    }, 100);
    
    scrollToSectionHeader('dental-section');
  }

  // MODIFIÉ: Scroll vers l'en-tête au lieu du haut de la page
  function showBoneDensitometrySection() {
    hideAllSections();
    document.getElementById('bonedensitometry-section').style.display = 'block';
    
    // Initialize Bootstrap tabs if available
    setTimeout(() => {
      var triggerEl = document.querySelector('#bonedensitometryTabs .nav-link.active');
      if (triggerEl && typeof bootstrap !== 'undefined') {
        var tab = new bootstrap.Tab(triggerEl);
        tab.show();
      }
    }, 100);
    
    scrollToSectionHeader('bonedensitometry-section');
  }

  // MODIFIÉ: Scroll vers l'en-tête au lieu du haut de la page
  function showConsumablesSection() {
    hideAllSections();
    document.getElementById('consumables-section').style.display = 'block';
    
    // Initialize Bootstrap tabs if available
    setTimeout(() => {
      var triggerEl = document.querySelector('#consumablesTabs .nav-link.active');
      if (triggerEl && typeof bootstrap !== 'undefined') {
        var tab = new bootstrap.Tab(triggerEl);
        tab.show();
      }
    }, 100);
    
    scrollToSectionHeader('consumables-section');
  }

  // Fixed: Now properly hides all subsections when showing main cardiology
  // MODIFIÉ: Scroll vers l'en-tête au lieu du haut de la page
  function showCardiology() {
    hideAllSections();
    document.getElementById('cardiologie').style.display = 'block';
    
    // Reset any active tabs in cardiology subsections
    resetTabStates();
    
    scrollToSectionHeader('cardiologie');
  }

  // Fixed: Now properly shows patient monitor section and hides cardiology main
  // MODIFIÉ: Scroll vers l'en-tête au lieu du haut de la page + Bootstrap tabs initialization
  function showpatientmonitorSection() {
    hideAllSections();
    document.getElementById('patientmonitor-section').style.display = 'block';
    
    // Initialize Bootstrap tabs if available
    setTimeout(() => {
      var triggerEl = document.querySelector('#patientmonitorTabs .nav-link.active');
      if (triggerEl && typeof bootstrap !== 'undefined') {
        var tab = new bootstrap.Tab(triggerEl);
        tab.show();
      }
    }, 100);
    
    scrollToSectionHeader('patientmonitor-section');
  }

  // Fixed: Now properly shows ECG section and hides cardiology main
  // MODIFIÉ: Scroll vers l'en-tête au lieu du haut de la page
  function showpECGSection() {
    hideAllSections();
    document.getElementById('ECG-section').style.display = 'block';

    // Initialize Bootstrap tabs if available
    setTimeout(() => {
      var triggerEl = document.querySelector('#ECGTabs .nav-link.active');
      if (triggerEl && typeof bootstrap !== 'undefined') {
        var tab = new bootstrap.Tab(triggerEl);
        tab.show();
      }
    }, 100);
    
    scrollToSectionHeader('ECG-section');
  }

  // ADDED: New function for Cardiology Consumables section
  // FIXED: Removed tab initialization since this section no longer has tabs
  function showCardiologyConsumablesSection() {
    hideAllSections();
    document.getElementById('cardiology-consumables-section').style.display = 'block';
    
    // No tab initialization needed since this section doesn't have tabs
    scrollToSectionHeader('cardiology-consumables-section');
  }

  // Helper function to reset tab states
  // MODIFIÉ: Removed 'consumablesTabs' from cardiology consumables since it no longer has tabs
  function resetTabStates() {
    const tabSections = ['mammoTabs', 'dentalTabs', 'bonedensitometryTabs' ,'consumablesTabs', 'ECGTabs', 'patientmonitorTabs'];
    tabSections.forEach(tabSection => {
      const tabs = document.querySelectorAll('#' + tabSection + ' .nav-link');
      const tabContents = document.querySelectorAll('#' + tabSection + ' ~ .tab-content .tab-pane');
      
      tabs.forEach((tab, index) => {
        if (index === 0) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
      
      tabContents.forEach((content, index) => {
        if (index === 0) {
          content.classList.add('show', 'active');
        } else {
          content.classList.remove('show', 'active');
        }
      });
    });
  }

  // Enhanced navigation with breadcrumb support
  // MODIFIÉ: Utilise la nouvelle fonction de scroll
  function navigateWithBreadcrumb(targetSection, parentSection = null) {
    hideAllSections();
    document.getElementById(targetSection).style.display = 'block';
    
    // Store navigation history for breadcrumb
    if (typeof window.navigationHistory === 'undefined') {
      window.navigationHistory = [];
    }
    
    const currentNav = {
      section: targetSection,
      parent: parentSection,
      timestamp: Date.now()
    };
    
    // Update history
    window.navigationHistory.push(currentNav);
    
    // Keep only last 10 navigation items
    if (window.navigationHistory.length > 10) {
      window.navigationHistory = window.navigationHistory.slice(-10);
    }
    
    scrollToSectionHeader(targetSection);
  }

  // Enhanced back navigation
  // MODIFIÉ: Utilise la nouvelle fonction de scroll
  function goBack() {
    if (typeof window.navigationHistory !== 'undefined' && window.navigationHistory.length > 1) {
      // Remove current section
      window.navigationHistory.pop();
      
      // Get previous section
      const previousNav = window.navigationHistory[window.navigationHistory.length - 1];
      
      if (previousNav) {
        hideAllSections();
        document.getElementById(previousNav.section).style.display = 'block';
        scrollToSectionHeader(previousNav.section);
      }
    } else {
      // Default fallback to products
      showProducts();
    }
  }

  function myFunction() {
    var popup = document.getElementById("myPopup");
    if (popup) {
      popup.classList.toggle("show");
    }
  }

  // ADDED: Function for downloading cardiology consumables brochure
  function downloadBrochure() {
    // Simulate brochure download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'cardiology-consumables-brochure.pdf';
    link.click();
    
    // You can replace the above with actual download logic
    alert('Brochure download started!');
  }

  // Enhanced smooth transitions
  function fadeTransition(fromSection, toSection, callback) {
    const fromEl = document.getElementById(fromSection);
    const toEl = document.getElementById(toSection);
    
    if (fromEl) {
      fromEl.style.transition = 'opacity 0.3s ease-in-out';
      fromEl.style.opacity = '0';
      
      setTimeout(() => {
        fromEl.style.display = 'none';
        if (toEl) {
          toEl.style.display = 'block';
          toEl.style.opacity = '0';
          toEl.style.transition = 'opacity 0.3s ease-in-out';
          
          setTimeout(() => {
            toEl.style.opacity = '1';
            if (callback) callback();
          }, 50);
        }
      }, 300);
    } else if (toEl) {
      toEl.style.display = 'block';
      if (callback) callback();
    }
  }

  // Expose functions globally
  window.scrollToSectionHeader = scrollToSectionHeader;
  window.hideAllSections = hideAllSections;
  window.showProducts = showProducts;
  window.showRadiology = showRadiology;
  window.showXraySection = showXraySection;
  window.showMammoSection = showMammoSection;
  window.showDentalSection = showDentalSection;
  window.showBoneDensitometrySection = showBoneDensitometrySection;
  window.showConsumablesSection = showConsumablesSection;
  window.showCardiology = showCardiology;
  window.showpatientmonitorSection = showpatientmonitorSection;
  window.showpECGSection = showpECGSection;
  window.showCardiologyConsumablesSection = showCardiologyConsumablesSection;  // ADDED: Expose new function
  window.downloadBrochure = downloadBrochure;  // ADDED: Expose download function
  window.resetTabStates = resetTabStates;
  window.navigateWithBreadcrumb = navigateWithBreadcrumb;
  window.goBack = goBack;
  window.myFunction = myFunction;
  window.fadeTransition = fadeTransition;
</script>

<!-- Enhanced image rotation scripts -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  // NOUVEAU: Protection contre le scroll des tabs Bootstrap
  const allTabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
  allTabButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Empêcher le scroll automatique lors du changement de tab
      setTimeout(() => {
        window.history.replaceState(null, null, window.location.pathname);
      }, 10);
    });
    
    // Empêcher le scroll après le changement de tab
    button.addEventListener('shown.bs.tab', function(e) {
      e.preventDefault();
      return false;
    });
  });

  // Empêcher le scroll lors du clic sur les liens avec href="#"
  const tabLinks = document.querySelectorAll('a[href^="#"], button[data-bs-target]');
  tabLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('data-bs-toggle') === 'tab') {
        // Pour les tabs, empêcher le scroll par défaut
        setTimeout(() => {
          window.history.replaceState(null, null, window.location.pathname);
        }, 10);
      }
    });
  });

  // Enhanced image carousel system
  function createImageCarousel(config) {
    const {
      images,
      imageElementId,
      dots,
      interval = 4000,
      transitionTime = 400
    } = config;
    
    let currentImageIndex = 0;
    const imageElement = document.getElementById(imageElementId);
    
    if (!imageElement || !images || images.length === 0) return;
    
    // Preload images
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    function updateDots() {
      if (dots && dots.length > 0) {
        dots.forEach((dot, index) => {
          const dotElement = document.getElementById(dot);
          if (dotElement) {
            dotElement.style.opacity = index === currentImageIndex ? '1' : '0.5';
            dotElement.style.transition = 'opacity 0.3s ease';
          }
        });
      }
    }
    
    function changeImage() {
      if (imageElement.style.display === 'none') return;
      
      // Fade out
      imageElement.style.opacity = '0';
      
      setTimeout(() => {
        // Change image
        currentImageIndex = (currentImageIndex + 1) % images.length;
        imageElement.src = images[currentImageIndex];
        
        // Update dots
        updateDots();
        
        // Fade in
        imageElement.style.opacity = '1';
      }, transitionTime / 2);
    }
    
    // Initialize dots
    updateDots();
    
    // Start automatic rotation
    const intervalId = setInterval(changeImage, interval);
    
    // Add manual control functionality
    if (dots && dots.length > 0) {
      dots.forEach((dotId, index) => {
        const dotElement = document.getElementById(dotId);
        if (dotElement) {
          dotElement.style.cursor = 'pointer';
          dotElement.addEventListener('click', () => {
            currentImageIndex = index;
            imageElement.src = images[currentImageIndex];
            updateDots();
          });
        }
      });
    }
    
    return {
      stop: () => clearInterval(intervalId),
      goTo: (index) => {
        if (index >= 0 && index < images.length) {
          currentImageIndex = index;
          imageElement.src = images[currentImageIndex];
          updateDots();
        }
      }
    };
  }
  
  // Initialize Dentri carousel
  const dentriCarousel = createImageCarousel({
    images: ['img/dentri5.png', 'img/dentri6.png'],
    imageElementId: 'dentriImage',
    dots: ['dot1', 'dot2'],
    interval: 4000,
    transitionTime: 400
  });
  
  // Initialize Ecox carousel
  const ecoxCarousel = createImageCarousel({
    images: ['img/ecox5.png', 'img/ecox6.png'],
    imageElementId: 'ecoxImage',
    dots: ['ecoxDot1', 'ecoxDot2'],
    interval: 4000,
    transitionTime: 400
  });
  
  // Store carousel references for external control
  window.carousels = {
    dentri: dentriCarousel,
    ecox: ecoxCarousel
  };
  
  // Add pause/play functionality when user hovers
  function addHoverControls(imageId, carousel) {
    const imageElement = document.getElementById(imageId);
    if (imageElement && carousel) {
      imageElement.addEventListener('mouseenter', () => {
        if (carousel.pause) carousel.pause();
      });
      
      imageElement.addEventListener('mouseleave', () => {
        if (carousel.resume) carousel.resume();
      });
    }
  }
  
  // Enhanced error handling for missing elements
  function checkRequiredElements() {
    const requiredElements = [
      'products', 'radiologie', 'cardiologie',
      'xray-section', 'mammo-section', 'dental-section', 'bonedensitometry-section',
      'consumables-section', 'patientmonitor-section', 'ECG-section',
      'cardiology-consumables-section'  // ADDED: Check for new section
    ];
    
    const missingElements = requiredElements.filter(id => 
      !document.getElementById(id)
    );
    
    if (missingElements.length > 0) {
      console.warn('Missing HTML elements:', missingElements);
    }
  }
  
  checkRequiredElements();
});

// Global function to handle responsive behavior
function handleResize() {
  const isMobile = window.innerWidth <= 768;
  
  // Adjust carousel behavior for mobile
  if (isMobile && window.carousels) {
    // Pause carousels on mobile to save battery
    Object.values(window.carousels).forEach(carousel => {
      if (carousel && carousel.pause) carousel.pause();
    });
  } else if (window.carousels) {
    // Resume carousels on desktop
    Object.values(window.carousels).forEach(carousel => {
      if (carousel && carousel.resume) carousel.resume();
    });
  }
}

// Listen for window resize
window.addEventListener('resize', handleResize);

// Initialize on load
window.addEventListener('load', handleResize);
</script>

<!-- JavaScript Libraries -->
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="lib/wow/wow.min.js"></script>
<script src="lib/easing/easing.min.js"></script>
<script src="lib/waypoints/waypoints.min.js"></script>
<script src="lib/owlcarousel/owl.carousel.min.js"></script>
<script src="lib/tempusdominus/js/moment.min.js"></script>
<script src="lib/tempusdominus/js/moment-timezone.min.js"></script>
<script src="lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"></script>

<!-- Template Javascript -->
<script src="js/main.js"></script>
<script>
      // Consolidated JavaScript - All functionality in one place
      document.addEventListener('DOMContentLoaded', function() {
        const spinner = document.getElementById('spinner');
        const navbar = document.getElementById('navbar');
        const video = document.getElementById('heroVideo');
        const videoLoading = document.getElementById('videoLoading');
        const videoFallback = document.getElementById('videoFallback');
        const backToTop = document.querySelector('.back-to-top');
        const navbarCollapse = document.getElementById('navbarCollapse');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let videoLoaded = false;
        let pageLoaded = false;

        // === LOADING MANAGEMENT ===
        // Hide main spinner after page load
        window.addEventListener("load", function () {
          pageLoaded = true;
          checkAndHideSpinner();
        });

        // Fallback spinner hide after timeout
        setTimeout(() => {
          // Only hide the main spinner if the video is not still loading
          if (!video || videoLoaded) {
            pageLoaded = true;
            checkAndHideSpinner();
          }
          // If video is still loading, do not hide spinner yet
        }, 2000);

        function checkAndHideSpinner() {
          if (pageLoaded && (videoLoaded || !video || video.style.display === 'none')) {
            spinner.classList.remove('show');
            spinner.classList.add('hide');
            setTimeout(() => {
              spinner.style.display = 'none';
            }, 500);
          }
        }

        // === VIDEO MANAGEMENT ===
if (video) {
  // Video loading handlers
  video.addEventListener('loadeddata', function() {
    videoLoaded = true;
    if (videoLoading) videoLoading.style.display = 'none';
    checkAndHideSpinner();
  });

  video.addEventListener('canplaythrough', function() {
    videoLoaded = true;
    if (videoLoading) videoLoading.style.display = 'none';
    checkAndHideSpinner();
  });

  video.addEventListener('error', function() {
    console.log('Video failed to load, showing fallback');
    video.style.display = 'none';
    if (videoFallback) videoFallback.style.display = 'block';
    if (videoLoading) videoLoading.style.display = 'none';
    videoLoaded = true;
    checkAndHideSpinner();
  });

  // REMOVE this block to never show "Loading video..."
  // setTimeout(() => {
  //   if (!videoLoaded && video.style.display !== 'none') {
  //     if (videoLoading) videoLoading.style.display = 'block';
  //   }
  // }, 1000);
} else {
  videoLoaded = true; // No video element found
}

        // === NAVBAR MANAGEMENT ===
        if (navbar) {
          // Navbar scroll effect
          window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
              navbar.classList.add('scrolled');
            } else {
              navbar.classList.remove('scrolled');
            }

            // Back to top button visibility
            if (backToTop) {
              if (window.scrollY > 200) {
                backToTop.style.display = 'flex';
              } else {
                backToTop.style.display = 'none';
              }
            }
          });

          // Mobile menu close on link click
          navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
              if (window.innerWidth < 992 && navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
              }
            });
          });
        }

        // === BACK TO TOP BUTTON ===
        if (backToTop) {
          backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ 
              top: 0, 
              behavior: 'smooth' 
            });
          });

          // Add hover effect
          backToTop.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.backgroundColor = '#004d80';
          });

          backToTop.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = '#0063AA';
          });
        }

        // === SMOOTH SCROLLING FOR ANCHOR LINKS ===
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // Skip back-to-top button
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          });
        });

        // === INITIALIZE WOW.js (if available) ===
        if (typeof WOW !== 'undefined') {
          new WOW().init();
        }

      });

      // Add enhanced animations
      const style = document.createElement('style');
      style.textContent = `
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-10px) translateX(-50%);
          }
          60% {
            transform: translateY(-5px) translateX(-50%);
          }
        }

        .back-to-top {
          box-shadow: 0 4px 12px rgba(0, 99, 170, 0.3);
        }

        .back-to-top:hover {
          box-shadow: 0 6px 16px rgba(0, 99, 170, 0.4);
        }

        /* Ensure spinner transitions work */
        #spinner.hide {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.5s ease, visibility 0.5s ease;
        }

        #spinner.show {
          opacity: 1;
          visibility: visible;
        }
      `;
      document.head.appendChild(style);
    </script>


</body>

</html>