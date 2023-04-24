---
---
{% putbabelpolyfill -%}
{% babel %}
(function(){
  const calendarUrl = '/cal.ics'; // TODO: replace with ics file on mirrors

  const container = document.getElementById('calendar');
  const options = {
    defaultView: 'month',
    usageStatistics: false,
    isReadOnly: true,
    week: {
      startDayOfWeek: 1,
    },
    gridSelection: false,
    timezone: {
      zones: [
        {
          timezoneName: 'Asia/Shanghai',
          displayLabel: 'Shanghai',
        }
      ],
    },
    useDetailPopup: true,
    theme: {
      common: {
        backgroundColor: "inherit",
        saturday: {
          color: "var(--cal-holiday-color)",
        },
        holiday: {
          color: "var(--cal-holiday-color)",
        },
        dayName: {
          color: "inherit",
        },
        border: "1px solid var(--cal-border-color)",
      },
      month: {
        dayExceptThisMonth: {
          color: "var(--cal-weekday-not-current-month-color)",
        },
        holidayExceptThisMonth: {
          color: "var(--cal-holiday-not-current-month-color)",
        },
      }
    }
  };

  const calendar = new tui.Calendar(container, options);

  const prevButton = $('button#prev')[0];
  const nextButton = $('button#next')[0];
  const todayButton = $('button#today')[0];
  const rangeText = $('span#current')[0];

  function updateMonth() {
    const rangeStart = calendar.getDateRangeStart();
    const rangeEnd = calendar.getDateRangeEnd();
    const middle = new Date((rangeStart.getTime() + rangeEnd.getTime()) / 2);
    rangeText.textContent = `${middle.getFullYear()} / ${middle.getMonth() + 1}`;
  }
  updateMonth();

  prevButton.addEventListener('click', function () {
    calendar.prev();
    updateMonth();
  });

  nextButton.addEventListener('click', function () {
    calendar.next();
    updateMonth();
  });

  todayButton.addEventListener('click', function () {
    calendar.today();
    updateMonth();
  });

  async function renderCalendar() {
    const resp = await fetch(calendarUrl, { mode: 'no-cors', redirect: 'follow' });
    const icalText = await resp.text();
    const cal = ICAL.parse(icalText);
    const comp = new ICAL.Component(cal);
    calendar.createEvents(comp.getAllSubcomponents("vevent").map(vevent => {
      const event = new ICAL.Event(vevent);
      const isAllDay = event.startDate.isDate;
      return {
        id: event.uid,
        title: event.summary,
        start: event.startDate.toJSDate(),
        end: event.endDate.toJSDate() - (isAllDay ? 1 : 0),
        location: event.location,
        body: event.description,
        category: isAllDay ? 'allday' : 'time',
        raw: {
          class: 'calendar-item',
        },
        isReadOnly: true,
        attendees: null,
        state: null,
      };
    }));
  }

  document.addEventListener('DOMContentLoaded', renderCalendar);
})();
{% endbabel %}
