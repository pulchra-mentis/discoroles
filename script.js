import ColorComparator from "https://cdn.skypack.dev/color@4.0.1";
// Create a new color picker instance
// https://iro.js.org/guide.html#getting-started

// Defaults to Discord dark mode background color
// Use #FFFFFF for light mode
const comparison = ColorComparator('#36393F');

const gradeContrast = (contrast) => {
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
let roles = [
  {
    "color": "#992D22",
    "title": "Test"
  }
];

const colorPicker = new iro.ColorPicker(".colorPicker", {
  // color picker options
  // Option guide: https://iro.js.org/guide.html#color-picker-options
  width: 260,
  colors: roles.map(role => role.color),
  handleRadius: 9,
  borderWidth: 1,
  borderColor: "#fff" });


const colorList = document.getElementById("colorList");
const activeColor = document.getElementById("activeColor");

const setColor = (colorIndex) => {
  // setActiveColor expects the color index!
  colorPicker.setActiveColor(colorIndex);
};

window.setColor = setColor;

// https://iro.js.org/guide.html#color-picker-events
colorPicker.on(["mount", "color:change"], function () {
  colorList.innerHTML = '';
  colorPicker.colors.forEach(color => {
    const index = color.index;
    const hexString = color.hexString;
    const contrast = ColorComparator(hexString).contrast(comparison);
    colorList.innerHTML += `
      <li onClick="setColor(${index})">
        <div class="colorEntry">
          <div class="swatch" style="background: ${hexString}"></div>
          <span>${roles[index].title}: ${hexString} - ${gradeContrast(contrast)} (${contrast.toFixed(2)})</span>
        </div>
      </li>
    `;
  });
});

colorPicker.on(["mount", "color:setActive", "color:change"], function () {
  // colorPicker.color is always the active color
  const index = colorPicker.color.index;
  const hexString = colorPicker.color.hexString;
  const contrast = ColorComparator(hexString).contrast(comparison);
  activeColor.innerHTML = `
    <div class="swatch" style="background: ${hexString}"></div>
    <span>${roles[index].title}: ${hexString} - ${gradeContrast(contrast)} (${contrast.toFixed(2)})</span>
  `;
});

const setRoles = () => {
  roles = JSON.parse(document.getElementById('stringified-json').value);
  console.log(roles);
  colorPicker.setColors(roles.map(role => role.color));
  
  const index = colorPicker.color.index;
  const hexString = colorPicker.color.hexString;
  const contrast = ColorComparator(hexString).contrast(comparison);
  activeColor.innerHTML = `
    <div class="swatch" style="background: ${hexString}"></div>
    <span>${roles[index].title}: ${hexString} - ${gradeContrast(contrast)} (${contrast.toFixed(2)})</span>
  `;

  colorList.innerHTML = '';
  colorPicker.colors.forEach(color => {
    const index = color.index;
    const hexString = color.hexString;
    const contrast = ColorComparator(hexString).contrast(comparison);
    colorList.innerHTML += `
      <li onClick="setColor(${index})">
        <div class="colorEntry">
          <div class="swatch" style="background: ${hexString}"></div>
          <span>${roles[index].title}: ${hexString} - ${gradeContrast(contrast)} (${contrast.toFixed(2)})</span>
        </div>
      </li>
    `;
  });
};

window.setRoles = setRoles;

const downloadRoles = () => {
  const a = document.createElement('a');
  a.href = URL.createObjectURL( new Blob([JSON.stringify(roles, undefined, 2)], {type: 'text/json'}) );
  a.download = 'roles.json';
  a.click();
  a.hidden = true;
};

window.downloadRoles = downloadRoles;
