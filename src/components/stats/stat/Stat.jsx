import './Stat.css';

function Stat({ label, value }) {
    return (
    <div className="stat">
        <p>{label}</p>
        <p className="stat-value">{value}</p>
    </div>
    );
}

export default Stat;