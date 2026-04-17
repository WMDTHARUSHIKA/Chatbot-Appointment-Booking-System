// public/embed.js
(function () {
  const init = () => {
    // Chatbot URL (embed mode)
    const WIDGET_URL = "https://chatbot-appointment-booking-system.vercel.app/?embed=1";

    // Colors
    const BG = "#0f8a83";     // button background (your color)
    const FG = "#ffffff";     // text + close icon color
    const HOVER = "#0c746e";  // hover background (slightly darker)

    // Layout
    const GAP = 24;
    const BTN_H = 54;         // pill height

    // Prevent double injection
    if (document.getElementById("icw-launcher") || document.getElementById("icw-frame")) return;

    // Chat bubble with 3 dots (white bubble, dots in BG color)
    const CHAT_SVG = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3c4.2 0 7.5 3 7.5 6.8v4.1c0 2-1.6 3.6-3.6 3.6H14.5l-2.8 2.1c-.9.7-2.2.1-2.2-1v-1.1H8.1c-2 0-3.6-1.6-3.6-3.6V9.8C4.5 6 7.8 3 12 3Z"
              fill="${FG}"/>
        <circle cx="9.2" cy="11.2" r="1.1" fill="${BG}"/>
        <circle cx="12.0" cy="11.2" r="1.1" fill="${BG}"/>
        <circle cx="14.8" cy="11.2" r="1.1" fill="${BG}"/>
      </svg>
    `;

    // Close icon
    const CLOSE_SVG = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 6L18 18" fill="none" stroke="${FG}" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M18 6L6 18" fill="none" stroke="${FG}" stroke-width="2.8" stroke-linecap="round"/>
      </svg>
    `;

    // Styles
    const style = document.createElement("style");
    style.id = "icw-style";
    style.textContent = `
      #icw-launcher{
        position:fixed;
        right:${GAP}px;
        bottom:${GAP}px;

        height:${BTN_H}px;
        padding:0 18px;
        border-radius:16px;

        border:0;
        cursor:pointer;
        z-index:999999;

        background:${BG};
        color:${FG};

        box-shadow:0 18px 40px rgba(0,0,0,.22);
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:10px;

        transition: background .15s ease, transform .15s ease;
        -webkit-tap-highlight-color: transparent;

        font: 600 18px/1.0 system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
        letter-spacing: .2px;
      }
      #icw-launcher:hover{ background:${HOVER}; transform: translateY(-1px); }
      #icw-launcher:active{ transform: translateY(0); }

      #icw-launcher svg{ width:26px; height:26px; display:block; }

      #icw-launcher .icw-label{
        display:inline-block;
        transform: translateY(0.5px);
        white-space: nowrap;
      }

      #icw-frame{
        position:fixed;
        right:${GAP}px;
        bottom:${GAP + BTN_H + 12}px;
        width:380px;
        height:560px;
        border:0;
        border-radius:22px;
        z-index:999999;
        box-shadow:0 24px 60px rgba(0,0,0,.22);
        display:none;
        background:transparent;
      }

      @media (max-width:420px){
        #icw-frame{
          right:12px;
          left:12px;
          width:auto;
          height:75vh;
          bottom:${12 + BTN_H + 12}px;
          border-radius:18px;
        }
        #icw-launcher{
          right:12px;
          bottom:12px;
        }
      }
    `;
    document.head.appendChild(style);

    // Iframe
    const frame = document.createElement("iframe");
    frame.id = "icw-frame";
    frame.src = WIDGET_URL;
    frame.allow = "clipboard-write";
    frame.style.background = "transparent";
    frame.setAttribute("loading", "lazy");
    frame.setAttribute("title", "Chat widget");
    document.body.appendChild(frame);

    // Button
    const btn = document.createElement("button");
    btn.id = "icw-launcher";
    btn.type = "button";
    btn.setAttribute("aria-label", "Open chat");
    btn.innerHTML = `${CHAT_SVG}<span class="icw-label">Chat</span>`;
    document.body.appendChild(btn);

    const openChat = () => {
      frame.style.display = "block";
      btn.setAttribute("aria-label", "Close chat");
      // keep pill style, show Close text like the screenshot style
      btn.innerHTML = `${CLOSE_SVG}<span class="icw-label">Close</span>`;
    };

    const closeChat = () => {
      frame.style.display = "none";
      btn.setAttribute("aria-label", "Open chat");
      btn.innerHTML = `${CHAT_SVG}<span class="icw-label">Chat</span>`;
    };

    btn.addEventListener("click", () => {
      const isOpen = frame.style.display === "block";
      if (isOpen) closeChat();
      else openChat();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && frame.style.display === "block") closeChat();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();