import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../Styles/ViewScreen.css";
import LoginRegi from "./LoginRegi.jsx";
import Footer from "../Components/Footer.jsx";


const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div
      className="faq-item"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <h4>{question}</h4>
        <motion.span 
          className="faq-toggle"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? "−" : "+"}
        </motion.span>
      </div>
      <motion.div
        className="faq-answer"
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : 0, 
          opacity: isOpen ? 1 : 0,
          paddingTop: isOpen ? "16px" : 0,
          paddingBottom: isOpen ? "16px" : 0
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <p>{answer}</p>
      </motion.div>
    </motion.div>
  );
};

const ViewScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const handleOpen = (type) => {
    setModalType(type);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setShowModal(false);
    setModalType("");
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const services = [
    {
      img: "../../public/heart.gif",
      title: "Cardiology",
      desc: "Heart checkups and treatments from experienced specialists.",
      color: "#FF6B6B"
    },
    {
      img: "../../public/dentist_16060053.gif",
      title: "Dental Care",
      desc: "Keep your smile bright and healthy with expert dental services.",
      color: "#4ECDC4"
    },
    {
      img: "../../public/nerve-cell_17275928.gif",
      title: "Neurology",
      desc: "Advanced brain and nerve diagnostics and treatments.",
      color: "#A78BFA"
    },
    {
      img: "../../public/safe-children_17093485.gif",
      title: "Pediatrics",
      desc: "Gentle, specialized care for infants, toddlers, and teens.",
      color: "#FFA07A"
    },
  ];

  const doctors = [
    {
      img: "../../public/dr2.png",
      name: "Dr. Anita Sharma",
      spec: "Cardiologist",
      experience: "15+ Years"
    },
    {
      img: "../../public/dr1.png",
      name: "Dr. Rajesh Verma",
      spec: "Neurologist",
      experience: "12+ Years"
    },
    {
      img: "../../public/dr3.png",
      name: "Dr. Meera Patel",
      spec: "Pediatrician",
      experience: "10+ Years"
    },
  ];

  const testimonials = [
    {
      text: "The appointment booking was super quick, and the doctor was really kind. Highly recommend!",
      name: "Riya Kapoor",
      rating: 5
    },
    {
      text: "A seamless experience. Got an appointment in minutes and received excellent care.",
      name: "Arun Mehta",
      rating: 5
    },
    {
      text: "Love the interface and fast confirmation system. Doctors are top quality here!",
      name: "Sneha Iyer",
      rating: 5
    },
  ];

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "Simply click on 'Book an Appointment', register or login, select your doctor, date, and confirm your booking instantly."
    },
    {
      question: "Can I cancel or reschedule an appointment?",
      answer: "Yes, you can easily cancel or reschedule from your dashboard within 24 hours of booking."
    },
    {
      question: "Is there any consultation fee?",
      answer: "Consultation fees vary depending on the doctor and department. You can view the fee before confirming."
    },
    {
      question: "Do I get appointment reminders?",
      answer: "Absolutely! We send both email and SMS reminders to ensure you never miss your appointment."
    },
  ];

  return (
    <div className="container">
      {/* Header */}
      <motion.header
        className="header"
        style={{ opacity: headerOpacity }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
      >
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="logo-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" fill="url(#gradient)" />
              <path d="M20 12v16M12 20h16" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="site-name">HealthConnect</h1>
        </motion.div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="video-background">
          <iframe
            className="youtube-video"
            src="https://www.youtube.com/embed/LCJ1MrWC2js?autoplay=1&mute=1&loop=1&playlist=LCJ1MrWC2js&controls=0&showinfo=0&modestbranding=1"
            title="Doctor Background Video"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>

        <div className="overlay-bg"></div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Book Your Doctor <br /> Appointment <br /> 
            <span className="gradient-text">Online.</span>
          </motion.h1>
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            A Healthier Tomorrow Starts Today — Schedule Your Appointment Now!
          </motion.p>

          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.button
              className="btn-secondary"
              onClick={() => handleOpen("book")}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
            >
              🩺 Book An Appointment
            </motion.button>
            <motion.button
              className="btn-outline"
              onClick={() => handleOpen("call")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              📞 Call Now
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
        >
          <img
            src="../../public/Doc.png"
            alt="Female Doctor"
            className="doctor-image"
          />
        </motion.div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="how-it-works"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How It Works!
        </motion.h2>
        <motion.p 
          className="section-description"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover, book, and experience personalized healthcare effortlessly
          with our user-friendly Doctor Appointment Website.
        </motion.p>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="services"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Our Medical Services</h2>
        <p className="section-description">
          Comprehensive care for you and your family — all in one place.
        </p>

        <div className="service-grid">
          {services.map((service, i) => (
            <motion.div
              className="service-card"
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ 
                y: -15, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="service-icon" style={{ backgroundColor: service.color + '20' }}>
                <img src={service.img} alt={service.title}  className="uniqe"/>
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <motion.div 
                className="service-arrow"
                whileHover={{ x: 5 }}
              >
                →
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Meet Our Doctors */}
      {/* Meet Our Doctors */}
<motion.section
  className="doctors"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.8 }}
>
  <h2 className="section-title">Meet Our Doctors</h2>
  <p className="section-description">Expert care from experienced professionals</p>

  <div className="doctor-grid">
    {doctors.map((doc, i) => (
      <motion.article
        className="doctor-card"
        key={i}
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.12 }}
        whileHover={{ y: -10 }}
      >
        <div className="doctor-image-wrapper" aria-hidden="true">
          <img src={doc.img} alt={doc.name}  />
          <div className="doctor-overlay">
            {/* <motion.button
              className="view-profile"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              aria-label={`View profile of ${doc.name}`}
            >
              View Profile
            </motion.button> */}
          </div>
        </div>

        <div className="doctor-info">
          <h3 className="doctor-name">{doc.name}</h3>
          <p className="doctor-spec">{doc.spec}</p>
          <p className="doctor-exp">{doc.experience}</p>
        </div>
      </motion.article>
    ))}
  </div>
</motion.section>

      {/* Testimonials */}
      <motion.section
        className="testimonials"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">What Our Patients Say</h2>
        <p className="section-description">Real experiences from real patients</p>
        
        <div className="testimonial-grid">
          {testimonials.map((review, i) => (
            <motion.div
              className="testimonial-card"
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="quote-icon">"</div>
              <p className="testimonial-text">{review.text}</p>
              <div className="testimonial-rating">
                {"⭐".repeat(review.rating)}
              </div>
              <h4 className="testimonial-name">— {review.name}</h4>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="faq-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-description">
          Have questions? We've got answers! Explore the most common queries below.
        </p>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index}
            />
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      {/* <footer className="footer">
        <div className="footer-content">
          <motion.div 
            className="footer-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>HealthConnect</h3>
            <p>
              123 Wellness Street, Chennai, India <br />
              📞 +91 98765 43210 <br />
              ✉️ support@healthconnect.com
            </p>
          </motion.div>
          <motion.div 
            className="footer-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#">🌐 Facebook</a>
              <a href="#">📸 Instagram</a>
              <a href="#">🐦 Twitter</a>
            </div>
          </motion.div>
        </div>
        <motion.button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ↑ Back to Top
        </motion.button>
      </footer> */}

      {/* Modal Overlay */}
      {showModal && (
        <motion.div 
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="modal"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={handleClose}>
              &times;
            </button>

            {modalType === "book" && <LoginRegi />}
            {modalType === "call" && (
              <motion.div 
                className="call-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2>📞 Call Us Now</h2>
                <p>We're here to help you with your appointment and inquiries.</p>
                <h3 className="phone-number">+91 98765 43210</h3>
                <p>Available 9:00 AM - 8:00 PM (Mon - Sat)</p>
                <motion.a 
                  href="tel:+919876543210" 
                  className="call-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Tap to Call
                </motion.a>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
      <Footer />
    </div>
  );
};

export default ViewScreen;