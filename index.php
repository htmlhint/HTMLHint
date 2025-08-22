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
        <a href="index.php" class="nav-item nav-link ">Home</a>
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
  <div class="video-container">
    <!-- Video Loading Indicator -->
    <div class="video-loading" id="videoLoading">
      <div class="spinner-border text-light mb-3" role="status">
        <span class="sr-only">Loading video...</span>
      </div>
      <p>Loading video...</p>
    </div>

    <!-- Video Background -->
    <video id="heroVideo" class="video-background" autoplay muted loop playsinline preload="metadata">
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


  <!-- About Start -->
    <div id="w" class="container-xxl py-5">
        <div class="container">
            <div class="row g-5">
                <div class="col-lg-6 wow fadeInUp" style="min-height: 400px;">
                    <div class="position-relative h-100">
                        <img class="img-fluid position-absolute w-100 h-100" src="img/logo.jpg" alt="" style="object-fit: cover;">
                    </div>
                </div>
                <div class="col-lg-6 wow fadeInUp">
                    <h6 class="section-title bg-white text-center text-primary px-3">who we are</h6>
                    <h1 class="mb-4">Welcome to <span class="" style="color:#0063AA">RMS</span></h1>
                    <p class="mb-4">Royal Medical Services " RMS " is a Tunisian company based in Tunis the capital of Tunisia.</p>
                    <p class="mb-4">It specializes in the sale and distribution of medical scientific equipment.</p>
                    <div class="row gy-2 gx-4 mb-4">
                        <div class="col-sm-6">
                            <p class="mb-0"><i class="fa fa-arrow-right me-2" style="color:#0063AA"></i>founded in 2019</p>
                        </div>
                        <div class="col-sm-6">
                            <p class="mb-0"><i class="fa fa-arrow-right me-2" style="color:#0063AA"></i>high quality equipment</p>
                        </div>
                        <div class="col-sm-6">
                            <p class="mb-0"><i class="fa fa-arrow-right me-2" style="color:#0063AA"></i>a highly motivated and professional team</p>
                        </div>
                        <div class="col-sm-6">
                            <p class="mb-0"><i class="fa fa-arrow-right me-2" style="color:#0063AA"></i>Best place to recommand</p>
                        </div>
                    </div>
                    <a class="btn py-3 px-5 mt-2" href="https://www.facebook.com/profile.php?id=100040746590077" style="float: left; background: linear-gradient(135deg, #0078C8, #00A651); color: white; border: none;">Read More</a>
                </div>
            </div>
        </div>
    </div>
    <!-- About End -->
<!-- partners Start -->
<div id="part" class="container-xxl py-5">
    <div class="container">
        <div class="text-center wow fadeInUp">
            <h6 class="section-title bg-white text-center text-primary px-3">Partners</h6>
            <h1 class="mb-5">Our partners</h1>
        </div>
        
        <!-- Première rangée - 5 partenaires -->
        <div class="row g-4 mb-4 justify-content-center">
            <div class="col-lg-2 col-sm-6 wow fadeInUp">
                <div class="service-item rounded pt-3" style="background: #ffffff; border: 2px solid #f1f5f9; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 160px;" 
                    onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-3px)'" 
                    onmouseout="this.style.borderColor='#f1f5f9'; this.style.transform='translateY(0)'">
                    <a href="http://hdxwill.com/en/" class="lien-hover">
                        <div class="p-4" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <img src="img/hdx.webp" alt="image" style="max-width: 110px; max-height: 110px; 
                                border-radius: 8px; object-fit: contain;">
                        </div>
                    </a>
                </div>
            </div>

            <div class="col-lg-2 col-sm-6 wow fadeInUp">
                <div class="service-item rounded pt-3" style="background: #ffffff; border: 2px solid #f1f5f9; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 160px;" 
                    onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-3px)'" 
                    onmouseout="this.style.borderColor='#f1f5f9'; this.style.transform='translateY(0)'">
                    <a href="http://www.drgem.co.kr/" class="lien-hover">
                        <div class="p-4" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <img src="img/drgem.png" alt="image" style="max-width: 110px; max-height: 110px; 
                                border-radius: 8px; object-fit: contain;">
                        </div>
                    </a>
                </div>
            </div>

            <div class="col-lg-2 col-sm-6 wow fadeInUp">
                <div class="service-item rounded pt-3" style="background: #ffffff; border: 2px solid #f1f5f9; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 160px;" 
                    onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-3px)'" 
                    onmouseout="this.style.borderColor='#f1f5f9'; this.style.transform='translateY(0)'">
                    <a href="https://www.genoray.com/" class="lien-hover">
                        <div class="p-4" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <img src="img/genoray.png" alt="image" style="max-width: 110px; max-height: 110px; 
                                border-radius: 8px; object-fit: contain;">
                        </div>
                    </a>
                </div>
            </div>

            <div class="col-lg-2 col-sm-6 wow fadeInUp">
                <div class="service-item rounded pt-3" style="background: #ffffff; border: 2px solid #f1f5f9; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 160px;" 
                    onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-3px)'" 
                    onmouseout="this.style.borderColor='#f1f5f9'; this.style.transform='translateY(0)'">
                    <a href="https://www.iraygroup.com/" class="lien-hover">
                        <div class="p-4" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <img src="img/iray.svg" alt="image" style="max-width: 110px; max-height: 110px; 
                                border-radius: 8px; object-fit: contain;">
                        </div>
                    </a>
                </div>
            </div>

            <div class="col-lg-2 col-sm-6 wow fadeInUp">
                <div class="service-item rounded pt-3" style="background: #ffffff; border: 2px solid #f1f5f9; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 160px;" 
                    onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-3px)'" 
                    onmouseout="this.style.borderColor='#f1f5f9'; this.style.transform='translateY(0)'">
                    <a href="https://www.iae.it/" class="lien-hover">
                        <div class="p-4" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <img src="img/iae.png" alt="image" style="max-width: 110px; max-height: 110px; 
                                border-radius: 8px; object-fit: contain;">
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <!-- Deuxième rangée - 5 partenaires -->
        <div class="row g-4 mb-4 justify-content-center">
            <div class="col-lg-2 col-sm-6 wow fadeInUp">
                <div class="service-item rounded pt-3" style="background: #ffffff; border: 2px solid #f1f5f9; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 160px;" 
                    onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-3px)'" 
                    onmouseout="this.style.borderColor='#f1f5f9'; this.style.transform='translateY(0)'">
                    <a href="https://osteosys.com/" class="lien-hover">
                        <div class="p-4" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <img src="img/osto.png" alt="image" style="max-width: 110px; max-height: 110px; 
                                border-radius: 8px; object-fit: contain;">
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-lg-2 col-sm-6 wow fadeInUp">
                <div class="service-item rounded pt-3" style="background: #ffffff; border: 2px solid #f1f5f9; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 160px;" 
                    onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-3px)'" 
                    onmouseout="this.style.borderColor='#f1f5f9'; this.style.transform='translateY(0)'">
                    <a href="https://www.sonoscape.com/" class="lien-hover">
                        <div class="p-4" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <img src="img/sono23.PNG" alt="image" style="max-width: 150px; max-height: 80px; 
                                border-radius: 8px; object-fit: contain;">
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-lg-2 col-sm-6 wow fadeInUp">
                <div class="service-item rounded pt-3" style="background: #ffffff; border: 2px solid #f1f5f9; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 160px;" 
                    onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-3px)'" 
                    onmouseout="this.style.borderColor='#f1f5f9'; this.style.transform='translateY(0)'">
                    <a href="https://www.sinoheromed.com/" class="lien-hover">
                        <div class="p-4" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <img src="img/sino.png" alt="image" style="max-width: 150px; max-height: 80px; 
                                border-radius: 8px; object-fit: contain;">
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-lg-2 col-sm-6 wow fadeInUp">
                <div class="service-item rounded pt-3" style="background: #ffffff; border: 2px solid #f1f5f9; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 160px;" 
                    onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-3px)'" 
                    onmouseout="this.style.borderColor='#f1f5f9'; this.style.transform='translateY(0)'">
                    <a href="https://www.locmedt.net/" class="lien-hover">
                        <div class="p-4" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <img src="img/locmedt.png" alt="image" style="max-width: 150px; max-height: 80px; 
                                border-radius: 8px; object-fit: contain;">
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-lg-2 col-sm-6 wow fadeInUp">
                <div class="service-item rounded pt-3" style="background: #ffffff; border: 2px solid #f1f5f9; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 160px;" 
                    onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-3px)'" 
                    onmouseout="this.style.borderColor='#f1f5f9'; this.style.transform='translateY(0)'">
                    <a href="https://boule.com/" class="lien-hover">
                        <div class="p-4" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <img src="img/boule.png" alt="image" style="max-width: 150px; max-height: 80px; 
                                border-radius: 8px; object-fit: contain;">
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <!-- Troisième rangée - 5 nouveaux partenaires -->
        <div class="row g-4 justify-content-center">
            <div class="col-lg-2 col-sm-6 wow fadeInUp">
                <div class="service-item rounded pt-3" style="background: #ffffff; border: 2px solid #f1f5f9; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 160px;" 
                    onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-3px)'" 
                    onmouseout="this.style.borderColor='#f1f5f9'; this.style.transform='translateY(0)'">
                    <a href="https://fr.getein.com/bha-3000-vet-automatic-hematology-analyzer_p52.html" class="lien-hover">
                        <div class="p-4" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <img src="img/geiten.png" alt="image" style="max-width: 110px; max-height: 110px; 
                                border-radius: 8px; object-fit: contain;">
                        </div>
                    </a>
                </div>
            </div>
              <div class="col-lg-2 col-sm-6 wow fadeInUp">
                <div class="service-item rounded pt-3" style="background: #ffffff; border: 2px solid #f1f5f9; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 160px;"
                    onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-3px)'"
                    onmouseout="this.style.borderColor='#f1f5f9'; this.style.transform='translateY(0)'">
                    <a href="http://poskom.com/" class="lien-hover">
                        <div class="p-4" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <img src="img/pis.png" alt="poskom" style="max-width: 110px; max-height: 110px; 
                                border-radius: 8px; object-fit: contain;">
                        </div>
                    </a>
                </div>
            </div>

            <div class="col-lg-2 col-sm-6 wow fadeInUp">
                <div class="service-item rounded pt-3" style="background: #ffffff; border: 2px solid #f1f5f9; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 160px;"
                    onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-3px)'"
                    onmouseout="this.style.borderColor='#f1f5f9'; this.style.transform='translateY(0)'">
                    <a href="https://aktifxray.com/" class="lien-hover">
                        <div class="p-4" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <img src="img/aktif4.png" alt="Aktif" style="max-width: 110px; max-height: 110px; 
                                border-radius: 8px; object-fit: contain;">
                        </div>
                    </a>
                </div>
            </div>

            <div class="col-lg-2 col-sm-6 wow fadeInUp">
                <div class="service-item rounded pt-3" style="background: #ffffff; border: 2px solid #f1f5f9; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 160px;"
                    onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-3px)'"
                    onmouseout="this.style.borderColor='#f1f5f9'; this.style.transform='translateY(0)'">
                    <a href="https://www.storzmedical.com/" class="lien-hover">
                        <div class="p-4" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <img src="img/storz.png" alt="storz.png" style="max-width: 110px; max-height: 110px; 
                                border-radius: 8px; object-fit: contain;">
                        </div>
                    </a>
                </div>
            </div>

            <div class="col-lg-2 col-sm-6 wow fadeInUp">
                <div class="service-item rounded pt-3" style="background: #ffffff; border: 2px solid #f1f5f9; 
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 160px;"
                    onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-3px)'"
                    onmouseout="this.style.borderColor='#f1f5f9'; this.style.transform='translateY(0)'">
                    <a href="https://www.horse-dental-equipment.com/" class="lien-hover">
                        <div class="p-4" style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <img src="img/horse.png" alt="dental horse equipment" style="max-width: 110px; max-height: 110px; 
                                border-radius: 8px; object-fit: contain;">
                        </div>
                    </a>
                </div>
            </div>
        </div>

    </div>
</div>
<!-- partner End -->

<!-- Human Health Start -->
<div id="h1" class="container-xxl py-5 destination">
    <div class="container">
        <div class="text-center wow fadeInUp">
            <h6 class="section-title bg-white text-center text-primary px-3">Human Health</h6>
            <h1 class="mb-5">Human Health</h1>
        </div>
        <div class="row g-3">
            <div class="col-lg-7 col-md-6">
                <div class="row g-3">
                    <b style="color: grey; line-height: 1.8; display: block;">
                        Human health is at the heart of our vision, built on the foundations of early diagnosis, advanced treatment, and compassionate care. <br>
                        From radiology to cardiology and beyond, modern medical technologies play a vital role in detecting diseases, guiding effective interventions, and improving patient outcomes. <br>
                        Through these innovations, we support healthcare professionals in delivering accurate diagnoses, effective treatments, and exceptional patient care. <br>
                        By embracing innovation, excellence, and high‑quality solutions, we contribute to healthier lives and stronger communities, moving toward a future where every individual has the opportunity to live a healthier, longer life. <br>
                    </b>
                </div>
                <a class="btn py-3 px-5 mt-2 rounded-3 shadow-sm fw-semibold"
                   href="human.php"
                   style="float: left; background: linear-gradient(135deg, #0078C8, #00A651); color: white; border: none;">
                    View More...
                </a>
            </div>
            <div class="col-lg-5 col-md-6 wow zoomIn" style="min-height: 350px;">
                <a class="position-relative d-block h-100 overflow-hidden" href="">
                    <img class="img-fluid position-absolute w-100 h-100" src="img/humanhealth.gif" alt="" style="object-fit: cover;">
                </a>
            </div>
        </div>
    </div>
</div>
<!-- Human Health End -->

<!-- Animal Health Start -->
<div id="h2" class="container-xxl py-5 destination">
    <div class="container">
        <div class="text-center wow fadeInUp">
            <h6 class="section-title bg-white text-center text-primary px-3">Animal Health</h6>
            <h1 class="mb-5">Animal Health</h1>
        </div>
        <div class="row g-3">
            <div class="col-lg-5 col-md-6 wow zoomIn" style="min-height: 350px;">
                <div class="row g-3">
                    <div class="col-lg-12 col-md-12 wow zoomIn">
                        <a class="position-relative d-block overflow-hidden" href="">
                            <img class="img-fluid" src="img/animal.png" alt=""
                                 style="width: 100%; height: 350px; object-fit: cover; display: block; margin: 0 auto;">
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-lg-7 col-md-6 wow zoomIn" style="min-height: 350px;">
                <b style="color: grey; line-height: 1.8; display: block;">
                    Animal health forms a vital pillar in the intricate web of life that sustains our planet and enriches human existence. <br>
                    Just as human health demands attention and innovation, so too does the well-being of animals. <br>
                    Effective animal care depends on early detection of illness, compassionate and skilled intervention, and the application of cutting-edge veterinary technologies. <br>
                    By placing animal health at the forefront of our efforts, we not only safeguard biodiversity but also help prevent the transmission of diseases that can affect entire populations. <br>
                    This holistic approach fosters a harmonious coexistence between all living creatures, promoting resilience and vitality in ecosystems worldwide, and ultimately contributing to a healthier, more vibrant world for generations to come. <br>
                </b>
                <a class="btn py-3 px-5 mt-2 rounded-3 shadow-sm fw-semibold"
                   href="animal.php"
                   style="float: right; background: linear-gradient(135deg, #0078C8, #00A651); color: white; border: none;">
                    View More...
                </a>
            </div>
        </div>
    </div>
</div>
<!-- Animal Health End -->

<!-- Environmental Health Start -->
<div id="en" class="container-xl py-2">
    <div class="container">
        <div class="text-center wow fadeInUp">
            <h6 class="section-title bg-white text-center text-primary px-3">Environmental Health</h6>
            <h1 class="mb-5">Environmental Health</h1>
        </div>

        <div class="wow zoomIn text-center" style="min-height: 350px; max-width: 800px; margin: 0 auto;">
            <b style="color: grey; line-height: 1.8; display: block;">
                Environmental health is shaped by the materials and practices that uphold hygiene, safety, and care in everyday settings. <br>
                In clinical environments, the right tools ranging from protective linens to essential gels and hygienic supplies play a quiet yet powerful role in preventing contamination and supporting well being. <br>
                By enhancing cleanliness and minimizing environmental impact, these solutions contribute to safer procedures, healthier environments, and a more sustainable future for all. <br>
            </b>

            <a class="btn py-3 px-5 mt-4 rounded-3 shadow-sm fw-semibold"
               href="environement.php"
               style="background: linear-gradient(135deg, #0078C8, #00A651); color: white; border: none;">
                View More...
            </a>
        </div>
    </div>
</div>
<!-- Environmental Health End -->

<!-- Package Start -->
<div id="l1" class="container-xxl py-5">
    <div class="container">
        <div class="text-center wow fadeInUp">
            <h6 class="section-title bg-white text-center text-primary px-3">Location</h6>
            <br><br>
        </div>
        <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8505.407986008979!2d10.112459410893324!3d36.85788756574622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd335bc113b317%3A0xe8a6d615cf18d9c3!2sRMS!5e1!3m2!1sfr!2stn!4v1686500096355!5m2!1sfr!2stn" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
</div>
<!-- Package End -->

<!-- Contact Section Start -->
<div id="c" class="container-xxl py-5 wow fadeInUp">
    <div class="container">
        <div class="text-center wow fadeInUp">
            <h6 class="section-title bg-white text-center text-primary px-3">Contact Us</h6>
            <br><br>
        </div>

        <div class="row g-0 shadow-lg" style="border-radius: 20px; overflow: hidden; min-height: 600px;">
            <div class="col-lg-5 p-5 text-white position-relative"
                style="background: linear-gradient(135deg, #0078C8, #00A651);">
                
                <div class="position-absolute top-0 start-0 w-100 h-100"
                    style="background: url('https://www.transparenttextures.com/patterns/asfalt-dark.png'); opacity: 0.1;">
                </div>

                <div class="position-relative z-1">
                    <span class="badge bg-light text-dark px-3 py-2 rounded-pill mb-3">MEDICAL EQUIPMENT</span>
                    
                    <h2 class="fw-bold mb-4">Contact Us Online</h2>
                    <p class="lh-lg mb-4">We are always ready to provide information and support about our equipment. Contact us and we’ll get back to you promptly.</p>

                    <div class="d-flex align-items-center mb-4">
                        <div class="bg-white rounded-circle p-3 me-3">
                            <i class="fas fa-phone" style="color: #00A651;"></i>
                        </div>
                        <div>
                            <h6 class="mb-1">24/7 Professional Support</h6>
                            <small>Always available to assist you</small>
                        </div>
                    </div>

                    <div class="d-flex align-items-center">
                        <div class="bg-white rounded-circle p-3 me-3">
                            <i class="fas fa-clock" style="color: #00A651;"></i>
                        </div>
                        <div>
                            <h6 class="mb-1">Fast Response</h6>
                            <small>We reply within 24 hours</small>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-7 bg-white p-5">
                <div class="text-center mb-4">
                    <h3 class="fw-bold">Send us a Message</h3>
                    <p style="color: #6D6E71;">Fill out the form below and our team will contact you shortly.</p>
                </div>

                <form action="https://formsubmit.co/info@royalmedicalservice.tn" method="POST">
                    <input type="hidden" name="_captcha" value="false">
                    <input type="hidden" name="_next" value="https://royalmedicalservice.tn/thank-you.html">

                    <div class="row g-3">
                        <div class="col-md-6">
                            <input type="text" class="form-control border-2 rounded-3" name="Full Name" placeholder="Full Name" required style="background: #f8f9fa;">
                        </div>
                        <div class="col-md-6">
                            <input type="email" name="Email" class="form-control border-2 rounded-3" placeholder="Email" required style="background: #f8f9fa;">
                        </div>
                        <div class="col-md-6">
                            <input type="tel" name="Phone" class="form-control border-2 rounded-3" placeholder="Phone Number" style="background: #f8f9fa;">
                        </div>
                        <div class="col-md-6">
                            <input type="text" name="Subject" class="form-control border-2 rounded-3" placeholder="Subject" style="background: #f8f9fa;">
                        </div>
                        <div class="col-md-6">
                            <input type="text" name="Address" class="form-control border-2 rounded-3" placeholder="Address" style="background: #f8f9fa;">
                        </div>
                        <div class="col-md-6">
                            <input type="text" name="Postal Code" class="form-control border-2 rounded-3" placeholder="Postal Code" style="background: #f8f9fa;">
                        </div>
                        <div class="col-12">
                            <textarea name="Message" class="form-control border-2 rounded-3" placeholder="Message" rows="4" required style="background: #f8f9fa;"></textarea>
                        </div>
                        <div class="col-12">
                            <button class="btn w-100 py-3 fw-semibold rounded-3 shadow-sm" type="submit"
                                style="background: linear-gradient(135deg, #0078C8, #00A651); color: white;">
                                <i class="fas fa-paper-plane me-2"></i>Send Message
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- Contact Section End -->

<!-- Get in touch Start -->
<div class="container-xxl py-5">
    <div class="container">
        <div class="text-center wow fadeInUp">
            <h6 class="section-title bg-white text-center text-primary px-3">Get in touch</h6>
        </div>
        <div class="mb-5"></div>
        <a href="contact.php">
            <div class="row gy-5 gx-4 justify-content-center">
                <!-- Visitez nous -->
                <div class="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp">
                    <div class="position-relative border pt-5 pb-4 px-4" style="border-color:#0063AA; height: 220px;">
                        <div class="d-inline-flex align-items-center justify-content-center rounded-circle position-absolute top-0 start-50 translate-middle shadow" style="width: 100px; height: 100px;background-color:#0063AA; color:#FFFFFF">
                            <i class="fa fa-map-marker-alt fa-3x"></i>
                        </div>
                        <h5 class="mt-4">Visitez nous</h5>
                        <hr class="w-25 mx-auto bg-primary mb-1">
                        <hr class="w-50 mx-auto bg-primary mt-0">
                        <p class="mb-0" style="color:#0063AA;">Immeuble Les Jardins, jardin d'el menzah 2</p>
                        <p style="color:#0063AA;">Ariana, Tunisia, 2094</p>
                    </div>
                </div>
                <!-- Appelez nous -->
                <div class="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp">
                    <div class="position-relative border pt-5 pb-4 px-4" style="height: 220px;">
                        <div class="d-inline-flex align-items-center justify-content-center rounded-circle position-absolute top-0 start-50 translate-middle shadow" style="width: 100px;background-color:#0063AA; height: 100px;">
                            <i class="fa fa-phone fa-3x text-white"></i>
                        </div>
                        <h5 class="mt-4">Appelez nous</h5>
                        <hr class="w-25 mx-auto bg-primary mb-1">
                        <hr class="w-50 mx-auto bg-primary mt-0">
                        <p class="mb-0" style="color:#0063AA;">+216 36 283 716</p>
                    </div>
                </div>
                <!-- E-mail -->
                <div class="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp">
                    <div class="position-relative border pt-5 pb-4 px-4" style="height: 220px;">
                        <div class="d-inline-flex align-items-center justify-content-center rounded-circle position-absolute top-0 start-50 translate-middle shadow" style="width: 100px;background-color:#0063AA; height: 100px;">
                            <i class="fa fa-envelope fa-3x text-white"></i>
                        </div>
                        <h5 class="mt-4">E-mail</h5>
                        <hr class="w-25 mx-auto bg-primary mb-1">
                        <hr class="w-50 mx-auto bg-primary mt-0">
                        <p class="mb-0" style="color:#0063AA;">info@royalmedicalservice.tn</p>
                    </div>
                </div>
            </div>
        </a>
    </div>
</div>
<!-- Get in touch End -->

<!-- Events Start -->
<div class="container-xxl py-5 wow fadeInUp">
  <div class="container">
    <div class="text-center mb-5">
      <h6 class="section-title bg-white text-center text-primary px-3">Events</h6>
    </div>
    <div class="row g-4">

      <!-- Event Cards -->
      <div class="col-lg-4 col-md-6">
        <div class="card border-0 shadow rounded-4 overflow-hidden h-100">
          <img src="img/event1.jpg" class="card-img-top" style="height: 220px; object-fit: cover;" alt="STR 2024">
          <div class="card-body">
            <h5 class="card-title mb-2">STR 2024</h5>
            <p class="card-text text-muted mb-3"><i class="fa fa-map-marker-alt text-primary me-2"></i>Tunis</p>
            <div class="text-center py-2 px-3 rounded-2"
                 style="background: linear-gradient(135deg, #0078C8, #00A651); color: white; font-weight: 500;">
              <i class="fa fa-calendar-alt me-2"></i> May 8, 2024
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-md-6">
        <div class="card border-0 shadow rounded-4 overflow-hidden h-100">
          <img src="img/40.jpg" class="card-img-top" style="height: 220px; object-fit: cover;" alt="JFR 2024">
          <div class="card-body">
            <h5 class="card-title mb-2">JFR 2024</h5>
            <p class="card-text text-muted mb-3"><i class="fa fa-map-marker-alt text-primary me-2"></i>France</p>
            <div class="text-center py-2 px-3 rounded-2"
                 style="background: linear-gradient(135deg, #0078C8, #00A651); color: white; font-weight: 500;">
              <i class="fa fa-calendar-alt me-2"></i> October 4, 2024
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4 col-md-6">
        <div class="card border-0 shadow rounded-4 overflow-hidden h-100">
          <img src="img/e3.jpg" class="card-img-top" style="height: 220px; object-fit: cover;" alt="STR 2025">
          <div class="card-body">
            <h5 class="card-title mb-2">STR 2025</h5>
            <p class="card-text text-muted mb-3"><i class="fa fa-map-marker-alt text-primary me-2"></i>Tunis</p>
            <div class="text-center py-2 px-3 rounded-2"
                 style="background: linear-gradient(135deg, #0078C8, #00A651); color: white; font-weight: 500;">
              <i class="fa fa-calendar-alt me-2"></i> May 8, 2025
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
<!-- Events End -->

  <!-- Footer Start -->
<div class="container-fluid text-light footer pt-5 mt-5 wow fadeIn" style="float: left; background: linear-gradient(135deg, #0078C8, #00A651); color: white; border: none;" data-wow-delay="0.1s">
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
                <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>Imm Les Jardins, jardin d'el menzah 2, Ariana, Tunisia, 2094</p>
                <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>+216 36 283 716 </p>
                <p class="mb-2"><i class="fa fa-envelope me-3"></i>info@royalmedicalservice.tn</p>
                <div class="d-flex pt-2">
                    <a class="btn btn-outline-light btn-social" href="https://www.facebook.com/profile.php?id=100040746590077"><i class="fab fa-facebook-f"></i></a>
                </div>
            </div>

            <div class="col-lg-3 col-md-3">
                <h4 class="text-white mb-3">Newsletter</h4>
                <div class="position-relative mx-auto" style="max-width: 400px;">
                    <form action="https://formsubmit.co/info@royalmedicalservice.tn" method="POST">
                        <input class="form-control border-primary w-100 py-3 ps-4 pe-5" type="email" name="newsletter_email" placeholder="Your email" required>
                        <input type="hidden" name="_captcha" value="false">
                        <input type="hidden" name="_autoresponse" value="Thank you for subscribing to Royal Medical Services newsletter.">
                        <button type="submit" class="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2" style="background-color: #0078C8;">Send</button>
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
    <a href="#" class="btn btn-lg btn-lg-square back-to-top" style="background-color: #0063AA; color:#FFFFFF; position: fixed; bottom: 30px; right: 30px; z-index: 9999; display: none; align-items: center; justify-content: center; border-radius: 50%; width: 50px; height: 50px; transition: all 0.3s ease;">
      <i class="bi bi-arrow-up"></i>
    </a>

    <!-- jQuery (must be first for plugins) -->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

    <!-- Bootstrap Bundle (includes Popper) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Libraries that depend on jQuery -->
    <script src="lib/wow/wow.min.js"></script>
    <script src="lib/easing/easing.min.js"></script>
    <script src="lib/waypoints/waypoints.min.js"></script>
    <script src="lib/owlcarousel/owl.carousel.min.js"></script>
    <script src="lib/tempusdominus/js/moment.min.js"></script>
    <script src="lib/tempusdominus/js/moment-timezone.min.js"></script>
    <script src="lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"></script>

    <!-- Template JS -->
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