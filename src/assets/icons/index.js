import PropTypes from "prop-types";

const Dashboard = ({ className }) => (
  <svg
    width="14"
    height="12"
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5.99996V7.46663C1 8.58673 1 9.14678 1.21799 9.57461C1.40973 9.95093 1.71569 10.2569 2.09202 10.4486C2.51984 10.6666 3.07989 10.6666 4.2 10.6666H9.8C10.9201 10.6666 11.4802 10.6666 11.908 10.4486C12.2843 10.2569 12.5903 9.95093 12.782 9.57461C13 9.14678 13 8.58673 13 7.46663V5.99996M1 5.99996H3.44968C3.7758 5.99996 3.93886 5.99996 4.09231 6.0368C4.22836 6.06946 4.35842 6.12333 4.47771 6.19644C4.61227 6.27889 4.72757 6.3942 4.95817 6.6248L5.04183 6.70845C5.27243 6.93906 5.38773 7.05436 5.52229 7.13681C5.64158 7.20992 5.77164 7.26379 5.90769 7.29645C6.06114 7.33329 6.2242 7.33329 6.55032 7.33329H7.44968C7.7758 7.33329 7.93886 7.33329 8.09231 7.29645C8.22836 7.26379 8.35842 7.20992 8.47771 7.13681C8.61227 7.05436 8.72757 6.93906 8.95817 6.70845L9.04183 6.6248C9.27243 6.3942 9.38773 6.27889 9.52229 6.19644C9.64158 6.12333 9.77164 6.06946 9.90769 6.0368C10.0611 5.99996 10.2242 5.99996 10.5503 5.99996H13M1 5.99996L2.55093 2.55346C2.85835 1.87029 3.01206 1.52871 3.25351 1.27833C3.46694 1.057 3.72852 0.887865 4.01794 0.784058C4.34534 0.666626 4.71992 0.666626 5.46907 0.666626H8.53092C9.28008 0.666626 9.65466 0.666626 9.98206 0.784058C10.2715 0.887865 10.5331 1.057 10.7465 1.27833C10.9879 1.52871 11.1416 1.87029 11.4491 2.55346L13 5.99996"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CaretDown = ({ fill }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.0686 6H5.93137C5.32555 6 5.02265 6 4.88238 6.1198C4.76068 6.22374 4.69609 6.37967 4.70865 6.53923C4.72312 6.72312 4.93731 6.93731 5.36568 7.36568L7.43431 9.43431C7.63232 9.63232 7.73133 9.73133 7.84549 9.76842C7.94591 9.80105 8.05409 9.80105 8.15451 9.76842C8.26867 9.73133 8.36768 9.63232 8.56568 9.43432L8.56569 9.43431L10.6343 7.36569C11.0627 6.93731 11.2769 6.72312 11.2914 6.53923C11.3039 6.37967 11.2393 6.22374 11.1176 6.1198C10.9774 6 10.6744 6 10.0686 6Z"
      fill={fill}
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Agent = ({ className }) => (
  <svg
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.6905 17.1016C18.717 15.8245 19.431 14.3106 19.772 12.6878C20.113 11.0651 20.071 9.3813 19.6495 7.77889C19.2281 6.17649 18.4396 4.70261 17.3507 3.48195C16.2619 2.26128 14.9047 1.32974 13.394 0.766125C11.8834 0.202508 10.2637 0.0233972 8.67188 0.243945C7.08011 0.464493 5.56313 1.07821 4.24926 2.03318C2.93539 2.98815 1.86329 4.25628 1.12365 5.73029C0.384016 7.2043 -0.00140285 8.84083 3.83677e-06 10.5014C0.000543632 12.9155 0.823267 15.2522 2.32381 17.1016L2.30951 17.1142C2.35955 17.1763 2.41673 17.2295 2.4682 17.2908C2.53253 17.367 2.60186 17.4386 2.66834 17.5126C2.86848 17.7372 3.07434 17.9531 3.29021 18.1556C3.35597 18.2177 3.42388 18.2753 3.49035 18.3344C3.71909 18.5384 3.95426 18.7321 4.198 18.9124C4.22945 18.9346 4.25805 18.9634 4.2895 18.9863V18.9775C5.96362 20.1956 7.96076 20.8494 10.0079 20.8494C12.055 20.8494 14.0521 20.1956 15.7262 18.9775V18.9863C15.7577 18.9634 15.7856 18.9346 15.8177 18.9124C16.0608 18.7313 16.2966 18.5384 16.5254 18.3344C16.5919 18.2753 16.6598 18.2169 16.7255 18.1556C16.9414 17.9523 17.1473 17.7372 17.3474 17.5126C17.4139 17.4386 17.4825 17.367 17.5475 17.2908C17.5983 17.2295 17.6562 17.1763 17.7062 17.1134L17.6905 17.1016ZM10.0072 4.58862C10.6433 4.58862 11.2652 4.78369 11.7942 5.14915C12.3232 5.51461 12.7354 6.03405 12.9789 6.64179C13.2223 7.24953 13.286 7.91827 13.1619 8.56344C13.0378 9.20862 12.7315 9.80124 12.2816 10.2664C11.8318 10.7315 11.2586 11.0483 10.6347 11.1766C10.0107 11.305 9.36397 11.2391 8.77622 10.9874C8.18847 10.7356 7.6861 10.3093 7.33266 9.76238C6.97922 9.21543 6.79057 8.57239 6.79057 7.91458C6.79057 7.03248 7.12946 6.18651 7.73268 5.56277C8.33591 4.93904 9.15406 4.58862 10.0072 4.58862ZM4.29378 17.1016C4.30618 16.1312 4.6876 15.2048 5.35551 14.5228C6.02343 13.8409 6.92413 13.4583 7.86276 13.4578H12.1515C13.0902 13.4583 13.9909 13.8409 14.6588 14.5228C15.3267 15.2048 15.7081 16.1312 15.7205 17.1016C14.1529 18.5623 12.1174 19.3707 10.0072 19.3707C7.89689 19.3707 5.86145 18.5623 4.29378 17.1016Z"
      className={className}
    />
  </svg>
);

const Drycleaning = ({ className }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 3L11 11M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Meals = ({ className }) => (
  <svg
    width="12"
    height="14"
    viewBox="0 0 12 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.66659 3.00001V1.85623C8.66659 1.34388 8.66659 1.0877 8.55906 0.922102C8.46499 0.777209 8.31834 0.674492 8.15002 0.635596C7.95765 0.591141 7.7169 0.678687 7.23539 0.853778L2.38646 2.61703C2.00701 2.75501 1.81729 2.824 1.67735 2.94559C1.55374 3.053 1.4584 3.18912 1.3997 3.34199C1.33325 3.51505 1.33325 3.71693 1.33325 4.1207V7.00001M3.99992 10.3333H7.99992M3.99992 8.00001H7.99992M3.99992 5.66668H7.99992M3.46659 13H8.53325C9.27999 13 9.65336 13 9.93857 12.8547C10.1895 12.7269 10.3934 12.5229 10.5213 12.272C10.6666 11.9868 10.6666 11.6134 10.6666 10.8667V5.13335C10.6666 4.38661 10.6666 4.01324 10.5213 3.72802C10.3934 3.47714 10.1895 3.27317 9.93857 3.14534C9.65336 3.00001 9.27999 3.00001 8.53325 3.00001H3.46659C2.71985 3.00001 2.34648 3.00001 2.06126 3.14534C1.81038 3.27317 1.60641 3.47714 1.47858 3.72802C1.33325 4.01324 1.33325 4.38661 1.33325 5.13334V10.8667C1.33325 11.6134 1.33325 11.9868 1.47858 12.272C1.60641 12.5229 1.81038 12.7269 2.06126 12.8547C2.34648 13 2.71985 13 3.46659 13Z"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Messages = ({ className }) => (
  <svg
    width="19"
    height="17"
    viewBox="0 0 19 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={className}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 8.49996C18 12.9182 14.1941 16.4999 9.5 16.4999C7.9913 16.5067 6.50327 16.1226 5.16181 15.3799L1 16.4999L2.42163 12.9308C1.52381 11.6622 1 10.1388 1 8.49996C1 4.08169 4.80587 0.5 9.5 0.5C14.1941 0.5 18 4.08169 18 8.49996ZM6.3125 7.3571H4.1875V9.64281H6.3125V7.3571ZM14.8125 7.3571H12.6875V9.64281H14.8125V7.3571ZM8.4375 7.3571H10.5625V9.64281H8.4375V7.3571Z"
      fill="#00296B"
      strokeLinejoin="round"
    />
  </svg>
);
const Listings = ({ className }) => (
  <svg
    width="20"
    height="17"
    viewBox="0 0 20 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={className}
      d="M13.934 16.4698V7.66136C13.934 7.40795 13.8706 7.1586 13.7439 6.91331C13.6172 6.66802 13.4438 6.46903 13.2237 6.31633L8.37597 2.86482V1.21521C8.46045 1.01216 8.59568 0.847279 8.78168 0.720574C8.96767 0.593056 9.17073 0.529297 9.39084 0.529297H18.9596C19.2308 0.529297 19.4721 0.635291 19.6832 0.84728C19.8944 1.05846 20 1.29928 20 1.56975V15.4538C20 15.725 19.8944 15.9622 19.6832 16.1653C19.4721 16.3683 19.2308 16.4698 18.9596 16.4698H13.934ZM15.1779 13.2717H16.7519V11.6721H15.1779V13.2717ZM15.1779 9.31219H16.7519V7.71253H15.1779V9.31219ZM15.1779 5.32705H16.7519V3.75298H15.1779V5.32705ZM0 15.6572V8.82973C0 8.57551 0.0588856 8.32576 0.176657 8.08047C0.29524 7.83518 0.464587 7.63659 0.684698 7.48471L5.02558 4.38773C5.33017 4.16762 5.66439 4.05756 6.02826 4.05756C6.39214 4.05756 6.71784 4.16762 7.00536 4.38773L11.345 7.48471C11.5651 7.63659 11.73 7.83518 11.8397 8.08047C11.9501 8.32576 12.0054 8.57551 12.0054 8.82973V15.6572C12.0054 15.8773 11.925 16.0678 11.7641 16.2286C11.6033 16.3894 11.4128 16.4698 11.1927 16.4698H7.94347V11.3931H4.08626V16.4698H0.836988C0.616878 16.4698 0.422352 16.3894 0.253411 16.2286C0.0844704 16.0678 0 15.8773 0 15.6572Z"
      fill="#ADB2B8"
    />
  </svg>
);

const Settings = ({ className }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 7C9 8.10457 8.10457 9 7 9C5.89543 9 5 8.10457 5 7C5 5.89543 5.89543 5 7 5C8.10457 5 9 5.89543 9 7Z"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.60307 1.04003C7.46588 1 7.31059 1 7 1C6.68941 1 6.53412 1 6.39693 1.04003C6.19612 1.09862 6.01874 1.21872 5.88975 1.38341C5.80163 1.49592 5.74396 1.64011 5.62861 1.92848C5.4628 2.34301 5.00262 2.55647 4.57905 2.41533L4.19852 2.28854C3.9286 2.19856 3.79363 2.15357 3.66131 2.14587C3.46693 2.13454 3.27347 2.18021 3.10467 2.27727C2.98977 2.34334 2.88917 2.44394 2.68798 2.64513C2.47414 2.85896 2.36723 2.96588 2.2993 3.08792C2.19951 3.26723 2.1573 3.47289 2.17839 3.67701C2.19275 3.81594 2.2489 3.95633 2.36121 4.2371C2.5371 4.67682 2.36789 5.17919 1.96181 5.42289L1.77681 5.53392C1.49354 5.70388 1.35191 5.78886 1.24903 5.90586C1.15799 6.00939 1.08934 6.13064 1.0474 6.26198C1 6.41039 1 6.57721 1 6.91084C1 7.3059 1 7.50343 1.06308 7.67251C1.11882 7.82191 1.20948 7.95582 1.32749 8.06306C1.46105 8.18442 1.64263 8.25705 2.00578 8.40231C2.37689 8.55076 2.56797 8.96275 2.44158 9.34194L2.29814 9.77224C2.19879 10.0703 2.14912 10.2193 2.1446 10.3657C2.13917 10.5418 2.18033 10.7161 2.26391 10.8712C2.33343 11.0001 2.44452 11.1112 2.66667 11.3333C2.88882 11.5555 2.9999 11.6666 3.12883 11.7361C3.28387 11.8197 3.45822 11.8608 3.63427 11.8554C3.78068 11.8509 3.92971 11.8012 4.22776 11.7019L4.57908 11.5848C5.00262 11.4436 5.4628 11.657 5.62861 12.0715C5.74396 12.3599 5.80163 12.5041 5.88975 12.6166C6.01874 12.7813 6.19612 12.9014 6.39693 12.96C6.53412 13 6.68941 13 7 13C7.31059 13 7.46588 13 7.60307 12.96C7.80388 12.9014 7.98126 12.7813 8.11025 12.6166C8.19837 12.5041 8.25604 12.3599 8.37139 12.0715C8.53719 11.657 8.99738 11.4436 9.42089 11.5848L9.77196 11.7019C10.07 11.8013 10.219 11.8509 10.3655 11.8555C10.5415 11.8609 10.7159 11.8197 10.8709 11.7361C10.9998 11.6666 11.1109 11.5555 11.3331 11.3334C11.5552 11.1112 11.6663 11.0002 11.7358 10.8712C11.8194 10.7162 11.8606 10.5418 11.8551 10.3658C11.8506 10.2194 11.8009 10.0703 11.7016 9.77229L11.5582 9.34225C11.4318 8.96292 11.623 8.55078 11.9942 8.40231C12.3574 8.25705 12.5389 8.18442 12.6725 8.06306C12.7905 7.95582 12.8812 7.82191 12.9369 7.67251C13 7.50343 13 7.3059 13 6.91084C13 6.57721 13 6.41039 12.9526 6.26198C12.9107 6.13064 12.842 6.00939 12.751 5.90586C12.6481 5.78886 12.5065 5.70388 12.2232 5.53392L12.038 5.42277C11.6319 5.17912 11.4626 4.67676 11.6385 4.23705C11.7508 3.95628 11.807 3.81588 11.8213 3.67696C11.8424 3.47284 11.8002 3.26718 11.7004 3.08787C11.6325 2.96583 11.5256 2.85891 11.3117 2.64508C11.1106 2.44389 11.01 2.34329 10.8951 2.27722C10.7263 2.18016 10.5328 2.13449 10.3384 2.14582C10.2061 2.15352 10.0711 2.19851 9.8012 2.28849L9.42092 2.41525C8.99738 2.55643 8.5372 2.343 8.37139 1.92848C8.25604 1.6401 8.19837 1.49592 8.11025 1.38341C7.98126 1.21872 7.80388 1.09862 7.60307 1.04003Z"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BookAStay = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={className}
      d="M0.804159 15.2826C0.586341 15.2826 0.39786 15.203 0.238716 15.0438C0.0795719 14.8847 0 14.6962 0 14.4784V4.55721C0 4.42299 0.0417955 4.28072 0.125386 4.13042C0.208977 3.98012 0.334765 3.87121 0.50275 3.80369L10.0719 0.112033C10.3395 0.0115635 10.5951 0.0409006 10.8387 0.200045C11.0814 0.358385 11.2028 0.580222 11.2028 0.865556V7.29522H5.75209C5.53427 7.29522 5.34579 7.37881 5.18665 7.54599C5.0275 7.71397 4.94793 7.90687 4.94793 8.12469V15.2826H0.804159ZM6.73107 15.2826C6.53013 15.2826 6.35451 15.2074 6.2042 15.0571C6.0531 14.906 5.97755 14.7215 5.97755 14.5037V9.15431C5.97755 8.93649 6.05712 8.74359 6.21626 8.5756C6.37541 8.40842 6.56389 8.32483 6.7817 8.32483H12.8605C12.8605 7.88919 13.0112 7.52107 13.3126 7.22047C13.614 6.91825 13.9822 6.76715 14.417 6.76715C14.8526 6.76715 15.2252 6.92227 15.5346 7.23252C15.8449 7.54197 16 7.91451 16 8.35015V14.4784C16 14.6962 15.9164 14.8847 15.7492 15.0438C15.5812 15.203 15.3883 15.2826 15.1705 15.2826H11.755V12.7712C11.755 12.5864 11.6754 12.4103 11.5162 12.2431C11.3571 12.076 11.1771 11.9924 10.9761 11.9924C10.7752 11.9924 10.5951 12.076 10.436 12.2431C10.2768 12.4103 10.1973 12.5864 10.1973 12.7712V15.2826H6.73107Z"
      fill="#ADB2B8"
    />
  </svg>
);
const Slider = ({ className }) => (
  <svg
    width="6"
    height="56"
    viewBox="0 0 6 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={className}
      d="M-2 0C2.41828 0 6 3.58172 6 8V48C6 52.4183 2.41828 56 -2 56V0Z"
    />
  </svg>
);

const SignifierOne = ({ className }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="6.5" className={className} strokeWidth="3" />
    <path d="M20 27V40" className={className} />
  </svg>
);

const SignifierTwo = ({ className }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="6.5" className={className} strokeWidth="3" />
    <path d="M20 0V13" className={className} />
    <path d="M20 27V40" className={className} />
  </svg>
);
const SignifierThree = ({ className }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="6.5" className={className} strokeWidth="3" />
    <path d="M20 0V13" className={className} />
    <path d="M20 27V40" className={className} />
  </svg>
);
const SignifierFour = ({ className }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="6.5" className={className} strokeWidth="3" />
    <path d="M20 0V13" className={className} />
  </svg>
);
const ZuscoIcon = ({ className }) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.0051 0.500001C9.63128 0.498994 7.31051 1.20206 5.33634 2.52025C3.36217 3.83844 1.82331 5.71253 0.914427 7.90545C0.00554422 10.0984 -0.232527 12.5116 0.230333 14.8398C0.693194 17.1681 1.83619 19.3067 3.51472 20.9853C5.19326 22.6638 7.33192 23.8068 9.66017 24.2697C11.9884 24.7325 14.4016 24.4945 16.5946 23.5856C18.7875 22.6767 20.6616 21.1378 21.9798 19.1637C23.2979 17.1895 24.001 14.8687 24 12.4949C24 9.31366 22.7363 6.26271 20.4868 4.01323C18.2373 1.76375 15.1863 0.500001 12.0051 0.500001ZM11.496 16.8479H5.02504C4.75011 16.8479 3.76751 16.8886 3.54349 16.4151C3.37548 16.0537 3.66059 15.5089 4.36318 14.8114C6.30293 12.8716 8.32923 10.6264 8.32923 10.6264C8.32923 10.6264 8.67544 10.1733 7.97794 10.1733H5.22868C4.87703 10.2406 4.51294 10.1846 4.19767 10.015C3.88241 9.84527 3.63521 9.57218 3.49767 9.24163C3.43587 9.04998 3.42118 8.84626 3.45486 8.64773C3.48854 8.44921 3.56959 8.26172 3.69114 8.10118C4.10353 7.59206 4.8723 7.59206 5.2185 7.59206H11.4145C11.6222 7.59794 11.8257 7.65152 12.0093 7.74863C12.1929 7.84574 12.3517 7.98379 12.4735 8.1521C12.6277 8.43505 12.6781 8.76306 12.6158 9.07925C12.5535 9.39543 12.3824 9.67983 12.1324 9.88311C10.1773 11.8432 8.1205 14.0274 8.40052 14.3532C8.41493 14.368 8.43248 14.3793 8.45187 14.3863C8.47126 14.3934 8.49199 14.396 8.51252 14.3939H11.4603C11.6395 14.359 11.8242 14.3641 12.0012 14.4089C12.1781 14.4537 12.343 14.5372 12.4839 14.6533C12.6248 14.7693 12.7383 14.9151 12.8162 15.0802C12.8941 15.2453 12.9345 15.4256 12.9345 15.6082C12.9345 15.7907 12.8941 15.971 12.8162 16.1361C12.7383 16.3012 12.6248 16.447 12.4839 16.5631C12.343 16.6792 12.1781 16.7626 12.0012 16.8075C11.8242 16.8523 11.6395 16.8574 11.4603 16.8224L11.496 16.8479ZM20.3343 16.5424C20.0745 16.8114 19.7286 16.9807 19.3568 17.021H15.3704C14.9347 17.015 14.5101 16.8823 14.1485 16.6391C13.7869 16.3959 13.5038 16.0528 13.3339 15.6515V10.9115C13.3395 10.6947 13.3953 10.4821 13.4968 10.2904C13.5775 10.1462 13.6846 10.0183 13.8125 9.91366C14.0155 9.78212 14.2393 9.68573 14.4743 9.62855C14.7817 9.56545 15.0987 9.56545 15.406 9.62855C15.5816 9.65313 15.7496 9.71645 15.8977 9.81391C16.0459 9.91137 16.1705 10.0405 16.2626 10.1921C16.3547 10.3436 16.4119 10.5137 16.4302 10.6901C16.4485 10.8665 16.4273 11.0447 16.3683 11.2119L14.8154 12.7393H14.1179V13.7575H14.6271V15.2085H19.2092V13.7117H20.0543V13.0651L18.1451 11.5887C18.0483 11.3941 17.9978 11.1798 17.9978 10.9624C17.9978 10.7451 18.0483 10.5308 18.1451 10.3362C18.2399 10.1765 18.3673 10.0386 18.5191 9.93157C18.6709 9.82453 18.8436 9.75077 19.0259 9.71511C19.226 9.68517 19.4305 9.70439 19.6216 9.7711C19.8899 9.7896 20.1448 9.89502 20.3479 10.0714C20.5509 10.2478 20.6909 10.4855 20.7467 10.7486V15.514C20.726 15.8946 20.5708 16.2554 20.3089 16.5322L20.3343 16.5424ZM17.0607 11.2679L18.7 12.9073L18.7306 14.2412H15.6148V12.8411L17.0607 11.2679Z"
      fill="#ffffff"
    />
  </svg>
);

ZuscoIcon.propTypes = {
  className: PropTypes.string,
};
CaretDown.propTypes = {
  fill: PropTypes.string,
};
Dashboard.propTypes = {
  className: PropTypes.string,
};
Messages.propTypes = {
  className: PropTypes.string,
};
Meals.propTypes = {
  className: PropTypes.string,
};
Listings.propTypes = {
  className: PropTypes.string,
};
Settings.propTypes = {
  className: PropTypes.string,
};
BookAStay.propTypes = {
  className: PropTypes.string,
};

Slider.propTypes = {
  className: PropTypes.string,
};
SignifierOne.propTypes = {
  className: PropTypes.string,
};
SignifierTwo.propTypes = {
  className: PropTypes.string,
};
SignifierThree.propTypes = {
  className: PropTypes.string,
};
SignifierFour.propTypes = {
  className: PropTypes.string,
};

Drycleaning.propTypes = {
  className: PropTypes.string,
};
export {
  Dashboard,
  Messages,
  Meals,
  Listings,
  Settings,
  BookAStay,
  Slider,
  SignifierOne,
  SignifierTwo,
  SignifierThree,
  CaretDown,
  SignifierFour,
  ZuscoIcon,
  Agent,
};
