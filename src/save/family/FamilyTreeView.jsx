import { useContext } from 'react';
import ReactFamilyTree from 'react-family-tree';
import SaveContext from '../SaveContext';
import FamilyNode from './FamilyNode';

class Node {
    parents = [];
    children = [];
    siblings = [];
    spouses = [];
    spouse = undefined;
    constructor(id, name, female) {
        this.id = id;
        this.name = name;
        this.gender = female ? 'female' : 'male';
    }
    addChild(id, type) {
        for (const relation of this.children) {
            if (id === relation.id) {
                return;
            }
        }
        this.children.push(new Relation(id, type));
    }
    addSpouse(id, type) {
        this.spouses.push(new Relation(id, type));
    }
    addParent(id, type) {
        for (const relation of this.parents) {
            if (id === relation.id) {
                return;
            }
        }
        this.parents.push(new Relation(id, type));
    }
}

class Relation {
    constructor(id, type) {
        this.id = id;
        this.type = type;
    }
}

/**
 * Initial nodes only contain blood children and spouses;
 * mend the relationships by:
 * * link children to parents
 * * adopt children by new spouses
 * 
 * @param {Map<String, Node>} map
 */
const mend = (map) => {
    var changed = false;
    Object.keys(map).forEach(id => {
        const parent = map[id];
        parent.children.forEach(relation => {
            const child = map[relation.id];

            // link child to parent
            child?.addParent(parseInt(id), 'blood');

            // adopt child by parent's primary spouse
            if (parent.spouse) {
                const spouse = map[parent.spouse];
                spouse?.addChild(relation.id, 'adopted');
                child?.addParent(parent.spouse, 'adopted');
            }
        });
    })
}

const FamilyTreeView = ({ rootId }) => {
    const { save } = useContext(SaveContext);

    const nodes = [];
    const map = {};

    // iterate living characters
    Object.keys(save.living).forEach(id => {
        const character = save.living[id];
        const node = new Node(parseInt(id), character.first_name, character.female);
        character.family_data?.child?.forEach(child => {
            node.addChild(child, 'blood');
        });
        if (character.family_data?.spouse) {
            node.addSpouse(character.family_data?.spouse, 'married');
        }
        if (character.family_data?.primary_spouse) {
            node.spouse = character.family_data?.primary_spouse;
        }
        nodes.push(node);
        map[id] = node;
    });
    mend(map);

    const WIDTH = 70;
    const HEIGHT = 80;

    return (
        <ReactFamilyTree
            nodes={nodes}
            rootId={rootId}
            width={WIDTH}
            height={HEIGHT}
            renderNode={(node) => (
                <FamilyNode
                    key={node.id}
                    node={node}
                    style={{
                        width: WIDTH,
                        height: HEIGHT,
                        transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                    }}
                />
            )}>

        </ReactFamilyTree>
    )
}

export default FamilyTreeView;