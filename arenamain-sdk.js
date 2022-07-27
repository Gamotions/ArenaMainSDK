/*
  Kevin Haryo Kuncoro
  kevin.haryo@gamotions.com
  kevinhyokun91@gmail.com
*/

var head = document.getElementsByTagName("head")[0];
var body = document.getElementsByTagName("body")[0];
var arenamain_ins_dom = document.getElementsByClassName("arenamainId");
var anchor_curr_index = 0;

// height in percent
var navbar_height = 5;
var iframe_height = 100 - navbar_height;

// Install Axios
const arenamainAxios = document.createElement("script");
arenamainAxios.setAttribute(
  "src",
  "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"
);
arenamainAxios.setAttribute(
  "integrity",
  "sha384-vmbbJNC6Li6w5GzrydJ5cd4ttMcLJ/Nl5xgp5saZ5QV8fp7zdsrFDcCasGqOFlaC"
);
arenamainAxios.setAttribute("crossorigin", "anonymous");

// install cookies js
const arenamainCookies = document.createElement("script");
arenamainCookies.setAttribute(
  "src",
  "https://cdn.jsdelivr.net/npm/js-cookie@3.0.1/dist/js.cookie.min.js"
);
arenamainCookies.setAttribute(
  "integrity",
  "sha256-0H3Nuz3aug3afVbUlsu12Puxva3CP4EhJtPExqs54Vg="
);
arenamainCookies.setAttribute("crossorigin", "anonymous");

// append script to body
document.body.appendChild(arenamainAxios);
document.body.appendChild(arenamainCookies);

function create_and_append_arenamain(curr_index) {
  let data_debug = arenamain_ins_dom[curr_index].dataset.debug;
  let clientKey = arenamain_ins_dom[curr_index].dataset.clientkey;
  let userId = arenamain_ins_dom[curr_index].dataset.userid ?? null;
  let siteUrl = data_debug ?? "https://arenamain.id";
  let apiBaseUrl = `${siteUrl}/api/v1`;

  var arenamain_anchor = document.createElement("div");
  arenamain_anchor.className = "arenamain_anchor";
  arenamain_anchor.style.display = "block";
  arenamain_anchor.style.width = "512px";
  arenamain_anchor.style.height = "512px";
  arenamain_anchor.style.backgroundColor = "gray";
  arenamain_anchor.style.position = "absolute";
  arenamain_anchor.style.top = "50%";
  arenamain_anchor.style.left = "50%";
  arenamain_anchor.style.transform = "translate(-50%, -50%)";

  var arenamain_anchor_custom_navbar = document.createElement("div");
  arenamain_anchor_custom_navbar.id = "arenamain_anchor_custom_navbar";
  arenamain_anchor_custom_navbar.style.display = "flex";
  arenamain_anchor_custom_navbar.style.width = "100%";
  arenamain_anchor_custom_navbar.style.height = navbar_height.toString() + "%";
  arenamain_anchor_custom_navbar.style.backgroundColor = "black";
  arenamain_anchor_custom_navbar.style.justifyContent = "space-between";

  var custom_navbar_button_width = "auto";
  var custom_navbar_button_height = "80%";
  var custom_navbar_button_padding = "2px";
  var custom_navbar_button_cursor = "pointer";

  var arenamain_anchor_custom_navbar_back = document.createElement("img");
  arenamain_anchor_custom_navbar_back.style.height =
    custom_navbar_button_height;
  arenamain_anchor_custom_navbar_back.style.width = custom_navbar_button_width;
  arenamain_anchor_custom_navbar_back.style.padding =
    custom_navbar_button_padding;
  arenamain_anchor_custom_navbar_back.style.cursor =
    custom_navbar_button_cursor;
  arenamain_anchor_custom_navbar_back.src =
    "https://arenamain.id/portal/img/ss_left_btn.png";
  arenamain_anchor_custom_navbar_back.onclick = function () {
    nav_back();
  };

  var arenamain_anchor_custom_navbar_close = document.createElement("img");
  arenamain_anchor_custom_navbar_close.style.height =
    custom_navbar_button_height;
  arenamain_anchor_custom_navbar_close.style.width = custom_navbar_button_width;
  arenamain_anchor_custom_navbar_close.style.padding =
    custom_navbar_button_padding;
  arenamain_anchor_custom_navbar_close.style.cursor =
    custom_navbar_button_cursor;
  arenamain_anchor_custom_navbar_close.src =
    "https://arenamain.id/portal/img/ss_red_close_btn.png";
  arenamain_anchor_custom_navbar_close.onclick = function () {
    axios
      .post(`${apiBaseUrl}/portal/navigation/close`, {
        ip: Cookies.get("ARENASESSID"),
        end_time: new Date().getTime() / 1000,
      })
      .then(function (response) {
        const { data } = response;
        console.log(data);
        document.exitFullscreen();
      })
      .catch(function (error) {
        console.log(error);
        document.exitFullscreen();
      });
  };

  arenamain_anchor_custom_navbar.appendChild(
    arenamain_anchor_custom_navbar_back
  );
  arenamain_anchor_custom_navbar.appendChild(
    arenamain_anchor_custom_navbar_close
  );

  arenamain_iframe = document.createElement("iframe");
  arenamain_iframe.className = "arenamain_iframe";

  userId = userId != null ? `&userId=${userId}` : "";
  var iframe_src = `${siteUrl}?key=${clientKey}${userId}`;

  arenamain_iframe.src = iframe_src;
  arenamain_iframe.style.width = "100%";
  arenamain_iframe.style.height = iframe_height.toString() + "%";
  arenamain_iframe.frameBorder = "0";
  arenamain_iframe.allow = " ";

  arenamain_anchor.appendChild(arenamain_anchor_custom_navbar);
  arenamain_anchor.appendChild(arenamain_iframe);

  body.appendChild(arenamain_anchor);
}

function nav_back() {
  history.back();
}

function hide_arenamain_anchor() {
  var arenamain_anchor_dom =
    document.getElementsByClassName("arenamain_anchor");

  if (!document.fullscreenElement) {
    arenamain_anchor_dom[anchor_curr_index].style.display = "none";
  }
}

function arenamain_portal_state() {
  var touchpoint_list = Array.prototype.slice.call(
    document.body.getElementsByClassName("touchpoint_element")
  );

  // axios
  //   .post(`${apiBaseUrl}/portal/navigation/open`, {
  //     ip: Cookies.get("ARENASESSID"),
  //     end_time: new Date().getTime() / 1000,
  //   })
  //   .then(function (response) {
  //     const { data } = response;
  //     console.log(data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  // console.log(this);
  // console.log(touchpoint_list.indexOf(this));

  var curr_index = touchpoint_list.indexOf(this);
  var touchpoint = arenamain_ins_dom[curr_index];

  var arenamain_anchor_dom =
    document.getElementsByClassName("arenamain_anchor");

  if (touchpoint.dataset.is_done_generate_iframe == "false") {
    create_and_append_arenamain(curr_index);

    touchpoint.dataset.anchor_index = arenamain_anchor_dom.length - 1;
    anchor_curr_index = touchpoint.dataset.anchor_index;

    touchpoint.dataset.is_done_generate_iframe = true;
  } else {
    anchor_curr_index = touchpoint.dataset.anchor_index;
    arenamain_anchor_dom[anchor_curr_index].style.display = "block";
  }

  arenamain_anchor_dom[anchor_curr_index].requestFullscreen();
}

for (i = 0; i < arenamain_ins_dom.length; ++i) {
  var touchpoint = arenamain_ins_dom[i];
  var touchpoint_element;
  var parent_element = touchpoint.parentElement;

  touchpoint.dataset.is_done_generate_iframe = false;
  touchpoint.dataset.anchor_index = 0;

  switch (touchpoint.dataset.type) {
    case "banner":
      var touchpoint_width = "100%";
      var touchpoint_height = "auto";

      if (touchpoint.dataset.width) touchpoint_width = touchpoint.dataset.width;
      if (touchpoint.dataset.height)
        touchpoint_height = touchpoint.dataset.height;

      touchpoint_element = document.createElement("img");
      touchpoint_element.className = "touchpoint_element";
      touchpoint_element.src = touchpoint.dataset.src;
      touchpoint_element.style.cursor = "pointer";
      touchpoint_element.style.width = touchpoint_width;
      touchpoint_element.style.height = touchpoint_height;
      touchpoint_element.onclick = arenamain_portal_state;

      parent_element.appendChild(touchpoint_element);

      break;

    case "icon":
      var touchpoint_width = "100%";
      var touchpoint_height = "auto";

      if (touchpoint.dataset.width) touchpoint_width = touchpoint.dataset.width;
      if (touchpoint.dataset.height)
        touchpoint_height = touchpoint.dataset.height;

      touchpoint_element = document.createElement("img");
      touchpoint_element.className = "touchpoint_element";
      touchpoint_element.src = touchpoint.dataset.src;
      touchpoint_element.style.cursor = "pointer";
      touchpoint_element.style.width = touchpoint_width;
      touchpoint_element.style.height = touchpoint_height;
      touchpoint_element.onclick = arenamain_portal_state;

      parent_element.appendChild(touchpoint_element);

      break;

    case "button":
      var touchpoint_width = "100%";
      var touchpoint_height = "auto";

      if (touchpoint.dataset.width) touchpoint_width = touchpoint.dataset.width;
      if (touchpoint.dataset.height)
        touchpoint_height = touchpoint.dataset.height;

      touchpoint_element = document.createElement("a");
      touchpoint_element.className = "touchpoint_element";
      touchpoint_element.innerHTML = touchpoint.dataset.text ?? "Ayo Main";
      touchpoint_element.onclick = arenamain_portal_state;

      let btn_color = touchpoint.dataset.button_color ?? "#28264e";
      var text_color = touchpoint.dataset.text_color ?? "#fff";

      var btn_style = document.createElement("style");
      btn_style.innerHTML = `
        .arenamain-btn {
          background-color: ${btn_color};
          border: none;
          border-radius: 5px;
          color: ${text_color};
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
        }
      `;
      document.head.appendChild(btn_style);
      touchpoint_element.classList.add("arenamain-btn");

      parent_element.appendChild(touchpoint_element);

      break;

    case "text":
      touchpoint_element = document.createElement("a");
      touchpoint_element.className = "touchpoint_element";
      touchpoint_element.innerHTML = touchpoint.dataset.text ?? "Ayo Main";
      touchpoint_element.style.cursor = "pointer";
      touchpoint_element.onclick = arenamain_portal_state;
      touchpoint_element.style.color = touchpoint.dataset.text_color ?? "#fff";

      parent_element.appendChild(touchpoint_element);

      break;
  } // switch case
} // for

document.documentElement.addEventListener(
  "fullscreenchange",
  hide_arenamain_anchor
);
