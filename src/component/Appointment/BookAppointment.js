import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { createAppointment, clearErrors } from "../../actions/appointmentAction";
import { CREATE_APPOINTMENT_RESET } from "../../constants/appointmentConstants";
import axios from "axios";
import "./BookAppointment.css";

const BookAppointment = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, success } = useSelector((state) => state.newAppointment);
  const { user } = useSelector((state) => state.user);

  // Form state
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState("");
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
          setIsRazorpayLoaded(true);
          resolve();
        };
        script.onerror = () => {
          alert.error("Failed to load Razorpay");
          resolve();
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpay();
  }, [alert]);

  // Reset form when service changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const serviceId = searchParams.get('service');
    
    if (serviceId) {
      const fetchServiceDetails = async () => {
        try {
          const { data } = await axios.get(`/api/v1/service/${serviceId}`);
          setServiceDetails(data.service);
          setFormData(prev => ({
            ...prev,
            service: data.service.name
          }));
        } catch (error) {
          console.error("Error fetching service details:", error);
        }
      };
      fetchServiceDetails();
    }
  }, [location.search]);

  // Handle success and error states
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Appointment Booked Successfully");
      navigate("/appointments/me");
      dispatch({ type: CREATE_APPOINTMENT_RESET });
      setFormData({
        name: user ? user.name : "",
        email: user ? user.email : "",
        phone: "",
        service: "",
        date: "",
        time: "",
      });
      setAvailableSlots([]);
    }
  }, [dispatch, alert, error, success, navigate, user]);

  // Fetch available slots when date changes
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (formData.date) {
        try {
          setLoadingSlots(true);
          setSlotsError("");
          const formattedDate = new Date(formData.date).toISOString().split('T')[0];
          const { data } = await axios.get(`/api/v1/appointment/slots?date=${formattedDate}`);
          setAvailableSlots(data.availableSlots);
        } catch (error) {
          console.error("Error fetching available slots:", error);
          setSlotsError(error.response?.data?.message || "Error fetching time slots");
          setAvailableSlots([]);
        } finally {
          setLoadingSlots(false);
        }
      } else {
        setAvailableSlots([]);
        setFormData(prev => ({ ...prev, time: "" }));
      }
    };

    fetchAvailableSlots();
  }, [formData.date]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const proceedToPayment = async () => {
    if (!isRazorpayLoaded) {
      alert.error("Payment system is not ready. Please try again in a moment.");
      return;
    }

    try {
      const { data } = await axios.post('/api/v1/payment/create-order', {
        amount: serviceDetails.price * 1,
        currency: "INR",
        type: "appointment"
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Guruji Services",
        description: `Appointment for ${formData.service}`,
        order_id: data.order.id,
        handler: function (response) {
          const appointmentData = {
            ...formData,
            date: new Date(formData.date).toISOString().split('T')[0],
            paymentInfo: {
              id: response.razorpay_payment_id,
              status: "succeeded",
              type: "Razorpay"
            }
          };
          dispatch(createAppointment(appointmentData));
            // ✅ Ye line add karo:
  navigate("/"); // user ko homepage pe le jaayega
  alert.success("Payment Successful! Redirecting to homepage...");

        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      alert.error("Error initializing payment");
      console.error("Payment initialization error:", error);
    }
  };

  const appointmentSubmitHandler = (e) => {
    e.preventDefault();


      // 🚨 Check if user is logged in
  if (!user) {
    alert.error("Please login first to book an appointment");
    navigate("/login?redirect=book-appointment"); // optional: redirect back after login
    return;
  }

    // Validate form
    if (!formData.date || !formData.time) {
      alert.error("Please select both date and time");
      return;
    }

    if (!formData.phone) {
      alert.error("Please enter your phone number");
      return;
    }

    // Initialize Razorpay payment
    proceedToPayment();
  };

  return (
    <Fragment>
      <MetaData title="Book Appointment" />
      <div className="bookAppointmentContainer">
        <div className="bookAppointmentBox">
          <h2 className="bookAppointmentHeading">Book Your Appointment</h2>
          {serviceDetails && (
            <div className="servicePrice">
              <p>Service Price: ₹{serviceDetails.price}</p>
            </div>
          )}

          <form
            className="bookAppointmentForm"
            encType="multipart/form-data"
            onSubmit={appointmentSubmitHandler}
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <input
                type="text"
                value={formData.service}
                readOnly
                placeholder="Selected Service"
              />
            </div>

            <div>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div>
              <select
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                disabled={!formData.date || loadingSlots}
              >
                <option value="">Select Time</option>
                {loadingSlots ? (
                  <option value="" disabled>Loading slots...</option>
                ) : slotsError ? (
                  <option value="" disabled>{slotsError}</option>
                ) : availableSlots.length === 0 ? (
                  <option value="" disabled>No slots available</option>
                ) : (
                  availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))
                )}
              </select>
            </div>

            <button
              id="bookAppointmentBtn"
              type="submit"
              disabled={loading || !isRazorpayLoaded}
            >
              {loading ? "Processing..." : !isRazorpayLoaded ? "Loading Payment..." : "Proceed to Payment"}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default BookAppointment; 