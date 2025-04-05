import './StatBlock.css'

function StatBlock({title, children}) {
    return (
        <div className="stat-block">
            <p>{title}</p>
            <>
                <div className="stat-content">
                    {children}
                </div>
            </>
        </div>
    )
}

export default StatBlock;