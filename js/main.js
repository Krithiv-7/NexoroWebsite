// Sidebar open/close logic for responsive navigation
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarClose = document.getElementById('sidebar-close');
  if (sidebar && sidebarToggle && sidebarClose) {
    sidebarToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      sidebar.classList.add('active');
    });
    sidebarClose.addEventListener('click', function(e) {
      e.stopPropagation();
      sidebar.classList.remove('active');
    });
    document.addEventListener('click', function(e) {
      if (sidebar.classList.contains('active') &&
          !sidebar.contains(e.target) &&
          e.target !== sidebarToggle) {
        sidebar.classList.remove('active');
      }
    });
  }
});
// Sidebar open/close logic
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebarClose = document.getElementById('sidebar-close');
  if (sidebar && sidebarToggle && sidebarClose) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.add('active');
    });
    sidebarClose.addEventListener('click', function() {
      sidebar.classList.remove('active');
    });
    document.addEventListener('click', function(e) {
      if (sidebar.classList.contains('active') &&
          !sidebar.contains(e.target) &&
          e.target !== sidebarToggle) {
        sidebar.classList.remove('active');
      }
    });
  }
});
// --- Reusable Theme Switcher Logic ---
function initializeThemeSwitcher() {
    const themeSwitcher = document.getElementById('theme-switcher');
    if (!themeSwitcher) return; // Don't run if the button isn't on the page

    const body = document.body;
    const icon = themeSwitcher.querySelector('i');
    
    const setTheme = (theme) => {
        body.classList.toggle('dark-mode', theme === 'dark');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', theme);
    };

    themeSwitcher.addEventListener('click', () => {
        body.classList.contains('dark-mode') ? setTheme('light') : setTheme('dark');
    });

    // Set initial theme on page load
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
    setTheme(savedTheme);
}


// --- Reusable PayPal Button Function ---
function renderPayPalButton(containerId, planName, amount) {
    if (typeof paypal === 'undefined' || !document.getElementById(containerId)) {
        return;
    }
    paypal.Buttons({
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [{
                    description: `Nexoro Hosting – ${planName} Plan`,
                    amount: { value: amount }
                }]
            });
        },
        onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
                alert(`Thanks, ${details.payer.name.given_name}! 🎉 Your ${planName} Plan is now active.`);
            });
        },
        onError: (err) => {
            console.error('PayPal Button Error:', err);
            alert('An error occurred with your payment. Please try again or contact support.');
        }
    }).render(`#${containerId}`);
}


// --- Plans Page Logic ---
function initializePlansPage() {
    if (!document.getElementById('minecraft-plans')) return;

    const planButtons = document.querySelectorAll('.plan-switcher .button');
    const planSections = document.querySelectorAll('.plan-section');

    planButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetPlan = button.getAttribute('data-plan');
            planButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            planSections.forEach(section => {
                section.classList.toggle('active', section.id === `${targetPlan}-plans`);
            });
        });
    });

    renderPayPalButton('paypal-mc-starter', 'Minecraft Starter', '3.00');
    renderPayPalButton('paypal-mc-pro', 'Minecraft Pro', '8.00');
    renderPayPalButton('paypal-mc-elite', 'Minecraft Elite', '15.00');
    renderPayPalButton('paypal-mc-legendary', 'Minecraft Legendary', '25.00');
    renderPayPalButton('paypal-mc-ultimate', 'Minecraft Ultimate', '37.00');
    renderPayPalButton('paypal-mc-galaxy', 'Minecraft Galaxy', '50.00');
    renderPayPalButton('paypal-web-basic', 'Basic Web', '5.00');
    renderPayPalButton('paypal-web-business', 'Business Web', '10.00');
    renderPayPalButton('paypal-web-pro', 'Pro Web', '18.00');
    renderPayPalButton('paypal-web-reseller', 'Reseller', '30.00');
    renderPayPalButton('paypal-bot-nano', 'Nano Bot', '3.00');
    renderPayPalButton('paypal-bot-mega', 'Mega Bot', '5.00');
    renderPayPalButton('paypal-bot-giga', 'Giga Bot', '7.00');
    renderPayPalButton('paypal-bot-tera', 'Tera Bot', '12.00');
}


// --- Contact Page Logic ---
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const webhookURL = 'https://discord.com/api/webhooks/1400216470738178088/Az-BJmow9x1LAOzzxg1v9TIoIP-3rnBAp7ZMkQKXvfwAuAMUXVAYJNtZ39zIc-qSF2sj';
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formData = new FormData(contactForm);

        const payload = {
            username: "Nexoro Contact Forum",
            embeds: [{
                title: `New Message from ${formData.get('name')}`,
                color: 16761095,
                fields: [
                    { name: "Email Address", value: formData.get('email'), inline: true },
                    { name: "Timestamp", value: new Date().toUTCString(), inline: true },
                    { name: "Message", value: formData.get('message') }
                ],
                footer: { text: "Submitted via nx1.krithiv.dev" }
            }]
        };

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).then(response => {
            if (response.ok) {
                formStatus.textContent = 'Message sent! We will get back to you soon.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                throw new Error('Failed to send message. Please try again later.');
            }
        }).catch(error => {
            console.error('Contact Form Error:', error);
            formStatus.textContent = 'An error occurred. Please try again.';
            formStatus.className = 'form-status error';
        }).finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
    });
}

// --- Main Initializer ---
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeSwitcher();
    initializePlansPage();
    initializeContactForm();
});