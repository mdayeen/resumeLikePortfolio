import styles from "./project-art.module.css";
import { SchoolArt, HamuzairArt } from "./project-art-new";

type ProjectKind = "rotana" | "travel" | "resume" | "school" | "hamuzair";

function RotanaArt() {
  return (
    <svg viewBox="0 0 800 500" fill="none" className={styles.svg}>
      <rect width="800" height="500" fill="#b9d8c5" />
      <circle cx="665" cy="58" r="214" stroke="#90b99f" strokeWidth="1" />
      <circle cx="665" cy="58" r="170" stroke="#90b99f" strokeWidth="1" />
      <path d="M0 408H800M63 0V500" stroke="#90b99f" strokeWidth="1" />
      <text x="33" y="37" fill="#365a46" className={styles.label}>
        OPERATIONS, IN SYNC.
      </text>
      <g className={styles.dashboard}>
        <g transform="translate(94 91) rotate(-5 328 210)">
          <rect
            x="8"
            y="17"
            width="662"
            height="422"
            rx="13"
            fill="#547762"
            opacity=".12"
          />
          <rect width="662" height="422" rx="13" fill="#f8faf7" />
          <path
            d="M13 0H132V422H13C5.8 422 0 416.2 0 409V13C0 5.8 5.8 0 13 0Z"
            fill="#1c3328"
          />
          <path
            d="M22 24L31 19L40 24V35L31 40L22 35V24Z"
            stroke="#c7efae"
            strokeWidth="1.7"
          />
          <path
            d="M22 24L31 29L40 24M31 29V40"
            stroke="#c7efae"
            strokeWidth="1.3"
          />
          <text
            x="48"
            y="34"
            fill="#f6f9ef"
            fontSize="18"
            fontWeight="600"
            letterSpacing="-.6"
          >
            rotana
          </text>
          <text x="22" y="73" fill="#a7b8a7" fontSize="7" letterSpacing="1.5">
            WORKSPACE
          </text>
          <rect x="13" y="88" width="105" height="30" rx="5" fill="#d4eea1" />
          <path
            d="M24 100H28V104H24V100ZM32 100H36V104H32V100ZM24 108H28V112H24V108ZM32 108H36V112H32V108Z"
            fill="#1c3328"
            transform="translate(0 -3)"
          />
          <text x="45" y="107" fill="#1c3328" fontSize="9" fontWeight="600">
            Overview
          </text>
          <g fill="#b8c9bc" fontSize="9">
            <text x="45" y="140">
              Inventory
            </text>
            <text x="45" y="174">
              Orders
            </text>
            <text x="45" y="208">
              Franchises
            </text>
            <text x="45" y="242">
              Suppliers
            </text>
          </g>
          <g stroke="#9eb3a4" strokeWidth="1.2">
            <path d="M24 132H36V142H24ZM24 132L30 129L36 132M30 132V142" />
            <path d="M25 164H35V177H25ZM28 167H32M28 170H32M28 173H31" />
            <path d="M24 201L30 196L36 201V210H24ZM28 205H32V210" />
            <circle cx="30" cy="235" r="3" />
            <path d="M24 244C24 237 36 237 36 244" />
          </g>
          <circle cx="28" cy="392" r="11" fill="#42604c" />
          <text x="22" y="395" fill="#d8e8d1" fontSize="7">
            MA
          </text>
          <text x="46" y="391" fill="#e2eddf" fontSize="8">
            My workspace
          </text>
          <text x="46" y="402" fill="#9aaf9e" fontSize="6">
            Administrator
          </text>
          <path d="M132 55H662" stroke="#e5e9e1" />
          <text x="153" y="33" fill="#465249" fontSize="10">
            Workspace / Overview
          </text>
          <rect x="540" y="17" width="94" height="23" rx="4" fill="#eff3eb" />
          <circle cx="553" cy="28" r="2.5" fill="#709657" />
          <text x="561" y="31" fill="#527041" fontSize="7">
            All systems connected
          </text>
          <text
            x="155"
            y="89"
            fill="#25392c"
            fontSize="21"
            fontWeight="600"
            letterSpacing="-.5"
          >
            A little more clarity.
          </text>
          <text x="155" y="108" fill="#8a9388" fontSize="8">
            Your inventory, orders, and outlets. All in one place.
          </text>
          <rect x="569" y="74" width="64" height="25" rx="4" fill="#203d2b" />
          <text x="578" y="90" fill="#fff" fontSize="7">
            + New order
          </text>
          <g>
            <rect
              x="154"
              y="126"
              width="147"
              height="79"
              rx="6"
              fill="#e9f0df"
            />
            <text x="166" y="145" fill="#677b58" fontSize="8">
              INVENTORY
            </text>
            <text x="166" y="175" fill="#2a482e" fontSize="22" fontWeight="500">
              In stock
            </text>
            <text x="166" y="191" fill="#708462" fontSize="7">
              Everything where it belongs
            </text>
            <rect
              x="312"
              y="126"
              width="153"
              height="79"
              rx="6"
              fill="#f0eee7"
            />
            <text x="324" y="145" fill="#8c826d" fontSize="8">
              FULFILLMENT
            </text>
            <text x="324" y="175" fill="#554c37" fontSize="22" fontWeight="500">
              On the move
            </text>
            <text x="324" y="191" fill="#8e846e" fontSize="7">
              Warehouse to storefront
            </text>
            <rect
              x="476"
              y="126"
              width="158"
              height="79"
              rx="6"
              fill="#e7efec"
            />
            <text x="488" y="145" fill="#6a8379" fontSize="8">
              YOUR NETWORK
            </text>
            <text x="488" y="175" fill="#335849" fontSize="22" fontWeight="500">
              Connected
            </text>
            <text x="488" y="191" fill="#70877a" fontSize="7">
              One source of truth
            </text>
          </g>
          <rect
            x="154"
            y="221"
            width="301"
            height="177"
            rx="6"
            stroke="#e1e7dc"
          />
          <text x="168" y="242" fill="#304a37" fontSize="10" fontWeight="600">
            Stock movement
          </text>
          <text x="397" y="242" fill="#8a9485" fontSize="7">
            This week ↗
          </text>
          <path
            d="M168 278H440M168 310H440M168 342H440M168 374H440"
            stroke="#edf0e8"
          />
          <path
            d="M170 353C195 353 193 322 216 322S244 337 270 310S293 327 315 298S345 300 366 281S408 287 438 262V375H170Z"
            fill="#e2eecf"
          />
          <path
            className={styles.chartLine}
            d="M170 353C195 353 193 322 216 322S244 337 270 310S293 327 315 298S345 300 366 281S408 287 438 262"
            stroke="#799747"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <g fill="#8f998a" fontSize="6">
            <text x="169" y="388">
              MON
            </text>
            <text x="252" y="388">
              WED
            </text>
            <text x="342" y="388">
              FRI
            </text>
            <text x="425" y="388">
              SUN
            </text>
          </g>
          <rect
            x="468"
            y="221"
            width="166"
            height="177"
            rx="6"
            stroke="#e1e7dc"
          />
          <text x="482" y="242" fill="#304a37" fontSize="10" fontWeight="600">
            Recent orders
          </text>
          {[0, 1, 2, 3].map((row) => (
            <g key={row} transform={`translate(0 ${row * 34})`}>
              <rect
                x="482"
                y="257"
                width="23"
                height="23"
                rx="5"
                fill={row % 2 ? "#eee9dd" : "#e6eddd"}
              />
              <path
                d="M489 264L494 261L499 264V271L494 274L489 271V264Z"
                stroke="#7a8e6b"
                strokeWidth=".8"
              />
              <text x="514" y="265" fill="#4a5d49" fontSize="7">
                Franchise {String(row + 1).padStart(2, "0")}
              </text>
              <text x="514" y="276" fill="#9aa290" fontSize="6">
                Inventory transfer
              </text>
              <circle
                cx="619"
                cy="268"
                r="3"
                fill={row === 2 ? "#d5b168" : "#8eac72"}
              />
            </g>
          ))}
        </g>
      </g>
      <g className={styles.notice}>
        <rect x="28" y="344" width="187" height="53" rx="9" fill="#fffef7" />
        <circle cx="55" cy="370" r="12" fill="#d6edb7" />
        <path
          d="M50 370L54 374L61 366"
          stroke="#4b6a37"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="76" y="367" fill="#354a2e" fontSize="10" fontWeight="600">
          Everything in its place.
        </text>
        <text x="76" y="382" fill="#85927c" fontSize="7">
          Built for the bigger picture.
        </text>
      </g>
      <text x="33" y="477" fill="#365a46" className={styles.label}>
        PRODUCT CONCEPT — ROTANA
      </text>
    </svg>
  );
}

function TravelArt() {
  return (
    <svg viewBox="0 0 800 500" fill="none" className={styles.svg}>
      <rect width="800" height="500" fill="#d5e5eb" />
      <path
        d="M-50 319C148 275 204 88 443 92S673 268 864 189"
        stroke="#f6fbfc"
        strokeWidth="75"
        opacity=".35"
      />
      <path
        d="M-50 390C146 342 239 175 457 178S654 336 850 278"
        stroke="#f6fbfc"
        strokeWidth="32"
        opacity=".24"
      />
      <text x="33" y="37" fill="#46616b" className={styles.label}>
        MADE FOR SOMEWHERE NEW.
      </text>
      <g transform="translate(650 104)">
        <circle r="87" fill="#ed7547" />
        <g stroke="#fbb593" opacity=".65">
          <circle r="67" />
          <ellipse rx="35" ry="87" />
          <ellipse rx="65" ry="87" />
          <path d="M-87 0H87M-81-31H81M-81 31H81M-58-64H58M-58 64H58M0-87V87" />
        </g>
      </g>
      <g className={styles.ticket}>
        <g transform="translate(89 136) rotate(-8 320 135)">
          <rect
            x="7"
            y="13"
            width="640"
            height="279"
            rx="11"
            fill="#6b8490"
            opacity=".14"
          />
          <rect width="640" height="279" rx="11" fill="#fffaf0" />
          <path
            d="M11 0H629C635 0 640 5 640 11V58H0V11C0 5 5 0 11 0Z"
            fill="#f77943"
          />
          <path
            d="M23 31L31 17L39 31H23ZM27 36H44"
            stroke="#fff8e8"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <text
            x="52"
            y="35"
            fill="#fff8e8"
            fontSize="18"
            letterSpacing="-.8"
            fontWeight="600"
          >
            al-fahads
          </text>
          <text x="482" y="33" fill="#fff8e8" fontSize="8" letterSpacing="1.7">
            YOUR NEXT CHAPTER
          </text>
          <path d="M464 64V271" stroke="#d4c7b2" strokeDasharray="4 5" />
          <circle cx="464" cy="58" r="9" fill="#d5e5eb" />
          <circle cx="464" cy="279" r="9" fill="#d5e5eb" />
          <text x="27" y="93" fill="#9c9687" fontSize="8" letterSpacing="2">
            A JOURNEY WORTH TAKING
          </text>
          <text
            x="25"
            y="149"
            fill="#3d433d"
            fontSize="50"
            letterSpacing="-2"
            fontWeight="500"
          >
            HYD
          </text>
          <text
            x="313"
            y="149"
            fill="#3d433d"
            fontSize="50"
            letterSpacing="-2"
            fontWeight="500"
          >
            DXB
          </text>
          <text x="28" y="169" fill="#989787" fontSize="9">
            Hyderabad, India
          </text>
          <text x="316" y="169" fill="#989787" fontSize="9">
            Dubai, UAE
          </text>
          <path d="M149 131H298" stroke="#d7cfc0" strokeDasharray="3 4" />
          <g className={styles.plane}>
            <path
              d="M215 120L231 129L241 129L244 133L230 134L215 143L210 143L219 134L208 134L204 138H201L204 131L201 125H204L208 129H219L210 120H215Z"
              fill="#ed7547"
            />
          </g>
          <path d="M28 191H435" stroke="#e8dfcf" />
          <g fill="#a59b89" fontSize="7" letterSpacing="1">
            <text x="28" y="215">
              EXPERIENCE
            </text>
            <text x="177" y="215">
              THE PLAN
            </text>
            <text x="327" y="215">
              YOUR WAY
            </text>
          </g>
          <g fill="#53574b" fontSize="11" fontWeight="500">
            <text x="28" y="235">
              A fresh perspective
            </text>
            <text x="177" y="235">
              Leave it to us
            </text>
            <text x="327" y="235">
              Make it personal
            </text>
          </g>
          <text x="492" y="92" fill="#9d9686" fontSize="7" letterSpacing="1.4">
            GOOD THINGS AHEAD
          </text>
          <text
            x="491"
            y="132"
            fill="#4a4e42"
            fontSize="24"
            fontFamily="Georgia, serif"
            fontStyle="italic"
          >
            Go a little
          </text>
          <text
            x="491"
            y="161"
            fill="#4a4e42"
            fontSize="24"
            fontFamily="Georgia, serif"
            fontStyle="italic"
          >
            further.
          </text>
          <g fill="#5d6151">
            {[
              0, 5, 9, 15, 18, 24, 31, 35, 41, 48, 51, 57, 63, 67, 74, 80, 86,
              90, 96, 102, 107, 113,
            ].map((x, index) => (
              <rect
                key={x}
                x={492 + x}
                y="190"
                width={index % 3 === 0 ? 3 : 1.5}
                height="37"
              />
            ))}
          </g>
          <text x="492" y="244" fill="#a59b89" fontSize="6" letterSpacing="2">
            EXPLORE · DISCOVER · REPEAT
          </text>
        </g>
      </g>
      <g className={styles.travelStamp}>
        <circle cx="659" cy="378" r="54" fill="#f77943" />
        <circle cx="659" cy="378" r="46" stroke="#ffbf91" strokeWidth="1" />
        <text
          x="624"
          y="365"
          fill="#fff5dc"
          fontSize="8"
          letterSpacing="1.6"
          transform="rotate(12 659 378)"
        >
          LESS PLANNING
        </text>
        <text
          x="632"
          y="384"
          fill="#fff5dc"
          fontSize="20"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          transform="rotate(12 659 378)"
        >
          more life.
        </text>
        <path
          d="M639 397H676"
          stroke="#ffbf91"
          transform="rotate(12 659 378)"
        />
      </g>
      <text x="33" y="477" fill="#46616b" className={styles.label}>
        PRODUCT CONCEPT — AL-FAHADS
      </text>
      <path
        d="M56 103L62 87L67 103L83 108L67 113L62 129L56 113L40 108L56 103Z"
        stroke="#9bb9c6"
      />
    </svg>
  );
}

function ResumeArt() {
  return (
    <svg viewBox="0 0 800 500" fill="none" className={styles.svg}>
      <rect width="800" height="500" fill="#d6cdf0" />
      <g stroke="#b7a7db" opacity=".4">
        <path d="M0 100H800M0 200H800M0 300H800M0 400H800M100 0V500M200 0V500M300 0V500M400 0V500M500 0V500M600 0V500M700 0V500" />
      </g>
      <text x="33" y="37" fill="#655184" className={styles.label}>
        YOUR STORY. BETTER TOLD.
      </text>
      <g className={styles.editor}>
        <g transform="translate(109 88) rotate(5 290 190)">
          <rect
            x="8"
            y="15"
            width="583"
            height="367"
            rx="12"
            fill="#715d99"
            opacity=".14"
          />
          <rect width="583" height="367" rx="12" fill="#faf8ff" />
          <path
            d="M12 0H571C577.6 0 583 5.4 583 12V45H0V12C0 5.4 5.4 0 12 0Z"
            fill="#fff"
          />
          <circle cx="17" cy="23" r="3" fill="#e7dcf5" />
          <circle cx="29" cy="23" r="3" fill="#e7dcf5" />
          <circle cx="41" cy="23" r="3" fill="#e7dcf5" />
          <text x="216" y="26" fill="#7f6e9e" fontSize="8">
            resume.studio / your next move
          </text>
          <rect x="505" y="13" width="62" height="20" rx="5" fill="#7c5da6" />
          <text x="516" y="26" fill="#fff" fontSize="7">
            Export PDF ↗
          </text>
          <path d="M0 45H583" stroke="#efebf6" />
          <path d="M0 45H183V367H12C5.4 367 0 361.6 0 355V45Z" fill="#f2edf9" />
          <text
            x="20"
            y="78"
            fill="#54416f"
            fontSize="13"
            fontWeight="600"
            letterSpacing="-.4"
          >
            Make your next move.
          </text>
          <text x="20" y="95" fill="#a193b3" fontSize="7">
            A little help telling your story.
          </text>
          <g fill="#89779f" fontSize="7" letterSpacing=".8">
            <text x="20" y="126">
              YOUR DETAILS
            </text>
            <text x="20" y="190">
              EXPERIENCE
            </text>
            <text x="20" y="289">
              STYLE
            </text>
          </g>
          <rect
            x="19"
            y="137"
            width="143"
            height="30"
            rx="5"
            fill="#fff"
            stroke="#e6ddef"
          />
          <text x="29" y="155" fill="#81708f" fontSize="8">
            Your name goes here
          </text>
          <rect
            x="19"
            y="201"
            width="143"
            height="62"
            rx="5"
            fill="#fff"
            stroke="#e6ddef"
          />
          <text x="29" y="219" fill="#aa9db7" fontSize="7">
            What have you been working on?
          </text>
          <path
            d="M29 231H137M29 240H125M29 249H81"
            stroke="#ede7f3"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="29" cy="310" r="8" fill="#7d60a5" />
          <circle cx="55" cy="310" r="8" fill="#648370" />
          <circle cx="81" cy="310" r="8" fill="#be856d" />
          <circle cx="107" cy="310" r="8" fill="#626575" />
          <path
            d="M25 310L28 313L33 307"
            stroke="#fff"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <text x="20" y="348" fill="#b4a6c4" fontSize="6">
            BUILT AROUND YOUR POTENTIAL
          </text>
          <rect
            x="232"
            y="75"
            width="271"
            height="329"
            rx="2"
            fill="#b1a1c9"
            opacity=".13"
          />
          <rect x="224" y="69" width="271" height="329" rx="2" fill="#fff" />
          <text
            x="248"
            y="108"
            fill="#554069"
            fontSize="23"
            fontWeight="500"
            letterSpacing="-.7"
          >
            Hello, future.
          </text>
          <text x="249" y="125" fill="#a693b4" fontSize="7" letterSpacing="1.5">
            YOUR NAME / YOUR NEXT CHAPTER
          </text>
          <path d="M248 139H471" stroke="#d8cde3" />
          <text
            x="249"
            y="162"
            fill="#726181"
            fontSize="7"
            fontWeight="600"
            letterSpacing="1.5"
          >
            A LITTLE ABOUT ME
          </text>
          <path
            d="M249 175H469M249 182H459M249 189H429"
            stroke="#eae5ed"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text
            x="249"
            y="216"
            fill="#726181"
            fontSize="7"
            fontWeight="600"
            letterSpacing="1.5"
          >
            EXPERIENCE THAT MATTERS
          </text>
          <circle cx="252" cy="235" r="3" fill="#c5b0d6" />
          <path d="M252 242V276" stroke="#e7ddee" />
          <rect x="264" y="231" width="97" height="5" rx="2.5" fill="#b4a0c7" />
          <path
            d="M264 247H466M264 255H456M264 263H419"
            stroke="#eae5ed"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="252" cy="285" r="3" fill="#c5b0d6" />
          <rect x="264" y="281" width="82" height="5" rx="2.5" fill="#b4a0c7" />
          <path
            d="M264 297H466M264 305H431"
            stroke="#eae5ed"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text
            x="249"
            y="334"
            fill="#726181"
            fontSize="7"
            fontWeight="600"
            letterSpacing="1.5"
          >
            THINGS I BRING TO THE TABLE
          </text>
          <g fill="#efe8f5">
            <rect x="248" y="345" width="66" height="15" rx="3" />
            <rect x="320" y="345" width="59" height="15" rx="3" />
            <rect x="385" y="345" width="67" height="15" rx="3" />
          </g>
          <g fill="#967ca9" fontSize="6">
            <text x="257" y="355">
              Creative thinking
            </text>
            <text x="330" y="355">
              Collaboration
            </text>
            <text x="394" y="355">
              Problem solving
            </text>
          </g>
        </g>
      </g>
      <g className={styles.aiNote}>
        <rect x="33" y="354" width="233" height="59" rx="10" fill="#775799" />
        <path
          d="M60 369L64 379L74 383L64 387L60 397L56 387L46 383L56 379L60 369Z"
          fill="#efe1ff"
        />
        <text x="86" y="379" fill="#fff" fontSize="11" fontWeight="500">
          A little AI. A lot more you.
        </text>
        <text x="86" y="396" fill="#cfbfe2" fontSize="8">
          Turn experience into possibility.
        </text>
      </g>
      <g className={styles.sparkle}>
        <path
          d="M695 271L706 302L737 313L706 324L695 355L684 324L653 313L684 302L695 271Z"
          fill="#b899d3"
        />
        <path
          d="M744 244L750 260L766 266L750 272L744 288L738 272L722 266L738 260L744 244Z"
          fill="#f6eeff"
        />
      </g>
      <text x="33" y="477" fill="#655184" className={styles.label}>
        PRODUCT CONCEPT — AI RESUME BUILDER
      </text>
    </svg>
  );
}

export function ProjectArt({ kind }: { kind: ProjectKind }) {
  return (
    <div className={styles.art} aria-hidden="true">
      {kind === "rotana" ? (
        <RotanaArt />
      ) : kind === "school" ? (
        <SchoolArt />
      ) : kind === "hamuzair" ? (
        <HamuzairArt />
      ) : kind === "travel" ? (
        <TravelArt />
      ) : (
        <ResumeArt />
      )}
    </div>
  );
}
