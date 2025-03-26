<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTube Automation eBook</title>
    <link rel="stylesheet" href="style.css">
    <style>
        /* Style your page here */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: auto;
        }
        .btn {
            background-color: #FF0000;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
        }
        #paymentModal, #confirmationModal, #ai-chatbot {
            display: none;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>সাহরিয়ার মুন্না এর YouTube অটোমেশন ইবুক</h1>
        </div>
    </header>

    <main>
        <section id="books" class="books">
            <div class="container">
                <h2>আমাদের প্রিমিয়াম ইবুকসমূহ</h2>
                <ul>
                    <li>1. YouTube Automation Mastery (৳1,299)</li>
                    <li>2. AI For YouTube Automation (৳1,599)</li>
                    <li>3. Combo Guide (৳2,499)</li>
                </ul>
                <a href="#" class="btn" id="actualDownloadLink">ইবুক ডাউনলোড করুন</a>
            </div>
        </section>

        <section id="payment" class="payment">
            <div class="container">
                <button class="btn" onclick="openModal('YouTube Automation Mastery', '1299')">অর্ডার করুন</button>
                <div id="paymentModal">
                    <div style="background-color:#FF0000; color:white; padding:10px; text-align:center;">
                        <h3 id="modalTitle"></h3>
                        <button onclick="closeModal()" style="background:none; border:none; color:white; font-size:20px; cursor:pointer;">×</button>
                    </div>
                    <form id="paymentForm" onsubmit="processPayment(event)">
                        <input type="text" id="name" placeholder="আপনার নাম" required>
                        <input type="email" id="email" placeholder="আপনার ইমেইল" required>
                        <input type="text" id="phone" placeholder="আপনার ফোন নম্বর" required>
                        <select id="method">
                            <option value="bkash">Bkash</option>
                            <option value="nagad">Nagad</option>
                            <option value="rocket">Rocket</option>
                        </select>
                        <div id="bkashDetails" style="display:none;">
                            <input type="text" id="trxId" placeholder="ট্রানজেকশন আইডি" required>
                        </div>
                        <button type="submit" class="btn">পেমেন্ট করুন</button>
                    </form>
                </div>

                <!-- Confirmation Modal -->
                <div id="confirmationModal">
                    <div style="background-color:#FF0000; color:white; padding:10px; text-align:center;">
                        <h3>অর্ডার নিশ্চিতকরণ</h3>
                        <button onclick="closeConfirmation()" style="background:none; border:none; color:white; font-size:20px; cursor:pointer;">×</button>
                    </div>
                    <p id="confirmationMessage"></p>
                </div>
            </div>
        </section>

        <section id="testimonials" class="testimonials">
            <div class="container">
                <h2>গ্রাহকদের মতামত</h2>
                <div class="testimonial-container">
                    <article class="testimonial-card">
                        <p class="testimonial-text">Sahariyar Munna এর ইবুকটি আমার YouTube অটোমেশন জার্নি সম্পূর্ণ বদলে দিয়েছে। অসাধারণ কন্টেন্ট এবং ব্যবহারিক টিপস পেয়েছি যা আমি আমার চ্যানেলে প্রয়োগ করছি।</p>
                        <p class="testimonial-author">আহমেদ রহমান</p>
                    </article>
                    <article class="testimonial-card">
                        <p class="testimonial-text">এই ইবুকটি পড়ে আমি আমার প্রথম অটোমেটেড YouTube চ্যানেল তৈরি করেছি। লেখকের গভীর জ্ঞান এবং বাস্তব অভিজ্ঞতা বইটিকে অনন্য করেছে।</p>
                        <p class="testimonial-author">ফারহানা ইসলাম</p>
                    </article>
                    <article class="testimonial-card">
                        <p class="testimonial-text">এক কথায় অসাধারণ! আমি অনেক ইবুক পড়েছি কিন্তু Sahariyar Munna এর এই বইটির মতো ব্যবহারিক তথ্য খুব কম বইয়ে পেয়েছি। AI ব্যবহার করে কিভাবে YouTube অটোমেট করতে হয় তা সত্যিই চমৎকারভাবে ব্যাখ্যা করা হয়েছে।</p>
                        <p class="testimonial-author">রিয়াদ হোসেন</p>
                    </article>
                </div>
            </div>
        </section>

        <section id="contact" class="cta-section">
            <div class="container">
                <h2>আজই আপনার ইবুকটি কিনুন</h2>
                <a href="#books" class="btn">ইবুক দেখুন</a>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <div class="footer-links">
                <a href="#">প্রাইভেসি পলিসি</a>
                <a href="#">টার্মস অ্যান্ড কন্ডিশনস</a>
                <a href="#">রিফান্ড পলিসি</a>
                <a href="tel:01879989742">যোগাযোগ</a>
            </div>
            <p class="copyright">© 2023 Sahariyar Munna. সকল অধিকার সংরক্ষিত</p>
        </div>
    </footer>

    <!-- WhatsApp Widget -->
    <div id="whatsapp-widget">
        <a href="https://wa.me/8801879989742" target="_blank">WhatsApp এ চ্যাট করুন</a>
    </div>

    <!-- AI Chatbot -->
    <div id="ai-chatbot">
        <div>
            <h3>Sahariyar Munna Support</h3>
            <button id="close-chat">×</button>
        </div>
        <div id="chat-messages"></div>
        <input type="text" id="user-input" placeholder="আপনার প্রশ্ন লিখুন...">
        <button id="send-btn">পাঠান</button>
    </div>
    
    <button id="chat-toggle">💬</button>

    <script>
    function openModal(productName, productPrice) {
        document.getElementById('productName').value = productName;
        document.getElementById('productPrice').value = productPrice;
        document.getElementById('modalTitle').textContent = productName + ' - অর্ডার করুন (' + productPrice + '৳)';
        document.getElementById('paymentModal').style.display = 'block';
    }
    
    function closeModal() {
        document.getElementById('paymentModal').style.display = 'none';
    }

    function closeConfirmation() {
        document.getElementById('confirmationModal').style.display = 'none';
    }

    document.getElementById('method').addEventListener('change', function() {
        const method = this.value;
        const bkashDetails = document.getElementById('bkashDetails');
        
        if (method === 'bkash') {
            bkashDetails.style.display = 'block';
        } else {
            bkashDetails.style.display = 'none';
        }
    });

    function processPayment(e) {
        e.preventDefault();
        
        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const method = document.getElementById('method').value;
        const trxId = document.getElementById('trxId').value;
        
        const orderId = 'ORD-' + Math.floor(Math.random() * 1000000);
        let message = `ধন্যবাদ ${name}!<br>আপনার অর্ডার #${orderId} সফলভাবে সম্পন্ন হয়েছে।<br><br>`;
        message += `<strong>পণ্য:</strong> ${productName}<br>`;
        message += `<strong>মূল্য:</strong> ${productPrice}৳<br>`;
        message += `<strong>পেমেন্ট মেথড:</strong> ${method.toUpperCase()}`;
        
        if (method === 'bkash') {
            message += `<br><strong>ট্রানজেকশন আইডি:</strong> ${trxId}`;
        }
        
        document.getElementById('confirmationMessage').innerHTML = message;
        
        document.getElementById('actualDownloadLink').href = "#";
        document.getElementById('downloadLink').style.display = 'block';
        
        document.getElementById('paymentModal').style.display = 'none';
        document.getElementById('confirmationModal').style.display = 'block';
        
        document.getElementById('paymentForm').reset();
    }

    document.getElementById('chat-toggle').addEventListener('click', function() {
        const chatbox = document.getElementById('ai-chatbot');
        chatbox.style.display = chatbox.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('close-chat').addEventListener('click', function() {
        document.getElementById('ai-chatbot').style.display = 'none';
    });

    document.getElementById('send-btn').addEventListener('click', function() {
        sendMessage();
    });

    function sendMessage() {
        const input = document.getElementById('user-input');
        const message = input.value.trim();
        const chatMessages = document.getElementById('chat-messages');
        
        if (message) {
            chatMessages.innerHTML += `<div style="text-align:right; margin-bottom:10px;"><span style="background:#FF0000; color:white; padding:8px 12px; border-radius:15px; display:inline-block;">${message}</span></div>`;
            let response = "আমি আপনাকে কিভাবে সাহায্য করতে পারি?";
            chatMessages.innerHTML += `<div style="text-align:left; margin-bottom:10px;"><span style="background:#f0f0f0; color:#333; padding:8px 12px; border-radius:15px; display:inline-block;">${response}</span></div>`;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    </script>
</body>
</html>
