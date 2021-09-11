import Color from "https://cdn.skypack.dev/color@4.0.1";
// Create a new color picker instance
// https://iro.js.org/guide.html#getting-started

// Defaults to Discord dark mode background color
// Use #FFFFFF for light mode
const comparison = Color('#36393F');

const gradeContrast = contrast => {
  if (contrast >= 7) {
    return 'Excellent';
  } else if (contrast >= 4.5) {
    return 'Good';
  } else if (contrast >= 3) {
    return 'Fair';
  } else {
    return 'Poor';
  }
};

// Replace this with a Javascript object representing:
// role colors (color)
// and role names (title)
const roles = [{
  "color": "#FFFFFF",
  "title": "Test" }];


const colorPicker = new iro.ColorPicker(".colorPicker", {
  // color picker options
  // Option guide: https://iro.js.org/guide.html#color-picker-options
  width: 260,
  // Pure red, green and blue
  colors: roles.map(role => role.color),
  handleRadius: 9,
  borderWidth: 1,
  borderColor: "#fff" });


const colorList = document.getElementById("colorList");
const activeColor = document.getElementById("activeColor");

function setColor(colorIndex) {
  // setActiveColor expects the color index!
  colorPicker.setActiveColor(colorIndex);
}

// https://iro.js.org/guide.html#color-picker-events
colorPicker.on(["mount", "color:change"], function () {
  colorList.innerHTML = '';
  colorPicker.colors.forEach(color => {
    const index = color.index;
    const hexString = color.hexString;
    const contrast = Color(hexString).contrast(comparison);
    colorList.innerHTML += `
      <li onClick="setColor(${index})">
        <div class="swatch" style="background: ${hexString}"></div>
        <span>${roles[index].title}: ${hexString} - ${gradeContrast(contrast)} (${contrast.toFixed(2)})</span>
      </li>
    `;
  });
});

colorPicker.on(["mount", "color:setActive", "color:change"], function () {
  // colorPicker.color is always the active color
  const index = colorPicker.color.index;
  const hexString = colorPicker.color.hexString;
  const contrast = Color(hexString).contrast(comparison);
  activeColor.innerHTML = `
    <div class="swatch" style="background: ${hexString}"></div>
    <span>${roles[index].title}: ${hexString} - ${gradeContrast(contrast)} (${contrast.toFixed(2)})</span>
  `;
});