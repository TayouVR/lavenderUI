# LavenderUI
UI for the VR game lavender https://lavendervr.com/

to install the UI download the latest zip from the [release](https://github.com/SupraLP/lavenderUI/releases "release") section and drag the BrowserAssets folder into the game directory.

---
to change color schemes change the import in the header of Panorama.html.
possible choices are:
- colors-dark.css
- colors-default.css //kind of deprecated, original looks more like dark by now.
- colors-lavender.css
- colors-light.css

you can also make your own color schemes by copying one of those files and modifying it.

---
you can change border roundings by changing the file import "borders-round" in Panorama.html,
or by defining:
```
--border-radius-outside: #px;
--border-radius-medium: #px;
--border-radius-inside: #px;
```
in Common.css

the border width is defined directly in Common.css.
```
--border-width: #px;
```

# Screenshots
![screenshot](https://github.com/SupraLP/lavenderUI/blob/master/pictures/colors_lavender.jpg)
![screenshot](https://github.com/SupraLP/lavenderUI/blob/master/pictures/colors_dark.jpg)
![screenshot](https://github.com/SupraLP/lavenderUI/blob/master/pictures/colors_default.jpg)
![screenshot](https://github.com/SupraLP/lavenderUI/blob/master/pictures/colors_light.jpg)
