import { FiCloudRain, FiWind } from "react-icons/fi";
import { IoLocation } from "react-icons/io5";
import { TbDroplets } from "react-icons/tb";

interface ItemProps {
  type: 'wind' | 'humidity' | 'rain',
  value: number
}

const Item = ({ type, value }: ItemProps) => {
  const icons = {
    wind: <FiWind className="w-8 h-8 opacity-40" />,
    humidity: <TbDroplets className="w-8 h-8 opacity-40" />,
    rain: <FiCloudRain className="w-8 h-8 opacity-40" />,
  };

  const labels = {
    wind: 'Vento',
    humidity: 'Umidade',
    rain: 'Chuva',
  };

  const symbols = {
    wind: 'km/h',
    humidity: '%',
    rain: '%',
  };

  return (
    <div className="flex px-4 py-3 items-center justify-center gap-3 text-text-primary">
      <div>{icons[type]}</div>
      <div className="flex flex-col">
        <div className="text-text-primary">{labels[type]}</div>
        <div className="flex flex-row gap-1">
          <h2>{value}</h2>
          <span>{symbols[type]}</span>
        </div>
      </div>
    </div>
  );
}

export function Now() {
  return (
    <section className="rounded-xl w-full md:w-1/2 font-lato" style={{
      background: 'url(/bg.png) lightgray -153.664px -10px / 164.027% 109.583% no-repeat'
    }}>
      <div className="flex flex-row gap-2 justify-end items-center text-text-secondary">
        <IoLocation />
        <span>Fortaleza, CE</span>
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="flex flex-row justify-center items-center relative">
          <h1 className="text-text-primary text-8xl font-bold">18</h1>
          <span className="absolute top-4 -right-7 text-text-tertiary text-center text-2xl font-bold">
            °C
          </span>
        </div>
        <span>22° 16°</span>
      </div>
      <div className="flex gap-2 w-full justify-between">
        <Item type="wind" value={12} />
        <Item type="humidity" value={60} />
        <Item type="rain" value={0.3} />
      </div>
    </section>
  );
}
