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

<!-- Contact Start -->
<div id="w" class="container-xxl py-5" style="margin-top: 0 !important;">
    <div class="container">
        <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
            <br><br><br>
        </div>
        <div class="row g-4">
            <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <h5>Get In Touch</h5>
                <p class="mb-4"></p>
                <div class="d-flex align-items-center mb-4">
                    <div class="d-flex align-items-center justify-content-center flex-shrink-0" style="width:50px;height:50px;background:linear-gradient(135deg,#0078C8,#00A651);color:white;">
                        <i class="fa fa-map-marker-alt text-white"></i>
                    </div>
                    <div class="ms-3">
                        <h5 class="" style="color:#0063AA;">Office</h5>
                        <p class="mb-0">Imm Les Jardins, Jardin d'el menzah 2 Ariana, Tunisia</p>
                    </div>
                </div>
                <div class="d-flex align-items-center mb-4">
                    <div class="d-flex align-items-center justify-content-center flex-shrink-0" style="width:50px;height:50px;background:linear-gradient(135deg,#0078C8,#00A651);color:white;">
                        <i class="fa fa-phone-alt text-white"></i>
                    </div>
                    <div class="ms-3">
                        <h5 class="" style="color:#0063AA;">Mobile</h5>
                        <p class="mb-0">+216 36 283 716</p>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <div class="d-flex align-items-center justify-content-center flex-shrink-0" style="width:50px;height:50px;background:linear-gradient(135deg,#0078C8,#00A651);color:white;">
                        <i class="fa fa-envelope-open text-white"></i>
                    </div>
                    <div class="ms-3">
                        <h5 class="" style="color:#0063AA;">Email</h5>
                        <p class="mb-0">info@royalmedicalservice.tn</p>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8505.407986008979!2d10.112459410893324!3d36.85788756574622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd335bc113b317%3A0xe8a6d615cf18d9c3!2sRMS!5e1!3m2!1sfr!2stn!4v1686500096355!5m2!1sfr!2stn" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <!-- Contact Form -->
            <div class="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                <form action="https://formsubmit.co/info@royalmedicalservice.tn" method="POST">
                    <input type="hidden" name="_captcha" value="false">
                    <input type="hidden" name="_autoresponse" value="Thank you for contacting Royal Medical Services. We have received your message and will get back to you shortly.">

                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input type="text" class="form-control" id="name" name="name" placeholder="Your Name" required>
                                <label for="name">Your Name</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input type="email" class="form-control" id="email" name="email" placeholder="Your Email" required>
                                <label for="email">Your Email</label>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-floating">
                                <input type="text" class="form-control" id="subject" name="subject" placeholder="Subject">
                                <label for="subject">Subject</label>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-floating">
                                <textarea class="form-control" placeholder="Leave a message here" id="message" name="message" style="height: 100px" required></textarea>
                                <label for="message">Message</label>
                            </div>
                        </div>
                        <div class="col-12">
                            <button class="btn w-100 py-3" style="background: linear-gradient(135deg, #0078C8, #00A651); color: white;" type="submit">Send Message</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- Contact End -->

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
<a href="#" class="btn btn-lg btn-lg-square back-to-top" style="background-color: #0063AA;color: #FFFFFF"><i class="bi bi-arrow-up"></i></a>


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