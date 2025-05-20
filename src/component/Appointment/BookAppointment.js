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

  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [serviceDetails, setServiceDetails] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const serviceId = searchParams.get('service');
    
    if (serviceId) {
      const fetchServiceDetails = async () => {
        try {
          const { data } = await axios.get(`/api/v1/service/${serviceId}`);
          setServiceDetails(data.service);
          setService(data.service.name);
        } catch (error) {
          console.error("Error fetching service details:", error);
        }
      };
      fetchServiceDetails();
    }
  }, [location]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Appointment Booked Successfully");
      navigate("/appointments/me");
      dispatch({ type: CREATE_APPOINTMENT_RESET });
    }
  }, [dispatch, alert, error, success, navigate]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (date) {
        try {
          const { data } = await axios.get(`/api/v1/appointment/slots?date=${date}`);
          setAvailableSlots(data.availableSlots);
        } catch (error) {
          console.error("Error fetching available slots:", error);
        }
      }
    };

    fetchAvailableSlots();
  }, [date]);

  const appointmentSubmitHandler = (e) => {
    e.preventDefault();

    const appointmentData = {
      name,
      email,
      phone,
      service,
      date,
      time,
    };

    dispatch(createAppointment(appointmentData));
  };

  return (
    <Fragment>
      <MetaData title="Book Appointment" />
      <div className="bookAppointmentContainer">
        <div className="bookAppointmentBox">
          <h2 className="bookAppointmentHeading">Book Your Appointment</h2>

          <form
            className="bookAppointmentForm"
            encType="multipart/form-data"
            onSubmit={appointmentSubmitHandler}
          >
            <div>
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <input
                type="text"
                value={service}
                readOnly
                placeholder="Selected Service"
              />
            </div>

            <div>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                disabled={!date}
              >
                <option value="">Select Time</option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <button
              id="bookAppointmentBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default BookAppointment; 