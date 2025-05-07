import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format, addDays } from 'date-fns';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Icon declarations
  const CalendarIcon = getIcon('Calendar');
  const ClockIcon = getIcon('Clock');
  const UserIcon = getIcon('User');
  const PhoneIcon = getIcon('Phone');
  const MailIcon = getIcon('Mail');
  const MessageIcon = getIcon('MessageSquare');
  const CheckCircleIcon = getIcon('CheckCircle');
  const ChevronRightIcon = getIcon('ChevronRight');
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const TrashIcon = getIcon('Trash');
  const EditIcon = getIcon('Edit');
  
  // State management
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
    notes: '',
    type: 'regular'
  });
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "John Doe",
      department: "Cardiology",
      doctor: "Dr. Sarah Johnson",
      date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      time: "10:00 AM",
      status: "scheduled"
    },
    {
      id: 2,
      name: "Alice Smith",
      department: "Neurology",
      doctor: "Dr. Michael Chen",
      date: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
      time: "2:30 PM",
      status: "scheduled"
    }
  ]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Sample data
  const departments = [
    { id: 1, name: "Cardiology" },
    { id: 2, name: "Neurology" },
    { id: 3, name: "Pediatrics" },
    { id: 4, name: "Orthopedics" },
    { id: 5, name: "Dermatology" }
  ];
  
  const doctors = {
    "Cardiology": [
      { id: 1, name: "Dr. Sarah Johnson" },
      { id: 2, name: "Dr. Robert Williams" }
    ],
    "Neurology": [
      { id: 3, name: "Dr. Michael Chen" },
      { id: 4, name: "Dr. Emily Parker" }
    ],
    "Pediatrics": [
      { id: 5, name: "Dr. James Wilson" },
      { id: 6, name: "Dr. Maria Rodriguez" }
    ],
    "Orthopedics": [
      { id: 7, name: "Dr. David Thompson" },
      { id: 8, name: "Dr. Lisa Crawford" }
    ],
    "Dermatology": [
      { id: 9, name: "Dr. Jessica Lee" },
      { id: 10, name: "Dr. Thomas Brown" }
    ]
  };
  
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", 
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", 
    "4:00 PM", "4:30 PM"
  ];
  
  // Handler functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // If department changed, reset doctor selection
    if (name === 'department' && formData.doctor && doctors[value]?.findIndex(doc => doc.name === formData.doctor) === -1) {
      setFormData(prev => ({ ...prev, doctor: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.doctor) newErrors.doctor = "Doctor is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    if (isEditMode && selectedAppointment) {
      // Update existing appointment
      const updatedAppointments = appointments.map(apt => 
        apt.id === selectedAppointment.id 
          ? { ...formData, id: apt.id, status: apt.status } 
          : apt
      );
      setAppointments(updatedAppointments);
      toast.success("Appointment updated successfully!");
    } else {
      // Create new appointment
      const newAppointment = {
        ...formData,
        id: appointments.length + 1,
        status: "scheduled"
      };
      setAppointments([...appointments, newAppointment]);
      toast.success("Appointment booked successfully!");
    }
    
    // Reset form and state
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      doctor: '',
      date: '',
      time: '',
      notes: '',
      type: 'regular'
    });
    setIsEditMode(false);
    setSelectedAppointment(null);
    setStep(1);
  };
  
  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      doctor: '',
      date: '',
      time: '',
      notes: '',
      type: 'regular'
    });
    setErrors({});
    setIsEditMode(false);
    setSelectedAppointment(null);
    setStep(1);
  };
  
  const handleEditAppointment = (appointment) => {
    setFormData({
      name: appointment.name,
      email: appointment.email || '',
      phone: appointment.phone || '',
      department: appointment.department,
      doctor: appointment.doctor,
      date: appointment.date,
      time: appointment.time,
      notes: appointment.notes || '',
      type: appointment.type || 'regular'
    });
    setSelectedAppointment(appointment);
    setIsEditMode(true);
    setStep(2);
  };
  
  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
    toast.success("Appointment cancelled successfully!");
  };
  
  const nextStep = () => {
    const requiredFields = {
      1: ['name', 'email', 'phone'],
      2: ['department', 'doctor', 'date', 'time']
    };
    
    const currentRequiredFields = requiredFields[step] || [];
    const newErrors = {};
    
    currentRequiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields");
      return;
    }
    
    setStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setStep(prev => prev - 1);
  };
  
  // Generate available dates (7 days from today)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = addDays(today, i);
      const formatted = format(date, 'yyyy-MM-dd');
      const display = format(date, 'MMM dd, yyyy');
      dates.push({ value: formatted, display });
    }
    
    return dates;
  };
  
  const availableDates = generateAvailableDates();
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Appointment Management</h2>
        <p className="text-surface-600 dark:text-surface-400">
          Book, manage, and track your appointments with our healthcare professionals
        </p>
      </div>
      
      {step === 1 && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-2">
                      {appointments.length}
                    </span>
                    Your Appointments
                  </h3>
                  
                  {appointments.length > 0 ? (
                    <div className="space-y-4">
                      {appointments.map((apt) => (
                        <div 
                          key={apt.id} 
                          className="card border border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary transition-colors"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <div className="mb-4 sm:mb-0">
                              <span className="block text-sm text-surface-500 dark:text-surface-400 mb-1">
                                <CalendarIcon className="inline-block w-4 h-4 mr-1" />
                                {apt.date} at {apt.time}
                              </span>
                              <h4 className="font-medium">{apt.name}</h4>
                              <div className="flex flex-wrap items-center mt-2 gap-2">
                                <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                                  {apt.department}
                                </span>
                                <span className="px-2 py-1 text-xs rounded-full bg-surface-100 dark:bg-surface-800">
                                  {apt.doctor}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditAppointment(apt)}
                                className="p-2 rounded-full bg-surface-100 hover:bg-surface-200 dark:bg-surface-800 dark:hover:bg-surface-700 transition-colors"
                                aria-label="Edit appointment"
                              >
                                <EditIcon size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteAppointment(apt.id)}
                                className="p-2 rounded-full bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                                aria-label="Cancel appointment"
                              >
                                <TrashIcon size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="card border border-dashed border-surface-300 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/50 text-center py-8">
                      <CalendarIcon className="w-12 h-12 mx-auto text-surface-400 dark:text-surface-600 mb-4" />
                      <h4 className="text-lg font-medium mb-2">No Appointments Yet</h4>
                      <p className="text-surface-600 dark:text-surface-400 mb-4">
                        Book your first appointment with our healthcare professionals
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="card border border-surface-200 dark:border-surface-700">
                  <h3 className="text-xl font-semibold mb-6">Book an Appointment</h3>
                  
                  <form>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="label">
                          Full Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-surface-500">
                            <UserIcon size={16} />
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`input pl-10 ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                            placeholder="John Doe"
                          />
                        </div>
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="label">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-surface-500">
                            <MailIcon size={16} />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`input pl-10 ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                            placeholder="john@example.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="label">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-surface-500">
                            <PhoneIcon size={16} />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`input pl-10 ${errors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
                            placeholder="(123) 456-7890"
                          />
                        </div>
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                        )}
                      </div>
                      
                      <div className="pt-4">
                        <button
                          type="button"
                          onClick={nextStep}
                          className="btn-primary w-full flex items-center justify-center"
                        >
                          <span>Continue</span>
                          <ChevronRightIcon className="ml-2 w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      
      {step === 2 && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="card border border-surface-200 dark:border-surface-700"
          >
            <h3 className="text-xl font-semibold mb-6">
              {isEditMode ? 'Edit Appointment' : 'Appointment Details'}
            </h3>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="department" className="label">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`selector ${errors.department ? 'border-red-500 dark:border-red-500' : ''}`}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="mt-1 text-sm text-red-500">{errors.department}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="doctor" className="label">
                  Doctor
                </label>
                <select
                  id="doctor"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleInputChange}
                  className={`selector ${errors.doctor ? 'border-red-500 dark:border-red-500' : ''}`}
                  disabled={!formData.department}
                >
                  <option value="">Select Doctor</option>
                  {formData.department &&
                    doctors[formData.department]?.map(doc => (
                      <option key={doc.id} value={doc.name}>
                        {doc.name}
                      </option>
                    ))}
                </select>
                {errors.doctor && (
                  <p className="mt-1 text-sm text-red-500">{errors.doctor}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="date" className="label">
                  Appointment Date
                </label>
                <select
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`selector ${errors.date ? 'border-red-500 dark:border-red-500' : ''}`}
                >
                  <option value="">Select Date</option>
                  {availableDates.map((date, index) => (
                    <option key={index} value={date.value}>
                      {date.display}
                    </option>
                  ))}
                </select>
                {errors.date && (
                  <p className="mt-1 text-sm text-red-500">{errors.date}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="time" className="label">
                  Appointment Time
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className={`selector ${errors.time ? 'border-red-500 dark:border-red-500' : ''}`}
                >
                  <option value="">Select Time</option>
                  {timeSlots.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="mt-1 text-sm text-red-500">{errors.time}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="type" className="label">
                  Appointment Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="relative flex cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="regular"
                      checked={formData.type === 'regular'}
                      onChange={handleInputChange}
                      className="peer sr-only"
                    />
                    <div className="w-full p-4 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 transition-all">
                      <div className="text-center">
                        <h4 className="text-sm font-medium">Regular Visit</h4>
                      </div>
                    </div>
                    <CheckCircleIcon className="absolute h-5 w-5 text-primary top-2 right-2 opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </label>
                  
                  <label className="relative flex cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="follow-up"
                      checked={formData.type === 'follow-up'}
                      onChange={handleInputChange}
                      className="peer sr-only"
                    />
                    <div className="w-full p-4 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 transition-all">
                      <div className="text-center">
                        <h4 className="text-sm font-medium">Follow-up</h4>
                      </div>
                    </div>
                    <CheckCircleIcon className="absolute h-5 w-5 text-primary top-2 right-2 opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </label>
                  
                  <label className="relative flex cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="emergency"
                      checked={formData.type === 'emergency'}
                      onChange={handleInputChange}
                      className="peer sr-only"
                    />
                    <div className="w-full p-4 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 transition-all">
                      <div className="text-center">
                        <h4 className="text-sm font-medium">Emergency</h4>
                      </div>
                    </div>
                    <CheckCircleIcon className="absolute h-5 w-5 text-primary top-2 right-2 opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </label>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="notes" className="label">
                  <div className="flex justify-between">
                    <span>Notes (optional)</span>
                    <span className="text-xs text-surface-500">{formData.notes.length}/200</span>
                  </div>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 text-surface-500">
                    <MessageIcon size={16} />
                  </div>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    maxLength={200}
                    rows={4}
                    className="input pl-10"
                    placeholder="Any special requirements or information for your appointment"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn border border-surface-300 dark:border-surface-700 bg-white dark:bg-surface-900 hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-800 dark:text-surface-200 flex-1 flex items-center justify-center"
                >
                  <ChevronLeftIcon className="mr-2 w-5 h-5" />
                  <span>Back</span>
                </button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 flex-1 flex items-center justify-center"
                >
                  <span>Cancel</span>
                </button>
                
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn-primary flex-1 flex items-center justify-center"
                >
                  <span>{isEditMode ? 'Update Appointment' : 'Book Appointment'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      )}
      
      {step === 3 && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center py-10"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
              <CheckCircleIcon size={40} />
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Appointment Confirmed!</h2>
            <p className="max-w-md mx-auto mb-8 text-surface-600 dark:text-surface-400">
              Your appointment has been successfully booked. You'll receive a confirmation email shortly.
            </p>
            
            <div className="max-w-md mx-auto card border border-surface-200 dark:border-surface-700 mb-8">
              <div className="space-y-4">
                <div className="flex">
                  <div className="w-24 text-surface-500 dark:text-surface-400">When</div>
                  <div className="flex-1 font-medium">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-1 w-4 h-4" />
                      <span>{formData.date}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <ClockIcon className="mr-1 w-4 h-4" />
                      <span>{formData.time}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-24 text-surface-500 dark:text-surface-400">Doctor</div>
                  <div className="flex-1 font-medium">{formData.doctor}</div>
                </div>
                
                <div className="flex">
                  <div className="w-24 text-surface-500 dark:text-surface-400">Department</div>
                  <div className="flex-1 font-medium">{formData.department}</div>
                </div>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-primary"
            >
              Return to Appointments
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default MainFeature;