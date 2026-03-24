import "./App.css";
import Map from "./components/Map";

const projectFeatures = [
  "Интерактивная карта с отмеченными храмами Иркутска",
  "Карточки с фото, адресом и краткой исторической справкой",
  "Быстрый переход к внешним материалам по каждому объекту",
];

function App() {
  return (
    <main className="page-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="section-kicker">Главная страница проекта</p>
          <h1>Интерактивная карта храмов Иркутска в одном окне</h1>
          <p className="hero-lead">
            Проект коротко рассказывает о ключевых храмах города и помогает
            быстро перейти от общего обзора к самой карте. Пользователь может
            открыть метку, посмотреть фото, адрес и краткое описание каждого
            места.
          </p>
        </div>

        <div className="hero-panel">
          <p className="panel-label">Что есть на странице</p>
          <ul className="feature-list">
            {projectFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="map-section" aria-labelledby="map-title">
        <div className="section-heading">
          <p className="section-kicker">Карта проекта</p>
          <h2 id="map-title">Ниже находится основное окно с картой.</h2>
          <p className="section-description">
            Нажимайте на метки, чтобы открыть карточку выбранного храма с
            краткой информацией и ссылкой на подробный материал.
          </p>
        </div>

        <div className="map-window">
          <Map />
        </div>
      </section>
    </main>
  );
}

export default App;
