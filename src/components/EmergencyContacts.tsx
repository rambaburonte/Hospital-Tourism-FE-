import React, { useEffect, useState } from 'react';
import { BASE_URL } from '@/config/config';
import { Phone } from 'lucide-react';

interface EmergencyContact {
  emergencyContactId: number;
  cityOrStateName: string;
  phoneNumber: number;
}

const EmergencyContacts: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/emergency-contact/all`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch emergency contacts');
        return res.json();
      })
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <aside
      className={`fixed left-0 bottom-0 z-50 m-4 transition-all duration-300 ${open ? 'w-auto' : 'w-40'} group`}
    >
      <button
        className={`flex items-center justify-center gap-2 bg-red-600/90 text-white rounded-t-lg rounded-br-lg shadow-lg px-4 py-2 border-2 border-red-700 focus:outline-none w-full transition-all duration-300`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle Emergency Contacts"
        type="button"
      >
        <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
        </svg>
        <span className="font-bold text-base">Emergency</span>
      </button>
      <div
        className={`bg-red-600/95 text-white rounded-t-lg rounded-br-lg shadow-lg border-2 border-red-700 mt-1 transition-all duration-300 overflow-hidden ${open ? 'max-w-2xl opacity-100' : 'max-w-0 opacity-0 pointer-events-none'} flex items-center`}
        style={{ minWidth: open ? 10 : 0 }}
      >
        {open && (
          <div className="flex flex-col items-center gap-4 px-4 py-2 w-full">
            {loading ? (
              <div className="text-sm">Loading...</div>
            ) : error ? (
              <div className="text-sm text-yellow-200">{error}</div>
            ) : contacts.length === 0 ? (
              <div className="text-sm">No contacts found.</div>
            ) : (
              <ul className="flex flex-col gap-4 overflow-y-auto max-h-[60vh]">
                {contacts.map((c) => (
                  <li
                    key={c.emergencyContactId}
                    className="flex flex-col items-center bg-red-700/30 rounded p-2 cursor-pointer"
                  >
                    <a
                      href={`tel:${c.phoneNumber}`}
                      className="flex flex-col items-center text-white hover:text-yellow-200 transition text-xs"
                    >
                      <span className="font-semibold text-xs truncate max-w-[90px]">{c.cityOrStateName}</span>
                        <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4 mt-1" />
                        <span className="text-xs">{c.phoneNumber}</span>
                        </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default EmergencyContacts;
