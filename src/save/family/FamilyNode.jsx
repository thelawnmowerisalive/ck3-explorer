import './family-node.css';

const FamilyNode = ({ node, style, clickHandler, clickSubHandler }) => {

    console.log(node);

    return (
        <div className='outer' style={style}>
            <div
                className={'inner ' + node.gender}
                onClick={clickHandler}
            >
                <div className='label'>{node.name}</div>
            </div>
            {node.hasSubTree && (
                <div
                    className={'sub ' + node.gender}
                    onClick={clickSubHandler}
                />
            )}
        </div>
    )
}

export default FamilyNode;