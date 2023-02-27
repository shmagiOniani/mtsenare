import React, {useState} from 'react'
import {LeftOutlined} from '@ant-design/icons';
import {useLocation, Link} from 'react-router-dom'



function Tree(props) {
    return (
        <li className="d-tree">
            <TreeNode node={props.children}
                      label={props.label}
                      iconClass={props.iconClass}
                      defaultStatus= {props.status}
            />
        </li>
    )
}

const TreeNode = ({node, label, iconClass, defaultStatus}) => {
    const [childVisible, setChildVisible] = useState(false);
    const location = useLocation();
    const currentLocation = location.pathname
    return (
        <div >
            <Link to={currentLocation} className="d-tree-label" onClick={e => setChildVisible(v => !v)}>
                {iconClass}
                <span >
                    {label}
                    <div className={`d-tree-toggler ${childVisible ? 'active' : ''}`}>
                        <LeftOutlined />
                        </div>
                    </span>
            </Link>

            {childVisible && <ul className="nav ">{node}</ul> }
        </div>
    )
}

export default Tree
