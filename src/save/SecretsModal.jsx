import { useContext, useState } from "react";
import { Button, Header, Icon, Modal, ModalContent } from "semantic-ui-react";
import CharacterLink from "./character/CharacterLink";
import SaveContext from "./SaveContext";

export default function SecretsModal({ id, character }) {
    const [open, setOpen] = useState(false);
    const { secrets } = useContext(SaveContext);

    const list = character.alive_data?.secrets?.map(id => secrets[id])
        .map((secret, index) => {
            switch (secret.type) {
                case "secret_cannibal":
                    return <>Is a cannibal</>
                case "secret_crypto_religionist": // TODO
                    return <>???</>
                case "secret_deviant":
                    return <>Is a deviant</>
                case "secret_disupted_heritage": // TODO who when how
                    return <>Disupted heritage</>
                case "secret_embezzler":        // TODO who
                    return <>Is an embezzler</>
                case "secret_homosexual":
                    return <>Is a homosexual</>
                case "secret_incest":           // TODO
                    return <>Incest</>
                case "secret_lover":
                    return <>💕 Has lover: <CharacterLink id={secret.target.identity} /></>
                case "secret_murder":
                    return <>🩸 Murdered <CharacterLink id={secret.target.identity} /></>
                case "secret_murder_attempt":
                    return <>Attempted to murder <CharacterLink id={secret.target.identity} /></>
                case "secret_non_believer":
                    return <>Is a non-believer</>
                case "secret_unmarried_illegitimate_child":
                    return <>
                        👶 Had illegitimate child: <CharacterLink id={secret.target.identity} />.
                        Affair partner: <CharacterLink id={secret.participants.find(value => (value != id))} />
                    </>
                case "secret_witch":
                    return <>Is a witch</>
                default:
                    return <div key={index}><i>{JSON.stringify(secret)}</i></div>
            }
        });

    return (
        <Modal
            basic
            size="small"
            trigger={
                <Button
                    floated="right"
                    size="mini"
                >
                    <Icon name="user secret" /> Reveal secrets
                </Button>
            }
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Header icon>
                <Icon name="user secret" />
            </Header>
            <ModalContent>
                {list?.map((item, index) => <div key={index}>{item}</div>)}
                {!list && 'No secrets.'}
            </ModalContent>
        </Modal>
    )
}