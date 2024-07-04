import { Container, Divider, Segment } from 'semantic-ui-react';
import './App.css';
import FileUploader from './FileUploader';
import StoragePicker from './storage/StoragePicker';

function App() {
  return (
    <Container>
      <Segment basic textAlign='center'>
        <StoragePicker />
        <Divider horizontal>OR</Divider>
        <FileUploader />
      </Segment>
    </Container>
  );
}

export default App;
