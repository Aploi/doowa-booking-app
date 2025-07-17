import * as React from 'react';
import { Link } from 'react-router-dom';

const daysInMonth = 31;
const mockData = Array.from({ length: daysInMonth }, (_) => ({
  available: 80 + Math.floor(Math.random() * 40),
  booked: Math.floor(Math.random() * 40),
}));

export default function AdminCalendar() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-[95vw] mx-auto bg-white rounded-xl shadow p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link to="/">Back to Home</Link>
            <span className="font-bold text-lg">MTDY SPORTS CENTER SCHEDULE</span>
            <span className="ml-2 text-sm">Admin View</span>
          </div>
          <div className="flex gap-4 items-center">
            <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 text-sm">+ New Booking</button>
          </div>
        </div>
        {/* Date/filters */}
        <div className="flex items-center gap-4 mb-2">
          <button className="text-lg">{'<'}</button>
          <div className="font-semibold">July 2025</div>
          <button className="text-lg">{'>'}</button>
          <input className="ml-4 px-2 border rounded" type="text" value="Day View" readOnly style={{ width: "100px" }} />
          <span className="ml-auto text-xs text-gray-500">Click bookings to edit status • Click empty slots to book • Click month dates to view day</span>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-3 mb-3 text-xs">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500 inline-block"></span>Open Play</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-200 inline-block"></span>Private Booking</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-400 inline-block"></span>Coaching</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500 inline-block"></span>Special Event</span>
        </div>
        {/* Calendar */}
        <div className="bg-gray-50 rounded-lg border p-4">
          <div className="text-center font-semibold mb-2 text-lg">July 2025</div>
          <table className="w-full text-center table-fixed">
            <thead>
              <tr className="text-xs text-gray-500">
                <th className="py-2">Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody>
              {/* Render calendar weeks */}
              {(() => {
                const weeks = [];
                let cells: React.ReactElement[] = [];
                let dayNum = 1;
                let started = false;
                for (let row = 0; row < 6; row++) {
                  cells = [];
                  for (let col = 0; col < 7; col++) {
                    if (!started && col === 2) started = true;
                    if (started && dayNum <= daysInMonth) {
                      const { available, booked } = mockData[dayNum - 1];
                      cells.push(
                        <td key={col} className="h-20 align-top p-1">
                          <div className="font-semibold text-xs text-blue-700 cursor-pointer hover:underline">
                            {available < 100 ? (
                              <span>{available} available</span>
                            ) : (
                              <span className="text-green-600">{available} available</span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{booked > 0 ? `${booked} booked` : ""}</div>
                          <div className="mt-1 text-xl font-bold text-gray-700">{dayNum}</div>
                          {dayNum++}
                        </td>
                      );
                    } else {
                      cells.push(<td key={col}></td>);
                    }
                  }
                  weeks.push(<tr key={row}>{cells}</tr>);
                  if (dayNum > daysInMonth) break;
                }
                return weeks;
              })()}
            </tbody>
          </table>
        </div>
        {/* Footer stats */}
        <div className="flex items-center justify-between mt-6 text-center text-xs font-semibold text-gray-600">
          <div>
            <span className="text-xl text-black mr-1">32</span> Total Bookings
          </div>
          <div>
            <span className="text-xl text-green-600 mr-1">88</span> Available Slots
          </div>
          <div>
            <span className="text-xl text-black mr-1">$2,450</span> Revenue Today
          </div>
          <div>
            <span className="text-xl text-blue-600 mr-1">73%</span> Occupancy Rate
          </div>
        </div>
      </div>
    </div>
  );
}
