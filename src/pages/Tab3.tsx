import { IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import RecordWorkout2 from '../components/RecordWorkout2';
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
          {/* <IonLabel> */}
          {/* <a href="/history">

</a> */}
          <IonRouterLink href='/history'>
            History
          </IonRouterLink>
          {/* </IonLabel> */}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Record Workout</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 3 page" /> */}
        <RecordWorkout2 currentSession={currentSession} setCurrentSession={setCurrentSession} />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
