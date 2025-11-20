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
          paddingBottom: isOpen ? "16px" : 0,
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
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setShowModal(false);
    setModalType("");
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // ✅ FIXED SERVICE IMAGES
  const services = [
    {
      img: "/heart.gif",
      title: "Cardiology",
      desc: "Heart checkups and treatments from experienced specialists.",
      color: "#FF6B6B",
    },
    {
      img: "/dentist_16060053.gif",
      title: "Dental Care",
      desc: "Keep your smile bright and healthy with expert dental services.",
      color: "#4ECDC4",
    },
    {
      img: "/nerve-cell_17275928.gif",
      title: "Neurology",
      desc: "Advanced brain and nerve diagnostics and treatments.",
      color: "#A78BFA",
    },
    {
      img: "/safe-children_17093485.gif",
      title: "Pediatrics",
      desc: "Gentle, specialized care for infants, toddlers, and teens.",
      color: "#FFA07A",
    },
  ];

  // ✅ FIXED DOCTOR IMAGES (Correct filenames)
  const doctors = [
    {
      img: "/Dr2.png",
      name: "Dr. Anita Sharma",
      spec: "Cardiologist",
      experience: "15+ Years",
    },
    {
      img: "/Dr1.png",
      name: "Dr. Rajesh Verma",
      spec: "Neurologist",
      experience: "12+ Years",
    },
    {
      img: "/Dr3.png",
      name: "Dr. Meera Patel",
      spec: "Pediatrician",
      experience: "10+ Years",
    },
  ];

  const testimonials = [
    {
      text: "The appointment booking was super quick, and the doctor was really kind. Highly recommend!",
      name: "Riya Kapoor",
      rating: 5,
    },
    {
      text: "A seamless experience. Got an appointment in minutes and received excellent care.",
      name: "Arun Mehta",
      rating: 5,
    },
    {
      text: "Love the interface and fast confirmation system. Doctors are top quality here!",
      name: "Sneha Iyer",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "How do I book an appointment?",
      answer:
        "Simply click on 'Book an Appointment', register or login, select your doctor, date, and confirm your booking instantly.",
    },
    {
      question: "Can I cancel or reschedule an appointment?",
      answer:
        "Yes, you can easily cancel or reschedule from your dashboard within 24 hours of booking.",
    },
    {
      question: "Is there any consultation fee?",
      answer:
        "Consultation fees vary depending on the doctor and department. You can view the fee before confirming.",
    },
    {
      question: "Do I get appointment reminders?",
      answer:
        "Absolutely! We send both email and SMS reminders to ensure you never miss your appointment.",
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
        transition={{ duration: 0.6 }}
      >
        <motion.div className="logo" whileHover={{ scale: 1.05 }}>
          <div className="logo-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" fill="url(#gradient)" />
              <path
                d="M20 12v16M12 20h16"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
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
      >
        <div className="video-background">
          <iframe
            className="youtube-video"
            src="https://www.youtube.com/embed/LCJ1MrWC2js?autoplay=1&mute=1&loop=1&playlist=LCJ1MrWC2js&controls=0&showinfo=0&modestbranding=1"
            title="Doctor Background Video"
            frameBorder="0"
            allow="autoplay; fullscreen"
          ></iframe>
        </div>

        <div className="overlay-bg"></div>

        <motion.div className="hero-content">
          <motion.h1 className="hero-title">
            Book Your Doctor <br /> Appointment <br />
            <span className="gradient-text">Online.</span>
          </motion.h1>

          <motion.p className="hero-subtitle">
            A Healthier Tomorrow Starts Today — Schedule Your Appointment Now!
          </motion.p>

          <motion.div className="hero-buttons">
            <motion.button
              className="btn-secondary"
              onClick={() => handleOpen("book")}
            >
              🩺 Book An Appointment
            </motion.button>

            <motion.button
              className="btn-outline"
              onClick={() => handleOpen("call")}
            >
              📞 Call Now
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ✅ FIXED HERO IMAGE */}
        <motion.div className="hero-image">
          <img src="/Doc.png" alt="Female Doctor" className="doctor-image" />
        </motion.div>
      </motion.section>

      {/* Services */}
      <motion.section className="services">
        <h2 className="section-title">Our Medical Services</h2>
        <p className="section-description">
          Comprehensive care for you and your family — all in one place.
        </p>

        <div className="service-grid">
          {services.map((service, i) => (
            <motion.div className="service-card" key={i}>
              <div
                className="service-icon"
                style={{ backgroundColor: service.color + "20" }}
              >
                <img src={service.img} alt={service.title} className="uniqe" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Meet Our Doctors */}
      <motion.section className="doctors">
        <h2 className="section-title">Meet Our Doctors</h2>
        <p className="section-description">
          Expert care from experienced professionals
        </p>

        <div className="doctor-grid">
          {doctors.map((doc, i) => (
            <motion.article className="doctor-card" key={i}>
              <div className="doctor-image-wrapper">
                <img src={doc.img} alt={doc.name} />
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
      <motion.section className="testimonials">
        <h2 className="section-title">What Our Patients Say</h2>
        <p className="section-description">
          Real experiences from real patients
        </p>

        <div className="testimonial-grid">
          {testimonials.map((review, i) => (
            <motion.div className="testimonial-card" key={i}>
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
      <motion.section className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-description">
          Have questions? We've got answers! Explore the most common queries
          below.
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

      {/* Modal */}
      {showModal && (
        <motion.div className="overlay" onClick={handleClose}>
          <motion.div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClose}>
              &times;
            </button>

            {modalType === "book" && <LoginRegi />}

            {modalType === "call" && (
              <motion.div className="call-info">
                <h2>📞 Call Us Now</h2>
                <p>
                  We're here to help you with your appointment and inquiries.
                </p>
                <h3 className="phone-number">+91 98765 43210</h3>
                <motion.a href="tel:+919876543210" className="call-btn">
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
