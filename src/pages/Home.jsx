import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  
  const CalendarIcon = getIcon('Calendar');
  const UserRoundIcon = getIcon('UserRound');
  const ClipboardListIcon = getIcon('ClipboardList');
  const HospitalIcon = getIcon('Building2');
  
  // Sample departments data
  const departments = [
    { id: 1, name: "Cardiology", doctorCount: 5, image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 2, name: "Neurology", doctorCount: 3, image: "https://images.unsplash.com/photo-1559757175-7b21e5afba9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 3, name: "Pediatrics", doctorCount: 6, image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
    { id: 4, name: "Orthopedics", doctorCount: 4, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }
  ];

  const handleDepartmentClick = (dept) => {
    toast.info(`Viewing ${dept.name} department with ${dept.doctorCount} doctors`);
  };
  
  return (
    <div className="space-y-8 pb-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light to-primary dark:from-primary-dark dark:to-primary mb-10">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFFFFF" d="M39.9,-68.5C51.1,-62.1,59.9,-50.5,67.8,-37.7C75.7,-24.8,82.8,-10.7,81.3,2.4C79.8,15.5,69.8,27.5,59.8,38.6C49.8,49.7,39.7,59.8,27.4,65.9C15.1,72,0.5,74,-14.4,71.7C-29.3,69.5,-44.6,63,-55.6,51.9C-66.5,40.8,-73.2,25.2,-75.6,8.8C-78,-7.6,-76.1,-24.8,-68.5,-38.9C-60.9,-53,-47.6,-63.9,-33.9,-69.3C-20.2,-74.7,-6.1,-74.5,7.2,-71.5C20.6,-68.5,41.1,-62.7,39.9,-68.5Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="relative z-10 px-6 py-12 sm:px-8 sm:py-16 md:py-20 lg:px-12 text-white">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Welcome to MediSync Healthcare Management
            </h1>
            <p className="mb-6 text-lg md:text-xl opacity-90">
              Streamline your healthcare experience with our comprehensive
              appointment booking and patient management system.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab('appointments')}
                className="btn px-5 py-3 bg-white text-primary hover:bg-surface-100 focus:ring-white"
              >
                Book Appointment
              </button>
              <button
                onClick={() => toast.info("Contacting clinic support...")}
                className="btn px-5 py-3 bg-transparent border-2 border-white hover:bg-white/10"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto scrollbar-hide space-x-4 pb-2 border-b border-surface-200 dark:border-surface-800">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`flex items-center px-4 py-3 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'appointments'
              ? 'text-primary border-b-2 border-primary'
              : 'text-surface-600 dark:text-surface-400 hover:text-primary'
          }`}
        >
          <CalendarIcon className="w-5 h-5 mr-2" />
          <span>Appointments</span>
        </button>
        <button
          onClick={() => setActiveTab('doctors')}
          className={`flex items-center px-4 py-3 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'doctors'
              ? 'text-primary border-b-2 border-primary'
              : 'text-surface-600 dark:text-surface-400 hover:text-primary'
          }`}
        >
          <UserRoundIcon className="w-5 h-5 mr-2" />
          <span>Doctors</span>
        </button>
        <button
          onClick={() => setActiveTab('departments')}
          className={`flex items-center px-4 py-3 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'departments'
              ? 'text-primary border-b-2 border-primary'
              : 'text-surface-600 dark:text-surface-400 hover:text-primary'
          }`}
        >
          <HospitalIcon className="w-5 h-5 mr-2" />
          <span>Departments</span>
        </button>
        <button
          onClick={() => setActiveTab('records')}
          className={`flex items-center px-4 py-3 rounded-t-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'records'
              ? 'text-primary border-b-2 border-primary'
              : 'text-surface-600 dark:text-surface-400 hover:text-primary'
          }`}
        >
          <ClipboardListIcon className="w-5 h-5 mr-2" />
          <span>Records</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {activeTab === 'appointments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MainFeature />
          </motion.div>
        )}

        {activeTab === 'departments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {departments.map(dept => (
              <div
                key={dept.id}
                onClick={() => handleDepartmentClick(dept)}
                className="card group hover:shadow-lg cursor-pointer transform transition-all hover:-translate-y-1"
              >
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{dept.name}</h3>
                    <p className="text-sm opacity-90">{dept.doctorCount} Doctors</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-medium">View Department</span>
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {getIcon('ArrowRight')({ size: 18 })}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'doctors' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-xl neu-light text-center"
          >
            <div className="mb-4">
              {getIcon('Users')({ size: 48, className: "mx-auto text-primary" })}
            </div>
            <h3 className="text-2xl font-bold mb-2">Doctor Directory</h3>
            <p className="mb-6 text-surface-600 dark:text-surface-400 max-w-md mx-auto">
              View comprehensive profiles of our medical professionals, including specializations, qualifications, and availability.
            </p>
            <button 
              onClick={() => toast.info("Doctor profiles will be available soon!")}
              className="btn-primary"
            >
              Coming Soon
            </button>
          </motion.div>
        )}

        {activeTab === 'records' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-xl neu-light text-center"
          >
            <div className="mb-4">
              {getIcon('FileText')({ size: 48, className: "mx-auto text-primary" })}
            </div>
            <h3 className="text-2xl font-bold mb-2">Patient Records</h3>
            <p className="mb-6 text-surface-600 dark:text-surface-400 max-w-md mx-auto">
              Access your medical history, test results, and treatment plans in one secure location.
            </p>
            <button 
              onClick={() => toast.info("Patient records will be available soon!")}
              className="btn-primary"
            >
              Coming Soon
            </button>
          </motion.div>
        )}
      </div>

      {/* Features Section */}
      <section className="py-10">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {getIcon('Calendar')({ size: 24 })}
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Scheduling</h3>
            <p className="text-surface-600 dark:text-surface-400">
              Book appointments online or offline with our intelligent scheduling system
            </p>
          </div>
          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              {getIcon('ClipboardList')({ size: 24 })}
            </div>
            <h3 className="text-xl font-bold mb-2">Health Records</h3>
            <p className="text-surface-600 dark:text-surface-400">
              Securely access and manage your complete medical history
            </p>
          </div>
          <div className="card text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              {getIcon('Stethoscope')({ size: 24 })}
            </div>
            <h3 className="text-xl font-bold mb-2">Expert Care</h3>
            <p className="text-surface-600 dark:text-surface-400">
              Connect with specialist doctors across multiple departments
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;