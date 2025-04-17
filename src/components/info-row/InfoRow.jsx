import './InfoRow.css';

function InfoRow({label, value}) {
    return (
        <div className='info-row'>
            <p>{label}</p>
            <p className="info-value">{value}</p>
        </div>
    );
}

export default InfoRow;