import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import QRCode from "react-qr-code";
import "./aStyle.css";

function Ticket() {
  const bookingId = "abcdefghijklmn";
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
                      <div className="ticket--value">Spider-Mn: Homecoming</div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div>
                      <div className="ticket--title">Date</div>
                      <div className="ticket--value">07 July</div>
                    </div>
                    <div>
                      <div className="ticket--title">Time</div>
                      <div className="ticket--value">19:00</div>
                    </div>
                    <div>
                      <div className="ticket--title">Category</div>
                      <div className="ticket--value">Action</div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div>
                      <div className="ticket--title">Count</div>
                      <div className="ticket--value">3 pieces</div>
                    </div>
                    <div>
                      <div className="ticket--title">Seat</div>
                      <div className="ticket--value">C4, C5, C6</div>
                    </div>
                    <div>
                      <div className="ticket--title">Price</div>
                      <div className="ticket--value">$150.000</div>
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
