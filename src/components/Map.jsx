"use client";
import { useState, useEffect, useRef } from "react";
import "../App.css";
import useMapConnect from "./useMapConnect";
import pointer from "../assets/pointer.png"
import { url } from "inspector";


const Map = () => {
  console.log("2")
  const activeInfoWindow = useRef(null);
  const [map, setMap] = useState(null);

  const churches = [
  {
    position: { lat: 52.29229780105789, lng: 104.28264482239582 },
    title: "Богоявленский собор",
    address: "ул. Сухэ-Батора, 1А, Иркутск",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/23/Church_of_the_Epiphany_%28Irkutsk%29.jpg",
    l: "https://ru.wikipedia.org/wiki/%D0%A1%D0%BE%D0%B1%D0%BE%D1%80_%D0%91%D0%BE%D0%B3%D0%BE%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F_(%D0%98%D1%80%D0%BA%D1%83%D1%82%D1%81%D0%BA)",
    text: "Один из древнейших храмов города, возведён в 1718–1746 годах.<br><br>Яркий памятник сибирского барокко с богатым фасадным декором.<br><br>Многократно страдал от пожаров и землетрясений.<br><br>Полностью восстановлен в конце XX века."
  },
  {
    position: { lat: 52.28555489255741, lng: 104.27110597001416 },
    title: "Свято-Троицкая церковь",
    address: "ул. 5-й Армии, 8, Иркутск",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/24/Trinity_Church_in_Irkutsk.jpg",
    l: "https://russianold.ru/2024/04/08/troitsy-irkutsk/",
    text: "Возведена в 1778 году и считается одним из наиболее цельно сохранившихся храмов Иркутска.<br><br>Выдающийся образец сибирского барокко с многоярусной композицией.<br><br>Архитектура восходит к традициям деревянных ярусных церквей Прибайкалья.<br><br>Декор сочетает древнерусские и барочные мотивы."
  },
  {
    position: { lat: 52.27645264560913, lng: 104.28849608403512 },
    title: "Крестовоздвиженская церковь",
    address: "ул. Седова, 1, Иркутск",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/69/Church_of_the_Raising_of_the_Holy_Cross%2C_Irkutsk_%28winter%29.jpg",
    l: "https://russianold.ru/2022/03/12/krestovozdvizhenska-ikt/",
    text: "Построена в 1747–1760 годах.<br><br>Один из самых декоративных храмов Сибири.<br><br>Фасады украшены сложной резьбой, изразцами и фигурными наличниками.<br><br>Не имеет прямых аналогов в русской архитектуре."
  },
  {
    position: { lat: 52.300785880624176, lng: 104.29494447609984 },
    title: "Знаменский монастырь (Знаменская церковь)",
    address: "Ангарская ул., 14, Иркутск",
    img: "https://s3.regru.cloud/monasterium/resize_cache/116613/59941cad64831bc9fd3d0170114502c0/iblock/d43/d43a7f0cf66bd2f78eb8e744a670cac9/1.jpg",
    l: "https://ru.wikipedia.org/wiki/%D0%97%D0%BD%D0%B0%D0%BC%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B9_%D0%BC%D0%BE%D0%BD%D0%B0%D1%81%D1%82%D1%8B%D1%80%D1%8C_(%D0%98%D1%80%D0%BA%D1%83%D1%82%D1%81%D0%BA)",
    text: "Основан в 1689 году — один из старейших монастырей Сибири.<br><br>Главный храм построен в XVIII веке.<br><br>Монастырь играл важную роль в духовной жизни региона.<br><br>Здесь похоронены известные деятели истории Сибири."
  },
  {
    position: { lat: 52.292281900460715, lng: 104.31809773299057 },
    title: "Казанская церковь",
    address: "ул. Баррикад, 34/1, Иркутск",
    img: "https://s12.stc.all.kpcdn.net/russia/wp-content/uploads/2019/03/Kazanskaya-tserkov-2048.jpg",
    l: "https://ru.wikipedia.org/wiki/%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D1%86%D0%B5%D1%80%D0%BA%D0%BE%D0%B2%D1%8C_(%D0%98%D1%80%D0%BA%D1%83%D1%82%D1%81%D0%BA)",
    text: "Возведена в конце XIX века.<br><br>Крупный городской храм в русско-византийском стиле.<br><br>Отличается массивным объёмом и выразительными куполами.<br><br>Является одним из главных действующих храмов города."
  },
  {
    position: { lat: 52.288764, lng: 104.286337 },
    title: "Харлампиевская церковь",
    address: "ул. 5-й Армии, 59, Иркутск",
    img: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Irkutsk_Church_of_St_Charalampus.jpg",
    l: "https://harlamp.ru/",
    text: "Основана в 1738 году (деревянная), каменная — в 1777–1790 годах.<br><br>Известна как «Морской храм» — здесь благословляли моряков перед экспедициями.<br><br>В этом храме в 1904 году венчался Александр Колчак.<br><br>Отреставрирована в 2000-х годах."
  },
  {
    position: { lat: 52.287012, lng: 104.298246 },
    title: "Преображенская церковь",
    address: "пер. Волконского, 1, Иркутск",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/52/Preobragensk_church_Irkutsk.JPG",
    l: "https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%B5%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D1%86%D0%B5%D1%80%D0%BA%D0%BE%D0%B2%D1%8C_(%D0%98%D1%80%D0%BA%D1%83%D1%82%D1%81%D0%BA)",
    text: "Построена в 1795–1811 годах в стиле классицизма.<br><br>Находится рядом с усадьбами декабристов Волконского и Трубецкого.<br><br>В этой церкви венчались дочери декабристов и отпевали их соратников.<br><br>Действующий храм с уникальной исторической аурой."
  },
  {
    position: { lat: 52.27700441050131, lng: 104.29762275361648 },
    title: "Входо-Иерусалимская церковь",
    address: "ул. Борцов Революции, 15, Иркутск",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Church_of_the_Entry_of_the_Lord_into_Jerusalem_in_Irkutsk_%28September_2025%29_-_0_1.jpg",
    l: "https://ierusalimka.ru/news.php",
    text: "Построена в XVIII веке на Иерусалимской горе.<br><br>Сочетает классицизм с уникальными росписями и необычной лестницей.<br><br>Долгое время была заброшена, колокольня восстановлена в XXI веке."
  },
  {
    position: { lat: 52.29125070615625, lng: 104.28165796445906 },
    title: "Спасская церковь",
    address: "ул. Сухэ-Батора, 2, Иркутск",
    img: "https://cdn.culture.ru/c/95343.jpg",
    l: "https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B0%D1%81%D1%81%D0%BA%D0%B0%D1%8F_%D1%86%D0%B5%D1%80%D0%BA%D0%BE%D0%B2%D1%8C_(%D0%98%D1%80%D0%BA%D1%83%D1%82%D1%81%D0%BA)",
    text: "Первый каменный храм Иркутского острога, освящён в 1710 году.<br><br>Сохраняет уникальные наружные фрески XIX века.<br><br>Единственная постройка Иркутского кремля, дошедшая до наших дней."
  },
  {
    position: { lat: 52.282869, lng: 104.301554 },
    title: "Князе-Владимирская церковь",
    address: "ул. Касьянова, 15, Иркутск",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Irkutsk_St_Vladimir_Church.jpg",
    l: "https://ru.wikipedia.org/wiki/%D0%9A%D0%BD%D1%8F%D0%B7%D0%B5-%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%D1%81%D0%BA%D0%B0%D1%8F_%D1%86%D0%B5%D1%80%D0%BA%D0%BE%D0%B2%D1%8C_(%D0%98%D1%80%D0%BA%D1%83%D1%82%D1%81%D0%BA)",
    text: "Построена в 1888–1895 годах к 900-летию Крещения Руси на средства мецената В.А. Литвинцева.<br><br>Величественный белокаменный храм в псевдорусском стиле.<br><br>Расположен в Рабочем предместье, доминируя над окружающей застройкой."
  },
  {
    position: { lat: 52.27979158757518, lng: 104.32181256696067 },
    title: "Храм Ксении Петербургской",
    address: "Советская ул., 57а, Иркутск",
    img: "https://pravprihod.ru/dyn_images/img26408.jpg",
    l: "https://hramksenia.ru/",
    text: "Создан как больничный храм на территории Ивано-Матрёнинской детской больницы.<br><br>Приход активно занимается социальной и благотворительной деятельностью.<br><br>Современная постройка, гармонично вписанная в архитектуру района."
  },
  {
    position: { lat: 52.25960520794855, lng: 104.3331669749639 },
    title: "Храм Веры, Надежды, Любови и Софии",
    address: "Байкальская ул., 165 В, Иркутск",
    img: "https://avatars.mds.yandex.net/get-altay/15452616/2a000001998093b1d36a374d5bceca94ac55/L_height",
    l: "https://hramvera.ru/",
    text: "Современный храм, построенный в конце XX века.<br><br>Служит духовным центром Октябрьского района.<br><br>Архитектура выдержана в традициях православного зодчества.<br><br>Известен своим активным приходом и просветительскими программами."
  },
  {
    position: { lat: 52.247231, lng: 104.256241 },
    title: "Николо-Иннокентьевская церковь",
    address: "ул. Чайковского, 12, Иркутск",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/18/Irkutsk_St_Nicholas_and_Innocent_Church.JPG",
    l: "https://ru.wikipedia.org/wiki/%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%BE-%D0%98%D0%BD%D0%BD%D0%BE%D0%BA%D0%B5%D0%BD%D1%82%D1%8C%D0%B5%D0%B2%D1%81%D0%BA%D0%B0%D1%8F_%D1%86%D0%B5%D1%80%D0%BA%D0%BE%D0%B2%D1%8C_(%D0%98%D1%80%D0%BA%D1%83%D1%82%D1%81%D0%BA)",
    text: "Храм в Глазково, возведённый в середине XIX века.<br><br>Назван в честь святителей Николая Чудотворца и Иннокентия Иркутского.<br><br>Единственный каменный храм в левобережной части старого Иркутска."
  },
  {
    position: { lat: 52.35089837357326, lng: 104.21415010864176 },
    title: "Храм Рождества Христова",
    address: "ул. Мира, 122А, Иркутск",
    img: "https://avatars.mds.yandex.net/get-altay/5111241/2a00000181fa7ed410b6bd2024efa0a1587e/L_height",
    l: "https://hram2irk.orgs.biz/",
    text: "Построен в 1999–2001 годах в память о жертвах авиакатастрофы АН-124.<br><br>Находится в микрорайоне Второй Иркутск.<br><br>Архитектура сочетает строгость и традиционные русские формы."
  }
];

  // Инициализация карты
  const initMap = () => {
    const instance = new window.google.maps.Map(
      document.getElementById("map"),
      {
        center: { lat: 52.27880668234576, lng: 104.3037687500459 },
        zoom: 12,
        mapId: "79153152354b1bb86b30cdd5"
      }
    );

    setMap(instance);
  };

  useMapConnect(initMap);
  function closeAllwindows() {
    const windows = document.querySelectorAll(".info-window")
    windows.forEach(element => {
      element.remove();
    });
  }

  // Функция для добавления маркера
  const placeMarker = (church) => {
    if (!map) return;

    const marker = new window.google.maps.marker.AdvancedMarkerElement({
      position: church.position,
      map,
    });

    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div class="info-window">
          <button class="close-btn">✖</button>

          <strong>${church.title}</strong><br><br>
          <p class="adress">${church.address}</p><br>
          <img class="icon" src="${church.img}"/>
          <p class="desc">${church.text}</p>

          <form action="${church.l}">
            <input class="link" type="submit" value="больше о церкви" />
          </form>
        </div>
      `,
    });

    marker.addListener("click", () => {

      // закрыть предыдущее окно
      if (activeInfoWindow.current) {
        activeInfoWindow.current.close();
      }

      infoWindow.open({
        anchor: marker,
        map,
      });

      activeInfoWindow.current = infoWindow;

      // ждём пока DOM окна появится
      setTimeout(() => {
        const closeBtn = document.querySelector(".close-btn");
        if (closeBtn) {
          closeBtn.onclick = () => {
            infoWindow.close();
          };
        }
      }, 50);

    });
  };

  // Когда карта готова — создаём маркеры
  useEffect(() => {
    if (!map) return;

    churches.forEach(placeMarker);

  }, [map]);
  return (
      <div className="relative w-full h-full">
        <div id="map" style={{ height: window.innerHeight, width: window.innerWidth }} />
      </div>
    );
 
};

export default Map;
