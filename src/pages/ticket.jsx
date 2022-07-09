import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBookingById } from "../store/action/booking";
import "./aStyle.css";

function Ticket() {
  const params = useParams();
  const dispatch = useDispatch();
  const bookingId = params.bookingId;
  const [data, setData] = useState({
    name: "",
    category: "",
    totalTicket: "",
    dateBooking: "",
    timeBooking: "",
    seat: [],
    price: "",
  });

  useEffect(() => {
    getDataTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getDataTicket = async () => {
    try {
      const result = await dispatch(getBookingById(bookingId));
      setData(result.value.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="text-center container ">
      <Navbar />
      <h1>Profile Page</h1>
      <hr />
      <div className="ticketBg">
        <div className="cardTicket">
          <div className="fw-bold fs-5 mb-5">Proof of Payment</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="ticketCard1">
              <div className="ticketGap1"></div>
              <div className="TicketLogo">Ticketing</div>
              <div className="row bg-white ticket--context ">
                <div className="col-8">
                  <div className="d-flex">
                    <div>
                      <div className="ticket--title">Movie</div>
                      <div className="ticket--value">
                        {data.name.length > 15
                          ? data.name.substring(0, 7) + "..."
                          : data.name}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div>
                      <div className="ticket--title">Date</div>
                      <div className="ticket--value">
                        {`${data.dateBooking.split("T")[0].split("-")[2]}/${
                          data.dateBooking.split("T")[0].split("-")[1]
                        }`}
                      </div>
                    </div>
                    <div>
                      <div className="ticket--title">Time</div>
                      <div className="ticket--value">
                        {data.timeBooking.split(":")[0]}:00
                      </div>
                    </div>
                    <div>
                      <div className="ticket--title">Category</div>
                      <div className="ticket--value">
                        {data.category.length > 10
                          ? data.category.substring(0, 7) + "..."
                          : data.category}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div>
                      <div className="ticket--title">Count</div>
                      <div className="ticket--value">
                        {data.totalTicket} pieces
                      </div>
                    </div>
                    <div>
                      <div className="ticket--title">Seat</div>
                      <div className="ticket--value">
                        {data.seat.join(", ")}
                      </div>
                    </div>
                    <div>
                      <div className="ticket--title">Price</div>
                      <div className="ticket--value">$.{data.price}</div>
                    </div>
                  </div>
                </div>
                <div className="col-4 d-flex justify-content-center align-item-center mt-3">
                  <QRCode value={bookingId} size={"120"} level="H" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Ticket;
