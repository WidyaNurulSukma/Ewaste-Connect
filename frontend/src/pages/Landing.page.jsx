import React, { useRef } from 'react';
import Footer from '../components/footer/Footer.component';
import AuthHeader from '../components/header/AuthHeader.component';
import Header from '../components/header/Header.component';
import { useAuth } from '../hooks/auth';

const LandingPage = () => {
  const { getUser } = useAuth();
  const user = JSON.parse(getUser());
  const servicesRef = useRef(null);
  const productsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={styles.container}>
      {user ? <AuthHeader /> : <Header />}
      <header style={styles.header}>
  <div style={styles.headerContent}>
    <div style={styles.headerText}>
      <h1 style={styles.heading}>Hi, Folks!</h1>
      <h2 style={styles.subHeading}>
      <strong>Innovation Dedication</strong><br />
      <strong>and Sustainable Solution</strong>
      </h2>
      <p style={styles.description}>
        Lorem ipsum dolor sit consectetur adipiscing elit. Fusce sed lorem eget urna sodales placerat nulla non semet.
      </p>
      <button style={styles.ctaButton}>View Details</button>
    </div>
    <div style={styles.headerIllustration}>
      <img src="/Component 3.png" alt="Header Illustration" style={styles.illustration} />
    </div>
  </div>
</header>

<section style={styles.statsSection}>
  <div style={styles.stats}>
    <div style={styles.statItem}>
      <div style={{ fontWeight: 'bold', fontSize: '24px' }}>200+</div>
      <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Member</p>
    </div>
    <div style={styles.statItem}>
      <div style={{ fontWeight: 'bold', fontSize: '24px' }}>20</div>
      <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Waste Bank</p>
    </div>
    <div style={styles.statItem}>
      <div style={{ fontWeight: 'bold', fontSize: '24px' }}>50</div>
      <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Products</p>
    </div>
    <div style={styles.statItem}>
      <div style={{ fontWeight: 'bold', fontSize: '24px' }}>150</div>
      <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Course & Education</p>
    </div>
  </div>
</section>
      <section ref={servicesRef} style={styles.servicesSection}>
      <h3 style={{ ...styles.sectionHeading, marginBottom: '4px', fontSize: '20px' }}>Kategori</h3>
      <strong style={{ ...styles.sectionHeading, fontSize: '25px' }}>
        Kami Memberikan Kategori Service Terbaik
      </strong>

        <div style={styles.servicesList}>
          <div style={styles.serviceItem}>
            <img src="/icon1.png" alt="Info" style={styles.serviceIcon} />
            <h3>Information & Education</h3>
            <p>Berbagi wawasan penting terkait pengelolaan sampah kepada masyarakat.</p>
          </div>
          <div style={styles.serviceItem}>
            <img src="/course.png" alt="Course" style={styles.serviceIcon} />
            <h3>Layanan Pengelolaan Limbah</h3>
            <p>Pengelolaan limbah yang efektif untuk lingkungan yang lebih bersih.</p>
          </div>
          <div style={styles.serviceItem}>
            <img src="/Vector.png" alt="Waste" style={styles.serviceIcon} />
            <h3>Waste Recycling</h3>
            <p>Mendaur ulang sampah secara efisien demi lingkungan yang lebih baik.</p>
          </div>
        </div>
      </section>

      <section ref={productsRef} style={styles.productsSection}>
  <h2 style={styles.sectionHeading}>Produk eWaste Connect</h2>
  <div style={styles.productsList}>
    <div style={styles.productItem}>
      <img src="/kulkas.png" alt="Kulkas" style={styles.productImage} />
      <h3 style={styles.productName}>Kulkas</h3>
      <p style={styles.productPrice}>Rp 100,000</p>
    </div>
    <div style={styles.productItem}>
      <img src="/image 9.png" alt="Handphone" style={styles.productImage} />
      <h3 style={styles.productName}>Handphone</h3>
      <p style={styles.productPrice}>Rp 1,500,000</p>
    </div>
    <div style={styles.productItem}>
      <img src="/image 12.png" alt="Kamera" style={styles.productImage} />
      <h3 style={styles.productName}>Kamera</h3>
      <p style={styles.productPrice}>Rp 300,000</p>
    </div>
    <div style={styles.productItem}>
      <img src="/image 14.png" alt="Headset Tali" style={styles.productImage} />
      <h3 style={styles.productName}>Headset Tali</h3>
      <p style={styles.productPrice}>Rp 4,000,000</p>
    </div>
    <div style={styles.productItem}>
      <img src="/image 16.png" alt="Alat game" style={styles.productImage} />
      <h3 style={styles.productName}>Alat game</h3>
      <p style={styles.productPrice}>Rp 3,000,000</p>
    </div>
    <div style={styles.productItem}>
      <img src="/image 10.png" alt="Tablet" style={styles.productImage} />
      <h3 style={styles.productName}>Tablet</h3>
      <p style={styles.productPrice}>Rp 200,000</p>
    </div>
  </div>
</section>
      <section style={styles.testimonialSection}>
        <h2 style={styles.sectionHeading}>What people say about us</h2>
        <div style={styles.testimonial}>
          <p>
            "On the Waste Sorting solution, people say it’s easy to use and effective. Diverse options and great support!"
          </p>
          <p style={styles.testimonialAuthor}>- Mike Taylor, Pakistan</p>
        </div>
        <div style={styles.testimonialDots}>
          <span style={styles.dot}></span>
          <span style={styles.dot}></span>
          <span style={styles.dot}></span>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#fff',
    overflowX: 'hidden',
  },
  header: {
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: '40px 20px',
    position: 'relative',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    flexWrap: 'wrap',
  },
  headerText: {
    flex: 1,
    minWidth: '300px',
    textAlign: 'left',
  },
  headerIllustration: {
    flex: 1,
    minWidth: '300px',
    textAlign: 'right',
    marginLeft: '-50px', // Menggeser gambar ke kiri seperti yang diminta
  },
  illustration: {
    maxWidth: '100%',
    height: 'auto',
    maxHeight: '300px',
    display: 'block',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '10px',
  },
  subHeading: {
    fontSize: '28px',
    marginBottom: '15px',
  },
  description: {
    fontSize: '16px',
    marginBottom: '20px',
    maxWidth: '500px',
  },
  ctaButton: {
    padding: '10px 30px',
    fontSize: '16px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '30px',
  },
  statsSection: {
    backgroundColor: '#fff', // Latar belakang putih polos
    padding: '20px 20px',
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    flexWrap: 'wrap',
    maxWidth: '900px',
    margin: '0 auto',
  },
  statItem: {
    textAlign: 'center',
    minWidth: '150px',
  },
  servicesSection: {
    padding: '40px 20px',
    backgroundColor: '#fff',
  },
  sectionHeading: {
    fontSize: '32px',
    marginBottom: '30px',
    color: '#333',
  },
  servicesList: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  serviceItem: {
    width: '30%',
    minWidth: '250px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    textAlign: 'center',
  },
  serviceIcon: {
    marginBottom: '10px',
    display: 'block',
    margin: '0 auto 12px', // Otomatis di tengah + spasi bawah
    width: '60px', // Opsional: sesuaikan ukuran
    height: 'auto',
  },
  productsSection: {
    padding: '40px 20px',
    backgroundColor: '#e0f7fa',
  },
  productsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 kolom per baris
    gap: '20px',
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  productItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Memusatkan isi secara horizontal
    padding: '20px',
    backgroundColor: '#1e3a8a',
    color: 'white',
    borderRadius: '10px',
    textAlign: 'center',
    height: '300px', // Tinggi tetap untuk konsistensi
    justifyContent: 'space-between', // Distribusi ruang untuk gambar, nama, dan harga
  },
  productImage: {
    maxWidth: '100%',
    height: '150px', // Tinggi tetap untuk gambar
    objectFit: 'contain', // Memastikan gambar tidak terdistorsi
    borderRadius: '5px',
    marginBottom: '10px',
  },
  productName: {
    fontSize: '18px',
    margin: '10px 0',
    flex: '1', // Mengisi ruang agar teks sejajar
  },
  productPrice: {
    fontSize: '16px',
    margin: '0',
  },
  testimonialSection: {
    padding: '40px 20px',
    backgroundColor: '#fff',
    position: 'relative',
  },
  testimonial: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '500px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  testimonialAuthor: {
    fontStyle: 'italic',
    marginTop: '10px',
    color: '#666',
  },
  testimonialDots: {
    marginTop: '20px',
  },
  dot: {
    height: '10px',
    width: '10px',
    backgroundColor: '#bbb',
    borderRadius: '50%',
    display: 'inline-block',
    margin: '0 5px',
  },
  contactSection: {
    padding: '40px 20px',
    background: 'linear-gradient(to bottom, #4dd0e1, #1e3a8a)',
    color: 'white',
    position: 'relative',
  },
  footerLogos: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  logo: {
    maxWidth: '100px',
    height: 'auto',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '60%',
    flexWrap: 'wrap',
    gap: '20px',
    maxWidth: '1000px',
  },
  footerColumn: {
    minWidth: '150px',
    textAlign: 'left',
  },
  socialIcon: {
    margin: '0 5px',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100px',
    background: 'url("https://via.placeholder.com/1200x100?text=WavePattern")',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
  },
};


export default LandingPage;