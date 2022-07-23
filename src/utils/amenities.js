import { ReactComponent as Wifi } from "assets/icons/wifi.svg";
import { ReactComponent as Kitchen } from "assets/icons/kitchen.svg";
import { ReactComponent as Gym } from "assets/icons/gym.svg";
import { ReactComponent as Parking } from "assets/icons/parking.svg";
import { ReactComponent as Pet } from "assets/icons/pet.svg";
import { ReactComponent as Smoke } from "assets/icons/smoke.svg";

const AMENITIES = [
  {
    title: "Wifi",
    icon: <Wifi className="fill-current stroke-current text-current" />,
  },
  {
    title: "Wifi",
    icon: <Kitchen className="fill-current stroke-current text-current" />,
  },
];
const FEATURES = [
  {
    title: "Wifi",
    icon: <Gym className="fill-current stroke-current text-current" />,
  },
  {
    title: "Wifi",
    icon: <Parking className="fill-current stroke-current text-current" />,
  },
];

const RULES = [
  {
    title: "Wifi",
    icon: <Pet className="fill-current stroke-current text-current" />,
  },
  {
    title: "Wifi",
    icon: <Smoke className="fill-current stroke-current text-current" />,
  },
];

export { AMENITIES, FEATURES, RULES };
