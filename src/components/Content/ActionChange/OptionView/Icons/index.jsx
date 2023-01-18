import "./Styles/ViewContainer.css";

const NavBarIcon = ({ name, push, pushed }) => {
    return name === "gridview" ? (
      <GridView push={push} />
    ) : name === "traditional" ? (
      <TraditionalView pushed={pushed} />
    ) : (
      <></>
    );
  }
  
  const GridView = ({ push }) => {
      return (
        <svg 
        width="23" 
        height="23" 
        viewBox='0 0 24 24' 
        fill='none'
        className={push}>
          <path
            
            d='M10 1H1V10H10V1ZM0 0V11H11V0H0Z'
            fill='#c4c4c4'
          />
          <path
            
            d='M10 14H1V23H10V14ZM0 13V24H11V13H0Z'
            fill='#c4c4c4'
          />
          <path
          
            d='M23 14H14V23H23V14ZM13 13V24H24V13H13Z'
            fill='#c4c4c4'
          />
          <path
            d='M23 1H14V10H23V1ZM13 0V11H24V0H13Z'
            fill='#c4c4c4'
          />
        </svg>
      );
    };
    
  const TraditionalView = ({ pushed }) => {
      return (
        <svg 
        width="23" 
        height="23"
        viewBox='0 0 24 24' 
        fill='none'
        className={pushed}>
          <path
            d='M23 1H1V5H23V1ZM0 0V6H24V0H0Z'
            fill='#c4c4c4'
          />
          <path
            
            d='M23 10H1V14H23V10ZM0 9V15H24V9H0Z'
            fill='#c4c4c4'
          />
          <path
            
            d='M23 19H1V23H23V19ZM0 18V24H24V18H0Z'
            fill='#c4c4c4'
          />
        </svg>
      );
    };
  
    export default NavBarIcon;