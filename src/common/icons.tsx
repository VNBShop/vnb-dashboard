type IconProps = {
  name: IconName
  color?: string
  size: number
}

export default function Icon({
  name,
  color = 'currentColor',
  size,
}: IconProps) {
  switch (name) {
    case 'Phone': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z"
          />
        </svg>
      )
    }
    case 'Plane': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none">
            <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
            <path
              fill={color}
              d="m21.433 4.861l-6 15.5a1 1 0 0 1-1.624.362l-3.382-3.235l-2.074 2.073a.5.5 0 0 1-.853-.354v-4.519L2.309 9.723a1 1 0 0 1 .442-1.691l17.5-4.5a1 1 0 0 1 1.181 1.329ZM19 6.001L8.032 13.152l1.735 1.66L19 6Z"
            />
          </g>
        </svg>
      )
    }
    case 'Xmark': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8L4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      )
    }
    case 'Search': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 21 21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            fillRule="evenodd"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8.5" cy="8.5" r="5" />
            <path d="M17.571 17.5L12 12" />
          </g>
        </svg>
      )
    }
    case 'Racket': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M365.6 31c-6.6 0-13.2.6-19.7 1.59c-34.5 5.44-66.5 23.14-88.3 44.96c-28.8 28.85-49.6 70.85-58.4 111.65c-1.6 6.7-2.6 13.6-3.5 20.4L162.2 334l15.8 15.8l124.3-33.5c6.8-.9 13.7-2 20.5-3.5c40.8-8.8 82.8-29.6 111.6-58.4c21.9-21.9 39.6-53.9 45-88.4c5.2-34.5-2.4-72.3-31.9-101.71c-23.8-23.93-53.1-33.44-81.9-33.29zm.1 19.29c24.3-.28 47.9 7.49 68.2 27.71c25 24.9 31 55.2 26.3 85c-4.6 29.9-20.7 58.8-39.5 77.6c-25.4 25.4-64.7 45.2-102 53.2c-37.2 8.2-71.2 3.8-87.8-12.9c-16.5-16.5-20.9-50.4-12.8-87.7c8.1-37.2 27.8-76.6 53.3-101.94c18.7-18.78 47.7-34.84 77.6-39.55c5.5-.88 11.2-1.36 16.7-1.42zm-166 214.81c3.7 11.3 9.3 21.5 17.5 29.5c8.1 8.2 18.2 14 29.5 17.6l-63 16zm-50.3 83.6L50 448.2l-5.25-5.1l-13.71 13.7L55.41 481l13.7-13.6l-5.41-5.4l99.5-99.6zm211 45.1c-19.5 0-35.6 16-35.6 35.5s16.1 35.5 35.6 35.5c19.4 0 35.5-16 35.5-35.5s-16.1-35.5-35.5-35.5z"
          />
        </svg>
      )
    }
    case 'Shoe': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="m135.6 38.35l-17 6.17c6.2 16.99 9.1 34.17 2.3 51.32c4.5 4.76 8.9 9.46 13.3 14.06c12.5-24.41 9.2-50.15 1.4-71.55zm-25.8 71.95c-6.8 2.6-12.82 5.9-18.27 9.7c27.17 29.8 50.17 61.6 63.77 92.1c12.7 28.7 17.4 57.3 7.2 81.1l219.8 158.9c27.5-1.4 45.3-8.1 57.5-17.5c12.8-9.8 20.1-22.9 25.4-38.4c-2.9-3.2-6.1-6.3-9.6-9.4c-25.7 4.5-48.2-.6-66.9-12.4c-19.5-12.2-34.8-31.1-47.8-53c-24.5-41.3-41-94-57.7-137.5c-44.5 4.5-77.1-1.7-102.7-14.2c-30.6-15-50.7-38.1-70.7-59.4zm-31.92 21.5c-4.57 4.9-8.65 10.3-12.34 16.1c-10.56 16.7-17.8 37-23.99 57.9l105.85 76.5c5.7-17.1 2.3-38.5-8.6-62.9c-12.5-27.9-34.6-58.6-60.92-87.6zm238.92 47c-5.2 1-10.2 1.9-15.2 2.7c3.7 9.7 7.4 19.7 11.1 29.8l26 13.1c-6.9-16.1-13.7-31.5-21.9-45.6zm-285.29 42c-2.72 2.9-4.48 5.9-5.39 9c-1.23 4-1.07 8.4 1.01 13.8L266 398c21.8 14 41.4 25.6 59.2 35.1zm290.29 15.3c6.9 18.3 14.2 36.4 22.3 53.1l33.2 14.7c-11.2-18.1-19.8-36.1-27.5-53.7zm36.2 78.8c11.7 19.2 25 34.7 40.3 44.3c11 6.9 22.9 10.9 36.8 11.3c-14.8-12.4-27.1-25.2-37.6-38.2zm119.8 98.4c-5.9 13.3-14.2 25.8-27 35.6c-11.4 8.7-26 15.2-44.7 18.6c17.5 4.9 31.2 6.5 41.6 6.1c14.9-.6 23.4-4.7 28.6-8.8c5.2-4.1 7.2-8.2 8.1-10.2c3.5-7.8 3.2-19.9-2.5-33.3c-1.1-2.6-2.5-5.3-4.1-8z"
          />
        </svg>
      )
    }
    case 'Skirt': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M103 28.31c-4.17 13.68-5.04 26.09-.1 41.09c56.8-3.6 104-5.31 144.4-5.72c67-.67 115.9 2.19 161.7 5.66c4.1-13.38 1.8-25.38-1.1-40.78c-68.3 4.02-186.6 1.87-304.9-.25zm168.7 53.25c-7.8 0-15.9 0-24.3.1c-23.1.24-48.5.94-76.5 2.14c-22.1 45.3-23.9 88.7-30.2 135.5c-7.8-43.5-2.9-94.2-.7-134.03c-11.8.64-24.1 1.34-36.9 2.16C57.03 219.3 23.88 348.2 25.81 469.9c15.81 3.4 30.97 6.1 45.56 8.2c-1.53-21.7 3.82-65.1 20.27-92.1c-5.28 29.8-.87 64.1 3.09 94.9c18.07 1.8 35.17 2.6 51.57 2.8c1.2-76.4-.6-125.2 24.7-203.7c.3 77.6 6 147.6 23.6 202.1c26.9-1.9 52.3-5.2 77.2-8.8c28.7-4.2 56.7-8.6 85.4-11.3c.8-47.6-9.4-120.3-7.4-193.6c25.1 63.6 39.6 125.7 44.7 191.3c28.9-.8 59.1 1 91.7 7.1c1.7-75.4-25-261.8-74.3-373.19c3.1 61.59 7 121.69-1.2 158.59c-13.4-54.9-23.6-106-41.5-167.53c-29-1.74-60.3-3-97.5-3.11z"
          />
        </svg>
      )
    }
    case 'Backpack': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M256.23 29.742c-17.72 0-35.439 3.314-51.443 9.944c-13.634 5.647-25.485 18.372-35.219 29.693A283.41 283.41 0 0 0 155.625 87h22.7c9.04-10.028 21.336-25.336 33.35-30.686c27.12-11.233 61.992-11.233 89.112 0c13.899 8.59 24.041 19.18 33.35 30.686h22.699a283.005 283.005 0 0 0-13.941-17.621c-9.734-11.32-21.585-24.046-35.22-29.693c-16.003-6.63-33.725-9.944-51.445-9.944zM144.23 105c-16.23 2.136-38.662 23-39 39v.02c-.109 52.992 25.641 85.63 57.801 106.422c21.377 13.82 45.768 21.86 66.2 25.715V231h54v45.154c20.407-3.855 44.758-11.894 66.11-25.71C381.475 229.651 407.232 197 407.232 144c-.123-16-25.018-37.725-39-39zm-39.232 110.178L105.225 487h301.998l-.225-271.18c-12.145 21.258-29.246 37.681-47.877 49.737c-25.077 16.226-52.67 25.127-75.89 29.017V329h-54v-34.424c-23.242-3.889-50.87-12.788-75.973-29.017c-18.834-12.177-36.106-28.808-48.26-50.381zM247.23 249v62h18v-62zm-124 106h114v114h-114zm152 0h114v114h-114zm-134 18v20.203c14.631 21.212 27.883 29.797 39 29.797c11.118 0 24.37-8.585 39-29.795V373zm152 0v20.203c14.631 21.212 27.883 29.797 39 29.797c11.118 0 24.37-8.585 39-29.795V373zm-152 48.736V451h78v-29.264c-12.116 12.358-25.028 19.264-39 19.264c-13.971 0-26.884-6.906-39-19.264zm152 0V451h78v-29.264c-12.116 12.358-25.028 19.264-39 19.264c-13.971 0-26.884-6.906-39-19.264z"
          />
        </svg>
      )
    }
    case 'Products': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M341.79 95.5L65.54 166.379l127.84 58.11l276.025-72.64L341.789 95.5zm-1.577 18.984l74.858 33.059l-72.551 19.09l-77.258-32.916l74.951-19.233zm142.813 52.395L194.864 242.71l-3.057.805h-.002l-.041.01l-2.857-1.3L44.73 178.15l-.184-.092c-5.585-2.793-8.012-1.992-10.77.11c-2.757 2.1-5.515 6.88-6.275 12.956c-1.519 12.153 3.616 27.58 23.916 34.346l.412.139L193.338 288.5l173.235-45.588V212.45l76-18.345v28.806l42.173-11.097c-4.36-14.037-5.33-29.146-1.72-44.934zm-58.453 50.086l-40 9.656v103.186l21.947-21.948l18.053 12.498V216.965zm58.453 13.914l-40.453 10.646v45.385l42.173-11.098c-4.36-14.036-5.33-29.145-1.72-44.933zM38.42 240.268c-1.803.036-3.177.782-4.642 1.898c-2.758 2.101-5.516 6.88-6.276 12.957c-1.519 12.153 3.616 27.579 23.916 34.346l.412.138L193.338 352.5l173.235-45.588v-45.387l-174.766 45.99l-146.62-65.161a61.602 61.602 0 0 1-4.802-1.874a8.317 8.317 0 0 0-1.965-.212zm6.768 2.086l.021.008l-.279-.125l.258.117zm437.838 52.525l-40.453 10.646v45.385l42.173-11.097c-4.36-14.037-5.33-29.146-1.72-44.934zM38.42 304.268c-1.803.036-3.177.782-4.642 1.898c-2.758 2.101-5.516 6.88-6.276 12.957c-1.519 12.153 3.616 27.579 23.916 34.346l.412.138L193.338 416.5l173.235-45.588v-45.387l-174.766 45.99l-146.62-65.161a61.602 61.602 0 0 1-4.802-1.874a8.317 8.317 0 0 0-1.965-.212zm6.768 2.086l.021.008l-.279-.125l.258.117zm363.437 24.855l-38.863 38.863l68.834-18.115l-29.97-20.748z"
          />
        </svg>
      )
    }
    case 'Hamburger': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 8h22M5 16h22M5 24h22"
          />
        </svg>
      )
    }
    case 'Cart': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M2.5 2a.5.5 0 0 0 0 1h.246a.5.5 0 0 1 .48.363l1.586 5.55A1.5 1.5 0 0 0 6.254 10h4.569a1.5 1.5 0 0 0 1.393-.943l1.474-3.686A1 1 0 0 0 12.762 4H4.448l-.261-.912A1.5 1.5 0 0 0 2.746 2H2.5Zm4 12a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm4 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Z"
          />
        </svg>
      )
    }
    case 'Shipping': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 640 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"
          />
        </svg>
      )
    }
    case 'Chart': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 19h16M4 15l4-6l4 2l4-5l4 4"
          />
        </svg>
      )
    }
    case 'Wallet': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill={color} fillRule="evenodd" clipRule="evenodd">
            <path d="M21.1 8.004C21.045 8 20.984 8 20.92 8h-2.525c-2.068 0-3.837 1.628-3.837 3.75s1.77 3.75 3.837 3.75h2.525c.064 0 .125 0 .182-.004a1.755 1.755 0 0 0 1.645-1.628c.004-.06.004-.125.004-.185V9.817c0-.06 0-.125-.004-.185a1.755 1.755 0 0 0-1.645-1.628Zm-2.928 4.746c.532 0 .963-.448.963-1s-.431-1-.963-1c-.533 0-.964.448-.964 1s.431 1 .964 1Z" />
            <path d="M20.918 17a.22.22 0 0 1 .221.278c-.2.712-.519 1.32-1.03 1.83c-.749.75-1.698 1.081-2.87 1.239c-1.14.153-2.595.153-4.433.153h-2.112c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87C2 15.099 2 13.644 2 11.806v-.112C2 9.856 2 8.4 2.153 7.26c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238C7.401 3 8.856 3 10.694 3h2.112c1.838 0 3.294 0 4.433.153c1.172.158 2.121.49 2.87 1.238c.511.512.83 1.119 1.03 1.831a.22.22 0 0 1-.221.278h-2.524c-2.837 0-5.337 2.24-5.337 5.25s2.5 5.25 5.337 5.25h2.524ZM5.75 7a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5h-4Z" />
          </g>
        </svg>
      )
    }
    case 'Coin': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M256 243.2c141.4 0 256-47.8 256-106.7c0-58.9-114.6-106.7-256-106.7S0 77.6 0 136.5c0 58.9 114.6 106.7 256 106.7zm0 170.6c-97.7 0-184.1-23.5-238.6-59.8C6.3 366 0 378.9 0 392.5c0 58.9 114.6 106.7 256 106.7s256-47.8 256-106.7c0-13.6-6.3-26.5-17.4-38.4c-54.5 36.2-140.9 59.7-238.6 59.7zm0-128c-97.7 0-184.1-23.5-238.6-59.8C6.3 238 0 250.9 0 264.5c0 58.9 114.6 106.7 256 106.7s256-47.8 256-106.7c0-13.6-6.3-26.5-17.4-38.4c-54.5 36.2-140.9 59.7-238.6 59.7z"
          />
        </svg>
      )
    }
    case 'HeartOutline': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M178 32c-20.65 0-38.73 8.88-50 23.89C116.73 40.88 98.65 32 78 32a62.07 62.07 0 0 0-62 62c0 70 103.79 126.66 108.21 129a8 8 0 0 0 7.58 0C136.21 220.66 240 164 240 94a62.07 62.07 0 0 0-62-62Zm-50 174.8C109.74 196.16 32 147.69 32 94a46.06 46.06 0 0 1 46-46c19.45 0 35.78 10.36 42.6 27a8 8 0 0 0 14.8 0c6.82-16.67 23.15-27 42.6-27a46.06 46.06 0 0 1 46 46c0 53.61-77.76 102.15-96 112.8Z"
          />
        </svg>
      )
    }
    case 'Heart': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138c0-4.863-5.5-8.312-10-3.636C7.5.825 2 4.274 2 9.137Z"
          />
        </svg>
      )
    }
    case 'Checked': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4L9.55 18Z"
          />
        </svg>
      )
    }
    case 'ChevronDown': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m6 9l6 6l6-6"
          />
        </svg>
      )
    }
    case 'Endow': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M216 72h-35.08c.39-.33.79-.65 1.17-1A29.53 29.53 0 0 0 192 49.57A32.62 32.62 0 0 0 158.44 16A29.53 29.53 0 0 0 137 25.91a54.94 54.94 0 0 0-9 14.48a54.94 54.94 0 0 0-9-14.48A29.53 29.53 0 0 0 97.56 16A32.62 32.62 0 0 0 64 49.57A29.53 29.53 0 0 0 73.91 71c.38.33.78.65 1.17 1H40a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16v64a16 16 0 0 0 16 16h60a4 4 0 0 0 4-4v-92H40V88h80v32h16V88h80v32h-80v92a4 4 0 0 0 4 4h60a16 16 0 0 0 16-16v-64a16 16 0 0 0 16-16V88a16 16 0 0 0-16-16ZM84.51 59a13.69 13.69 0 0 1-4.5-10a16.62 16.62 0 0 1 16.58-17h.49a13.69 13.69 0 0 1 10 4.5c8.39 9.48 11.35 25.2 12.39 34.92C109.71 70.39 94 67.43 84.51 59Zm87 0c-9.49 8.4-25.24 11.36-35 12.4C137.7 60.89 141 45.5 149 36.51a13.69 13.69 0 0 1 10-4.5h.49A16.62 16.62 0 0 1 176 49.08a13.69 13.69 0 0 1-4.51 9.92Z"
          />
        </svg>
      )
    }
    case 'Minus': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill={color} d="M19 12.998H5v-2h14z" />
        </svg>
      )
    }
    case 'Plus': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill={color} d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
        </svg>
      )
    }
    case 'Star': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M0 0h24v24H0z" />
            <path
              fill={color}
              d="m8.243 7.34l-6.38.925l-.113.023a1 1 0 0 0-.44 1.684l4.622 4.499l-1.09 6.355l-.013.11a1 1 0 0 0 1.464.944l5.706-3l5.693 3l.1.046a1 1 0 0 0 1.352-1.1l-1.091-6.355l4.624-4.5l.078-.085a1 1 0 0 0-.633-1.62l-6.38-.926l-2.852-5.78a1 1 0 0 0-1.794 0L8.243 7.34z"
            />
          </g>
        </svg>
      )
    }
    case 'Trash': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M12 4h3c.6 0 1 .4 1 1v1H3V5c0-.6.5-1 1-1h3c.2-1.1 1.3-2 2.5-2s2.3.9 2.5 2zM8 4h3c-.2-.6-.9-1-1.5-1S8.2 3.4 8 4zM4 7h11l-.9 10.1c0 .5-.5.9-1 .9H5.9c-.5 0-.9-.4-1-.9L4 7z"
          />
        </svg>
      )
    }
    case 'Location': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"
          />
        </svg>
      )
    }
    case 'Pen': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="m11.4 18.161l7.396-7.396a10.289 10.289 0 0 1-3.326-2.234a10.29 10.29 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.556 6.556 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56c.43-.205.836-.456 1.211-.749c.318-.248.607-.537 1.184-1.114Zm9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887l.038.111a8.754 8.754 0 0 0 2.092 3.32a8.754 8.754 0 0 0 3.431 2.13l.887-.887Z"
          />
        </svg>
      )
    }
    case 'QR': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 28 28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M10.75 15A2.25 2.25 0 0 1 13 17.25v5.5A2.25 2.25 0 0 1 10.75 25h-5.5A2.25 2.25 0 0 1 3 22.75v-5.5A2.25 2.25 0 0 1 5.25 15h5.5Zm7.585 0v3.333h3.332v3.334h-3.332v3.332H15v-3.333h3.333v-3.333H15V15h3.334ZM25 21.666V25h-3.333v-3.333H25ZM10.75 16.5h-5.5a.75.75 0 0 0-.75.75v5.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-5.5a.75.75 0 0 0-.75-.75Zm-1.25 2v3h-3v-3h3ZM25 15v3.333h-3.333V15H25ZM10.75 3A2.25 2.25 0 0 1 13 5.25v5.5A2.25 2.25 0 0 1 10.75 13h-5.5A2.25 2.25 0 0 1 3 10.75v-5.5A2.25 2.25 0 0 1 5.25 3h5.5Zm12 0A2.25 2.25 0 0 1 25 5.25v5.5A2.25 2.25 0 0 1 22.75 13h-5.5A2.25 2.25 0 0 1 15 10.75v-5.5A2.25 2.25 0 0 1 17.25 3h5.5Zm-12 1.5h-5.5a.75.75 0 0 0-.75.75v5.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-5.5a.75.75 0 0 0-.75-.75Zm12 0h-5.5a.75.75 0 0 0-.75.75v5.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-5.5a.75.75 0 0 0-.75-.75ZM9.5 6.5v3h-3v-3h3Zm12 0v3h-3v-3h3Z"
          />
        </svg>
      )
    }
    case 'Photo': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M0 0h24v24H0z" />
            <path
              fill={color}
              d="M8.813 11.612c.457-.38.918-.38 1.386.011l.108.098l4.986 4.986l.094.083a1 1 0 0 0 1.403-1.403l-.083-.094L15.415 14l.292-.293l.106-.095c.457-.38.918-.38 1.386.011l.108.098l4.674 4.675a4 4 0 0 1-3.775 3.599L18 22H6a4 4 0 0 1-3.98-3.603l6.687-6.69l.106-.095zM18 2a4 4 0 0 1 3.995 3.8L22 6v9.585l-3.293-3.292l-.15-.137c-1.256-1.095-2.85-1.097-4.096-.017l-.154.14l-.307.306l-2.293-2.292l-.15-.137c-1.256-1.095-2.85-1.097-4.096-.017l-.154.14L2 15.585V6a4 4 0 0 1 3.8-3.995L6 2h12zm-2.99 5l-.127.007a1 1 0 0 0 0 1.986L15 9l.127-.007a1 1 0 0 0 0-1.986L15.01 7z"
            />
          </g>
        </svg>
      )
    }
    case 'Ellipsis': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M7 12a2 2 0 1 1-4.001-.001A2 2 0 0 1 7 12zm12-2a2 2 0 1 0 .001 4.001A2 2 0 0 0 19 10zm-7 0a2 2 0 1 0 .001 4.001A2 2 0 0 0 12 10z"
          />
        </svg>
      )
    }

    case 'ChatOutline': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="m174.72 855.68l130.048-43.392l23.424 11.392C382.4 849.984 444.352 864 512 864c223.744 0 384-159.872 384-352c0-192.832-159.104-352-384-352S128 319.168 128 512a341.12 341.12 0 0 0 69.248 204.288l21.632 28.8l-44.16 110.528zm-45.248 82.56A32 32 0 0 1 89.6 896l56.512-141.248A405.12 405.12 0 0 1 64 512C64 299.904 235.648 96 512 96s448 203.904 448 416s-173.44 416-448 416c-79.68 0-150.848-17.152-211.712-46.72l-170.88 56.96z"
          />
        </svg>
      )
    }

    case 'ShareOutline': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="m21.707 11.293l-8-8A1 1 0 0 0 12 4v3.545A11.015 11.015 0 0 0 2 18.5V20a1 1 0 0 0 1.784.62a11.456 11.456 0 0 1 7.887-4.049c.05-.006.175-.016.329-.026V20a1 1 0 0 0 1.707.707l8-8a1 1 0 0 0 0-1.414ZM14 17.586V15.5a1 1 0 0 0-1-1c-.255 0-1.296.05-1.562.085a14.005 14.005 0 0 0-7.386 2.948A9.013 9.013 0 0 1 13 9.5a1 1 0 0 0 1-1V6.414L19.586 12Z"
          />
        </svg>
      )
    }

    case 'ChevronLeft': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m15 6l-6 6l6 6"
          />
        </svg>
      )
    }

    case 'ChevronRight': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m9 6l6 6l-6 6"
          />
        </svg>
      )
    }

    case 'Bell': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M8.352 20.242A4.63 4.63 0 0 0 12 22a4.63 4.63 0 0 0 3.648-1.758a27.158 27.158 0 0 1-7.296 0ZM18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.794 25.794 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.393 4.393 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7Z"
          />
        </svg>
      )
    }

    case 'Logout': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5l-5-5m5 5H9"
          />
        </svg>
      )
    }

    case 'I': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M12 7q-.633 0-1.066-.434Q10.5 6.133 10.5 5.5t.434-1.066Q11.367 4 12 4t1.066.434q.434.433.434 1.066t-.434 1.066Q12.633 7 12 7Zm-1 13V9.77h2V20h-2Z"
          />
        </svg>
      )
    }

    case 'Setting': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M11.078 0c.294 0 .557.183.656.457l.706 1.957c.253.063.47.126.654.192c.201.072.46.181.78.33l1.644-.87a.702.702 0 0 1 .832.131l1.446 1.495c.192.199.246.49.138.744l-.771 1.807c.128.235.23.436.308.604c.084.183.188.435.312.76l1.797.77c.27.115.437.385.419.674l-.132 2.075a.69.69 0 0 1-.46.605l-1.702.605c-.049.235-.1.436-.154.606a8.79 8.79 0 0 1-.298.774l.855 1.89a.683.683 0 0 1-.168.793l-1.626 1.452a.703.703 0 0 1-.796.096l-1.676-.888a7.23 7.23 0 0 1-.81.367l-.732.274l-.65 1.8a.696.696 0 0 1-.64.457L9.11 20a.697.697 0 0 1-.669-.447l-.766-2.027a14.625 14.625 0 0 1-.776-.29a9.987 9.987 0 0 1-.618-.293l-1.9.812a.702.702 0 0 1-.755-.133L2.22 16.303a.683.683 0 0 1-.155-.783l.817-1.78a9.517 9.517 0 0 1-.302-.644a14.395 14.395 0 0 1-.3-.811L.49 11.74a.69.69 0 0 1-.49-.683l.07-1.921a.688.688 0 0 1 .392-.594L2.34 7.64c.087-.319.163-.567.23-.748a8.99 8.99 0 0 1 .314-.712L2.07 4.46a.683.683 0 0 1 .15-.79l1.404-1.326a.702.702 0 0 1 .75-.138l1.898.784c.21-.14.4-.253.572-.344c.205-.109.479-.223.824-.346l.66-1.841A.696.696 0 0 1 8.984 0zm-1.054 7.019c-1.667 0-3.018 1.335-3.018 2.983c0 1.648 1.351 2.984 3.018 2.984c1.666 0 3.017-1.336 3.017-2.984s-1.35-2.983-3.017-2.983"
          />
        </svg>
      )
    }

    case 'Key': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176C160 78.798 238.797.001 335.999 0C433.488-.001 512 78.511 512 176.001M336 128c0 26.51 21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48s-48 21.49-48 48"
          />
        </svg>
      )
    }

    case 'ChevronLeftThin': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M13.891 17.418a.697.697 0 0 1 0 .979a.68.68 0 0 1-.969 0l-7.83-7.908a.697.697 0 0 1 0-.979l7.83-7.908a.68.68 0 0 1 .969 0a.697.697 0 0 1 0 .979L6.75 10z"
          />
        </svg>
      )
    }

    case 'Dashboard': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1m-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1"
          />
        </svg>
      )
    }

    case 'Selling': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            fillRule="evenodd"
            d="M19 21.5H6A3.5 3.5 0 0 1 2.5 18V4.943c0-1.067 1.056-1.744 1.985-1.422c.133.046.263.113.387.202l.175.125a2.51 2.51 0 0 0 2.912-.005a3.52 3.52 0 0 1 4.082 0a2.51 2.51 0 0 0 2.912.005l.175-.125c.993-.71 2.372 0 2.372 1.22V12.5H21a.75.75 0 0 1 .75.75v5.5A2.75 2.75 0 0 1 19 21.5M17.75 14v4.75a1.25 1.25 0 0 0 2.5 0V14zM13.5 9.75a.75.75 0 0 0-.75-.75h-6a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 .75-.75m-1 3a.75.75 0 0 0-.75-.75h-5a.75.75 0 1 0 0 1.5h5a.75.75 0 0 0 .75-.75m.25 2.25a.75.75 0 1 1 0 1.5h-6a.75.75 0 0 1 0-1.5z"
            clipRule="evenodd"
          />
        </svg>
      )
    }

    case 'Calandar': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M37 38H13c-1.7 0-3-1.3-3-3V13c0-1.7 1.1-3 2.5-3H14v2h-1.5c-.2 0-.5.4-.5 1v22c0 .6.4 1 1 1h24c.6 0 1-.4 1-1V13c0-.6-.3-1-.5-1H36v-2h1.5c1.4 0 2.5 1.3 2.5 3v22c0 1.7-1.3 3-3 3"
          />
          <path
            fill={color}
            d="M17 14c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1m16 0c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1m-13-4h10v2H20zm-8 6h26v2H12zm22 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm16 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm20 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm16 4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2z"
          />
        </svg>
      )
    }

    case 'ChevronRightThin': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="m22.7 34.7l-1.4-1.4l8.3-8.3l-8.3-8.3l1.4-1.4l9.7 9.7z"
          />
        </svg>
      )
    }

    case 'Filter': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2M6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2z"
          />
        </svg>
      )
    }

    case 'ChevronUp': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 56 56"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M8.266 35.805c-.399.375-.633.914-.633 1.523c0 1.219.937 2.133 2.156 2.133c.586 0 1.149-.211 1.524-.61L28 21.79l16.688 17.063c.374.398.96.609 1.523.609c1.219 0 2.156-.914 2.156-2.133c0-.61-.234-1.148-.633-1.523L29.57 17.242A2.133 2.133 0 0 0 28 16.54c-.61 0-1.148.258-1.57.703Z"
          />
        </svg>
      )
    }

    case 'CaretSort': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="m16 28l-7-7l1.41-1.41L16 25.17l5.59-5.58L23 21zm0-24l7 7l-1.41 1.41L16 6.83l-5.59 5.58L9 11z"
          />
        </svg>
      )
    }

    case 'PhotoPlus': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M15 8h.01M12.5 21H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v6.5" />
            <path d="m3 16l5-5c.928-.893 2.072-.893 3 0l4 4" />
            <path d="m14 14l1-1c.67-.644 1.45-.824 2.182-.54M16 19h6m-3-3v6" />
          </g>
        </svg>
      )
    }

    case 'ZoomOut': {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={color}
            d="M6.4 19H8q.425 0 .713.288T9 20q0 .425-.288.713T8 21H4q-.425 0-.712-.288T3 20v-4q0-.425.288-.712T4 15q.425 0 .713.288T5 16v1.6l2.4-2.4q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7zm11.2 0l-2.4-2.4q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l2.4 2.4V16q0-.425.288-.712T20 15q.425 0 .713.288T21 16v4q0 .425-.288.713T20 21h-4q-.425 0-.712-.288T15 20q0-.425.288-.712T16 19zM5 6.4V8q0 .425-.288.713T4 9q-.425 0-.712-.288T3 8V4q0-.425.288-.712T4 3h4q.425 0 .713.288T9 4q0 .425-.288.713T8 5H6.4l2.4 2.4q.275.275.275.7t-.275.7q-.275.275-.7.275T7.4 8.8zm14 0l-2.4 2.4q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7L17.6 5H16q-.425 0-.712-.287T15 4q0-.425.288-.712T16 3h4q.425 0 .713.288T21 4v4q0 .425-.288.713T20 9q-.425 0-.712-.288T19 8z"
          />
        </svg>
      )
    }
  }
}

export type IconName =
  | 'Phone'
  | 'ZoomOut'
  | 'CaretSort'
  | 'ChevronUp'
  | 'Filter'
  | 'Setting'
  | 'Calandar'
  | 'Key'
  | 'QR'
  | 'Plane'
  | 'Xmark'
  | 'ChevronRightThin'
  | 'Search'
  | 'Racket'
  | 'Shoe'
  | 'Skirt'
  | 'Backpack'
  | 'Products'
  | 'Hamburger'
  | 'Minus'
  | 'Plus'
  | 'Cart'
  | 'Shipping'
  | 'Chart'
  | 'Wallet'
  | 'Coin'
  | 'Logout'
  | 'I'
  | 'HeartOutline'
  | 'Heart'
  | 'Checked'
  | 'ChevronDown'
  | 'ChevronLeft'
  | 'ChevronLeftThin'
  | 'ChevronRight'
  | 'Endow'
  | 'Star'
  | 'Trash'
  | 'Location'
  | 'Pen'
  | 'Photo'
  | 'Ellipsis'
  | 'ChatOutline'
  | 'ShareOutline'
  | 'Bell'
  | 'Dashboard'
  | 'Selling'
  | 'PhotoPlus'
