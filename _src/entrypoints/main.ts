import BootstrapTooltip from "bootstrap/js/dist/tooltip";
import "./default";
import { createApp } from "vue";
import EventStatus from "../components/EventStatus.vue";

Array.from(document.querySelectorAll('[data-toggle="tooltip"]')).forEach(
  (element) => {
    new BootstrapTooltip(element);
  },
);

Array.from(
  document.querySelectorAll("#recent-events .event .event-status"),
).forEach((element) => {
  const date = element.attributes.getNamedItem("data-event-date").textContent;
  createApp(EventStatus, { eventDate: date }).mount(element);
});
