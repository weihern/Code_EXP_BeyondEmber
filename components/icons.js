import Svg, {Path} from 'react-native-svg';

export const Icon = ({width, height, color, name}) =>{
    width = width? width: 20;
    height = height? height: 20;
    color = color?color:"#BDBDBD";

    if(name.toLowerCase()==="home" || name.toLowerCase()==="beyondember"){
        return (<Svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 32 35"
          >
            <Path
              fill={color}
              fillRule="evenodd"
              d="M3.597 0h.606a2.352 2.352 0 0 1 2.344 2.348 2.35 2.35 0 0 1-2.344 2.344h-.606a2.35 2.35 0 0 1-2.349-2.344A2.352 2.352 0 0 1 3.597 0Zm9.435 29.95H8.635a2.531 2.531 0 0 0-2.521 2.523A2.532 2.532 0 0 0 8.635 35h13.618c3.638 0 6.822-2.048 8.452-5.05a9.533 9.533 0 0 0 1.162-4.564c0-.163-.006-.326-.016-.49a9.513 9.513 0 0 0-1.757-5.048 9.662 9.662 0 0 0-4.381-3.423 9.98 9.98 0 0 0 1.319-1.63 9.533 9.533 0 0 0 1.528-5.05v-.131c0-3.078-1.467-5.829-3.734-7.591A9.526 9.526 0 0 0 18.947 0h-7.525a2.352 2.352 0 0 0-2.348 2.348 2.35 2.35 0 0 0 2.348 2.344h3.139a2.533 2.533 0 0 1 2.526 2.527 2.533 2.533 0 0 1-2.526 2.527H8.45a2.533 2.533 0 0 0-2.526 2.527 2.532 2.532 0 0 0 2.527 2.521h10.815a2.533 2.533 0 0 1 2.527 2.527 2.533 2.533 0 0 1-2.527 2.527H2.527A2.532 2.532 0 0 0 0 22.371a2.533 2.533 0 0 0 2.527 2.526h10.505a2.533 2.533 0 0 1 2.527 2.527 2.532 2.532 0 0 1-2.527 2.527Z"
              clipRule="evenodd"
            />
          </Svg>
          );
    }

    if(name.toLowerCase()==="profile"){
        return (
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={width + 15}
                height={height + 15}
                viewBox="0 -960 960 960"
            >
            <Path 
                fill={color}
                d="M480-504.846q-49.5 0-82.442-32.942-32.943-32.943-32.943-82.443 0-50.269 32.943-82.827Q430.5-735.616 480-735.616q49.5 0 82.443 32.558 32.942 32.558 32.942 82.827 0 49.5-32.942 82.443Q529.5-504.846 480-504.846ZM200-215.384v-57.847q0-26.461 15.154-47.307 15.153-20.847 39.769-32.539 59.308-26.154 115.038-39.615Q425.692-406.154 480-406.154t109.923 13.577q55.616 13.577 114.923 39.5 24.847 11.692 40 32.539Q760-299.692 760-273.231v57.847H200Z" />
            </Svg>
        )
    }

    if(name.toLowerCase()==="challenge"){
        return (
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 -960 960 960"
            >
                <Path 
                fill={color}
                d="M769-88 645-212l-88 88-43-43q-17-17-17-42t17-42l199-199q17-17 42-17t42 17l43 43-88 88 123 124q9 9 9 21t-9 21l-64 65q-9 9-21 9t-21-9Zm111-636L427-271l19 20q17 17 17 42t-17 42l-43 43-88-88L191-88q-9 9-21 9t-21-9l-65-65q-9-9-9-21t9-21l124-124-88-88 43-43q17-17 42-17t42 17l20 19 453-453h160v160ZM320-568l38-38 38-38-38 38-38 38Zm-42 42L80-724v-160h160l198 198-42 42-181-180h-75v75l180 181-42 42Zm105 212 437-435v-75h-75L308-389l75 75Zm0 0-37-38-38-37 38 37 37 38Z" />
            </Svg>
        )
    }

    if(name.toLowerCase()==="add"){
        return (
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 -960 960 960"
            >
                <Path 
                fill={color}
                d="M479.825-200Q467-200 458.5-208.625T450-230v-220H230q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T230-510h220v-220q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510-730v220h220q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730-450H510v220q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Z" />
            </Svg>
        );
    }

    if(name.toLowerCase()==='like'){
        return(
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={21}
                fill="none"
            >
                <path
                fill="#08A935"
                d="M23.648 9.174c0-.527-.222-1.033-.618-1.406a2.173 2.173 0 0 0-1.49-.582h-6.66l1.012-4.543a1.455 1.455 0 0 0-.432-1.372L14.343.227 7.41 6.77a1.93 1.93 0 0 0-.622 1.411v9.941c0 .528.222 1.033.617 1.406s.931.582 1.49.582h9.484c.875 0 1.623-.497 1.939-1.212l3.182-7.009c.095-.228.148-.467.148-.726V9.175ZM.466 20.11H4.68V8.18H.466v11.93Z"
                />
            </svg>
        );
    }
    
}