// https://github.com/KrishK21/CS-220-Homework

export default function ImageDisplay({ items }) {
  return (
    // Using nasas public APIS I can grab the images that are displayed for the said year
    <div className="image-grid">
      {items.length === 0 && <p className="no-results">No results found.</p>}
      {items.map((item) => {
        const nasaId = item.data[0].nasa_id;
        const imageUrl = item.links?.[0]?.href;
        const detailUrl = `https://images.nasa.gov/details/${nasaId}`;
        const title = item.data[0].title;
        const description = item.data[0].description?.slice(0, 100);

        return (
          <a
            key={nasaId}
            href={detailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="image-card"
          >
            <img src={imageUrl} alt={title} />
            <div className="image-info">
              <h3>{title}</h3>
              <p>{description}...</p>
            </div>
          </a>
        );
      })}
    </div>
  );
}
