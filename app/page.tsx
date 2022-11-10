import Banner from "./Banner";

export default function Home() {
  return (
    <div className="container">
      <Banner />
      {/* TODO: Search bar */}
      <div className="search-bar">Search Bar</div>
      {/* TODO: History */}
      <div className="history">History</div>
    </div>
  );
}
