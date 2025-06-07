
import React, { useState, useCallback } from "react";
import axios from "axios";

interface SlotResponse {
  id: number;
  slots: string | null;
  slotId: number | null;
  slotTime: string;
  bookingStatus: string;
  serviceType: string;
  serviceId: number;
  bookedByUserId: number | null;
}

const AddSlots: React.FC = () => {
  const [serviceType, setServiceType] = useState<string>("chef");
  const [serviceId, setServiceId] = useState<number>(1);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [slots, setSlots] = useState<string[]>([]);
  const [responseSlots, setResponseSlots] = useState<SlotResponse[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
const base_url="https://healthtourism-5.onrender.com"
  // Validate slot time format and logic
  const isValidSlotTime = (start: string, end: string): boolean => {
    if (!start || !end) return false;

    // Convert times to Date objects for comparison
    const [startHours, startMinutes, startPeriod] = start
      .split(/[: ]/)
      .map((part, idx) => (idx < 2 ? parseInt(part) : part));
    const [endHours, endMinutes, endPeriod] = end
      .split(/[: ]/)
      .map((part, idx) => (idx < 2 ? parseInt(part) : part));

    // Adjust hours for AM/PM
    const startHour24 = startPeriod === "PM" && startHours !== 12 ? startHours + 12 : startHours;
    const endHour24 = endPeriod === "PM" && endHours !== 12 ? endHours + 12 : endHours;

    // Create Date objects for comparison
    const startDate = new Date();
    startDate.setHours(startHour24, startMinutes, 0);
    const endDate = new Date();
    endDate.setHours(endHour24, endMinutes, 0);

    // Ensure end time is after start time
    return endDate > startDate;
  };

  // Format time to HH:MM AM/PM
  const formatTime = (time: string): string => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours);
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert to 12-hour format
    return `${hour}:${minutes} ${period}`;
  };

  // Add slot to slots array
  const addSlot = useCallback(() => {
    if (!startTime || !endTime) {
      setError("Please select both start and end times");
      return;
    }
    if (!isValidSlotTime(startTime, endTime)) {
      setError("Invalid slot: End time must be after start time");
      return;
    }
    const formattedSlot = `${formatTime(startTime)} - ${formatTime(endTime)}`;
    if (slots.includes(formattedSlot)) {
      setError("This slot is already added");
      return;
    }
    setSlots([...slots, formattedSlot]);
    setStartTime("");
    setEndTime("");
    setError(null);
  }, [startTime, endTime, slots]);

  // Remove slot from slots array
  const removeSlot = (slotToRemove: string) => {
    setSlots(slots.filter((slot) => slot !== slotToRemove));
    setError(null);
  };

  // Submit booking request
  const submitBooking = async () => {
    if (slots.length === 0) {
      setError("Please add at least one slot.");
      return;
    }
    if (serviceId < 1) {
      setError("Service ID must be a positive number");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post<SlotResponse[]>(
        "http://localhost:8080/api/services/slots/add",
        {
          serviceType,
          serviceId,
          slots,
        },
        { timeout: 5000 }
      );
      setResponseSlots(res.data);
      setSlots([]);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Error booking slots"
      );
      setResponseSlots(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key for adding slot
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addSlot();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8 transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Book Service Slots
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="serviceType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Service Type
            </label>
            <select
              id="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              <option value="chef">Chef</option>
              <option value="physio">physio</option>
              <option value="doctor">Doctor</option>
               <option value="chef">spa</option>
              <option value="translator">Physio</option>
              <option value="labtest">Doctor</option>

            </select>
          </div>

          <div>
            <label
              htmlFor="serviceId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Service ID
            </label>
            <input
              id="serviceId"
              type="number"
              value={serviceId}
              onChange={(e) => setServiceId(parseInt(e.target.value) || 1)}
              min={1}
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Slot Time
            </label>
            <div className="flex gap-2">
              <input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              />
              <span className="self-center text-gray-500">to</span>
              <input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              />
              <button
                onClick={addSlot}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {slots.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Slots to book:
              </p>
              <ul className="space-y-2">
                {slots.map((slot, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded-md transition-all duration-200 hover:bg-gray-100"
                  >
                    <span className="text-gray-800">{slot}</span>
                    <button
                      onClick={() => removeSlot(slot)}
                      disabled={isLoading}
                      aria-label={`Remove ${slot}`}
                      className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={submitBooking}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                  ></path>
                </svg>
                Booking...
              </span>
            ) : (
              "Book Slots"
            )}
          </button>

          {error && (
            <p
              role="alert"
              className="mt-4 text-sm text-red-600 bg-red-50 p-2 rounded-md"
            >
              {error}
            </p>
          )}

          {responseSlots && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Booking Result:
              </h3>
              <ul className="space-y-2">
                {responseSlots.map((slot) => (
                  <li
                    key={slot.id}
                    className="p-2 bg-gray-50 rounded-md transition-all duration-200 hover:bg-gray-100"
                  >
                    <span className="text-gray-800">
                      {slot.slotTime} -{" "}
                      <strong
                        className={
                          slot.bookingStatus === "Confirmed"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {slot.bookingStatus}
                      </strong>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSlots;
