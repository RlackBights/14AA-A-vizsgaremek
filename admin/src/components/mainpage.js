import "../App.css";
import { Login } from "./login";
export function MainPage() {
  return (
    <div id="mainpage">
      <div className="navbar">
        <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="16.09000015258789 11 869.5800170898438 962"><path opacity=".5" fill="#8DD7F7" d="M156.35 795.22l431.8-245.36-115.56-70.71-310.15 183.82-6.09-3.47z"></path><path fill="#1C80A9" d="M156.35 337.76v469.38L16.47 736.46V261.41z"></path><path fill="#196CAC" d="M447.92 831.02L145.93 674.94 26.99 738.85l424.9 232.43 2.07-1.2z"></path><path opacity=".5" fill="#8DD7F7" d="M885.67 237.26L440.01 11 323.69 81.76l428.85 233.8 3.03-1.97z"></path><path opacity=".5" fill="#8DD7F7" d="M451 17.66c-2.22-1.53-6.56-3.87-8.67-5.47-.02-.03-1.15-.98 2.11.75.09.05-4.34-.99-4.43-1.03L320.09 85.65l-3.33 489.62 139.88-79.71V20.62c-1.99-.82-3.94-1.79-5.64-2.96z"></path><path fill="#26A9E0" d="M448.76 498.48l436.91-260.09-131.02-66.16-299.72 186.94-6.17-3.63z"></path><path opacity=".5" fill="#8DD7F7" d="M158.76 321.04L568.57 76.75 441.18 11.2 144.96 190.38l-12 6.29 6 113.65c8.12 1.87 14.71 5.67 19.8 10.72zM885.67 727.42V238.4l-136.56 81.27-3.33 487.47z"></path><path opacity=".5" fill="#8DD7F7" d="M453.86 971.94l431.81-245.39-119.62-70.3-306.09 183.41-6.1-3.44z"></path><path opacity=".5" fill="#8DD7F7" d="M771.7 791.31l113.97-63.88L475.63 483.5 352.8 540.05l406.68 258.22c4.21-3.81 6.19-5.13 12.22-6.96z"></path><path opacity=".5" fill="#8DD7F7" d="M593.74 894.48V411.79l-136.54 81.7L453.86 973z"></path><path fill="#26A9E0" d="M448.67 354.51L137.21 194.27 16.09 262.41 453.6 501.98l3.04-1.95z"></path><path fill="#249BCD" d="M456.27 493.41l.37 477.87-139.88-73.13V425.54z"></path></svg>
        <ul className="navbar-items">
          <li id="navbar-admin" style={{display:"none"}}>
            <p>Admin page</p>
          </li>
          <li>
            <button id="download">Download</button>
          </li>
        </ul>
      </div>
      <div id="main-content">
        <div id="about-us">
            <h1>About LearnTheBasics</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <button id="download">Download Our Game Now!</button>
        </div>
        <div id="login">
            <Login/>
        </div>
      </div>
    </div>
  );
}
