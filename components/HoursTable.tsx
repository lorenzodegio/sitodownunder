"use client";

import { useOpeningStatus } from "@/components/useOpeningStatus";
import { site, type Weekday } from "@/content/site";
import { hoursPlaceholder } from "@/data/locale";
import { formatDayRanges } from "@/lib/opening";

export function HoursTable() {
  const status = useOpeningStatus();

  return (
    <div className="rv hours-card">
      {site.hoursOrder.map((day) => {
        const today = day === status.today;
        return (
          <div key={day} className={today ? "hours-row is-today" : "hours-row"}>
            <span>
              {site.dayNames[day]}
              {today ? site.openingCopy.todaySuffix : ""}
            </span>
            <span className="hours-time">
              {site.hours ? formatDayRanges(site.hours[day as Weekday]) : hoursPlaceholder}
            </span>
          </div>
        );
      })}
    </div>
  );
}
