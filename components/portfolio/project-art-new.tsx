import s from "./project-art.module.css";

export function SchoolArt() {
  return (
    <svg viewBox="0 0 800 500" fill="none" className={s.svg}>
      <rect width="800" height="500" fill="#c9d5e9" />
      <path d="M0 80H800M0 420H800M80 0V500M720 0V500" stroke="#b4c3db" />
      <circle cx="700" cy="45" r="150" stroke="#b4c3db" />
      <circle cx="700" cy="45" r="115" stroke="#b4c3db" />
      <text x="32" y="36" className={s.label} fill="#4a6287">
        A SCHOOL DAY. BEAUTIFULLY CONNECTED.
      </text>
      <g className={s.dashboard}>
        <g transform="translate(82 89) rotate(-4 320 200)">
          <rect
            x="8"
            y="13"
            width="648"
            height="418"
            rx="15"
            fill="#40577f"
            opacity=".16"
          />
          <rect width="648" height="418" rx="15" fill="#f9fafc" />
          <path d="M15 0H139V418H15Q0 418 0 403V15Q0 0 15 0" fill="#203f64" />
          <path
            d="m18 31 13-7 13 7-13 7-13-7Zm5 4v10q8 6 16 0V35"
            stroke="#abcfef"
            strokeWidth="2"
          />
          <text x="49" y="35" fontSize="13" fill="#f5faff" fontWeight="600">
            schoolrepo
          </text>
          <text x="20" y="80" fill="#7e9eba" fontSize="8" letterSpacing="1.4">
            YOUR WORKSPACE
          </text>
          <rect x="13" y="97" width="112" height="31" rx="5" fill="#aacdea" />
          {[
            "Overview",
            "Students",
            "Attendance",
            "Fees & payments",
            "Academics",
            "Payroll",
          ].map((label, i) => (
            <g key={label}>
              <rect
                x="23"
                y={108 + i * 36}
                width="9"
                height="9"
                rx="2"
                stroke={i ? "#8faec8" : "#203f64"}
              />
              <text
                x="41"
                y={116 + i * 36}
                fontSize="8"
                fill={i ? "#b9cddd" : "#203f64"}
              >
                {label}
              </text>
            </g>
          ))}
          <text x="162" y="35" fill="#718398" fontSize="9">
            Workspace / School overview
          </text>
          <path d="M139 56H648" stroke="#e4e9ef" />
          <text
            x="164"
            y="89"
            fill="#253f5a"
            fontWeight="600"
            fontSize="24"
            letterSpacing="-.7"
          >
            More time for students.
          </text>
          <text x="165" y="110" fill="#8b99a8" fontSize="9">
            One connected workspace. A calmer school day.
          </text>
          {[
            {
              x: 163,
              fill: "#e1eff3",
              label: "ATTENDANCE",
              main: "Present & ready",
            },
            {
              x: 320,
              fill: "#eee9dc",
              label: "FEES",
              main: "Every detail, clear",
            },
            {
              x: 477,
              fill: "#e5e8f6",
              label: "ACADEMICS",
              main: "Room to grow",
            },
          ].map((card) => (
            <g key={card.label}>
              <rect
                x={card.x}
                y="132"
                width="144"
                height="81"
                rx="7"
                fill={card.fill}
              />
              <text
                x={card.x + 12}
                y="153"
                fill="#788498"
                fontSize="7"
                letterSpacing="1"
              >
                {card.label}
              </text>
              <text
                x={card.x + 12}
                y="178"
                fill="#334b69"
                fontSize="12"
                fontWeight="600"
              >
                {card.main}
              </text>
              <path
                d={`M${card.x + 12} 193h75`}
                stroke="#b4c3d2"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          ))}
          <rect
            x="163"
            y="230"
            width="288"
            height="163"
            rx="7"
            stroke="#e0e7ef"
          />
          <text x="177" y="255" fill="#344e6e" fontSize="11" fontWeight="600">
            Your school, in sync
          </text>
          {[
            "Student directory",
            "Academic calendar",
            "Report cards",
            "Staff & permissions",
          ].map((text, i) => (
            <g key={text}>
              <circle
                cx="182"
                cy={279 + i * 29}
                r="4"
                fill={i % 2 ? "#a0b4d3" : "#7bada4"}
              />
              <text x="195" y={282 + i * 29} fill="#70839a" fontSize="9">
                {text}
              </text>
              <path d={`m424 ${275 + i * 29} 5 5-5 5`} stroke="#9aacbf" />
            </g>
          ))}
          <rect
            x="466"
            y="230"
            width="155"
            height="163"
            rx="7"
            fill="#edf2f7"
          />
          <text x="480" y="255" fill="#3c5573" fontSize="10">
            A connected day
          </text>
          <path d="M482 290h124m-124 28h124m-124 28h124" stroke="#dce5ee" />
          <path
            className={s.chartLine}
            d="M482 355q18-20 31-13t30-29 24 0 36-44"
            stroke="#6a94ba"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      </g>
      <g className={s.notice}>
        <rect x="510" y="343" width="237" height="65" rx="10" fill="#203f64" />
        <circle cx="539" cy="376" r="14" fill="#365a80" />
        <path d="m532 376 5 5 9-10" stroke="#b8e3ba" strokeWidth="2" />
        <text x="563" y="373" fill="#f1f7ff" fontSize="11" fontWeight="600">
          Built for every desk.
        </text>
        <text x="563" y="390" fill="#9eb7d2" fontSize="8">
          Students first. Spreadsheets later.
        </text>
      </g>
      <text x="33" y="478" className={s.label} fill="#4a6287">
        SCHOOLREPO.COM · PRODUCT CONCEPT
      </text>
    </svg>
  );
}

export function HamuzairArt() {
  return (
    <svg viewBox="0 0 800 500" fill="none" className={s.svg}>
      <defs>
        <linearGradient
          id="tee-fabric"
          x1="250"
          y1="80"
          x2="580"
          y2="475"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fbf4e7" />
          <stop offset=".45" stopColor="#dbd0bc" />
          <stop offset=".7" stopColor="#f0e7d6" />
          <stop offset="1" stopColor="#b6a38b" />
        </linearGradient>
        <linearGradient id="tee-shadow" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#b3a189" />
          <stop offset=".25" stopColor="#e5dbc8" />
          <stop offset=".8" stopColor="#dfd3be" />
          <stop offset="1" stopColor="#a18d75" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="#df784e" />
      <circle cx="420" cy="268" r="227" stroke="#f4b395" />
      <circle cx="420" cy="268" r="182" stroke="#f4b395" opacity=".45" />
      <text x="32" y="36" className={s.label} fill="#65351f">
        HAMUZAIR / YOUR IDEAS. YOUR CANVAS.
      </text>
      <text
        x="26"
        y="420"
        fontSize="122"
        fontWeight="800"
        letterSpacing="-8"
        fill="#c2613e"
        transform="rotate(-90 26 420)"
      >
        PRESENCE
      </text>
      <g className={s.ticket}>
        <g transform="rotate(7 410 285)">
          <path
            d="m326 97-63 19-94 104 71 57 44-43-7 223q121 21 259 0l-9-223 47 43 70-58-94-103-65-19q-72 42-159 0"
            fill="#713d29"
            opacity=".18"
            transform="translate(14 14)"
          />
          <path
            d="m326 87-63 19-94 104 71 57 44-43-7 223q121 21 259 0l-9-223 47 43 70-58-94-103-65-19q-72 42-159 0"
            fill="url(#tee-fabric)"
          />
          <path
            d="M326 87q11 60 82 61 64 0 77-61l-16-4q-18 38-61 38-51 0-65-38Z"
            fill="#bdaf99"
          />
          <path
            d="M343 85q12 32 65 36 45-2 61-36"
            stroke="#a2937d"
            strokeWidth="2"
          />
          <path
            d="m284 224 14-78-7 271m236-193-16-78 12 271"
            stroke="#aa987d"
            opacity=".35"
            strokeWidth="2"
          />
          <path d="m282 432q119 21 249 0" stroke="#b3a28a" strokeWidth="1.5" />
          <path
            d="m178 207 64 50m333 0 61-51"
            stroke="#b6a48c"
            strokeWidth="2"
          />
          <circle cx="408" cy="275" r="67" fill="#274437" />
          <path
            d="M344 265q62-49 125 4m-127 4q61-39 130 6m-127 5q57-26 127 4m-122 8q60-19 115 4"
            stroke="#d4ff5f"
            strokeWidth="3"
          />
          <text
            x="355"
            y="317"
            fill="#f4eddc"
            fontSize="14"
            fontWeight="600"
            letterSpacing="1.4"
          >
            PRESENCE
          </text>
          <text x="365" y="365" fill="#4d5949" fontSize="7" letterSpacing="3">
            IMAGINED BY YOU.
          </text>
        </g>
      </g>
      <g className={s.aiNote}>
        <rect
          x="525"
          y="110"
          width="229"
          height="83"
          rx="10"
          fill="#f7efdf"
          transform="rotate(-6 640 150)"
        />
        <text x="549" y="140" fill="#987154" fontSize="8" letterSpacing="1.2">
          FROM A THOUGHT TO A THREAD
        </text>
        <text x="549" y="163" fill="#543c2b" fontSize="14" fontWeight="600">
          AI artwork. A 3D canvas.
        </text>
      </g>
      <g>
        <rect x="43" y="386" width="182" height="55" rx="28" fill="#2f4937" />
        <text
          x="64"
          y="419"
          fill="#f1ead9"
          fontSize="10"
          fontWeight="600"
          letterSpacing=".9"
        >
          CREATE YOUR OWN ↗
        </text>
      </g>
      <text x="33" y="478" className={s.label} fill="#65351f">
        HAMUZAIR.COM · PRODUCT CONCEPT
      </text>
    </svg>
  );
}
