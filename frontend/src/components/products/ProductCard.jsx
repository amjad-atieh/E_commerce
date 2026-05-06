import "./ProductCard.css";

export default function ProductCard({ id, image, name, description, price }) {
  return (
    <div className="card">
      {image && <img src="image" alt="Avatar" style="width:100%"></img>}
      <div className="container">
        <h4>
          <b>{name}</b>
        </h4>
        <div className="description-wrapper">
          <p className="description">{description}</p>
          <span className="tooltip">{description}</span>
        </div>
        <p>
          <b>price:</b> {price}
        </p>
      </div>
    </div>
  );
}
