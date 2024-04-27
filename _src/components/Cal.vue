<script setup>
import Calendar from "@toast-ui/calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { ref, onMounted } from "vue";
import { baseurl } from "virtual:jekyll-config";
import ICal from "ical.js";

const calendarUrl = `${baseurl}/cal.ics`;

const options = {
  defaultView: "month",
  usageStatistics: false,
  isReadOnly: true,
  week: {
    startDayOfWeek: 1,
  },
  gridSelection: false,
  timezone: {
    zones: [
      {
        timezoneName: "Asia/Shanghai",
        displayLabel: "Shanghai",
      },
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
    },
  },
};

const calendarDiv = ref(null);
let calendar;
const currentMon = ref("");
function updateMonth() {
  const rangeStart = calendar.getDateRangeStart();
  const rangeEnd = calendar.getDateRangeEnd();
  const middle = new Date((rangeStart.getTime() + rangeEnd.getTime()) / 2);
  currentMon.value = `${middle.getFullYear()} / ${middle.getMonth() + 1}`;
}
function prevMonth() {
  calendar.prev();
  updateMonth();
}
function nextMonth() {
  calendar.next();
  updateMonth();
}
function today() {
  calendar.today();
  updateMonth();
}
onMounted(async () => {
  calendar = new Calendar(calendarDiv.value, options);
  const ical = await (
    await fetch(calendarUrl, { mode: "no-cors", redirect: "follow" })
  ).text();
  const icalData = ICal.parse(ical);
  const comp = new ICal.Component(icalData);
  calendar.createEvents(
    comp.getAllSubcomponents("vevent").map((vevent) => {
      const event = new ICal.Event(vevent);
      const isAllDay = event.startDate.isDate;
      return {
        id: event.uid,
        title: event.summary,
        start: event.startDate.toJSDate(),
        end: event.endDate.toJSDate() - (isAllDay ? 1 : 0),
        location: event.location,
        body: event.description,
        category: isAllDay ? "allday" : "time",
        raw: {
          class: "calendar-item",
        },
        isReadOnly: true,
        attendees: null,
        state: null,
      };
    }),
  );
  updateMonth();
});
</script>

<template lang="liquid">
  <div class="row">
    <div class="col-lg-3"></div>
    <div class="col-6 text-center fs-3">
      {% raw %}{{ currentMon }}{% endraw %}
    </div>
    <div class="col-lg-3 col-6 text-center btn-group cal-ctrl-grp">
      <button class="btn btn-primary cal-ctrl-btn flex-grow-0" @click="prevMonth">{% fa_svg fas.fa-angle-left %}</button>
      <button class="btn btn-outline-primary cal-ctrl-btn flex-grow-0" @click="today">Now</button>
      <button class="btn btn-primary cal-ctrl-btn flex-grow-0" @click="nextMonth">{% fa_svg fas.fa-angle-right %}</button>
    </div>
  </div>
  <div class="row my-3">
    <div ref="calendarDiv" id="cal-main" class="col-12"></div>
  </div>
</template>

<style lang="scss">
@use "../styles/_bootstrap_vars.scss" as bs;

#cal-main {
  height: 70vh;
  min-height: 500px;
  .toastui-calendar-daygrid-cell + .toastui-calendar-daygrid-cell {
    border-left-color: var(--cal-border-color);
  }

  --cal-holiday-color: #{bs.$red};
  --cal-holiday-not-current-month-color: rgba(#{bs.to-rgb(bs.$red)}, 0.4);
  --cal-weekday-not-current-month-color: rgba(var(--bs-secondary-rgb), 0.4);
  --cal-border-color: var(--bs-border-color);

  .toastui-calendar-weekday-event-dot + .toastui-calendar-weekday-event-title {
    color: var(--bs-body-color);
  }
  .toastui-calendar-detail-container {
    border-color: var(--bs-border-color-translucent);
    background-color: var(--bs-body-bg);
  }

  .toastui-calendar-popup-arrow {
    &.toastui-calendar-right .toastui-calendar-popup-arrow-fill {
      border-left-color: var(--bs-body-bg);
    }

    &.toastui-calendar-right .toastui-calendar-popup-arrow-border {
      border-left-color: var(--bs-border-color-translucent);
    }

    &.toastui-calendar-left .toastui-calendar-popup-arrow-fill {
      border-right-color: var(--bs-body-bg);
    }

    &.toastui-calendar-left .toastui-calendar-popup-arrow-border {
      border-right-color: var(--bs-border-color-translucent);
    }
  }
  .toastui-calendar-icon {
    filter: invert(1);
    --webkit-filter: invert(1);
    --moz-filter: invert(1);
  }
  .toastui-calendar-popup-container {
    box-shadow: var(--bs-box-shadow);
  }
}

p.cal-abs-url {
  line-break: loose;
}
</style>
