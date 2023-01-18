import React from "react";

export const ElementDefault = () => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 26.000000 26.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,26.000000) scale(0.100000,-0.100000)"
        fill="#c4c4c4"
        stroke="none"
      >
        <path
          d="M85 241 c-45 -20 -70 -60 -70 -112 0 -42 5 -53 33 -81 28 -28 39 -33
          82 -33 43 0 54 5 82 33 28 28 33 39 33 82 0 42 -5 54 -31 81 -33 33 -92 46
          -129 30z m94 -25 c47 -25 63 -83 37 -135 -35 -66 -137 -66 -172 0 -47 91 44
          182 135 135z"
        />
        <path
          d="M117 162 l32 -28 -32 -32 c-29 -30 -30 -32 -10 -32 12 0 32 14 47 32
          l25 33 -26 27 c-15 16 -36 28 -47 28 -19 -1 -17 -4 11 -28z"
        />
      </g>
    </svg>
  );
};

export const AddElement = () => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="#c4c4c4"
        stroke="none"
      >
        <path
          d="M2330 5110 c-494 -48 -950 -230 -1350 -538 -195 -150 -448 -432 -594
        -662 -63 -99 -186 -351 -230 -471 -49 -134 -102 -340 -128 -499 -31 -195 -31
        -565 0 -760 45 -276 116 -498 237 -745 132 -269 269 -460 489 -681 221 -220
        412 -357 681 -489 247 -121 469 -192 745 -237 195 -31 565 -31 760 0 276 45
        498 116 745 237 269 132 460 269 681 489 220 221 357 412 489 681 88 179 132
        296 180 476 63 240 78 371 78 649 0 278 -15 409 -78 649 -48 180 -92 297 -180
        476 -132 269 -269 460 -489 681 -221 220 -412 357 -681 489 -246 121 -474 193
        -740 235 -147 23 -475 34 -615 20z m510 -374 c993 -134 1762 -903 1896 -1896
        29 -219 14 -536 -35 -757 -202 -899 -942 -1575 -1861 -1699 -135 -18 -425 -18
        -560 0 -993 134 -1762 903 -1896 1896 -18 135 -18 425 0 560 133 989 899 1758
        1886 1895 129 18 439 18 570 1z"
        />
        <path
          d="M2490 3764 c-45 -20 -68 -41 -91 -86 -18 -35 -19 -65 -19 -488 l0
          -450 -452 0 c-451 0 -453 0 -493 -23 -125 -71 -125 -243 0 -314 40 -23 42 -23
          493 -23 l452 0 0 -452 c0 -451 0 -453 23 -493 71 -125 243 -125 314 0 23 40
          23 42 23 493 l0 452 453 0 c450 0 452 0 492 23 125 71 125 243 0 314 -40 23
          -42 23 -492 23 l-453 0 0 450 c0 423 -1 453 -19 488 -23 46 -46 67 -94 87 -45
          19 -92 19 -137 -1z"
        />
      </g>
    </svg>
  );
};

export const EditElement = ({x, y}) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={x}
      height={y}
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="#c4c4c4"
        stroke="none"
      >
        <path
          d="M4253 5080 c-78 -20 -114 -37 -183 -83 -44 -29 -2323 -2296 -2361
    -2349 -21 -29 -329 -1122 -329 -1168 0 -56 65 -120 122 -120 44 0 1138 309
    1166 329 15 11 543 536 1174 1168 837 838 1157 1165 1187 1212 74 116 105 270
    82 407 -7 39 -30 105 -53 154 -36 76 -55 99 -182 226 -127 127 -150 145 -226
    182 -135 65 -260 78 -397 42z m290 -272 c55 -27 258 -231 288 -288 20 -38 24
    -60 24 -140 0 -121 -18 -160 -132 -279 l-82 -86 -303 303 -303 303 88 84 c49
    46 108 93 132 105 87 42 203 41 288 -2z m-383 -673 l295 -295 -933 -932 -932
    -933 -295 295 c-162 162 -295 299 -295 305 0 13 1842 1855 1855 1855 6 0 143
    -133 305 -295z m-1822 -2284 c-37 -12 -643 -179 -645 -178 -1 1 30 115 68 252
    38 138 79 285 91 329 l21 78 238 -238 c132 -132 233 -241 227 -243z"
        />
        <path
          d="M480 4584 c-209 -56 -370 -206 -444 -414 l-31 -85 0 -1775 c0 -1693
    1 -1778 18 -1834 37 -120 77 -187 167 -277 63 -63 104 -95 157 -121 146 -73 3
    -69 2113 -66 l1895 3 67 26 c197 77 336 218 401 409 22 64 22 74 25 710 3 579
    2 648 -13 676 -21 40 -64 64 -114 64 -33 0 -49 -7 -79 -34 l-37 -34 -5 -634
    c-5 -631 -5 -633 -28 -690 -41 -102 -118 -179 -220 -220 l-57 -23 -1834 -3
    c-1211 -1 -1853 1 -1890 8 -120 22 -227 104 -277 213 l-29 62 0 1760 0 1760
    29 63 c37 80 122 161 203 194 l58 23 630 5 c704 6 664 1 700 77 23 48 13 95
    -31 138 l-35 35 -642 -1 c-533 0 -651 -3 -697 -15z"
        />
      </g>
    </svg>
  );
};

export const DeleteElement = ({ x, y}) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={x}
      height={y}
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="#c4c4c4"
        stroke="none"
      >
        <path
          d="M2125 4786 c-57 -18 -82 -33 -132 -79 -65 -60 -95 -125 -101 -219
    l-5 -78 82 0 81 0 0 48 c1 61 29 123 71 153 l34 24 405 0 405 0 34 -24 c42
    -30 70 -92 71 -153 l0 -48 81 0 82 0 -5 73 c-8 129 -70 226 -181 285 l-52 27
    -415 2 c-315 2 -425 -1 -455 -11z"
        />
        <path
          d="M947 4236 c-58 -21 -103 -61 -131 -118 -26 -52 -26 -53 -26 -292 0
    -139 5 -257 11 -279 13 -47 69 -111 123 -140 l41 -22 1595 0 1595 0 41 22 c55
    29 111 93 124 143 7 26 10 130 8 289 l-3 248 -30 49 c-19 30 -49 60 -79 79
    l-49 30 -1591 2 c-1312 2 -1598 0 -1629 -11z"
        />
        <path
          d="M1040 3202 c0 -131 123 -2558 131 -2587 32 -116 109 -207 217 -258
    l67 -32 1105 0 1105 0 67 32 c108 51 185 143 217 258 8 29 131 2457 131 2587
    0 17 -76 18 -1520 18 -1457 0 -1520 -1 -1520 -18z m805 -465 l27 -23 44 -933
    c41 -856 43 -936 29 -958 -34 -51 -102 -52 -133 -3 -8 13 -24 291 -51 867 -53
    1118 -51 1016 -22 1047 31 32 71 34 106 3z m770 -2 l25 -24 0 -935 0 -935 -23
    -27 c-33 -37 -81 -37 -114 0 l-23 27 0 935 0 935 25 24 c15 16 36 25 55 25 19
    0 40 -9 55 -25z m762 1 c34 -29 36 84 -18 -1051 l-40 -850 -24 -24 c-33 -34
    -81 -33 -112 3 -12 15 -23 35 -23 44 0 9 20 431 44 937 l44 919 27 23 c34 30
    67 29 102 -1z"
        />
      </g>
    </svg>
  );
};

export const ViewElement = ({ x, y }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={x}
      height={y}
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="#c4c4c4"
        stroke="none"
      >
        <path
          d="M2370 4184 c-589 -70 -1135 -342 -1715 -855 -203 -179 -537 -540
        -623 -674 -36 -56 -36 -134 0 -190 46 -72 240 -297 378 -438 493 -508 1042
        -864 1560 -1012 225 -64 339 -79 590 -79 251 0 365 15 590 79 607 174 1274
        647 1806 1283 146 174 158 195 158 262 0 67 -12 88 -158 262 -529 631 -1194
        1105 -1796 1280 -202 59 -336 78 -555 82 -110 3 -216 2 -235 0z m435 -349
        c471 -71 984 -348 1477 -799 151 -137 448 -454 448 -477 0 -3 -34 -46 -77 -94
        -582 -666 -1244 -1089 -1848 -1180 -128 -19 -362 -19 -490 0 -435 66 -899 303
        -1360 694 -167 141 -565 551 -565 581 0 4 34 47 77 95 578 661 1240 1086 1839
        1179 122 19 375 19 499 1z"
        />
        <path
          d="M2420 3564 c-433 -79 -741 -361 -846 -774 -27 -106 -27 -354 0 -460
        97 -380 376 -659 756 -756 106 -27 354 -27 460 0 380 97 659 376 756 756 15
        58 19 110 19 230 0 120 -4 172 -19 230 -95 375 -366 650 -741 752 -68 19 -323
        33 -385 22z m300 -350 c187 -42 358 -179 445 -359 52 -107 68 -189 63 -325 -5
        -129 -30 -216 -90 -318 -42 -72 -158 -188 -230 -230 -211 -124 -485 -124 -696
        0 -72 42 -188 158 -230 230 -124 211 -124 485 0 696 42 72 158 188 230 230
        151 89 328 116 508 76z"
        />
      </g>
    </svg>
  );
};

export const DetailElement = ({ x, y }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={x}
      height={y}
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="#c4c4c4"
        stroke="none"
      >
        <path
          d="M1000 5107 c-49 -16 -133 -102 -148 -153 -9 -32 -12 -447 -12 -1793
          l0 -1752 25 -24 c32 -33 78 -33 110 0 l25 24 0 1751 0 1751 25 24 24 25 1296
          0 1295 0 0 -416 c0 -298 3 -428 12 -458 16 -55 99 -138 154 -154 28 -8 129
          -12 313 -12 l272 0 24 25 c16 15 25 36 25 55 0 19 -9 40 -25 55 l-24 25 -271
          0 -271 0 -24 25 -25 24 0 358 0 358 440 -440 440 -440 0 -1878 0 -1878 -25
          -24 -24 -25 -1751 0 -1751 0 -24 -25 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25
          -55 l24 -25 1752 0 c1346 0 1761 3 1793 12 55 16 138 99 154 154 9 32 12 482
          12 1955 l0 1914 -543 542 -542 543 -1360 -1 c-961 -1 -1370 -4 -1395 -12z"
        />
        <path
          d="M2665 3909 c-161 -21 -352 -85 -497 -168 -616 -352 -858 -1115 -558
        -1758 43 -93 114 -206 173 -276 l40 -49 -131 -131 -131 -131 -43 20 c-31 14
        -64 19 -123 19 -135 -1 -124 8 -621 -489 -500 -500 -489 -485 -489 -626 0
        -100 24 -160 90 -225 65 -65 125 -89 225 -89 142 -1 139 -3 637 497 484 487
        476 476 477 612 1 59 -4 92 -18 123 l-20 43 131 131 131 131 49 -40 c156 -131
        384 -237 601 -280 124 -25 385 -24 507 1 487 101 869 432 1028 892 56 163 71
        257 71 444 0 116 -5 191 -17 252 -89 449 -388 818 -806 999 -214 92 -470 127
        -706 98z m435 -178 c352 -80 651 -315 814 -639 84 -168 121 -329 121 -532 0
        -157 -12 -236 -56 -372 -97 -299 -320 -557 -607 -702 -168 -84 -329 -121 -532
        -121 -83 0 -175 6 -215 14 -494 98 -868 472 -966 966 -21 103 -18 349 5 455
        78 363 314 668 644 834 93 47 225 90 322 106 41 6 82 13 90 15 42 11 302 -6
        380 -24z m-1612 -2478 c61 -45 85 -117 63 -184 -8 -25 -134 -157 -444 -466
        -468 -467 -453 -455 -544 -438 -49 9 -109 69 -118 118 -17 91 -29 77 433 541
        235 235 441 434 457 442 40 19 119 12 153 -13z"
        />
        <path
          d="M3032 3550 c-30 -28 -38 -68 -21 -99 11 -18 37 -33 107 -57 290 -100
          507 -338 578 -634 26 -109 73 -146 132 -104 40 27 44 57 22 145 -88 356 -336
          627 -680 744 -89 30 -110 31 -138 5z"
        />
        <path
          d="M2065 3015 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 l24 -25 631
          0 631 0 24 25 c16 15 25 36 25 55 0 19 -9 40 -25 55 l-24 25 -631 0 -631 0
          -24 -25z"
          />
        <path
          d="M1825 2615 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 l24 -25 831
        0 831 0 24 25 c16 15 25 36 25 55 0 19 -9 40 -25 55 l-24 25 -831 0 -831 0
        -24 -25z"
        />
        <path
          d="M2065 2215 c-16 -15 -25 -36 -25 -55 0 -19 9 -40 25 -55 l24 -25 791
          0 791 0 24 25 c16 15 25 36 25 55 0 19 -9 40 -25 55 l-24 25 -791 0 -791 0
          -24 -25z"
        />
      </g>
    </svg>
  );
};

export const SearchFilter = ({ x, y }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={x}
      height={y}
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="#515151"
        stroke="none"
      >
        <path
          d="M2710 5114 c-705 -65 -1311 -422 -1695 -999 -137 -206 -259 -487
  -313 -720 -77 -333 -77 -697 0 -1030 53 -229 175 -513 306 -710 37 -55 69
  -104 71 -109 2 -4 -228 -241 -511 -525 -403 -404 -520 -527 -539 -566 -19 -41
  -24 -66 -23 -135 0 -72 4 -93 27 -137 36 -69 88 -120 156 -152 46 -21 70 -26
  136 -26 138 1 126 -8 709 567 l513 507 110 -72 c265 -175 575 -292 905 -344
  156 -24 480 -24 638 0 504 77 947 305 1293 667 324 337 518 727 599 1200 18
  103 22 165 22 350 0 185 -4 247 -22 350 -81 473 -275 863 -599 1200 -344 359
  -787 589 -1284 665 -102 15 -409 27 -499 19z m445 -659 c364 -63 711 -263 946
  -543 181 -217 295 -455 351 -734 32 -162 32 -434 0 -596 -86 -430 -327 -793
  -687 -1033 -563 -377 -1312 -352 -1855 61 -105 80 -274 258 -347 365 -329 484
  -372 1101 -112 1618 246 488 701 807 1256 877 95 12 340 4 448 -15z"
        />
      </g>
    </svg>
  );
};