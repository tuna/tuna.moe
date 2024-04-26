import BootstrapTooltip from "bootstrap/js/dist/tooltip";

Array.from(document.querySelectorAll('[data-toggle="tooltip"]')).forEach(
  (element) => {
    new BootstrapTooltip(element);
  },
);
