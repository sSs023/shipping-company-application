import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => (
  <div>
    <Navbar />
    <main className="p-4">
      <h1 className="text-3xl font-bold text-center">Welcome to the Shipping Company</h1>
    </main>
    <Footer />
  </div>
);

export default Home;