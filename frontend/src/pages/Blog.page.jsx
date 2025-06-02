import React from 'react';
import Header from '../components/header/Header.component';
import Footer from '../components/footer/Footer.component';
import { CaseUpper } from 'lucide-react';

const Blog = () => {
  return (
    <div style={styles.container}>
      <Header />
      <header style={styles.header}>
        <h1 style={styles.heading}>E-Waste Recycling Solutions</h1>
      </header>

      <section style={styles.servicesSection}>
        <h2 style={styles.sectionHeading}>OUR BLOG</h2>
        <div style={styles.servicesList}>
          <div style={styles.serviceItem}>
            <h3><strong>BAGGING THE HACKATHON WIN</strong></h3>
            <img src='https://img.freepik.com/free-photo/group-five-african-college-students-spending-time-together-campus-university-yard-black-afro-friends-studying-bench-with-school-items-laptops-notebooks_627829-6042.jpg?t=st=1727385405~exp=1727389005~hmac=bd20fd05129b68df7be2208857cc406fc1ad474a7033756f88eb5b9f175b6ba1&w=996' alt='Team Wins PLP Hackathon' style={styles.image} />
            <p>
              Our team won the PLP Hackathon with our e-waste recycling solution, focusing on the <strong>UN SDG's.</strong> We're excited to implement our ideas for a positive environmental impact.

            </p>
            <a href='/blog/team-wins-plp-hackathon' style={styles.readMore}>Read more...</a>
          </div>
          <div style={styles.serviceItem}>
            <h3><strong>THE PETER PARKER PARTERSHIP</strong></h3>
            <img src='https://designerapp.officeapps.live.com/designerapp/document.ashx?path=/a3184625-563f-4a82-a35d-0c243577b750/UserAssets/Thumbnails/0251674907897869838000.jpg&dcHint=NorthEurope&fileToken=cb7259b0-d287-4c7a-8d08-10c34a464d77' alt='Peter Parker Partners with E-Waste Solutions' style={styles.image} />
            <p>
              Peter Parker, popularly known as Eco-Spidey, has partnered with E-Waste Solutions. His company is on a mission of saving the planet, <strong>one 🕸 at a time</strong> focusing on innovative recycling methods and community engagement.
            </p>
            <a href='/blog/peter-parker-partners-ewaste-solutions' style={styles.readMore}>Read more...</a>
          </div>
          <div style={styles.serviceItem}>
            <h3><strong>GLOBAL TREE PLANTING DAY</strong></h3>
            <img src='https://img.freepik.com/premium-photo/group-happy-african-volunteers-planting-tree-park-africa-volunteering-charity-people-ecol_1182637-17317.jpg?w=900' alt='Team Participates in Global Tree Day' style={styles.image} />
            <p>
              This year we participated in Global Tree Day, planting trees in our local community to promote sustainability. We also participated in the <strong>One Million trees initative</strong>  to help combat climate change.
            </p>
            <a href='/blog/team-participates-global-tree-day' style={styles.readMore}>Read more...</a>
          </div>
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
    padding: '20px',
    backgroundColor: '#e8f5e9'
  },
  header: {
    backgroundColor: '#2e7d32',
    color: 'white',
    padding: '50px 20px'
  },

  heading: {
    fontSize: '48px',
    marginBottom: '10px'
  },
  subHeading: {
    fontSize: '20px',
    marginBottom: '20px'
  },
  servicesList: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  serviceItem: {
    fontSize: '18px',
    width: '30%',
    minWidth: '250px',
    marginBottom: '20px',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  servicesSection: {
    marginTop: '20px',
    padding: '40px 20px',
    backgroundColor: '#f1f8e9'
  },
  sectionHeading: {
    fontSize: '36px',
    marginBottom: '20px'
  },
  image: {
    marginTop: '15px',
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    marginBottom: '20px'
  },
  readMore: {
    display: 'block',
    marginTop: '10px',
    color: '#2e7d32',
    textDecoration: 'none'
  },
  marginBottom: '20px'
};
export default Blog;
