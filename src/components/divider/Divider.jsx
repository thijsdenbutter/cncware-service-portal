import './Divider.css';

function Divider({direction}) {
    return (
        <span className={`divider-${direction}`}/>
    );
}
export default Divider;