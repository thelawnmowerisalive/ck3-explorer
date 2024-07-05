import { useContext } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardMeta, Divider, Grid, GridColumn, GridRow, Statistic, StatisticLabel, StatisticValue } from "semantic-ui-react";
import { Character } from "./character";
import SaveContext from "./SaveContext";

class Props {
    /**
     * @type {Character}
     */
    character;
}

/**
 * @param {Props} props 
 */
const CharacterView = (props) => {
    const saveContext = useContext(SaveContext);
    const { character } = props;

    const age = new Date(saveContext.date).getFullYear() - new Date(character.birth).getFullYear();
    const h = character.alive_data.health;
    const heart = (
        h >= 5 ? '💖' : (
            h >= 3 ? '❤️' : (
                h >= 1 ? '💔' : '🖤'
            )
        )
    );

    return (
        <Card fluid>
            <CardContent>
                <CardHeader>{character.first_name} {character.nickname_text}, {age} {heart}</CardHeader>
                <CardMeta>{character.birth}</CardMeta>
                <CardDescription>
                    TRAITS GO HERE
                    <Grid columns={2}>
                        <GridRow>
                            <GridColumn computer="10">
                                <SkillView icon='📜' skill={character.skill[0]}></SkillView>
                                <SkillView icon='⚔️' skill={character.skill[1]}></SkillView>
                                <SkillView icon='🗝️' skill={character.skill[2]}></SkillView>
                                <SkillView icon='🗡️' skill={character.skill[3]}></SkillView>
                                <SkillView icon='📖' skill={character.skill[4]}></SkillView>
                                <SkillView icon='💪' skill={character.skill[5]}></SkillView>
                            </GridColumn>
                            <GridColumn computer="6">
                                <Statistic size="mini" horizontal value={saveContext.faiths[character.faith].tag} />
                                <Statistic size="mini" horizontal value={saveContext.cultures[character.culture].name} />
                            </GridColumn>
                        </GridRow>
                    </Grid>
                </CardDescription>
                <CardDescription>
                    <Divider content='Spouses'/>
                    <Divider content='Children'/>
                </CardDescription>
            </CardContent>
        </Card>
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