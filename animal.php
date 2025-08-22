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
                animal sector
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
              <p> In animal health, we are dedicated to supporting veterinarians with solutions tailored to meet the evolving demands of modern veterinary medicine. </p>
               <p> Our commitment extends beyond supplying equipment — we provide advanced tools that enable faster diagnosis, more effective treatment, and ultimately, improved quality of life for the animals in their care.</p>
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
            <img src="img/icone7.png" alt="Radiology" style="height: 100px; width: auto; margin-right: 20px; object-fit: contain;">
            <div>
              <h5 class="fw-bold mb-2">Radiology</h5>
              <p class="mb-2" style="font-size: 15px;">Advanced imaging solutions for diagnostics and medical visualization.</p>
              <button onclick="showRadiology()" class="btn btn-primary" style="background-color: #0063AA; border: none;">Learn more</button>
            </div>
          </div>
        </div>

        <!-- Dental Care -->
        <div class="col-md-6">
          <div class="d-flex align-items-center p-4 bg-white rounded shadow-sm h-100 border" style="border-color: rgba(0, 99, 170, 0.3);">
            <img src="img/icone4.jpg" alt="Dental Care" style="height: 100px; width: auto; margin-right: 20px; object-fit: contain;">
            <div>
              <h5 class="fw-bold mb-2">Dental Care</h5>
              <p class="mb-2" style="font-size: 15px;">Advanced Dental Scaling Solution</p>
              <button onclick="showDentalCare()" class="btn btn-primary" style="background-color: #0063AA; border: none;">Learn more</button>
            </div>
          </div>
        </div>

        <!-- Therapy and Rehabilitation -->
        <div class="col-md-6">
          <div class="d-flex align-items-center p-4 bg-white rounded shadow-sm h-100 border" style="border-color: rgba(0, 99, 170, 0.3);">
            <img src="img/icone6.png" alt="Therapy and Rehabilitation" style="height: 100px; width: auto; margin-right: 20px; object-fit: contain;">
            <div>
              <h5 class="fw-bold mb-2">Therapy and Rehabilitation</h5>
              <p class="mb-2" style="font-size: 15px;">Shock Wave therapy device for effective rehabilitation.</p>
              <button onclick="showTherapyRehabilitation()" class="btn btn-primary" style="background-color: #0063AA; border: none;">Learn more</button>
            </div>
          </div>
        </div>

        <!-- Laboratory & Analysis -->
        <div class="col-md-6">
          <div class="d-flex align-items-center p-4 bg-white rounded shadow-sm h-100 border" style="border-color: rgba(0, 99, 170, 0.3);">
            <img src="img/icone8.jpg" alt="Laboratory & Analysis" style="height: 100px; width: auto; margin-right: 20px; object-fit: contain;">
            <div>
              <h5 class="fw-bold mb-2">Laboratory & Analysis</h5>
              <p class="mb-2" style="font-size: 15px;">Hematology and biochemistry analyzers for precise lab results.</p>
              <button onclick="showLaboratoryAnalysis()" class="btn btn-primary" style="background-color: #0063AA; border: none;">Learn more</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>

<!-- Radiology Subcategories Section -->
<div id="radiology-subcategories" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif;">
    <div class="container">
        <div class="text-center">
            <h6 class="section-title bg-white text-center text-primary px-3" style="margin-bottom: 25px;">Radiology</h6>
        </div>
        <div class="p-4 rounded" style="border: 2px solid rgba(0, 99, 170, 0.2); background-color: rgba(0, 99, 170, 0.05);">
            <div class="row g-4 justify-content-center">
                <!-- X-RAY -->
                <div class="col-md-3">
                    <div onclick="showXrayTabs()" class="d-flex justify-content-center align-items-center text-center bg-white rounded shadow-sm h-100 border p-4" style="height: 150px; border-color: rgba(0, 99, 170, 0.3); cursor: pointer;">
                        <h5 class="fw-bold mb-0">X-RAY</h5>
                    </div>
                </div>
                <!-- Ultrasound System -->
                <div class="col-md-3">
                    <div onclick="showUltrasoundTabs()" class="d-flex justify-content-center align-items-center text-center bg-white rounded shadow-sm h-100 border p-4" style="height: 150px; border-color: rgba(0, 99, 170, 0.3); cursor: pointer;">
                        <h5 class="fw-bold mb-0">Ultrasound System</h5>
                    </div>
                </div>
                <!-- Endoscopy System -->
                <div class="col-md-3">
                    <div onclick="showEndoscopyTabs()" class="d-flex justify-content-center align-items-center text-center bg-white rounded shadow-sm h-100 border p-4" style="height: 150px; border-color: rgba(0, 99, 170, 0.3); cursor: pointer;">
                        <h5 class="fw-bold mb-0">Endoscopy System</h5>
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
<!-- X-RAY Equipment Tabs Section -->
<div id="xray-tabs-section" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif;">
    <div class="container">
        <div class="text-center mb-4">
            <h6 class="section-title bg-white text-primary px-3">X-RAY</h6>
        </div>
        <!-- Tabs -->
        <ul class="nav nav-tabs justify-content-center mb-5" id="xrayTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="xray1-tab" data-bs-toggle="tab" data-bs-target="#xray1" type="button" role="tab" aria-controls="xray1" aria-selected="true">X-Ray System</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="xray2-tab" data-bs-toggle="tab" data-bs-target="#xray2" type="button" role="tab" aria-controls="xray2" aria-selected="false">X-Ray Generator</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="xray3-tab" data-bs-toggle="tab" data-bs-target="#xray3" type="button" role="tab" aria-controls="xray3" aria-selected="false">Digital X-Ray Detector</button>
            </li>
        </ul>

        <!-- Tab content -->
        <div class="tab-content border rounded shadow-sm p-5" style="background-color: rgba(0, 99, 170, 0.05);">
            <!-- Tab 1 -->
            <div class="tab-pane fade show active" id="xray1" role="tabpanel" aria-labelledby="xray1-tab">
                <div class="row align-items-center">
                    <div class="col-md-5 mb-4 mb-md-0">
                        <img src="img/VXR.webp" alt="DRGEMM X-Ray System" class="img-fluid rounded shadow-sm">
                    </div>
                    <div class="col-md-7">
                        <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
                            X-Ray System<br>
                            <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">VXR Series - DRGEM</span>
                        </h3>
                        <p>
                           The VXR System is a compact and efficient veterinary radiology system that delivers powerful imaging, advanced diagnostic tools, and a user-friendly design for precise and reliable performance.<br><br>
                        </p>
                        <a href="CATALOGUES/VXR.pdf" target="_blank" class="btn btn-primary mt-3">
                            DOWNLOAD FULL BROCHURE
                        </a>
                    </div>
                </div>
            </div>

            <!-- Tab 2 -->
            <div class="tab-pane fade" id="xray2" role="tabpanel" aria-labelledby="xray2-tab">
                <div class="row align-items-center g-5 py-5">
                     <div class="col-md-5 mb-4 mb-md-0">
                        <img src="img/psk.png" alt="DIAMOND" class="img-fluid rounded shadow-sm">
                    </div>
                    <div class="col-md-7">
                        <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
                            X-Ray Generator <br>
                            <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">VET 20BT - POSKOM </span>
                        </h3>
                        <p>
                           The VET-20BT portable radiology device is the lightest and most compact battery-powered hybrid generator, representing the most advanced portable radiology system to date <br><br>
                        </p>
                        <a href="CATALOGUES/poskom.pdf" target="_blank" class="btn btn-primary mt-3">
                            DOWNLOAD FULL BROCHURE
                        </a>
                    </div>
                </div>
            </div>

            <!-- Tab 3 -->
            <div class="tab-pane fade" id="xray3" role="tabpanel" aria-labelledby="xray3-tab">
                <div class="row align-items-center g-5 py-5">
                    <div class="col-md-5 mb-4 mb-md-0">
                        <img src="img/55.png" alt="ACQUIDR" class="img-fluid rounded shadow-sm">
                    </div>
                    <div class="col-md-7">
                        <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
                           Digital X-Ray Detector<br>
                            <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">MARS 1417 - IRAY</span>
                        </h3>
                        <p>
                            Mars 1417V is a smart 14×17-inch wireless, cassette-sized FPD for radiographic imaging <br><br>
                            It features reliable AED, dependable wireless performance, and a long battery life  <br><br>
                            The Mars 1417V supports a fast workflow, and is the optimal choice for both retrofit and new DR system solutions  <br><br>
                        </p>
                        <a href="CATALOGUES/mars1417.pdf" target="_blank" class="btn btn-primary mt-3">
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

<!-- Ultrasound Equipment Tabs Section -->
<div id="ultrasound-tabs-section" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif;">
    <div class="container">
        <div class="text-center mb-4">
            <h6 class="section-title bg-white text-primary px-3">Ultrasound System</h6>
        </div>
        <!-- Tabs -->
        <ul class="nav nav-tabs justify-content-center mb-5" id="ultrasoundTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="ultrasound1-tab" data-bs-toggle="tab" data-bs-target="#ultrasound1" type="button" role="tab" aria-controls="ultrasound1" aria-selected="true">Ultrasound Equipment</button>
            </li>
        </ul>

        <!-- Tab content -->
        <div class="tab-content border rounded shadow-sm p-5" style="background-color: rgba(0, 99, 170, 0.05);">
            <!-- Tab 1 -->
            <div class="tab-pane fade show active" id="ultrasound1" role="tabpanel" aria-labelledby="ultrasound1-tab">
                <div class="row align-items-center">
                    <div class="col-md-5 mb-4 mb-md-0">
                        <img src="img/sonoscape44.png" alt="Ultrasound System" class="img-fluid rounded shadow-sm">
                    </div>
                    <div class="col-md-7">
                        <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
                            Ultrasound System<br>
                            <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">E1V - SONOSCAPE</span>
                        </h3>
                        <p>
                            the E1V delivers high-contrast black-and-white imaging for everything from small pets to large livestockn <br><br>
                            With dedicated veterinary software and streamlined workflow, it ensures faster, more confident diagnoses <br><br>


                        </p>
                        <a href="CATALOGUES/sonoscape.pdf" target="_blank" class="btn btn-primary mt-3">
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

<!-- Endoscopy Equipment Tabs Section -->
<div id="endoscopy-tabs-section" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif;">
    <div class="container">
        <div class="text-center mb-4">
            <h6 class="section-title bg-white text-primary px-3">Endoscopy System</h6>
        </div>
        <!-- Tabs -->
        <ul class="nav nav-tabs justify-content-center mb-5" id="endoscopyTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="endoscopy1-tab" data-bs-toggle="tab" data-bs-target="#endoscopy1" type="button" role="tab" aria-controls="endoscopy1" aria-selected="true">Endoscopy Equipment</button>
            </li>
        </ul>

        <!-- Tab content -->
        <div class="tab-content border rounded shadow-sm p-5" style="background-color: rgba(0, 99, 170, 0.05);">
            <!-- Tab 1 -->
            <div class="tab-pane fade show active" id="endoscopy1" role="tabpanel" aria-labelledby="endoscopy1-tab">
                <div class="row align-items-center">
                    <div class="col-md-5 mb-4 mb-md-0">
                        <img src="img/aohua.png" alt="Endoscopy System" class="img-fluid rounded shadow-sm">
                    </div>
                    <div class="col-md-7">
                        <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
                            Endoscopy System<br>
                            <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">OR 100 - AOHUA</span>
                        </h3>
                        <p>
                           Combining Full HD imaging, a bright LED light source, integrated air pump, and a 15.6” display, the OR-100 offers veterinary professionals a complete, high-quality visualization solution in a single compact unit.<br><br>
                        </p>
                        <a href="CATALOGUES/endoscopy.pdf" target="_blank" class="btn btn-primary mt-3">
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
<!-- Dental Care Tabs Section -->
<div id="dentalcare-tabs-section" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif;">
  <div class="container">
    <div class="text-center mb-4">
      <h6 class="section-title bg-white text-primary px-3">Dental Care</h6>
    </div>
    <!-- Tabs -->
    <ul class="nav nav-tabs justify-content-center mb-5" id="dentalcareTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="dentalcare1-tab" data-bs-toggle="tab" data-bs-target="#dentalcare1" type="button" role="tab" aria-controls="dentalcare1" aria-selected="true">Dentistry Motorized Set</button>
      </li>
    </ul>
    <!-- Tab content -->
    <div class="tab-content border rounded shadow-sm p-5" style="background-color: rgba(0, 99, 170, 0.05);">
      <!-- Tab 1 -->
      <div class="tab-pane fade show active" id="dentalcare1" role="tabpanel" aria-labelledby="dentalcare1-tab">
        <div class="row align-items-center">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/set3.png" alt="Dentistry Motorized Set" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
            <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
              Dentistry Motorized Set<br>
              <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">SET 3 Compact - Horse Dental Equipment</span>
            </h3>
            <p>
             The SET 3 Compact is a complete, professional-grade motorized dental system designed to support comprehensive veterinary dental procedures <br><br>
              It combines precision control with ergonomic design, ensuring efficient and safe dental care tailored to veterinary practice needs <br><br>
            </p>
            
          </div>
        </div>
      </div>
    </div>
    <!-- Back button -->
    <div class="text-center mt-5">
      <button onclick="showProducts()" class="btn btn-outline-primary px-4">← Back to Products</button>
    </div>
  </div>
</div>
<!-- Therapy and Rehabilitation Tabs Section -->
<div id="therapy-tabs-section" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif;">
  <div class="container">
    <div class="text-center mb-4">
      <h6 class="section-title bg-white text-primary px-3">Therapy and Rehabilitation</h6>
    </div>
    <!-- Tabs -->
    <ul class="nav nav-tabs justify-content-center mb-5" id="therapyTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="therapy1-tab" data-bs-toggle="tab" data-bs-target="#therapy1" type="button" role="tab" aria-controls="therapy1" aria-selected="true">Shock Wave Therapy</button>
      </li>
    </ul>
    <!-- Tab content -->
    <div class="tab-content border rounded shadow-sm p-5" style="background-color: rgba(0, 99, 170, 0.05);">
      <!-- Tab 1 -->
      <div class="tab-pane fade show active" id="therapy1" role="tabpanel" aria-labelledby="therapy1-tab">
        <div class="row align-items-center">
          <div class="col-md-5 mb-4 mb-md-0">
            <img src="img/mp.png" alt="Radial Shock Wave Therapy MP 100 Ultra - Storz Medical" class="img-fluid rounded shadow-sm">
          </div>
          <div class="col-md-7">
            <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
              Radial Shock Wave Therapy<br>
              <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">MP 100 Ultra + - Storz Medical</span>
            </h3>
            <p>
             The MASTERPULS® MP100 VET "Ultra" is a compact, reliable radial shock wave device with low maintenance and silent “Air Power” control <br><br>
             Its ergonomic applicator allows easy, direct treatment with preset parameters and optional touchscreen control  <br><br>
            </p>
            <a href="CATALOGUES/mp.pdf" target="_blank" class="btn btn-primary mt-3">
              DOWNLOAD FULL BROCHURE
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- Back button -->
    <div class="text-center mt-5">
      <button onclick="showProducts()" class="btn btn-outline-primary px-4">← Back to Products</button>
    </div>
  </div>
</div>
<!-- Laboratory Subcategories Section -->
<div id="laboratory-subcategories" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif;">
    <div class="container">
        <div class="text-center">
            <h6 class="section-title bg-white text-center text-primary px-3" style="margin-bottom: 25px;">Laboratory Equipment</h6>
        </div>
        <div class="p-4 rounded" style="border: 2px solid rgba(0, 99, 170, 0.2); background-color: rgba(0, 99, 170, 0.05);">
            <div class="row g-4 justify-content-center">
                <!-- Hematology -->
                <div class="col-md-3">
                    <div onclick="showHematologyTabs()" class="d-flex justify-content-center align-items-center text-center bg-white rounded shadow-sm h-100 border p-4" style="height: 150px; border-color: rgba(0, 99, 170, 0.3); cursor: pointer;">
                        <h5 class="fw-bold mb-0">Hematology</h5>
                    </div>
                </div>
                <!-- Biochemistry -->
                <div class="col-md-3">
                    <div onclick="showBiochemistryTabs()" class="d-flex justify-content-center align-items-center text-center bg-white rounded shadow-sm h-100 border p-4" style="height: 150px; border-color: rgba(0, 99, 170, 0.3); cursor: pointer;">
                        <h5 class="fw-bold mb-0">Biochemistry</h5>
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

<!-- Hematology Equipment Tabs Section -->
<div id="hematology-tabs-section" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif;">
  <div class="container">
    <div class="text-center mb-4">
      <h6 class="section-title bg-white text-primary px-3">Hematology</h6>
    </div>
    <!-- Tabs -->
    <ul class="nav nav-tabs justify-content-center mb-5" id="hematologyTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="hematology1-tab" data-bs-toggle="tab" data-bs-target="#hematology1" type="button" role="tab" aria-controls="hematology1" aria-selected="true">Hematology Analyzer</button>
      </li>
    </ul>

    <!-- Tab content -->
    <div class="tab-content border rounded shadow-sm p-5" style="background-color: rgba(0, 99, 170, 0.05);">
      <div class="tab-pane fade show active" id="hematology1" role="tabpanel" aria-labelledby="hematology1-tab">
        <div id="hematologyCarousel" class="carousel slide" data-bs-ride="carousel">
          <!-- Indicators/Dots -->
          <div class="carousel-indicators" style="bottom: -50px;">
            <button type="button" data-bs-target="#hematologyCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="VetScan HM5"></button>
            <button type="button" data-bs-target="#hematologyCarousel" data-bs-slide-to="1" aria-label="VetScan HM6"></button>
          </div>

          <!-- Carousel items -->
          <div class="carousel-inner">
            <!-- Equipment 1 -->
            <div class="carousel-item active">
              <div class="row align-items-center g-5 py-5">
                <div class="col-md-5 mb-4 mb-md-0">
                  <img src="img/bha.png" alt="VetScan HM5 Hematology Analyzer" class="img-fluid rounded shadow-sm">
                </div>
                <div class="col-md-7">
                  <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
                    Hematology Analyzer<br>
                    <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">BHA - GEITEIN </span>
                  </h3>
                  <p>
                    The BHA is a compact and lightweight automated hematology analyzer designed to meet the diverse needs of modern clinical laboratories <br><br>
                    Its user-friendly interface and efficient performance make it an ideal choice for a wide range of medical applications <br><br>
                  </p>
            
                </div>
              </div>
            </div>

            <!-- Equipment 2 -->
            <div class="carousel-item">
              <div class="row align-items-center g-5 py-5">
                <div class="col-md-5 mb-4 mb-md-0">
                  <img src="img/exigo.png" alt="VetScan HM6 Hematology Analyzer" class="img-fluid rounded shadow-sm">
                </div>
                <div class="col-md-7">
                  <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
                    Hematology Analyzer<br>
                    <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">EXIGO - BOULE DIAGNOSTICS </span>
                  </h3>
                  <p>
                   Built for durability and ease, Exigo fits many animal clinics <br><br>
                   Its micro-pipette technology delivers a complete blood count from one drop in just one minute. Designed for reliable use with minimal maintenance <br><br>
                  </p>
        
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation arrows -->
          <button class="carousel-control-prev" type="button" data-bs-target="#hematologyCarousel" data-bs-slide="prev" style="left: -60px; top: 50%; transform: translateY(-50%); width: 50px; height: 50px; background-color: #0063AA; border-radius: 50%; border: none;">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#hematologyCarousel" data-bs-slide="next" style="right: -60px; top: 50%; transform: translateY(-50%); width: 50px; height: 50px; background-color: #0063AA; border-radius: 50%; border: none;">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Back button -->
    <div class="text-center mt-5">
      <button onclick="showLaboratory()" class="btn btn-outline-primary px-4">← Back to Laboratory</button>
    </div>
  </div>
</div>

<!-- Biochemistry Equipment Tabs Section -->
<div id="biochemistry-tabs-section" class="container-xxl py-5" style="display: none; font-family: 'Times New Roman', Times, serif;">
    <div class="container">
        <div class="text-center mb-4">
            <h6 class="section-title bg-white text-primary px-3">Biochemistry</h6>
        </div>
        <!-- Tabs -->
        <ul class="nav nav-tabs justify-content-center mb-5" id="biochemistryTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="biochemistry1-tab" data-bs-toggle="tab" data-bs-target="#biochemistry1" type="button" role="tab" aria-controls="biochemistry1" aria-selected="true">Biochemistry Analyzer</button>
            </li>
        </ul>

        <!-- Tab content -->
        <div class="tab-content border rounded shadow-sm p-5" style="background-color: rgba(0, 99, 170, 0.05);">
            <div class="tab-pane fade show active" id="biochemistry1" role="tabpanel" aria-labelledby="biochemistry1-tab">
                <div class="row align-items-center">
                    <div class="col-md-5 mb-4 mb-md-0">
                        <img src="img/loc.png" alt="Biochemistry Analyzer" class="img-fluid rounded shadow-sm">
                    </div>
                    <div class="col-md-7">
                        <h3 class="mb-4" style="font-size: 28px; font-weight: bold; line-height: 1.4;">
                            Biochemistry Analyzer<br>
                            <span style="display: block; margin-top: 12px; font-size: 24px; color: #0063AA;">NOAHCALI 100 - LOCMEDT </span>
                        </h3>
                        <p>
                           A highly integrated, intelligent automatic biochemistry analyzer for veterinary use, delivering fast and accurate results <br><br>
                            It performs multiple tests simultaneously from a single sample <br><br>

                           Portable and easy to use, with a wide test menu including biochemistry, blood gas, and electrolytes <br><br>
                           An ideal solution for animal health diagnostics <br><br>
</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Back button -->
        <div class="text-center mt-5">
            <button onclick="showLaboratory()" class="btn btn-outline-primary px-4">← Back to Laboratory</button>
        </div>
    </div>
</div>
<!-- Custom styles -->
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
                            <button type="submit" class="btn btn-primary mt-2 w-100">Subscribe</button>
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
    <a href="#" class="btn btn-lg btn-lg-square back-to-top" style="background-color: #0063AA; color:#FFFFFF;">
      <i style="background-color: #0063AA;" class="bi bi-arrow-up"></i>
    </a>

    <script>
      function hideAllSections() {
          const sections = [
              'products',
              'radiology-subcategories',
              'xray-tabs-section',
              'ultrasound-tabs-section',
              'endoscopy-tabs-section',
              'dentalcare-tabs-section',
              'therapy-tabs-section',
              'laboratory-subcategories',
              'hematology-tabs-section',
              'biochemistry-tabs-section'
          ];
          sections.forEach(id => {
              const element = document.getElementById(id);
              if (element) {
                  element.style.display = 'none';
              }
          });
      }

      function showProducts() {
          hideAllSections();
          const productsSection = document.getElementById('products');
          if (productsSection) {
              productsSection.style.display = 'block';
          }
      }

      function showRadiology() {
          hideAllSections();
          const radiologySection = document.getElementById('radiology-subcategories');
          if (radiologySection) {
              radiologySection.style.display = 'block';
          }
      }

      function showXrayTabs() {
          hideAllSections();
          const xraySection = document.getElementById('xray-tabs-section');
          if (xraySection) {
              xraySection.style.display = 'block';
          }
      }

      function showUltrasoundTabs() {
          hideAllSections();
          const ultrasoundSection = document.getElementById('ultrasound-tabs-section');
          if (ultrasoundSection) {
              ultrasoundSection.style.display = 'block';
          }
      }

      function showEndoscopyTabs() {
          hideAllSections();
          const endoscopySection = document.getElementById('endoscopy-tabs-section');
          if (endoscopySection) {
              endoscopySection.style.display = 'block';
          }
      }

      function showDentalCare() {
          hideAllSections();
          const dentalcareSection = document.getElementById('dentalcare-tabs-section');
          if (dentalcareSection) {
              dentalcareSection.style.display = 'block';
          }
      }

      function showTherapyRehabilitation() {
          hideAllSections();
          const therapySection = document.getElementById('therapy-tabs-section');
          if (therapySection) {
              therapySection.style.display = 'block';
          }
      }

      function showLaboratoryAnalysis() {
          hideAllSections();
          const laboratorySubcategories = document.getElementById('laboratory-subcategories');
          if (laboratorySubcategories) {
              laboratorySubcategories.style.display = 'block';
          }
      }

      function showHematologyTabs() {
          hideAllSections();
          const hematologySection = document.getElementById('hematology-tabs-section');
          if (hematologySection) {
              hematologySection.style.display = 'block';
          }
      }

      function showBiochemistryTabs() {
          hideAllSections();
          const biochemistrySection = document.getElementById('biochemistry-tabs-section');
          if (biochemistrySection) {
              biochemistrySection.style.display = 'block';
          }
      }

      function showLaboratory() {
          showLaboratoryAnalysis();
      }

      function showDentalcareTabs() {
          showDentalCare();
      }

      function showTherapyTabs() {
          showTherapyRehabilitation();
      }

      function showLaboratoryTabs() {
          showLaboratoryAnalysis();
      }

      document.addEventListener('DOMContentLoaded', function() {
          showProducts();
      });
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