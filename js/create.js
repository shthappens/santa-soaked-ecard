function load_ready() {
  select_bg = document.getElementById("select_bg");
  pattern = select_constructor("pattern", patterns_list);
  select_bg.innerHTML = pattern;

  select_ic = document.getElementById("select_ic");
  icon = select_constructor("icon", icons_list);
  select_ic.innerHTML = icon;
}

function select_constructor(name, list) {
  menu_name = name + "_menu";
  initial = name.replace(/^(.).*/, "$1");
  action = "show_preview();";
  if (name == "icon") { action = "load_image('icon'); show_preview();" }
  drop_down = '<select name="' + menu_name + '" id="' + menu_name + '" accesskey="' + initial + '" onchange="' + action + '">\n';

  drop_down += '  <option value="Select Card">Select Card</option>\n';

  for (i = 1; i < list.length; i++) {
    p = list[i];
    drop_down += '  <option value="' + p + '">' + p + '</option>\n';
  }
  drop_down += '</select>';
  return  drop_down;
}

function load_image(u) {
  img = document.getElementById("card_image");
  url = document.getElementById("image_url").value;
  if (u == "icon") { url = load_icon() }
  img.src = url;
}

function load_text() {
  message = document.getElementById("message");
  message_preview = document.getElementById("message_preview");
  message_preview.innerHTML = message.value;
}

function load_pattern() {
  pattern_menu = document.getElementById("pattern_menu");
  card = document.getElementById("card_container");
  bg = "https://raw.githubusercontent.com/mike-hearn/transparent-textures/master/patterns/" + pattern_menu.value + ".png";
  url = 'url("' + bg + '")';
  if (pattern_menu.value == "No Background Pattern") { url = "" }
  card.style.backgroundImage = url;
}

function load_icon() {
  icon_menu = document.getElementById("icon_menu");
  // ic = "https://dohliam.github.io/elegant-circles/svg/" + icon_menu.value + ".svg";
  ic = "https://shthappens.github.io/santa-soaked-ecard/images/" + icon_menu.value + ".jpeg";
  if (icon_menu.value == "Select Image") { ic = "" }
  document.getElementById("image_url").value = ic;
  return ic;
}

function load_bg_color() {
  card = document.getElementById("card_container");
  card.style.backgroundColor = "#005c99";
}

function show_preview() {
  load_image("url");
  load_text();
  load_pattern();

  i = document.getElementById("image_url");
  m = document.getElementById("message");
  c = document.getElementById("card_container");
  p = document.getElementById("pattern_menu");
  s = document.getElementById("sender");
  r = document.getElementById("recipient");

  ib64 = window.btoa(encodeURI(i.value));
  mb64 = window.btoa(encodeURI(m.value));
  sb64 = window.btoa(encodeURI(s.value));
  rb64 = window.btoa(encodeURI(r.value));
  bp64 = window.btoa(encodeURI(p.value));
  bc64 = window.btoa(encodeURI(c.style.backgroundColor));

  card_url = document.getElementById("card_url");
  current_loc = location.href.replace(/\/[^\/]+$/, "/");
  receive = current_loc + 'receive.html';
  query_string = '?i=' + ib64 + '&m=' + mb64 + '&bc=' + bc64 + '&bp=' + bp64 + '&rb=' + rb64 + '&sb=' + sb64;

  recipient = "";
  if (r.value) { recipient = " - Send this to " + r.value + "!" }
  card_url.innerHTML = '<a href="' + receive + query_string + '" target="_blank">Shareable link to your card</a>' + recipient;
}

function import_card() {
  base_url = location.href;
  url = window.import_url.value;
  code = url.replace(/^.*\/receive.html/, "/receive.html");
  target = base_url.replace(/\/$/, "") + code;
  window.location = target;
}

function toggle_preview() {
  preview = document.getElementById("preview_container");
  if (preview.style.display == "") {
    preview.style.display = "none";
  } else {
    preview.style.display = "";
  }
}

function shortenUrl() {
  const longUrl = document.getElementById('card_url').textContent;

  $.ajax({
    url: 'http://tinyurl.com/api-create.php?url=' + encodeURIComponent(longUrl),
    type: 'GET',
    success: function (shortUrl) {
      // Do something with the shortened URL, like displaying it on your page
      const shortenedUrlElement = document.getElementById("shortened_url");
      if (shortenedUrlElement) {
        shortenedUrlElement.textContent = shortUrl;
      }
    },
    error: function (error) {
      // Handle errors, e.g., if the API request fails
      console.error(error);
    }
  });
}


// icons_list = [ "Select Image", "art", "bike", "blimp", "bolt", "briefcase", "brightness", "calendar", "chat", "cloud", "computer", "contacts", "crossroads", "cruise", "denied", "door", "filmreel", "flame", "flower", "globe", "heart", "hotair", "hourglass", "image", "key", "locked", "magicwand", "mail", "map", "megaphone", "mic", "music", "parachute", "phone", "rocket", "sailboat", "shoeprints", "spaceshuttle", "star", "sub", "submarine", "traffic", "travelerbag", "trophy", "tv", "ufo", "umbrella", "video", "water", "weather" ]

patterns_list=[]
icons_list = [ "Select Image", "1 Santa Soaked Gift Card", "2 Santa Soaked Gift Card", "3 Santa Soaked Gift Card", "4 Santa Soaked Gift Card" ]

