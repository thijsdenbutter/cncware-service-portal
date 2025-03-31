import './StatBlock.css'

function StatBlock({ title, children }) {
    return (
        <div className="stat-block">
            <p className="stat-title">{title}</p>
            {children}
        </div>
    )
}

export default StatBlock;