# Application Template

## Description
This project serves as a template for creating modern and responsive Angular applications. It includes essential components such as a navigation bar (navbar), sidebar, and footer, each of which is dynamically configurable through a centralized JSON configuration file. The template is designed to be scalable, responsive, and easy to customize for various projects.

---

## Features

1. **Dynamic Navbar**
   - Links are dynamically generated from the `config.json` file.
   - Sticky and transparent options are configurable.
   - Highlights the active page based on the current route.

2. **Sidebar**
   - Dynamically updates its content based on the active route.
   - Links are fetched from the JSON configuration.
   - Supports nested routing and enables easy customization.

3. **Footer**
   - Fully customizable via the configuration file.
   - Sticky and transparent options.
   - Default design credits displayed.

4. **Routing**
   - Implements Angular Router for seamless navigation.
   - Includes routes for `Home`, `About Us`, `Services`, and `Contact` pages.
   - Wildcard routing redirects unknown paths to the home page.

5. **Responsive Design**
   - Fully optimized for desktop and mobile devices.
   - Navigation bar and sidebar adapt to smaller screen sizes.

6. **Configuration-Driven**
   - Centralized configuration in `assets/config.json`.
   - Easily add, remove, or modify components without altering code.

---

## How to Use

1. **Navbar:**
   - Add or remove links in the `navbar.links` array in `config.json`.
   - Adjust `sticky` and `transparent` options for behavior.

2. **Sidebar:**
   - Add route-specific links under `sidebar.links` in `config.json`.
   - Set `enabled` to `true` or `false` to toggle visibility.

3. **Footer:**
   - Modify the footer text or enable/disable stickiness and transparency.

---

## Technologies Used

- Angular 19
- TypeScript
- HTML5 & CSS3
- RxJS Signals
- JSON 

---

## Author
Designed and developed by **Gengiu Robert-Constantin**.

