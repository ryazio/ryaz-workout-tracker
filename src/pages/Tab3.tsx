import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import RecordWorkout from '../components/RecordWorkout';
// import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

interface TabProps {
  currentSession: object,
  setCurrentSession: React.Dispatch<React.SetStateAction<object>>
};

const Tab3: React.FC<TabProps> = (props: TabProps) => {
  const { currentSession, setCurrentSession } = props;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Record Workout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Record Workout</IonTitle>
          </IonToolbar>
        </IonHeader>
        <RecordWorkout currentSession={currentSession} setCurrentSession={setCurrentSession} />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
