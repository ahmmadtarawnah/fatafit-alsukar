import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// import Navbar from "./components/Navbar";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";
import Home from "./Pages/Home/Home";
import PatientRequest from "./Pages/PatientRequest/PatientRequest";
import Login from "./Pages/Login/Login";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import VolunteerRequest from "./Pages/VolunteerRequest/VolunteerRequest";
import MembershipRequest from "./Pages/MembershipRequest/MembershipRequest";
import Activities from "./Pages/Activities/Activities";
import Dashboard from "./Dashboard/Dashboard";
import ServicesPage from "./Pages/OurServices/OurServices";
import DonatePage from "./Pages/Donation/Donation";
import ContactUsPage from "./Pages/Contact/Contact";
import Articles from "./Pages/Articles/Articles";
import ArticleDetails from "./Pages/Articles/ArticleDetails";
import ArticlesManagement from "./Dashboard/ArticlesManagement";
import InKindDonation from "./Pages/Donation/InKindDonation";
import ContactMessage from "./Dashboard/ContactMessages";
import DonateDashboard from "./Dashboard/DonationDashboard";
import Profile from "./Pages/Profile/Profile";
import Archive from "./Pages/Archive/Archive";
import SuccessStories from "./Pages/SuccessStories/SuccessStories";
import SuccessStoryDetails from "./Pages/SuccessStories/SuccessStoryDetails";
import ArchivedArticleDetails from "./Pages/Archive/ArchivedArticleDetails";
import SummerClubPage from "./Pages/SummerClub";
import PaymentPage from './Pages/Payment';
import Privacy from "./Pages/Privacy";
import Terms from "./Pages/Terms";
import Team from "./Pages/Team";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";










function Layout() {
  const location = useLocation();
  const hideNavbarPages = ["/login", "/changepassword", "/dashboard"];

  return (
    <>
      {!hideNavbarPages.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patientrequest" element={<PatientRequest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/volunteerrequest" element={<VolunteerRequest />} />
        <Route path="/membershiprequest" element={<MembershipRequest />} />
        <Route path="/Services" element={<ServicesPage />} />

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/dashboard/articles"
  element={
    <ProtectedRoute>
      <ArticlesManagement />
    </ProtectedRoute>
  }
/>
        <Route path="/Activities" element={<Activities />} />
        <Route path="/donation/cash" element={<DonatePage />} />
        <Route path="/donation/items" element={<InKindDonation />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetails />} />
        <Route path="/contactmessage" element={<ContactMessage />} />
        <Route path="/donationdashboard" element={<DonateDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/success-stories/:id" element={<SuccessStoryDetails />} />
        <Route path="/archive/:id" element={<ArchivedArticleDetails />} />
        <Route path="/summer-club" element={<SummerClubPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/team" element={<Team />} />











        {/* Add more routes as needed */}
      </Routes>

      {!hideNavbarPages.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
