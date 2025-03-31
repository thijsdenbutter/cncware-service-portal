import './InfoRow.css'

function InfoRow({label, value}) {
    return (
        <div className='info-row'>
            <h2 className="info-label">{label}</h2>
            <p className="info-value">{value}</p>
        </div>
    )
}

export default InfoRow;