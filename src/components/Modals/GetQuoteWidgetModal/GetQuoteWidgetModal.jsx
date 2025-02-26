"use client";
import React, { useEffect, useState } from "react";

export default function GetQuoteWidgetModal({ closeModal }) {
  const [titleModal, setTitleModal] = useState("Contacts Form");

  const [businessDirection, setBusinessDirection] = useState(
    sessionStorage.getItem("businessDirection") || "Select Your Business"
  );
  const [fullName, setFullName] = useState(
    sessionStorage.getItem("fullName") || ""
  );
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");

  const [phone, setPhone] = useState(sessionStorage.getItem("phone") || "");
  const [companyName, setCompanyName] = useState(
    sessionStorage.getItem("companyName") || ""
  );
  const [companyWebsite, setCompanyWebsite] = useState(
    sessionStorage.getItem("companyWebsite") || ""
  );
  const [message, setMessage] = useState(
    sessionStorage.getItem("message") || ""
  );

  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    if (businessDirection && fullName && email && phone) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [businessDirection, fullName, email, phone]);

  useEffect(() => {
    sessionStorage.setItem("businessDirection", businessDirection);
    sessionStorage.setItem("fullName", fullName);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("phone", phone);
    sessionStorage.setItem("companyName", companyName);
    sessionStorage.setItem("companyWebsite", companyWebsite);
    sessionStorage.setItem("message", message);
  }, [
    businessDirection,
    fullName,
    email,
    phone,
    companyName,
    companyWebsite,
    message,
  ]);
  const clearFields = () => {
    setBusinessDirection("");
    setFullName("");
    setEmail("");
    setPhone("");
    setCompanyName("");
    setCompanyWebsite("");
    setMessage("");
    sessionStorage.removeItem("businessDirection");
    sessionStorage.removeItem("fullName");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    sessionStorage.removeItem("companyName");
    sessionStorage.removeItem("companyWebsite");
    sessionStorage.removeItem("message");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      titleModal,
      businessDirection,
      fullName,
      email,
      phone,
      companyName,
      companyWebsite,
      message,
    };

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        clearFields();
        closeModal();
      } else {
        const text = await response.text();
        throw new Error(`Failed to fetch: ${text}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div>
      <h2 className="text-center text-[24px] font-semibold mt-6 text-[#000A11]">
        {titleModal}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col  lg:flex-row   justify-center items-center gap-[50px] px-[19px] mb-[48px]">
          <div>
            <div className="mb-4">
              <label
                htmlFor="businessDirection"
                className="block mt-6 font-medium ml-2"
              >
                Business direction <span className="text-red-500">*</span>
              </label>

              <select
                id="businessDirection"
                className="w-[342px] p-4 border rounded "
                value={businessDirection}
                onChange={(e) => setBusinessDirection(e.target.value)}
                required
              >
                <option value="Select Your Business" disabled>
                  Select Your Business
                </option>
                <option value="FBA, FBW, Private Label">
                  FBA, FBW, Private Label
                </option>
                <option value="Online arbitration">Online arbitration</option>
                <option value="FBM">FBM</option>
                <option value="Wholesale">Wholesale</option>
              </select>
            </div>

            <div className="mt-[18px]">
              <label
                htmlFor="fullName"
                className="block mb-3 font-semibold ml-2 leading-[24px] text-[#000A11]"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-[342px] p-4 border rounded"
                required
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="email"
                className="block mb-3 font-semibold ml-2 leading-[24px] text-[#000A11]"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="w-[342px] p-4 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="phone"
                className="block mb-3 font-semibold ml-2 leading-[24px] text-[#000A11]"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                className="w-[342px] p-4 border rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <div className="mt-4">
              <label
                htmlFor="companyName"
                className="block mb-3 font-semibold ml-2 leading-[24px] text-[#000A11]"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                className="w-[342px] p-4 border rounded"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="website"
                className="block mb-3 font-semibold ml-2 leading-[24px] text-[#000A11]"
              >
                Company Website
              </label>
              <input
                type="text"
                id="website"
                className="w-[342px] p-4 border rounded"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="message"
                className="block mb-3 font-semibold ml-2 leading-[24px] text-[#000A11]"
              >
                Comments
              </label>
              <textarea
                id="comments"
                rows="5"
                className="h-[121px] w-[342px] p-4 border rounded  
                
                resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`${
              isButtonActive
                ? "bg-accentYellow hover:bg-accentHoverYellow"
                : "bg-gray-400 cursor-not-allowed"
            } text-white px-4 py-2 rounded ml-[auto] mr-[auto] font-bold text-[16px] w-[179px] h-[48px]`}
            disabled={!isButtonActive}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
