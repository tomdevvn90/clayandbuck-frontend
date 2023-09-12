import { StickyShareButtons } from "sharethis-reactjs";

export default function ShareThis() {
  return (
    <StickyShareButtons
      config={{
        alignment: "left", // alignment of buttons (left, right)
        color: "social", // set the color of buttons (social, white)
        enabled: true, // show/hide buttons (true, false)
        font_size: 14, // font size for the buttons
        labels: "cta", // button labels (cta, counts, null)
        language: "en", // which language to use (see LANGUAGES)
        min_count: 0, // hide react counts less than min_count (INTEGER)
        networks: ["facebook", "twitter", "email"],
        padding: 8, // padding within buttons (INTEGER)
        radius: 4, // the corner radius on each button (INTEGER)
        show_total: false, // show/hide the total share count (true, false)
        show_mobile: true, // show/hide the buttons on mobile (true, false)
        show_toggle: true, // show/hide the toggle buttons (true, false)
        size: 40, // the size of each button (INTEGER)
        top: 300, // offset in pixels from the top of the page

        // OPTIONAL PARAMETERS
        // url: "https://www.sharethis.com", // (defaults to current url)
        // image: "https://bit.ly/2CMhCMC", // (defaults to og:image or twitter:image)
        // description: "custom text", // (defaults to og:description or twitter:description)
        // title: "custom title", // (defaults to og:title or twitter:title)
        // message: "custom email text", // (only for email sharing)
        // subject: "custom email subject", // (only for email sharing)
        // username: "custom twitter handle", // (only for twitter sharing)
      }}
    />
  );
}
