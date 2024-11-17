import { ModeToggle } from "./mode-toggle";

const Logo = () => {
  const stWidth = 2.0;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      className="w-8 h-8 mr-auto text-primary"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={stWidth}
        d="M9.5 5.5h29c2.216 0 4 1.784 4 4v29c0 2.216-1.784 4-4 4h-29c-2.216 0-4-1.784-4-4v-29c0-2.216 1.784-4 4-4"
      />

      <g transform="translate(3,3)">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={stWidth}
          d="M12.017 28.247C12.998 29.524 14.228 30 15.94 30h2.369a3.99 3.99 0 0 0 3.991-3.991v-.018A3.99 3.99 0 0 0 18.31 22h-2.613a3.996 3.996 0 0 1-3.996-3.996h0A4.004 4.004 0 0 1 15.704 14h2.356c1.712 0 2.942.476 3.923 1.753"
        />

        <path
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth={stWidth}
          d="M26.75 16.05v11.9a2 2 0 0 0 2 2h.6m-4.7-10.6h4.2"
        />
      </g>
    </svg>
  );
};

export function Navbar() {
  return (
    <nav className="py-4 px-6 w-full flex items-center bg-background top-0 sticky z-50">
      <Logo />
      <ModeToggle />
    </nav>
  );
}
