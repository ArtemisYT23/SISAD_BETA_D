import React from "react";

const IconSearch = ({ element }) => {
    return element === "group" ? (
      <Group />
    ) : element === "cabinet" ? (
      <Cabinet />
    ) : element === "folder" ? (
      <Folder />
    ) : (
      <></>
    );
  };

  const Group = () => {
    return(
      <svg
      width="24"
      height="24"
      fill="#c4c4c4"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.6667 2.33333H8.33333V9.66667H15.6667V2.33333ZM8 2V10H16V2H8Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6667 3.33333H9.33333V8.66667H14.6667V3.33333ZM9 3V9H15V3H9Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6666 4.99996H9.33331V4.66663H14.6666V4.99996Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6666 6.99996H9.33331V6.66663H14.6666V6.99996Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 4.16667C11 4.07462 11.0746 4 11.1667 4H13.1667C13.2587 4 13.3333 4.07462 13.3333 4.16667C13.3333 4.25871 13.2587 4.33333 13.1667 4.33333H11.1667C11.0746 4.33333 11 4.25871 11 4.16667Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 6.16667C11 6.07462 11.0746 6 11.1667 6H13.1667C13.2587 6 13.3333 6.07462 13.3333 6.16667C13.3333 6.25871 13.2587 6.33333 13.1667 6.33333H11.1667C11.0746 6.33333 11 6.25871 11 6.16667Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 8.16667C11 8.07462 11.0746 8 11.1667 8H13.1667C13.2587 8 13.3333 8.07462 13.3333 8.16667C13.3333 8.25871 13.2587 8.33333 13.1667 8.33333H11.1667C11.0746 8.33333 11 8.25871 11 8.16667Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.6667 14.3333H14.3333V21.6667H21.6667V14.3333ZM14 14V22H22V14H14Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.6667 15.3333H15.3333V20.6667H20.6667V15.3333ZM15 15V21H21V15H15Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.6666 17H15.3333V16.6666H20.6666V17Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.6666 19H15.3333V18.6666H20.6666V19Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 16.1667C17 16.0746 17.0746 16 17.1667 16H19.1667C19.2587 16 19.3333 16.0746 19.3333 16.1667C19.3333 16.2587 19.2587 16.3333 19.1667 16.3333H17.1667C17.0746 16.3333 17 16.2587 17 16.1667Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 18.1667C17 18.0746 17.0746 18 17.1667 18H19.1667C19.2587 18 19.3333 18.0746 19.3333 18.1667C19.3333 18.2587 19.2587 18.3333 19.1667 18.3333H17.1667C17.0746 18.3333 17 18.2587 17 18.1667Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 20.1667C17 20.0746 17.0746 20 17.1667 20H19.1667C19.2587 20 19.3333 20.0746 19.3333 20.1667C19.3333 20.2587 19.2587 20.3333 19.1667 20.3333H17.1667C17.0746 20.3333 17 20.2587 17 20.1667Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.66667 14.3333H2.33333V21.6667H9.66667V14.3333ZM2 14V22H10V14H2Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.66667 15.3333H3.33333V20.6667H8.66667V15.3333ZM3 15V21H9V15H3Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.66665 17H3.33331V16.6666H8.66665V17Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.66665 19H3.33331V18.6666H8.66665V19Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 16.1667C5 16.0746 5.07462 16 5.16667 16H7.16667C7.25871 16 7.33333 16.0746 7.33333 16.1667C7.33333 16.2587 7.25871 16.3333 7.16667 16.3333H5.16667C5.07462 16.3333 5 16.2587 5 16.1667Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 18.1667C5 18.0746 5.07462 18 5.16667 18H7.16667C7.25871 18 7.33333 18.0746 7.33333 18.1667C7.33333 18.2587 7.25871 18.3333 7.16667 18.3333H5.16667C5.07462 18.3333 5 18.2587 5 18.1667Z"
        fill="#c4c4c4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 20.1667C5 20.0746 5.07462 20 5.16667 20H7.16667C7.25871 20 7.33333 20.0746 7.33333 20.1667C7.33333 20.2587 7.25871 20.3333 7.16667 20.3333H5.16667C5.07462 20.3333 5 20.2587 5 20.1667Z"
        fill="#c4c4c4"
      />
    </svg>
    )
  };
  
  const Cabinet = () => {
    return(
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23 1H1V23H23V1ZM0 0V24H24V0H0Z"
          fill="#C4C4C4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 4H4V20H20V4ZM3 3V21H21V3H3Z"
          fill="#C4C4C4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 9H4V8H20V9Z"
          fill="#C4C4C4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 15H4V14H20V15Z"
          fill="#C4C4C4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 6.5C9 6.22386 9.22386 6 9.5 6H15.5C15.7761 6 16 6.22386 16 6.5C16 6.77614 15.7761 7 15.5 7H9.5C9.22386 7 9 6.77614 9 6.5Z"
          fill="#C4C4C4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 12.5C9 12.2239 9.22386 12 9.5 12H15.5C15.7761 12 16 12.2239 16 12.5C16 12.7761 15.7761 13 15.5 13H9.5C9.22386 13 9 12.7761 9 12.5Z"
          fill="#C4C4C4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9 18.5C9 18.2239 9.22386 18 9.5 18H15.5C15.7761 18 16 18.2239 16 18.5C16 18.7761 15.7761 19 15.5 19H9.5C9.22386 19 9 18.7761 9 18.5Z"
          fill="#C4C4C4"
        />
      </svg>
    )
  };
  
  const Folder = () => {
    return(
        <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.5 20.7917L18.5 23.5417L1.02477 23.9746C0.462956 23.9885 0 23.5369 0 22.9749V3C0 2.44772 0.447715 2 1 2H7.48538C7.80833 2 8.1114 2.15597 8.29912 2.41876L10.2009 5.08124C10.3886 5.34403 10.6917 5.5 11.0146 5.5H20C20.5523 5.5 21 5.94772 21 6.5V17.125L19.5 20.7917ZM20 16.9284L18.567 20.4313L17.7933 22.5589L1 22.9749L1 3L7.48538 3L9.38715 5.66248C9.76257 6.18807 10.3687 6.5 11.0146 6.5H20V16.9284Z"
          fill="#c4c4c4"
        />
        <path
          d="M4.53826 11.623C5.11595 10.0474 6.61565 9 8.29376 9H22.6126C23.2951 9 23.7771 9.6687 23.5613 10.3162L19.2279 23.3162C19.0918 23.7246 18.7097 24 18.2793 24H1.43179C0.736688 24 0.253619 23.3084 0.492909 22.6557L4.53826 11.623Z"
          fill="#c4c4c4"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.6126 10L8.29376 10C7.03518 10 5.9104 10.7856 5.47713 11.9672L1.43179 23H18.2793L22.6126 10ZM8.29376 9C6.61565 9 5.11595 10.0474 4.53826 11.623L0.492909 22.6557C0.253619 23.3084 0.736688 24 1.43179 24H18.2793C18.7097 24 19.0918 23.7246 19.2279 23.3162L23.5613 10.3162C23.7771 9.6687 23.2951 9 22.6126 9H8.29376Z"
          fill="#c4c4c4"
        />
      </svg>
    )
  };
  
  export default IconSearch;