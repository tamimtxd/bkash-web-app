# bKash Web App Clone

A fully functional web application clone of bKash, Bangladesh's leading mobile financial service. Built with vanilla HTML, CSS, and JavaScript to demonstrate modern web development best practices and deliver an authentic user experience.
- Supports keyboard entry for PIN on desktop (digits 0‑9, Backspace, Enter).

![bKash Logo](https://img.shields.io/badge/bKash-E2136E?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🌟 Live Demo
- **Cash Out** - Withdraw money from agents with automatic fee calculation (1.85%)
- **Mobile Recharge** - Top up for all major Bangladesh operators
- **Payment** - Pay bills and merchants seamlessly
- **Add Money** - Deposit from bank accounts, cards, or agents
- **Transaction History** - Complete transaction log with filtering

### 🎨 Design Excellence
- **Authentic bKash Branding** - Signature pink (#E2136E) color scheme
- **Modern UI/UX** - Card-based layout with smooth animations
- **Responsive Design** - Mobile-first approach, works on all devices
- **Premium Feel** - Gradient backgrounds, glassmorphism effects
- **Micro-interactions** - Loading states, success animations, hover effects

### 📱 Responsive Breakpoints
- **Mobile**: 320px - 480px (primary target)
- **Tablet**: 481px - 768px  
- **Desktop**: 769px+ (centered layout)

## 🚀 Quick Start

### Demo Credentials
```
PIN: 1234
Phone: 01712345678
Initial Balance: ৳5,420.50
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/bkash-web-app.git
   cd bkash-web-app
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html  # Mac
   start index.html # Windows
   xdg-open index.html # Linux
   ```

3. **Or use a local server** (recommended)
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

4. **Access the app**
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
bkash-web-app/
├── index.html          # Main HTML file with all screens
├── styles.css          # Complete design system and components
├── app.js              # Application logic and state management
└── README.md           # This file
```

## 🎯 How to Use

1. **Login**: Enter PIN `1234` on the pink login screen
2. **View Balance**: See your available balance on the dashboard
3. **Make Transaction**: Choose any action (Send Money, Cash Out, etc.)
4. **Confirm**: Enter PIN to complete the transaction
5. **View History**: Check transactions tab to see all activity

### Feature Demos

#### Send Money
1. Click "Send Money" from dashboard
2. Enter recipient: `01812345678`
3. Enter amount: `500`
4. Click Continue
5. Enter PIN: `1234`
6. Transaction complete! ✅

#### Cash Out
1. Navigate to Cash Out
2. Enter agent number
3. See automatic fee calculation
4. Confirm with PIN

#### Mobile Recharge
1. Select operator (Grameenphone, Robi, etc.)
2. Enter phone number
3. Choose amount
4. Instant recharge!

## 🛠️ Technical Stack

### Frontend
- **HTML5** - Semantic markup, SEO optimization
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **Vanilla JavaScript (ES6+)** - No frameworks, pure modern JS

### Key Technologies
- **CSS Variables** - Design system with consistent theming
- **LocalStorage** - Data persistence for demo
- **CSS Animations** - Smooth transitions and micro-interactions
- **Responsive Design** - Mobile-first with media queries
- **Single Page Application** - Client-side navigation

## 🎨 Design System

### Colors
```css
--bkash-pink: #E2136E;        /* Primary brand color */
--bkash-pink-dark: #C1105E;   /* Darker shade */
--bkash-pink-light: #FF4081;  /* Lighter accent */
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Sizes**: 0.75rem - 2.25rem
- **Weights**: 300 - 800

### Components
- Buttons (Primary, Secondary)
- Cards with hover effects
- Form inputs with focus states
- Modal overlays
- Toast notifications
- Loading states

## 📊 Sample Data

The app includes 8 pre-populated transactions:
- Received Money: +৳1,500.00
- Send Money: -৳850.00
- Mobile Recharge: -৳100.00
- Payment to Daraz: -৳2,350.00
- Cash Out: -৳2,046.25 (with fee)
- Add Money: +৳5,000.00

## 🔒 Security Note

> **⚠️ DEMO ONLY**: This is a demonstration project with simulated functionality. No real financial transactions are processed. All data is stored locally in the browser. Do not use this for actual financial transactions.

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 📱 Mobile Compatibility

- ✅ iOS Safari 14+
- ✅ Chrome Mobile
- ✅ Samsung Internet
- ✅ Firefox Mobile

## 🎯 Future Enhancements

- [ ] QR code scanner for payments
- [ ] Biometric authentication (WebAuthn)
- [ ] Receipt generation (PDF download)
- [ ] Bill payment categories
- [ ] International remittance
- [ ] Merchant map integration
- [ ] Push notifications
- [ ] Dark mode theme
- [ ] Backend integration with API
- [ ] Multi-language support (Bangla/English)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test on multiple browsers
- Ensure mobile responsiveness
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tamim**
- GitHub: [@tamimtxd](https://github.com/tamimtxd)
- LinkedIn: [Tamim](https://linkedin.com/in/tamimtxd)

## 🙏 Acknowledgments

- **bKash** - For the inspiration and design reference
- **Google Fonts** - Inter typography
- **The Bangladesh Tech Community** - For feedback and support

## 📞 Support

If you have any questions or run into issues:
- Open an [issue](https://github.com/tamimtxd/bkash-web-app/issues)
- Email: tamimmtd@gamil.com

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐️!

---

**Disclaimer**: This is an educational project and is not affiliated with, endorsed by, or in any way officially connected with bKash Limited or BRAC Bank. All product names, logos, and brands are property of their respective owners.

**Made with ❤️ in Bangladesh 🇧🇩**
