import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, Divider, Grid, GridColumn, GridRow, Statistic, StatisticLabel, StatisticValue, Tab } from "semantic-ui-react";
import PinchZoomPan from "../../pzp/PinchZoomPan";
import FamilyTreeView from "../family/FamilyTreeView";
import { Save } from "../save";
import SaveContext from "../SaveContext";
import SecretsModal from "../SecretsModal";
import "./character.css";

const CharacterView = () => {
    const { save, date, traits, faiths, cultures, memories } = useContext(SaveContext);
    const { id } = useParams();
    const character = Save.findCharacter(save, id);

    if (!character) {
        return <>CHARACTER NOT FOUND</>
    }

    console.log(character);

    const panes = [
        {
            menuItem: "memories",
            render: () => (
                <MemoriesView ids={character.alive_data?.memories} map={memories} />
            )
        },
        {
            menuItem: "family tree",
            render: () => (
                <PinchZoomPan>
                    <FamilyTreeView rootId={parseInt(id)} />
                </PinchZoomPan>
            )
        },
    ]

    return (
        <div className="character fill">
            <Card>
                <CardContent>
                    <CardHeader>
                        {character.first_name} {character.nickname_text} <HealthView character={character} date={date} />
                        <SecretsModal
                            id={id}
                            character={character}
                            key={id} // this will reset the modal when navigating to a different character
                        />
                    </CardHeader>
                    <CardDescription>
                        <TraitsView traits={character.traits} map={traits} />
                        <SkillView icon='📜' skill={character.skill[0]}></SkillView>
                        <SkillView icon='⚔️' skill={character.skill[1]}></SkillView>
                        <SkillView icon='🗝️' skill={character.skill[2]}></SkillView>
                        <SkillView icon='🗡️' skill={character.skill[3]}></SkillView>
                        <SkillView icon='📖' skill={character.skill[4]}></SkillView>
                        <SkillView icon='💪' skill={character.skill[5]}></SkillView>

                        <Statistic size="mini" horizontal value={faiths[character.faith]?.tag} />
                        <Statistic size="mini" horizontal value={cultures[character.culture]?.name} />
                    </CardDescription>
                    <CardDescription>
                        <Divider content='Spouses' />
                        <Link to={`./../${character.family_data?.spouse}`}>
                            {Save.findCharacter(save, character.family_data?.spouse)?.first_name}
                        </Link>

                        <Divider content='Children' />
                        {
                            character.family_data?.child?.map(child => (
                                <Link to={`./../${child}`} key={child}>
                                    {Save.findCharacter(save, child)?.first_name}
                                </Link>
                            ))
                        }
                    </CardDescription>
                </CardContent>
            </Card>
            {
                id && <Tab
                    className="details"
                    menu={{ pointing: true }}
                    panes={panes}
                />
            }

        </div>
    )
}

const HealthView = ({ character, date }) => {
    if (character.alive_data) {
        // show age and health (using appropriate icon)
        const age = new Date(date).getFullYear() - new Date(character.birth).getFullYear();
        const h = character.alive_data.health;
        const heart = (
            h >= 5 ? '💖' : (
                h >= 3 ? '❤️' : (
                    h >= 1 ? '💔' : '🖤'
                )
            )
        );
        return <>{age} {heart}</>
    } else if (character.dead_data) {
        const age = new Date(character.dead_data.date).getFullYear() - new Date(character.birth).getFullYear();
        return <>{age} <span title={character.dead_data.reason}>💀</span></>
    }
}

const TraitsView = ({ traits, map }) => {
    const names = traits?.map(trait => ({
        id: trait,
        name: map[trait]
    }));
    return (
        <div className="traits">
            {
                names?.map(({ id, name }) => <span key={id}>{name}</span>)
            }
        </div>
    )
}

const MemoriesView = ({ ids, map }) => {
    const memories = ids?.map(id => ({
        id,
        memory: map[id]
    }));
    console.log(memories);
    return (
        <div className="memories">
            {
                memories?.map(({ id, memory }) =>
                    <div className="memory" key={id}>
                        {memory.type}
                        <i className="date">{memory.creation_date}</i>
                    </div>
                )
            }
        </div>
    )
}

const SkillView = ({ icon, skill }) => {
    return (
        <Statistic size='mini'>
            <StatisticLabel>{icon}</StatisticLabel>
            <StatisticValue>{skill}</StatisticValue>
        </Statistic>
    )
}

export default CharacterView;