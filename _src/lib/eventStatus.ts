import { createApp } from "vue";
import EventStatus from "../components/EventStatus.vue";

Array.from(document.querySelectorAll(".event .event-status")).forEach(
  (element) => {
    const date = element.attributes.getNamedItem("data-event-date").textContent;
    const hideFinished =
      element.attributes.getNamedItem("data-hide-finished") !== null;
    createApp(EventStatus, { eventDate: date, hideFinished }).mount(element);
  },
);
